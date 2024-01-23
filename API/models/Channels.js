import mongoose, { Schema } from 'mongoose';
const Channel = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    unique: true,
  },
  Admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  Admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  ],
  Categories: [
    {
      type: String,
      required: true,
    },
  ],
  Languages: [
    {
      type: String,
      minlength: 1,
      required: true,
    },
  ],
  Type: {
    type: String,
    enum: ['Community', 'Tribe'],
    required: true,
    unique: false,
  },
  Describtion: {
    type: String,
    required: true,
    unique: false,
  },
  Cover: {
    type: String,
    required: true,
    unique: false,
  },
  Locked: {
    type: Boolean,
    required: true,
    unique: false,
  },
  Goal: {
    type: Number,
  },
  Visibility: {
    type: Boolean,
    required: true,
  },
  Members: {
    type: Array,
    required: false,
    unique: false,
  },
  LikedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  ],
  Raised: {
    type: Number,
    required: false,
    unique: false,
    default: 0,
  },
  Claimable: {
    is_claimable: { type: Boolean, default: false },
    until: { type: Date },
  },
  Messages: [{ type: mongoose.Types.ObjectId, ref: 'Messages' }],
  Date: {
    type: Date,
    default: new Date(),
  },
});

Channel.pre('save', (next) => {
  if (this?.Date) {
    this.Date = new Date();
  }
  next();
});

const Channels = mongoose.model('channel', Channel);
export default Channels;

/* import mongoose, { Schema } from "mongoose";
const Channel = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    unique: true,
  },

  Admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  Members: {
    type: Array,
    required: false,
    unique: false,
  },
  LikedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  Categories: [
    {
      type: String,
      required: true,
    },
  ],
  Type: {
    type: String,
    enum: ["Community", "Tribe"],
    required: true,
    unique: false,
  },
  Describtion: {
    type: String,
    required: true,
    unique: false,
  },
  Raised: {
    type: Number,
    required: false,
    unique: false,
    default: 0,
  },
  Cover: {
    type: String,
    required: true,
    unique: false,
  },
  Locked: {
    type: Boolean,
    required: true,
    unique: false,
  },
  Revenue: {
    type: String,
  },
  Logo: {
    type: String,
    require: false,
  },
  
  Messages: [{ type: mongoose.Types.ObjectId, ref: "Messages" }],
  Date: {
    type: Date,
    default: new Date(),
  },
});

Channel.pre("save", (next) => {
  if (this?.Date) {
    this.Date = new Date();
  }
  next();
});

const Channels = mongoose.model("channel", Channel);
export default Channels;
 */
