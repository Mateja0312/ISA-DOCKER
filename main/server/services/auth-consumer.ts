import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
    appId: string;
}

const allowedApps: string[] = ['agentska-aplikacija'];

const secretKey = process.env.JWT_SECRET as string;

export const authenticate = (req: any, res: any, next: any) => {
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