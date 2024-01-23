import mongoose from "mongoose";
import bcrypt from "bcrypt";
import otp from "otplib";
import qrCode from "qrcode";

//MODELS
import User from "../models/Users.js";

const RegisterNewUserHandler = async (req, res) => {
  const {
    username,
    lastname,
    email,
    password,
    Avatar,
    gender,
    Location,
    displayName,
  } = req.body.QRtoken ? req.body.data : req.body;

  /* FORMATING THE DATA TO MATCH THE MONGOOSE SCHEMA */
  const userData = {
    userName: username,
    LastName: lastname,
    Email: email,
    gender: gender,
    Avatar,
    Location,
    DisplayName: displayName,
  };

  /* HASHING THE PASSWORD BEFORE SAVING IT TO THE DATABASE */

  try {
    console.log(Object.values(userData).slice(0, 6));
    if (!Object.values(userData).slice(0, 6).some(Boolean))
      throw new Error(
        `something went wrong while saving the form data , please try again later`
      );

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      ...userData,
      Password: hashPassword,
    });
    if (req.secret) {
      newUser.Settings.Security.QRTwoFactorAuth.Secret = req.secret;
    }

    User.findOne({ Email: userData.Email })
      .then((user) => {
        if (user) {
          return res.status(500).json({
            error: `User is already registered, try to log in instead`,
          });
        }

        newUser
          .save()
          .then((savedUser) => {
            console.log(req?.user);
            res.status(200).json({ user : savedUser});
          })
          .catch((err) => {
            throw new Error(`failed saving the user to the database`);
          });
      })
      .catch((err) => {
        throw new Error(`couldn't save user`);
      });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export default RegisterNewUserHandler;
