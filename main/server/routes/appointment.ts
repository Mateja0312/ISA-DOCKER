import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { Appointment, AppointmentStatus } from '../models/Appointment';
import { Questionnaire } from '../models/Questionnaire';
import { Center } from '../models/Center';
import { Op } from 'sequelize';
import { User } from '../models/User';
import path from 'path';
import qrcode from 'qrcode';
import nodemailer from 'nodemailer';
import { sendEmail } from '../services/email';

export const appointment = Router();

export async function isPenalized(clientId: any){
  const penalties = await Appointment.findAll({
    where: {
      [Op.and]: [
        {
          client_id: {
            [Op.eq]: clientId,
          }
        },
        {
          status: {
            [Op.eq]: AppointmentStatus.FAILED
          }
        },
        {
          start: {
            [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        }
      ]
    }
  });

  return penalties.length;
}

async function getRecentAppointments(clientId: any, start: any) {
  const requestedDate = new Date(start);
  const limit = new Date(start);
  limit.setMonth(limit.getMonth() - 6);
  return await Appointment.findAll({
    where: {
      [Op.and]: [
        {
          client_id: {
            [Op.eq]: clientId,
          } 
        },
        {
          [Op.or]: [
            {status: {
            [Op.eq]: AppointmentStatus.COMPLETED
            }},
            {status: {
              [Op.eq]: AppointmentStatus.CLIENT_RESERVED
            }},
            {status: {
              [Op.eq]: AppointmentStatus.CLIENT_ACCEPTED
            }}
          ],
        },
        {
          start: {
            [Op.gte]: limit
          },
        },
        {
          end: {
            [Op.lte]: requestedDate
          },
        }

      ]
    }
  });
}

async function isTimeslotFree(center_id: number, client_id: number, start: string, end: string) {
  const appointments: any = await Appointment.findAll({
    include: { all: true },
    where: {
      [Op.and]: [
        {
          center_id: {
            [Op.eq]: center_id,
          } 
        },
        {
        [Op.or] : [
          {
            status: {
              [Op.not]: AppointmentStatus.CLIENT_CANCELED
            },
          },
          {
            client_id: {
              [Op.eq]: client_id
            },
          }
        ],
        },
        {[Op.or]: [
          {
            start: {
              [Op.between]: [start, end]
            },
          },
          {
            end: {
              [Op.between]: [start, end]
            },
          }
        ],
        }
      ]
    }
  });

  if (appointments.length) {
    return false;
  }
  return true;
}

function sendQRcode(appointment: any, email: string){
  const filename = `appointment-${appointment.id}.png`
  const qrCodePath = path.join(__dirname, '..', 'qrcodes', filename);
  qrcode.toFile(qrCodePath, JSON.stringify(appointment), { type: 'png' }, (err) => {
    if (err) throw err;
    console.log("QR code generated successfully");
  });

  const mailOptions = {
    from: 'appointments@clinic.com',
    to: email,
    subject: 'Appointment QR Code',
    text: 'Appointment QR Code',
    html: `<p>Appointment QR Code</p><img src="http://localhost:3000/${filename}"/>`
  };
  
  sendEmail(mailOptions, function(error: any, info: any){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

appointment.get("/visits", async (req, res) => {
  const { token } = req.query;
  const { id } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };
  let responses = await Appointment.findAll({
    include: [Center],
    where: {
      client_id: id,
      [Op.or]: [
        {status: 'reserved'},
        {status: 'accepted'},
        {status: 'completed'}
      ]
    }
  });
  res.json(responses);
});

appointment.get("/:id", async (req, res) => {
  const { token } = req.query;
  const { id, role } = jwt.verify(token as string, process.env.JWT_SECRET as string) as User;

  const appointment = await Appointment.findOne({
    include: { all: true },
    where: {
      id: req.params.id
    }
  });
  const app = appointment.get({ plain:true })
  if(role == "client" && app.status != "predefined" && id != app.client.id ){
    return res.status(401).json({ message: "Invalid token" })
  }
  res.json(appointment);
});

appointment.post("", async(req, res) => {
  const newAppointment = req.body;
  const sender = jwt.verify(newAppointment.token, process.env.JWT_SECRET as string) as User;
  const { id, role, employedAt } = sender;
  
  if (id !== newAppointment.user_id) {
    return res.status(401).json({ message: "Invalid token" });
  } 
  
  if (new Date(newAppointment.start) < new Date()) {
    return res.status(400).json({ message: "Invalid date" });
  }

  if(role == "client"){
    const questionnaire = (await Questionnaire.findOne({ where: { client_id: id } }))?.get({ plain: true });
    if(!questionnaire) {
      return res.status(400).json({ message: "Questionnaire not filled" });
    }

    if((await isPenalized(id)) >= 3) {
      return res.status(400).json({ message: "You have exceeded the number of penalties for this month" });
    }

    const recentAppointments = await getRecentAppointments(id, newAppointment.start);
    console.log(recentAppointments)

    if (recentAppointments.length) {
      return res.status(409).json({ message: "You already have an appointment in the last 6 months" });
    }
  } else if (role == "employee") {
    if(employedAt != newAppointment.center_id) {
      return res.status(401).json({ message: "You are not employed at this center!" });
    }
  } else {
    return res.status(401).json({ message: "You are not authorized to make an appointment!" });
  }

  if(!(await isTimeslotFree( newAppointment.center_id, id, newAppointment.start, newAppointment.end))){
    return res.status(409).json({ message: "Overlapping appointments" });
  } 

  delete newAppointment.token;
  delete newAppointment.user_id; 
  const user = (await User.findOne({ where: { id } })).get({ plain: true });
  newAppointment['client_id'] = user.role === 'client' ? id : null;
  newAppointment['status'] = user.role === 'client' ? 'reserved' : 'predefined';

  Appointment.create(newAppointment)
  .then((createdAppointment: any) => {
    
    if(user.role === 'client') {
      sendQRcode(createdAppointment, user.email);
    }
    res.status(201).json(createdAppointment);
  })
  .catch((err: any)=>{
    console.error(err);
    res.status(500).json(err);
  })
  
});

appointment.post("/:id", async(req, res) => {
  const id = req.params.id;
  const { token } = req.query;
  const { id: userId } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };
  const user = (await User.findOne({ where: { id: userId } })).get({ plain: true });

  const questionnaire = (await Questionnaire.findOne({ where: { client_id: userId } }))?.get({ plain: true });
  if(!questionnaire) {
    return res.status(400).json({ message: "Questionnaire not filled" });
  }

  const appointment = (await Appointment.findOne({ where: { id } })).get({ plain: true });
  console.log(userId)
  appointment.client_id = userId;
  appointment.status = AppointmentStatus.CLIENT_ACCEPTED;

  if((await isPenalized(id)) >= 3) {
    return res.status(400).json({ message: "You have exceeded the number of penalties for this month" });
  }

  const recentAppointments = await getRecentAppointments(userId, appointment.start);
  if (recentAppointments.length) {
    return res.status(409).json({ message: "You already have an appointment in the last 6 months" });
  }

  Appointment.update(appointment, {
    where: { id }
  })
  .then((updatedAppointment: any) => {
    sendQRcode(appointment, user.email);
    res.status(201).json(updatedAppointment);
  })
  .catch((err: any)=>{
    console.error(err);
    res.status(500).json(err);
  })
});

appointment.delete("/:id", async(req, res) => {
  const { id } = req.params;
  const { token } = req.query;
  const { id: userId } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };

  const appointment = (await Appointment.findOne({ where: { id } })).get({ plain: true });

  if(appointment.client_id !== userId) {
    return res.status(401).json({ message: "Invalid token" });
  }
  
  const now = new Date();
  const start = new Date(appointment.start);
  const diff = start.getTime() - now.getTime();
  const diffHours = Math.ceil(diff / (1000 * 60 * 60));
  if (diffHours < 24) {
    return res.status(409).json({ message: "Can't cancel appointment less than 24 hours before" });
  }
  

  if(appointment.status === AppointmentStatus.CLIENT_ACCEPTED) {
    appointment.status = AppointmentStatus.PREDEFINED;
    appointment.client_id = null;   
  } else if (appointment.status === AppointmentStatus.CLIENT_RESERVED) {
    appointment.status = AppointmentStatus.CLIENT_CANCELED;
  }

  Appointment.update(appointment, {
    where: { id }
  })
  .then((updatedAppointment: any) => {
    res.status(201).json(updatedAppointment);
  })
  .catch((err: any)=>{
    console.error(err);
    res.status(500).json(err);
  })
  
});