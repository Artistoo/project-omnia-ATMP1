// SocketIo_Router
import express from "express";
import Users from "../models/Users.js";
import Channels from "../models/Channels.js";
import Messages from "../models/Messages.js";
import validateMembership from "../utils/validateMemberShip.js";

const SocketIoApis = (io) => {
  const router = express.Router();

  io.on("connection", (socket) => {
    socket.on("insight Data", async (data_type, callback) => {
      try {
        console.log(data_type);
        const data = [];
        if (data_type.some((x) => x === `channels_count`)) {
          const channelsCount = await Channels.find();
          data.push({ channels_count: channelsCount?.length });
        }
        if (data_type.some((x) => x === `users_count`)) {
          const UsersCount = await Users.find();
          data.push({ user_count: UsersCount?.length });
        }
        if (data_type.some((x) => x === `Raised`)) {
          const RaisedField = await Channels.find();
          const RaisedCalc = RaisedField.reduce((prev, raised) => {
            raised.Raised + prev;
            return prev;
          }, 0);
          data.push({ raised: RaisedCalc });
        }
        if (data_type.some((x) => x.get_current_channel_insight)) {
          console.log(data_type);
          const channel_id =
            data_type[data_type.findIndex((x) => x.get_current_channel_insight)]
              ?.get_current_channel_insight?.id ?? false;
          if (!channel_id)
            return callback({ error: `channel id is not defined` });
          const current_channel = await Channels.findById(channel_id)
            ?.populate("Admins")
            .populate("Members");
          if (!current_channel)
            return callback("no channel with this id was found");
          callback(current_channel);
        }
        callback({ success: true, data });
      } catch (err) {
        console.error("Error processing data:", err.message);
        callback({ success: false, error: err.message });
      }
    });

    socket.on("validate", async (message_data, callback) => {
      try {
        console.log(message_data);
        const { channel_name = undefined } = message_data;

        if (!channel_name) {
          throw new Error(`please provide the channel id`);
        }
        const user_id = socket.request.body?.user || message_data.user_id;

        await Users.find().populate("Channels");

        const feilds = ["userName", "LastName", "gender", "Avatar", "_id"];
        const ChannelPopulated = await Channels.findOne({
          Name: channel_name,
        })
          .populate("Members", feilds)
          .populate("Admins", feilds)
          .populate("LikedBy", feilds);

        const isOpen = ChannelPopulated.Locked;
        console.log(ChannelPopulated);
        if (validateMembership(user_id, channel_name)) {
          return callback({ autherized: true, isOpen, ChannelPopulated });
        }
        return callback({ unautherized: `user is not autherized`, isOpen });
      } catch (err) {
        callback({ error: err?.message });
      }
    });
    socket.on("send_message", async (message_data, callback) => {
      try {
        if (!message_data?.sender)
          throw new Error(`please provide the sender id`);
        const sender_info = await Users.findById(message_data?.sender).select(
          "userName LastName gender Avatar _id"
        );
        const { sender, ...message_body } = message_data;
        const date = new Intl.DateTimeFormat("default", {
          hour: "numeric",
          minute: "numeric",
        }).format(new Date());
        const response = { ...message_body, sender_info, date };

        socket.broadcast.emit("receive_message", response);
      } catch (err) {
        callback({ error: err.message });
      }
    });
  });

  return router;
};

export default SocketIoApis;
/* await Users.find().populate("Channels");
        const channel_target = await Channels.findOne({
          Name: message_data.channel_name,
        }).populate("Messages");

        if (!channel_target) throw new Error(`missing data`);
        if (Object.keys(message_data).length < 3)
          throw new Error(`channel not found`);

        const Message = {
          sender: message_data?.sender,
          message: message_data?.message,
          Type: message_data?.Type,
        };
        const newMessage = new Messages(Message);

        channel_target.Messages.push(newMessage);

        channel_target.markModified("Messages");

        await channel_target.save();

        callback({ conversion: channel_target.Messages }); */
