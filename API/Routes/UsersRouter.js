import express from "express";
import GetUserProfileInfo from '../controller/GetUserProfileInfo_controller.js'


const Router = express.Router();

Router.get("/profile/:userID", GetUserProfileInfo);
export default Router;
