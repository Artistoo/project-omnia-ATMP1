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
import SocketIo_Router from "./Routes/SocketIo_Router.js";
import NotificationRoute from "./Routes/NotificationRoute.js";



const app = express();
const port = process.env.PORT || 5500;

//____________INITIALIZATION_____________
const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

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

//__________SOCKET IO CONNECTION ________
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

//_____________MiddleWares________________
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    secret: "MyPassword",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "None",
    },
    store,
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
app.use('/notification' , NotificationRoute)
app.use("/socket", SocketIo_Router(io));


//____________ TEST _______________

/* TODO: find a way to recieve the cookies and save the session when loggin in  */
app.get("/showUser", (req, res, next) => {
  try{
    if(req.user){
      res.status(200).json({success : `cookies is set you are logged as ${req.session}`})
      return 
    }
    return res.status(500).json({failed : `you have failed to set the cookies in the browser`})
  }catch(err){
    console.log(err)
  }
});

app.get("/createOne", (req, res) => {
  try {
    res.cookie("isAuth", "true", {
      sameSite: "None",
      secure: true,
    });

    // You might want to redirect or send a response here if needed.
    res.status(200).json({ success: `Cookie set successfully` });
  } catch (err) {
    res.status(500).json({ err: `An error occurred ${err.message}` });
  }
});
