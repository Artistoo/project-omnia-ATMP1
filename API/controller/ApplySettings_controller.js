import User from "../models/Users.js";
import SettingsModel from "../models/Settings.js";
import bcrypt from "bcrypt";

const ApplySettings = async (req, res, next) => {
  try {
    /* BODY REQ OBJECT */
    const { Account, Security, Payment, Privacy } = req.body.categories;
    const UserID = req.body.UserID || req.user?._id;

    /* Fetching User Location  */
    const Location = await fetch("http://ip-api.com/json/?fields=61439");
    const locationData = await Location.json();

    /* USER MODEL  */
    const user = await User.findById(UserID);

    const Settings = user?.Settings;

    if (!user) {
      return res.status(404).send(`user not found in data base `);
    }

    if (Account) {
      if (Account?.userName) user.userName = Account?.userName;
      if (Account?.LastName) user.LastName = Account?.LastName;
      if (Account?.AboutMe) user.AboutMe = Account?.AboutMe;
      if (Account?.Avatar) user.Avatar = Account?.Avatar;
      if (Account?.Age) user.Age = Account?.Age;
      if (Account?.Interests) {
        console.log(Account?.Interests);
        user.Interests = Array.from(
          new Set([...user.Interests, ...Account.Interests])
        );
      }
    }
    if (Security) {
      if (Security.newPassword)
        user.Password = await bcrypt.hash(Security.newPassword, 12);
      if (Security.Verification)
        Settings.Security.EmailVerification = Security.Verification;
    }
    if (Privacy) {
      if (Privacy?.whoCanFindMe?.length)
        Settings.Privacy.whoCanFindMe = [...Privacy?.whoCanFindMe];
      if (Privacy?.ReciveEmailAbout)
        Settings.Privacy.ReciveEmailAbout = [...Privacy?.ReciveEmailAbout];
      if (Privacy?.HideLocation) {
        Settings.Privacy.HideLocation = Privacy?.HideLocation;
        user.Location = Privacy.HideLocation
          ? `blue planet`
          : locationData?.country;
      }
    }

    await user.save();
    res.status(200).json({ user: user, Setting: Settings });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: `something went wrong, please try again later ${err}` });
  }
  next();
};

export default ApplySettings;
