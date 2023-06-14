import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Users from "../models/Users.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

passport.use(
  "local_strategy",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, email, password, done) => {
      const {
        username,
        lastname,
        email: bodyEmail,
        password: bodyPassword,
        gender,
        Location,
      } = req.body;

      const userInDB = await Users.findOne({ email: bodyEmail });
      if (userInDB) {
        return done(null, false, { message: `email is already registered` });
      }

      const hashedPassword = await bcrypt.hash(bodyPassword, 12);
      const newUser = new Users({
        Email: bodyEmail,
        password: hashedPassword,
        userName: username,
        LastName: lastname,
        gender,
        Location,
      });
      newUser
        .save()
        .then((succ) => res.status(200).send(`user registerd successfully`))
        .catch((err) => res.status(500).send(`error occured`));
    }
  )
);

export const signUpUtils = (req, res, next) => {
  passport.authenticate("local_strategy", (err, user, info) => {
    if (err) {
      return res.status(500).send("An error occurred during registration");
    }
    if (!user) {
      return res.status(400).send(info.message);
    }
    res.status(200).send("Registration successful");
  })(req, res, next);
};
