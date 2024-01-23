import User from "../models/Users.js";

const HandleGetUserProfielinfo = async (req, res, next) => {
  try {
    console.log("Requested userID:", req.params.userID);

    const userProfile = await User.findById(req.params.userID);

    if (userProfile) {
      return res.status(200).json({ user: userProfile });
    }
    console.log("No user found");
    res.status(501).json({ error: `couldn't find any user with this id ` });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err });
  }
};

export default HandleGetUserProfielinfo;
