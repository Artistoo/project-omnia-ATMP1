import express from "express";
import UserSchema from "../models/Users.js";
import passport from "passport";
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

export default routes;
