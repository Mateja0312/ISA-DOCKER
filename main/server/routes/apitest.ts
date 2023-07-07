import jwt, { JwtPayload } from 'jsonwebtoken';
import {Router} from 'express';

interface DecodedToken extends JwtPayload {
    appId: string;
}

const allowedApps: string[] = ['agentska-aplikacija'];
export const apitest = Router();

const secretKey = 'my-32-character-ultra-secure-and-ultra-long-secret';

const authenticate = (req: any, res: any, next: any) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  console.log('pre try/catch bloka');
  try {
    const decoded = jwt.verify(token, secretKey) as DecodedToken;
    const { appId } = decoded;

    if (!allowedApps.includes(appId)) {
      return res.status(401).json({ error: 'Unauthorized app' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

apitest.get('/data', authenticate, (req, res) => {
    console.log('usao u data');
    // const data = { message: 'STIGLO iz Glavne u Agentsku'};
    res.json('PORUKA');
});