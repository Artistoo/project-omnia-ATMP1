import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
    unique: false,
  },
  LastName: {
    type: String,
    require: true,
  },
  DisplayName: {
    type: String,
    require: false,
  },
  Email: {
    type: String,
    require: true,
  },
  Password: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: false,
    default: "male",
  },
  Avatar: {
    type: String,
    require: true,
  },
  Location: {
    type: String,
    require: false,
  },
  Verify: {
    type: Boolean,
    require: false,
    default: false,
  },
  admin: {
    type: Boolean,
    require: false,
    default: false,
  },
  settings: {
    type: mongoose.Types.ObjectId,
    ref: "Settings",
  },
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
