import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import MongoSession from "connect-mongodb-session";
import { Server } from "socket.io";

//_______________RaOUTES _______________________
import UserSchema from "./models/Users.js";
import AuthRoute from "./Routes/AuthenticationRouter.js";
import AuthZRoute from "./Routes/AuthorizationRouter.js";
import Contact from "./Routes/EmailRouter.js";
import AccountConfig from "./Routes/AccountConfigRouter.js";
import Users from "./Routes/UsersRouter.js";
import SearchRouter from "./Routes/SearchRouter.js";
import PaymentRouter from "./Routes/PaymentRoute.js";
import ChannelsRoute from "./Routes/ChannelsRoute.js";
const app = express();
const port = process.env.PORT || 5500;

//____________INITIALIZATION_____________
const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);
//__________SOCKET IO CONNECTION ________
const io = new Server(server);

io.on("connection", () => {
  console.log(`hello world`);
  io.emit("from the server side ");
});

const { json } = express;
dotenv.config();

const MongoStore = MongoSession(session);

const store = MongoStore({
  uri: process.env.DB,
  collection: "sessions",
  expires: 1000 * 60 * 60 * 24 * 7,
  connection: mongoose.connection,
});

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
    cookie: { secure: false },
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", AuthRoute);
app.use("/authZ", AuthZRoute);
app.use("/email", Contact);
app.use("/users", Users);
app.use("/channels", ChannelsRoute);
app.use("/accountConfig", AccountConfig);
app.use("/search", SearchRouter);
app.use("/payment", PaymentRouter);

//____________ ROUTES _______________
app.get("/", (req, res) => res.send("main route"));

//____________ TEST _______________
app.get("/myusers", async (req, res, next) => {});
app.get("/showUser", (req, res, next) => {
  res.send(req.user ? `user` : `no user`);
});
