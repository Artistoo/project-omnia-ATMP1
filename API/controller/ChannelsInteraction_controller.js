import User from "../models/Users.js";
import Channels from "../models/Channels.js";

export default async function (req, res) {
  console.log(req.body);
  try {
    const { action, channel_id, user_id } = req.body;
    if (!action || !channel_id || !user_id)
      return res.status(401).json({
        missing_data: `please make sure all data is set before trying again `,
      });
    await User.find().populate("Channels");
    const user = await User.findById(user_id);
    const targetChannel = await Channels.findById(channel_id);
    console.log(targetChannel.LikedBy?.some((x) => x?.equals(user_id)));
    switch (action) {
      case "like":
        if (
          targetChannel.LikedBy?.length &&
          targetChannel.LikedBy?.some((x) => x?.equals(user_id))
        ) {
          const index = targetChannel.LikedBy.findIndex((x) =>
            x.equals(user_id)
          );
          if (Array.isArray(targetChannel.LikedBy) && index >= 0) {
            targetChannel.LikedBy.splice(index, 1, null);
            targetChannel.LikedBy = targetChannel.LikedBy.filter(Boolean);
            targetChannel.save();

            return res.status(200).json({
              success_delete: `you no more like ${targetChannel?.Name}`,
            });
          }
        } else {
          targetChannel.LikedBy.push(user._id);
          targetChannel.save();

          return res
            .status(200)
            .json({ success_added: `you now like ${targetChannel?.Name}` });
        }
    }
    console.log(targetChannel);
  } catch (err) {
    res.status(500).json({ err: "an error occured " + err.message });
  }
}
