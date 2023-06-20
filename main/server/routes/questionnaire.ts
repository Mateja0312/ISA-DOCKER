import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { Questionnaire, questions } from '../models/Questionnaire';

export const questionnaire = Router();

questionnaire.get("/questions", async (req, res) => { 
      res.json(questions)
  });

questionnaire.get("", async (req, res) => {
    const { token } = req.query;
    const { id } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };
    try {
        const questionnaire = (await Questionnaire.findOne({ where: { client_id: id } }))?.get({ plain: true });
        res.json(questionnaire ? JSON.parse(questionnaire.q_answers) : []);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

questionnaire.post("", async(req, res) => {
    const { token } = req.query;
    const { id } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };
  
    const questionnaire = (await Questionnaire.findOne({ where: { client_id: id } }))?.get({ plain: true });
    if(questionnaire) {
      Questionnaire.update({q_answers: JSON.stringify(req.body)}, {
        where: {
          client_id: id
        }
      }).then(() => {
        res.status(200).json({message: 'Questionnaire updated'});
      }).catch((err: any) => {
        console.error(err);
        res.status(500).json(err);
      });
      return;
    }
    Questionnaire.create({q_answers: JSON.stringify(req.body), client_id: id})
    .then((createdQuestionnaire: any) => {
      res.status(201).json(createdQuestionnaire);
    })
    .catch((err: any)=>{
      console.error(err);
      res.status(500).json(err);
    })
  });