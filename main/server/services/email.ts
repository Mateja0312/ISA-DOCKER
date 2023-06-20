import nodemailer from 'nodemailer';

let transporter: any;

try {
  transporter =  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10), 
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    }
  });
} catch (error) {
  console.error(error);
  transporter.dsfas = null;
}

export function sendEmail(emailOptions: any, callback?: any) {
  try {
    return transporter.sendMail(emailOptions, callback)
  } catch (error) {
    console.error(error);
  }
}
