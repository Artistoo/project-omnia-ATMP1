import passport from "passport";
import bcrypt from "bcrypt";
import User from "../models/Users.js";
import nodeMailer from "nodemailer";

const GenerateResetPasswordLink = async (req, res, next) => {
  try {
    const { userEmail } = req.body;
    console.log(userEmail);
    if (!userEmail) {
      return res.status(401).json({
        error: `please make sure the email address is valid before trying again`,
      });
    }
    const user = await User.findOne({ Email: userEmail });
    if (!user) {
      return res.status(201).json({
        error: `no user with this email found in data base , try to register instead`,
      });
    }
    const str = "ZazeiqssdSQeazoZSjkSUjfS45754215848798212";
    const Link = str
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    console.log(Link);

    const transporter = nodeMailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.OFFICIALEMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.OFFICIALEMAIL,
      to: userEmail,
      subject: "link",
      html: `<div>
      <p>change your password here : <a href="${process.env.HOST}changeYourPassword/${Link}"> Here </a></p>
      if you haven't request to change your password please contact here here : <a href='/contactUs'> Contact us </a>
  </div>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "failed to send the message" + error });
      } else {
        res.status(200).json({ data: Link });
      }
    });
  } catch (err) {
    return res.status(500).json({
      error: `${err} something went wrong while generating the change password link please try again later `,
    });
  }
};

export default GenerateResetPasswordLink;
