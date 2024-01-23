import Users from '../models/Users.js';
import ChannelsModel from '../models/Channels.js';

export default async function (req, res) {
  try {
    const { Admin: Admin_id } = req.body;

    //TODO : remove the user of the body obj when the session cookies issue is solved
    const admin_id = req?.user?._id || Admin_id;
    const newChannel = new ChannelsModel({ ...req.body });
    const channel_admin = await Users.findById(admin_id);

    //HANDLING ERRORS
    if (!channel_admin) throw new Error(`no user with this id was found`);
    if (Object.keys(req.body).length < 10) throw new Error(`missing data`);

    //POPULATE
    const fields = ['_id', 'Name', 'Type', 'Date', 'Categories', 'Describtion', 'Claimable'];
    await channel_admin.populate(`Channels`, fields);

    //DESTRUCTING DATA
    const { ChannelsLimit, Channels } = channel_admin;
    const { length: unclaimable_channels } = Channels.filter((channel) => !channel.Claimable?.is_claimable);


    //VALIDATING REQUIEST
    if (unclaimable_channels >= ChannelsLimit)
      return res.status(500).json({
        invalid: `you have already created your ${channel_admin.ChannelsLimit} channels , to continue please delete some channels or purchage more`,
        channels: Channels,
      });

    //SAVING THE CHANNEL AND PUSHING IT TO THE USERS CHANNELS ARRAYF
    const created_channel = await newChannel.save();
    Channels.push(created_channel._id);
    channel_admin.save();

    //RESPONSE
    const { Type, Name, _id } = req.body;
    const ResponseBody = {
      success: `channel was created successfully`,
      created_channel: { Type, Name, _id },
    };

    return res.status(200).json(ResponseBody);
  } catch ({ message: error }) {
    console.error({ error });
    res.status(500).json({ error });
  }
}
