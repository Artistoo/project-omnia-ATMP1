import express from "express";
import SearchController from "../controller/Search_controller.js";

const Router = express.Router();

Router.post('/', SearchController )




export default Router;
