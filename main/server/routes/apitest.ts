import {authenticate} from "../services/auth-consumer"
import {Router} from 'express';

export const apitest = Router();

apitest.get('/data', authenticate, (req, res) => {
    console.log('usao u data');
    // const data = { message: 'STIGLO iz Glavne u Agentsku'};
    console.log("Ovde se vidi sadrzaj od req.header:", req.headers.authorization)
    res.json('PORUKA');
});