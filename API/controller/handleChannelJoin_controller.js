import Users from "../models/Users.js";
import Channels from "../models/Channels.js";
export default async function (req, res) {
  try {
    console.log(req.body);

    const { channel_name } = req.body;
    /* TODO : remove the req body user id when you fix the cookie issue */
    const user_id = req?.user?._id || req.body.user_id;
    if (Object.keys(req.body).length < 1)
      return res.status(400).json({ data_requiered: `some data is missing` });
    await Users.find().populate("Channels");
    const target_channel = await Channels.findOne({ Name: channel_name })
      .populate("Members")
      .populate("Admins");
    if (!target_channel)
      return res.status(404).json({
        channel_not_found: `no channel with this name was added , we are facing some technical issue at the moment`,
      });
    const is_allowed =
      target_channel.Admins.some((user) => user?._id.equals(user_id)) ||
      target_channel.Members.some((user) => user?._id.equals(user_id));
    const is_open = !target_channel?.Locked;
    console.log(is_open);
    if (is_open || is_allowed) {
      return res.status(200).json({
        path: `channel_chat_room/${channel_name}`,
        channel_data: target_channel,
      });
    }
    return res
      .status(401)
      .json({ unautherized: `you are not yet a memeber in this channel ` });
  } catch (err) {
    return res.status(500).json({
      error: `an error occured _${err.message}_ please try again later`,
    });
  }
}
