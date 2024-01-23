import express from "express";
import ConfirmPasswordController from "../controller/ConfirmPassword_controller.js";
const Router = express.Router();

Router.post("/confirmPassword", ConfirmPasswordController);

Router.get("/confirmPassword", (req, res) =>
  res.status(200).send(`this is the get route for confirm password`)
);

export default Router;
