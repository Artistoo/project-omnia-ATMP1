import mongoose, { Schema } from "mongoose";
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
    default: `im a new user from ${this?.Location}`,
  },
  settings: {
    type: Schema.Types.ObjectId,
    ref: "Setting", // This should match the model name defined for SettingsModel
  },
  Financial: {
    type: Number,
    default: 0,
    required: false,
  },
  Friends: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  Channels: [{ type: Schema.Types.ObjectId, ref: "channel" }],
  ChannelsLimit: {
    type: Number,
    defualt: 3,
  },
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
