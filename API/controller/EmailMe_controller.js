import nodemailer from 'nodemailer';
import express from 'express';
import {matchRoutes} from 'react-router-dom';
const routes = express.Router();

/* EMAIL ME POST REQUEST */
const EmailMeControllerHandler = (req, res, next) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.OFFICIALEMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let mailOptions; // Declare mailOptions variable outside the if-else block

  if (req.body.ip) {
    mailOptions = {
      from: 'official_Jolly@outlook.com',
      to: 'official_Jolly@outlook.com',
      subject: `Admin Logged in`,
      text: `someone from ${req.body.ip} logged in as an admin, if it's not in use, please change your credentials`,
    };
  } else {
    const {interest, email = process.env.OFFICIALEMAIL, subject, message, from = ''} = req.body;
    mailOptions = {
      from: email,
      to: process.env.OFFICIALEMAIL,
      subject: subject,
      text: `Name: ${from}\nEmail: ${email}\n\nMessage: ${message} : I'm interested in: ${interest || ''}`,
    };
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({error: 'failed to send the message'});
    } else {
      console.log('Message sent successfully');
      res.status(200).json({data: 'Message sent successfully'});
    }
  });
};

routes.get('', (req, res) => res.send('contact us route'));

export default EmailMeControllerHandler;
