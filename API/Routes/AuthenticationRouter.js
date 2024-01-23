import express from "express";
import UserSchema from "../models/Users.js";
import passport from "passport";
import nodemailer from "nodemailer";
import LoginController from "../controller/Login_controller.js";
import RegisterController from "../controller/Register_controller.js";
import LogoutController from "../controller/Logout_controller.js";
import DeleteUserController from "../controller/DeleteUser_controller.js";
import GenerateResetPasswordLink from "../controller/GenerateResetPasswordLink_controller.js";
import ChangePasswordHandler from "../controller/ChangePassword_controller.js";
import UserStateController from "../controller/UserState_controller.js";
import TotpAuthentication_controller from "../controller/TotpAuthentication_controller.js";
import TwoFactorQrMiddleware, {
  GenerateQR,
} from "../middleware/QRAuthenticationMiddleware.js";
const routes = express.Router();

routes.post("/login", LoginController);
routes.post("/register", TwoFactorQrMiddleware, RegisterController);

routes.post("/logout", LogoutController);
routes.post("/deleteUser", DeleteUserController);

routes.post("/ResetPasswordLink", GenerateResetPasswordLink);
routes.post("/changePassword", ChangePasswordHandler);
routes.post("/userState", UserStateController);

routes.get("/totpAuthentication/:token", TotpAuthentication_controller);
routes.get("/GenerateQR/:user_name", GenerateQR);

/* <----- GET -----> */

routes.get("/login", (req, res) => res.send(`log in to your account`));
routes.get("/register", (req, res) => res.send(`register a new user account `));
routes.get("/logout", (req, res) => res.send(`logout user route`));
routes.get("/deleteUser", (req, res) => res.send(`delete logged account  `));
routes.get("/ResetPasswordLink", (req, res) =>
  res.send(`Generating Rest Password Link Route`)
);
routes.get("/changePassword", (req, res) => res.send(`Change Password Route`));

export default routes;
