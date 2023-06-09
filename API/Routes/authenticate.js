import express from "express";
import UserSchema from "../models/Users.js";
import mongoose from "mongoose";
const Routes = express.Router();

Routes.get("/", (req, res) => {
  res.send("authentication route");
});

Routes.post("/", (req, res) => {
  if (Object.keys(req.body).length > 0) {
    const addUser = new UserSchema({
      ...req.body,
    });
    addUser
      .save()
      .then(() => res.status(200).send("User added successfully"))
      .catch((err) => res.status(500).send(`Failed: ${err}`));
  } else {
    res.status(400).send("Request body is empty");
  }
});
export default Routes;
