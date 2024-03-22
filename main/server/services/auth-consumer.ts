import { response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
    appId: string;
}

const allowedApps: string[] = [process.env.CONSUMER_1 as string];

const secretKey = process.env.JWT_SECRET as string;

export const authenticate = (req: any, res: any, next: any) => {
  const extToken = req.headers.authorization;
  const localReq = req.query.token;
  // Check if the request is coming from the frontend
  if (localReq) {
    try {
      const decoded = jwt.verify(localReq as string, secretKey) as DecodedToken;
      req.user = decoded;
      next();
      console.log("Uspesno registrovan zahtev sa FRONTEND-a");
    } catch (error) {
      return res.status(401).json({ error: 'Invalid frontend token' });
    }
  } else if (extToken) {
    // Perform secondary authentication if the request is not from the frontend
    try {
      const decoded = jwt.verify(extToken as string, secretKey) as DecodedToken;
      const { appId } = decoded;

      if (!allowedApps.includes(appId)) {
        return res.status(401).json({ error: 'Unauthorized app' });
      }

      req.user = decoded;
      next();
      console.log("Uspesno registrovan zahtev sa SEKUNDARNOG BACKEND-a");
    } catch (error) {
      return res.status(401).json({ error: 'Invalid backend token' });
    }
  } else {
    return res.status(401).json({ error: 'Token not found' });
  }
};

// export const authenticate = (req: any, res: any, next: any) => {
//   const extToken = req.headers.authorization;
//   //const localReq = req.query.token;
//   console.log("req.headers.authorization:", req.headers.authorization);
//   console.log("req.query:", req.query);
//   // if (localReq){
//   //   return;
//   // }
//   console.log("Integrity check komg");
//   if (!extToken) {
//     return res.status(401).json({ error: 'Token not found' });
//   }

//   console.log('pre try/catch bloka');
//   try {
//     const decoded = jwt.verify(extToken, secretKey) as DecodedToken;
//     const { appId } = decoded;

//     if (!allowedApps.includes(appId)) {
//       return res.status(401).json({ error: 'Unauthorized app' });
//     }

//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: 'Invalid token' });
//   }
// };