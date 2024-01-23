import passport from "passport";
const LogoutHandler = (req, res, next) => {
  console.log("fired");
  req.logout((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        err: `${err?.message} occured while trying to log out the user`,
      });
    }

    return res.status(200).json({ success: true });
  });
};

export default LogoutHandler;
