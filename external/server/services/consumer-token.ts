import jwt from 'jsonwebtoken';

export const generateToken = () => {
    const payload = {
      appId: process.env.APP_ID as string
    };
    console.log("APP_ID:", process.env.APP_ID as string);
    console.log("JWT_SECRET:", process.env.JWT_SECRET as string);
    return jwt.sign(payload, process.env.MAIN_APP_SECRET as string);
};