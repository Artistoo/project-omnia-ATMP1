import express from "express";
import EmailMeController from "../controller/EmailMe_controller.js";
import VerifyAccount from "../controller/VerifyAccount_controller.js";

const Router = express.Router();

/* <------------- CONTACT ME ------------> */
Router.post("", EmailMeController);
Router.get("/", (req, res) => res.send(`Email me Route`));


/* <------------- VERIFY MY ACCOUNT ------------> */
Router.post(`/verify`, VerifyAccount);
Router.get("/verify", (req, res) => res.send(`verify my account route`));


export default Router;
