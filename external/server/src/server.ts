import jwt from 'jsonwebtoken';
import { sequelize } from './sequelize';
import bcrypt from 'bcrypt';
import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { generateToken } from "../services/consumer-token";
import {User} from '../models/User'

dotenv.config();

const app = express();
const PORT = 9091;
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:9090' }))
app.use(express.json());

(async () => {
  await sequelize.authenticate();

  app.listen(PORT);

})();

// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });

//=====================================================

app.get('/apitest', async (req, res) => {
  try {
    const token = generateToken();
    console.log("SADRZAJ TOKENA: ", token);
    console.log("Provera integriteta 1");
    const response = await axios.get('http://app:8081/apitest/data', {
      headers: {
        authorization: token,
      },
    });
    console.log("Provera integriteta 2");
    const data = response.data;
    console.log("PRIKAZ RESPONSA: ", response.data)
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error });
    console.log("problemovi");
  }
});

// app.post('/login', async (req, res) => {
//   try{
//     const authToken = generateToken();
//     const response = await axios.post('http://app:8081/account/login',{
//       email: req.body.email,
//       password: req.body.password,
//     });

//     res.cookie("token", response.data.token, { httpOnly: true });
//     res.json(response.data);

//   } catch (error){
//     res.json(error);
//   }
// });

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Sadrzaj email i password:", email, password);
  User.findOne({ where: { email } })
    .then(async (user: any) => {
      if (!user) {
        console.log("Integrity check 1")
        return res.status(401).json({ message: "Invalid email or password" });
      }
      console.log("Integrity check 2")
      user = user.get({ plain: true })
      console.log("Integrity check 3")

      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      if (user.active === 'unactivated') {
        return res.status(401).json({ message: "You have not activated your account" });
      }

      console.log("user content pre signing:", user.data)
      const token = jwt.sign(user, process.env.JWT_SECRET as string, {
        expiresIn: "7d"
      });

      res.cookie("token", token, { httpOnly: true });
      console.log("received user:", user.data)
      res.json({ token, user });
    })
    .catch((error: any) => {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.get('/data', (req: Request, res: Response) => {
  res.send('Sin od zmaja od bosne');
});

app.get("/appointment/visits", async (req, res) => {

  const { token } = req.query;
  const { id } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };
  const authToken = generateToken();
  console.log("req.query sa servera:", req.query);
  const responses = await axios.get('http://app:8081/appointment/visits', {
    headers: {
      authorization: authToken,
      id: id
    },
    // params: {
    //   token: token as string
    // }
  });

  res.json(responses.data);
});

app.get("/feedback/interactions", async (req, res) => {
  try {
    const { token } = req.query;
    const { id } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };
    const authToken = generateToken();

    const responses = await axios.get('http://app:8081/feedback/interactions', {
      headers: {
        authorization: authToken,
        id: id
      },
      // params: {
      //   token: token as string
      // }
    });

    res.json(responses.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/feedback", async (req, res) => {
  try {
    const data  = req.body;
    const { token } = req.query;

    const { id, role } = jwt.verify(token as string, process.env.JWT_SECRET as string) as User;
    const authToken = generateToken();

    const response = await axios.post('http://app:8081/feedback', data, {
      headers: {
        authorization: authToken,
        id: id,
        role: role
      },
      // params: {
      //   token: token as string
      // }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/feedback/history", async (req, res) => {
  try {
    const { token } = req.query;
    const { id } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };
    const authToken = generateToken();

    const responses = await axios.get('http://app:8081/feedback/history', {
      headers: {
        authorization: authToken,
        id: id
      },
      // params: {
      //   token: token as string
      // }
    });

    res.json(responses.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/feedback/:id", async (req, res) => {
  try {
    const { token } = req.query;
    const { id } = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: number };
    const authToken = generateToken();
    const feedbackId = req.params.id;

    const response = await axios.get(`http://app:8081/feedback/${feedbackId}`, {
      headers: {
        authorization: authToken,
        id: feedbackId
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});