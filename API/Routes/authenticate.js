import express from "express";
import UserSchema from "../models/Users.js";
import passport from "passport";
import nodemailer from "nodemailer";
import { logInUtil } from "../utils/loginUtil.js";
import { signUpUtils } from "../utils/signUpUtil.js";

/* import { signUpUtil } from "../utils/signUpUtil.js"; */
import mongoose from "mongoose";
const routes = express.Router();
routes.post("/login", logInUtil);
routes.post("/signup", signUpUtils);
routes.post("/logout" /* logoutUtil */);
routes.post("/delete" /* deleteUtil */);

/* <----- GET -----> */

routes.get("/login", (req, res) => res.send(`log in to your account`));
routes.get("/signup", (req, res) => res.send(`register a new user account `));
routes.get("/logout" /* logoutUtil */);
routes.get("/delete" /* deleteUtil */);

routes.post(`/verify`, (req, res) => {
  const { email } = req.body;

  const currentVerificationCode = Math.floor(
    (Math.random() * 99999999) % 999999
  );

  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.OFFICIALEMAIL,
      pass: process.env.PASSWORD,
    },
  });
  console.log(email);
  const mailOptions = {
    from: "official_Jolly@outlook.com",
    to: email,
    subject: "email confirmation",
    text: `Welcome aboard! Please use this code to verify your account: ${currentVerificationCode}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
      return;
    }

    res.status(200).json({
      verificationCode: currentVerificationCode,
      sentto: email,
    });
  });
});

export default routes;
