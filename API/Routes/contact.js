import nodemailer from "nodemailer";
import express from "express";
import { matchRoutes } from "react-router-dom";
const routes = express.Router();

/* EMAIL ME POST REQUEST */
routes.post("", (req, res) => {
  const { interest, email, subject, message, from } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.OFFICIALEMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: "official_Jolly@outlook.com",
    to: process.env.OFFICIALEMAIL,
    subject: subject,
    text: `Name: ${from}\nEmail: ${email}\n\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Failed to send message");
    } else {
      console.log("Message sent successfully");
      res.status(200).send("Message sent successfully");
    }
  });
});

routes.get("", (req, res) => res.send("contact us route"));

export default routes;
