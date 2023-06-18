import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Users from "../models/Users.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
passport.use(
  "local_strategy",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const {
          username: userName,
          lastname: LastName,
          email: Email,
          gender,
          Location,
          Avatar,
        } = req.body;
        const data = { userName, LastName, Email, gender, Location, Avatar };

        Users.findOne({ Email })
          .then((user) => {
            if (user) {
              return done(null, false, {
                message: "User is already registered, try logging in instead",
              });
            }
            const newUser = new Users({
              ...data,
              Password: hashedPassword,
            });
            newUser
              .save()
              .then((success) => done(null, newUser))
              .catch((err) =>
                done(err, false, {
                  message:
                    "An error occurred while saving the user, please try again later",
                })
              );
          })
          .catch((err) => {
            done(err, false, {
              message: `Error occurred while registering user, please try again later: ${err}`,
            });
          });
      } catch (error) {
        done(error);
      }
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
    return res.status(200).send("Registration successful");
  })(req, res, next);
};
