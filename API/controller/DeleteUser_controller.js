import User from "../models/Users.js";

const DeleteUserController = async (req, res, next) => {
  try {
    const { userEmail } = req.body;

    if (req?.user || userEmail) {
      await User.findOneAndDelete({ Email: req?.user || userEmail });
      res.status(200).json({ data: `user deleted successfully` });
    } else {
      res.status(404).json({ error: `no user was found in the data base` });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: `${err?.message} occured please try again later ` });
  }
};

export default DeleteUserController;
