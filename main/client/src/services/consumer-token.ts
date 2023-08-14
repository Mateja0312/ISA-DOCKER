import jwt from 'jsonwebtoken';

const secretKey = 'my-32-character-ultra-secure-and-ultra-long-secret';

export const generateToken = () => {
    const payload = {
      appId: "glavni-frontend",
    };
    return jwt.sign(payload, secretKey);
};