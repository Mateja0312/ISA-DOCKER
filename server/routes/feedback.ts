import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { Appointment } from '../models/Appointment';
import { FeedbackResponse } from '../models/FeedbackResponse';
import { Feedback } from '../models/Feedback';
import { User } from '../models/User';
import { sendEmail } from '../services/email';

export const feedback = Router();

feedback.get("/interactions", async (req, res) => {
    const { token } = req.query;
    const { id } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };
    try {
      let content : any = await Appointment.findAll({
        include: { all: true },
        where: { 
          client_id: id, 
          status: 'completed' 
        }
      });
  
      const interactions = content.reduce((acc: any, appointment: any) => {
        appointment = appointment.get({ plain: true });
        acc['centers'].push( appointment.center);
        acc['employees'].push( appointment.employee);
        return acc;
      }, {centers: [], employees: []});
  
      interactions.centers =  [...new Map(interactions.centers.map((item: any) => [item?.id, item])).values()]
      interactions.employees =  [...new Map(interactions.employees.map((item: any) => [item?.id, item])).values()]
  
      res.json(interactions);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  
});

feedback.get("/response-history", async (req, res) => {
    const { token } = req.query;
    const { id } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };
    let responses = await FeedbackResponse.findAll({
      include: [Feedback],
      where: {
        respondedBy: id, 
      }
    });
    res.json(responses);
});

feedback.get("/waiting-response", async (req, res) => {
    let feedbackList : any = await Feedback.findAll({
      include: [FeedbackResponse],
    })
    feedbackList = feedbackList.map((f: any) => {
      return f.get({ plain: true })
    });
    feedbackList = feedbackList.filter((f: any) => !f.feedback_response)
    res.json(feedbackList);
});

feedback.get("/response/:id", async (req, res) => {
    let response: any = await FeedbackResponse.findOne({
      include: [Feedback],
      where: {
        id: req.params.id
      }
    })
    res.json(response);
});

feedback.get("/history", async (req, res) => {
    const { token } = req.query;
    const { id: userId } = jwt.verify(token as string, process.env.JWT_SECRET as string) as User;

    let myFeedbacks = await Feedback.findAll();
    myFeedbacks = myFeedbacks.map((f:any) => {
      return f.get({plain: true})
    });
    myFeedbacks = myFeedbacks.filter((f:any) => f.client_id == userId)

    res.json(myFeedbacks);
});

feedback.post("/response", async(req, res) => {
    const { token } = req.query;
    const { id, role } = jwt.verify(token as string, process.env.JWT_SECRET as string) as User;

    if(role !== 'admin') {
      res.status(401).json({message: 'Unauthorized'});
      return;
    }

    req.body.respondedBy = id;
    
    FeedbackResponse.create(req.body) 
    .then(async(feedbackResponse: any) => {

      const feedback = await feedbackResponse.$get('feedback');
      const client = (await feedback.$get('client')).get({plain: true});
      const response = feedbackResponse.get({plain: true}).response;

      const mailOptions = {
        from: "feedback@clinic.com",
        to: client.email,
        subject: 'Feedback',
        html: `
          <h1>Feedback</h1>
          <p>${response}</p>
        ` 
      }

      sendEmail(mailOptions)

      res.status(201).json(feedbackResponse);
    })
    .catch((err: any)=>{
      console.error(err);
      res.status(500).json(err);
    })
});

feedback.post("", async(req, res) => {
    const { token } = req.query;
    const { id, role } = jwt.verify(token as string, process.env.JWT_SECRET as string) as User;

    if(role !== 'client') {
      res.status(401).json({message: 'Unauthorized'});
      return;
    }

    req.body.client_id = id;

    Feedback.create(req.body)
    .then((createdFeedback: any) => {
      res.status(201).json(createdFeedback);
    })
    .catch((err: any)=>{
      console.error(err);
      res.status(500).json(err);
    })
});

  feedback.get("/:id", async (req, res) => {
      let feedback = await Feedback.findOne({
        where: {
          id: req.params.id,
        }
      })
      res.json(feedback);
});