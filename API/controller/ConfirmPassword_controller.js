import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/Users.js';

const Router = express.Router();

const confirmPassword = async (req, res, next) => {
  try {
    //REQ BODY DATA
    const { userEmail, userPassword } = req.body;
    console.log(userEmail, userPassword);
    //USER
    const userInDb = await User.findOne({ Email: userEmail });

    //ERROR HANDLING
    if (!userInDb) throw new Error(`user wasn't found`);
    if (Object.values(req.body).length < 2) throw new Error(`missing data`);

    //PASSWORD COMPARE
    bcrypt.compare(userPassword, userInDb?.Password, (error, result) => {
      if (error) throw new Error(`an error occured while comparing`);
      
      //if (!result) throw new Error(`incorrect password`);

      return res.status(200).json('password has been confirmed successfully');
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default confirmPassword;
