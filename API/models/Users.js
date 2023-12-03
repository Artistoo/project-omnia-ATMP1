import mongoose, { Schema } from "mongoose";
import { SettingsSchema } from "./Settings.js";

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: false,
  },
  LastName: {
    type: String,
    required: true,
  },
  DisplayName: {
    type: String,
    required: false,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: false,
    default: "male",
  },
  Avatar: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: false,
  },
  admin: {
    type: Boolean,
    required: false,
    default: false,
  },
  AboutMe: {
    type: String,
    required: false,
    default: function () {
      return `I'm a new user from ${this.Location || "somewhere"}`;
    },
  },

  Settings: {
    Security: {
      EmailVerification: {
        type: Boolean,
        default: true,
      },
      QRTwoFactorAuth: {
        Secret: {
          type: String,
          default: "",
        },
      },
    },
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
  },

  Financial: {
    type: Number,
    default: 0,
    required: false,
  },

  Interests: {
    type: [String],
    required: false,
    validate: {
      validator: () => {
        if (!!this?.length) {
          return Boolean(this?.length > 5);
        }
        return true;
      },
      message: `please select at least 5 interests`,
    },
    default: [],
  },

  Age: {
    type: Number,
    required: false,
  },
  Friends: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  /* CHANNEL */
  Channels: [{ type: Schema.Types.ObjectId, ref: "channel" }],
  ChannelsLimit: {
    type: Number,
    default: 3,
  },
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
