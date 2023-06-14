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
});

const User = mongoose.model("User", UserSchema);
export default User;
