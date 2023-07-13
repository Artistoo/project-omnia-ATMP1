import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";

import UserSchema from "./models/Users.js";
import AuthRoute from "./Routes/AuthenticationRouter.js";
import AuthZRoute from "./Routes/AuthorizationRouter.js";
import Contact from "./Routes/EmailRouter.js";

const app = express();
const port = process.env.PORT || 5500;
const { json } = express;
dotenv.config();

//_____________Database______________
/* mongoose.set("strictQuery", true); */

mongoose
  .connect(process.env.DB)
  .then((res) => console.log("connected"))
  .catch((error) =>
    console.log(`some error occured while connecting ${error.message}`)
  );

//_____________MiddleWares________________
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "MyPassword",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", AuthRoute);
app.use("/authZ", AuthZRoute);
app.use("/email", Contact);

app.get("/showUser", (req, res, next) => {
  res.send(req.user ? `user` : `no user`);
});
//____________INITIALIZATION_____________
app.listen(port, () => console.log(`Server running on port ${port}`));

//____________ ROUTES _______________
app.get("/", (req, res) => res.send("main route"));
