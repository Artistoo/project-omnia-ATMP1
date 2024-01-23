import passport from "passport";
import bcrypt from "bcrypt";
import User from "../models/Users.js";
import nodeMailer from "nodemailer";
const ChangePasswordHandler = async (req, res, next) => {
  const { userEmail, userPassword } = req.body;
  const user = await User.findOne({ Email: userEmail });
  if (!user) {
    return res
      .status(401)
      .json({ error: `something went wrong , please try again later` });
  }
  const HashPassword = await bcrypt.hash(userPassword, 12);
  user.Password = HashPassword;
  user
    .save()
    .then((data) => {
      return res.status(200).json({
        success: `account password was updated successfully , try to log in to your account`,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        error: `${err} password couldn't be updated successfully , please try again later if the issue presist please contact us`,
      });
    });
};

export default ChangePasswordHandler;
