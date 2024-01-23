import mongoose from "mongoose";

export const SettingsSchema = new mongoose.Schema({
  Security: {
    EmailVerification: {
      type: Boolean,
      default: true,
    },
    QRTwoFactorAuth: {
      Activated: { type: Boolean, default: true },
      Secret: { type: String, default: "" },
    },
  },
  /* Payment: {}, */
  Privacy: {
    whoCanFindMe: {
      type: String,
      enum: ["my friends", "my friends friends", "no one", "everyone"],
    },
    ReciveEmailAbout: {
      type: String,
      enum: [
        "update and new features",
        "when someone join my channel",
        "security alerts",
      ],
    },
    HideLocation: {
      type: Boolean,
    },
  },

  Apperance: {
    ColorOfPattern: {
      type: String,
      enum: [
        "red",
        "green",
        "blue",
        "yellow",
        "white",
        "gray",
        "purple",
        "violet",
        "skyblue",
      ],
    },
    Pattern: {
      type: String,
    },
  },
});

const SettingsModel = mongoose.model("setting", SettingsSchema);
export default SettingsModel;
