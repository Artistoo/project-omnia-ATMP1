import NodeMailer from "nodemailer";
import express from "express";
const routes = express.Router();

/* EMAIL ME POST REQUEST  */
routes.post("", (req, res) => {
  const { interest, email, subject, message } = req.body;

  const transporter = NodeMailer.createTransport({
    service: "Outlook",
    auth: {
      user: process.env.OFFICIALEMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const messageOptions = {
    from: email,
    to: process.env.OFFICIALEMAIL,
    subject,
    text: `user with ${interest} interest is saying ${message} `,
  };
  transporter.sendMail(messageOptions, (err, info) => {
    if (err) {
      res.status(500).json({ message: `failed with status 500` });
    } else {
      res.status(200).json({ success: `message was sent` });
    }
  });
});
routes.get("", (req, res) => {
  res.send("contact me");
});
export default routes;
