import express from 'express';
import cors from 'cors';
import path from 'path';
import { sequelize } from './sequelize';

import { questionnaire } from '../routes/questionnaire';
import { account } from '../routes/account';
import { center } from '../routes/center';
import { feedback } from '../routes/feedback';
import { appointment } from '../routes/appointment';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/questionnaire', questionnaire)
app.use('/account', account)
app.use('/center', center)
app.use('/feedback', feedback)
app.use('/appointment', appointment)

app.get("/", (req, response) => {
    response.send("Hello world!");
});

(async () => {
  await sequelize.sync();

  app.listen(8081);

})();

const qrcodes = express();
var dir = path.join(__dirname, '..', 'qrcodes');
qrcodes.use(express.static(dir));
qrcodes.listen(3000, function () {
    console.log('File server on http://localhost:3000/');
});
    