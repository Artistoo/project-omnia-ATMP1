import Users from "../models/Users.js";
import Channels from "../models/Channels.js";
export default async function (req, res, next) {
  try {
    const { search_param, channel_id } = req.params;
    if (!search_param || !channel_id)
      return res.status(500).json({
        data_incomplete: `please make sure all the data is provided before trying again `,
      });
    await Users.find().populate("Channels");
    const RegExpParam = new RegExp(search_param, `gi`);
    const target_channel = await Channels.findById(channel_id);
    if (!target_channel)
      return res.status(404).json({
        not_found: `channel id couldn't match any channel on the data base `,
      });
    await Channels.find().populate("Members");
    if (!Boolean(target_channel.Members?.length))
      return res
        .status(204)
        .json({ no_members: `this channel don't have any memebers yet` });

    const Memeber_found = target_channel.map((channel) => {
      return channel.Memebers.filter(
        (member) =>
          RegExpParam.test(member.LastName) || RegExpParam.test(member.userName)
      );
    });
    return res.status(200).json({ result: Memeber_found });
  } catch (err) {
    res.status(500).json({
      err: `an error occured while searching for memebers ${err.message}`,
    });
  }
}
