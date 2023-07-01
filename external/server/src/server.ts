import express, { Request, Response } from 'express';

const app = express();
const PORT = 9091;
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:9090' }))

app.get('/api/hello', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.get('/data', (req: Request, res: Response) => {
    res.send('Sin od zmaja od bosne');
  });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});