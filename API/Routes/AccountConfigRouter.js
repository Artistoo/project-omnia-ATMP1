import express from "express";
import ApplySettingsController from '../controller/ApplySettings_controller.js'
const Router = express.Router();


Router.post('/' , ApplySettingsController)
Router.get('/' , (req , res )=> res.send('configuration route'))




export default Router;
