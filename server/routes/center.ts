import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { Center } from '../models/Center'
import { Op } from 'sequelize';
import { Rating } from '../models/Rating'
import { Appointment, AppointmentStatus } from '../models/Appointment';
import { User } from '../models/User';

export const center = Router();

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

center.get("/list", async (req, res) => {
    const { name, address, rating, datetime, token } = req.query;
    const id = token ? (jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number })['id'] : null;
  
    const where: any = {};
    if (name) {
      where.name = { [Op.like]: `%${name}%` };
    }
    if (address) {
      where.address = { [Op.like]: `%${address}%` };
    }
  
    let centers = (await Center.findAll({ where, include: [Rating, Appointment]}));
    centers = centers.map((center: any) => {
      center = center.get({ plain: true }); 
      if(center.ratings) {
        center.rating = center.ratings.reduce((acc: number, rating: any) => acc + rating.rating, 0) / center.ratings.length
      }
      return center;
    });
  
    if (rating) {
      centers = centers.filter((center: any) => center.rating >= rating);
    }
    
    if (datetime && id) {
    
    const firstDate = new Date(datetime as string);
    const secondDate = new Date(new Date(datetime as string).getTime() + 60 * 60 * 1000);
  
  
    (async function() {
      const result = (await Promise.all(centers.map(async(center) => ({
        value: center,
        include: await isTimeslotFree(center.id, id, firstDate.toISOString(), secondDate.toISOString())
      })))).filter(v => v.include).map(data => data.value);
      return result;
    })().then((result) => {
      res.json(result);
    }).catch((error: any) => {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    });
    } else {
      res.json(centers);
    }
});

center.get("/:id", async (req, res) => {
    const { id } = req.params;
    const { token } = req.query;

    if( !token ) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    
    const { id: userId } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };
    const user = (await User.findOne({ where: { id: userId } })).get({ plain: true });
    
    try {
      let center : any = await Center.findOne({ where: { id }, include: [Rating, Appointment, User]});
      center = center.get({ plain: true }); 
      if(center.ratings) {
        center = {...center, rating: center.ratings.reduce((acc: number, rating: any) => acc + rating.rating, 0) / center.ratings.length}
      }
  
      if(user.role === 'client') {
        center.appointments = center.appointments.filter((appointment: any) => appointment.status !== AppointmentStatus.CLIENT_CANCELED || appointment.client_id === userId );
      }
      res.json(center);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
});