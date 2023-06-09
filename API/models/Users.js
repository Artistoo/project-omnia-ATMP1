import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: false,
  },
  LastName: {
    type: String,
    require: false,
  },
  Email: {
    type: String,
    require: false,
  },
  Password: {
    type: String,
    require: false,
  },
  RepeatPassword: {
    type: String,
    require: false,
  },
  gender: {
    type: String,
    require: false,
    default: "male",
  },
  Avatar: {
    type: String,
    require: false,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
