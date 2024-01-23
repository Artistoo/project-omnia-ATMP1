import express from "express";
import SendNotificationController from "../controller/SendNotification_controller.js";
const Router = express.Router();

Router.get("/sendNotification", SendNotificationController);

export default Router;



