import {authenticate} from "../services/auth-consumer"
import {Router} from 'express';

export const apitest = Router();

apitest.get('/data', authenticate, (req, res) => {
    console.log('usao u data');
    // const data = { message: 'STIGLO iz Glavne u Agentsku'};
    res.json('PORUKA');
});