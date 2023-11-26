import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import MongoSession from "connect-mongodb-session";
import { Server } from "socket.io";

//_______________ROUTES _______________________
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
    credentials: true,
    origin: ["http://localhost:5173"],
  },
});
app.set("trust proxy", 1);
//_____________MiddleWares________________
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Cache-Control", "max-age=30");

  next();
});
app.use(
  session({
    secret: "MyPassword",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "Lax",
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
app.use("/notification", NotificationRoute);
app.use("/socket", SocketIo_Router(io));

//____________ TEST _______________

/* TODO: find a way to recieve the cookies and save the session when loggin in  */
app.get("/create", (req, res) => {
  try {
    req.session.name = "please SAVE";

    return res.json({ success: `the name is ${req.session?.name}` });
  } catch ({ message: error }) {
    return res.json({ error });
  }
});
app.get("/show", (req, res) => {
  const success = Boolean(req.session?.name);
  console.log(req.session);
  return res.json({
    [success ? "success" : "fail"]: `session is ${
      success ? `saved` : `failed`
    }`,
  });
});
