import nodemailer from "nodemailer";
import express from "express";
const routes = express.Router();

/* EMAIL ME POST REQUEST */
routes.post("", (req, res) => {
  const { interest, email, subject, message, from } = JSON.parse(req.body.data);

  const validReq = [interest, email, subject, message, from].every(Boolean);

  if (validReq) {
    const transporter = nodemailer.createTransport({
      service: "Outlook",
      auth: {
        user: process.env.OFFICIALEMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const options = {
      from: email,
      to: process.env.OFFICIALEMAIL,
      subject,
      text: `user with ${interest} interest is saying ${message}`,
    };

    transporter.sendMail(options, (err, info) => {
      if (err) {
        res.status(500).json({
          message: `nodemailer, failed with status 500, ${err.message}`,
        });
      } else {
        res.status(200).json({ success: `message was sent` });
      }
    });
  } else if (!validReq && type && type == "report") {
    const transporter = nodemailer.createTransport({
      auth: {
        use: process.env.OFFICIALEMAIL,
        pass: process.env.PASSWORD,
      },
    });
    transporter.sendMail({ from, subject, text: message }, (err, info) => {
      if (err) {
        res.status(500).json({ fail: true, message: `failed to submit email` });
        return;
      }
      res.status(200).json({ fail: false });
    });
  } else {
    res.send(`please make sure the form is valid befroe trying again`);
  }
});

export default routes;
