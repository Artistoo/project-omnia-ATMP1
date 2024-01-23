import User from "../models/Users.js";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const userInDB = await User.findOne({ Email: email });
        if (userInDB) {
          const passwordMatch = await bcrypt.compare(
            password,
            userInDB.Password
          );
          if (passwordMatch) {
            done(null, userInDB);
          } else {
            done(null, false, "Incorrect email or password");
          }
        } else {
          done(null, false, "Incorrect email or password");
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});

const loginHandler = (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({
        err: `${err} occurred while trying to log in, please try again later`,
      });
    } else if (!user) {
      return res.status(404).json({ err: `Incorrect email or password` });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ err: `Error occurred while logging in` });
      } else {
        console.log({ thisIsLoginIsAuth: req.isAuthenticated() });
       
        return res.status(200).json({ user });
      }
    });
  })(req, res, next);
};

export default loginHandler;
