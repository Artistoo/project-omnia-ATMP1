import Users from "../models/Users.js";
import Channels from "../models/Channels.js";

const validateMembership = async function (user, channel_name) {
  try {
    if (!channel_name) {
      throw new Error(`please provide the channel id`);
    }
    if (!user) {
      throw new Error(`please provide a user id`);
    }

    await Users.find().populate("Channels");

    const ChannelPopulated = await Channels.findOne({
      Name: channel_name,
    })
      .populate("Members")
      .populate("Admins")
      .populate("LikedBy");
    const isOpen = ChannelPopulated.Locked;

    const isAutherizedTobeInChatRoom = [
      ...(ChannelPopulated.Admins || []),
      ...(ChannelPopulated.Memebers || []),
    ].some((id) => id?._id.equals(user));

    if (isAutherizedTobeInChatRoom) return true;
    return false;
  } catch (err) {
    console.log(err);
  }
};
export default validateMembership;
