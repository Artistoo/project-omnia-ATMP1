import User from "../models/Users.js";

const UserState = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const currentUser = req.user;
    res.status(200).json({ user: currentUser });
    console.log(req.user);
  } else {
    res.status(401).json({ error: "Not authenticated" });
    console.log(`no user found`);
  }
};

export default UserState;
