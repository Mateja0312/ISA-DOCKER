import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';
import axios from 'axios';
import { generateToken } from "../services/consumer-token";
//import {User} from '../models/User'

const app = express();
const PORT = 9091;
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:9090' }))
app.use(express.json());

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

app.post('/login', async (req, res) => {
  try{
    const authToken = generateToken();
    const response = await axios.post('http://app:8081/account/login',{
      email: req.body.email,
      password: req.body.password,
    });

    res.cookie("token", response.data.token, { httpOnly: true });
    res.json(response.data);

  } catch (error){
    res.json(error);
  }
});

app.get('/data', (req: Request, res: Response) => {
  res.send('Sin od zmaja od bosne');
});

app.get("/appointment/visits", async (req, res) => {

  const { token } = req.query;
  const { id } = jwt.verify(token as string, "my-32-character-ultra-secure-and-ultra-long-secret") as { id: number };
  const authToken = generateToken();
  const responses = await axios.get('http://app:8081/appointment/visits', {
    headers: {
      authorization: authToken,
    },
    params: {
      token: token as string
    }
  });

  res.json(responses.data);
});

app.get("/feedback/interactions", async (req, res) => {
  try {
    const { token } = req.query;
    const { id } = jwt.verify(token as string, "my-32-character-ultra-secure-and-ultra-long-secret") as { id: number };
    const authToken = generateToken();

    const responses = await axios.get('http://app:8081/feedback/interactions', {
      headers: {
        authorization: authToken,
      },
      params: {
        token: token as string
      }
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

    const { id } = jwt.verify(token as string, "my-32-character-ultra-secure-and-ultra-long-secret") as { id: number };
    const authToken = generateToken();

    const response = await axios.post('http://app:8081/feedback', data, {
      headers: {
        authorization: authToken,
      },
      params: {
        token: token as string
      }
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
    const { id } = jwt.verify(token as string, "my-32-character-ultra-secure-and-ultra-long-secret") as { id: number };
    const authToken = generateToken();

    const responses = await axios.get('http://app:8081/feedback/history', {
      headers: {
        authorization: authToken,
      },
      params: {
        token: token as string
      }
    });

    res.json(responses.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/feedback/:id", async (req, res) => {
  try {
    const authToken = generateToken();
    const feedbackId = req.params.id;

    const response = await axios.get(`http://app:8081/feedback/${feedbackId}`, {
      headers: {
        authorization: authToken,
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});