import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';
import axios from 'axios';
import {generateToken} from "../services/consumer-token";
//import {User} from '../models/User'

const app = express();
const PORT = 9091;
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:9090' }))
app.use(express.json());

// Api request interceptor
// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   console.log(config)
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

app.get('/apitest', async (req, res) => {
  try {
    const token = generateToken();
    console.log("SADRZAJ TOKENA: ", token);
    const response = await axios.get('http://app:8081/apitest/data', {
      headers: {
        authorization: token,
      },
    });
    const data = response.data;
    console.log("PRIKAZ RESPONSA: ", response.data)
    res.json(data);
  } catch (error) {
    res.status(500).json({ error });
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

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});