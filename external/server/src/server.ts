import express, { Request, Response } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 9091;
const cors = require('cors');
const secretKey = 'my-32-character-ultra-secure-and-ultra-long-secret';

app.use(cors({ origin: 'http://localhost:9090' }))

const generateToken = () => {
  const payload = {
    appId: 'agentska-aplikacija',
  };

  return jwt.sign(payload, secretKey);
};

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

app.get('/data', (req: Request, res: Response) => {
  res.send('Sin od zmaja od bosne');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});