import { Schema, model } from "mongoose";

const MessagesSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: new Date(),
  },
  Type: {
    type: String,
    enum: ["Private", "Public"],
    required: true,
  },
  To: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: function () {
      return Boolean(this.Type === "Private");
    },
  },
  Likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

MessagesSchema.pre("save", (next) => {
  if (this?.Date) {
    this.Date = new Date().getDate();
  }
  next();
});

MessagesSchema.pre("save", (next) => {
  if (this?.Date) {
    this.Date = new Date();
  }
  next();
});
const Messages = model("Messages", MessagesSchema);
export default Messages;
