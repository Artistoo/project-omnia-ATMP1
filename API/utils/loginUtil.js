import passport from "passport";
import mongoose from "mongoose";
import { Strategy } from "passport";
import { Strategy as localStrategy } from "passport-local";
import User from "../models/Users.js";

export const logInUtil = function (req, res, next) {
 res.send('register a new user account')
};
