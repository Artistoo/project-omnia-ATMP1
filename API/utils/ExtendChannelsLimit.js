//MODELS
import Users from '../models/Users.js';
import Channels from '../models/Channels.js';

//UTILITY FUNCTION
export default async function (NumbersOfChannelsToAdd, _id) {
  try {
    //# ERR
    if (!NumbersOfChannelsToAdd || !_id) throw new Error(`missing args`);

    //USER
    const user = await Users.findById(_id).select(`_id nickName LastName Email ChannelsLimit`);

    //# ERR
    if (!user) throw new Error(`the id didn't match any user`);

    //ADDING
    let { ChannelsLimit } = user;
    ChannelsLimit += NumbersOfChannelsToAdd;
    user.ChannelsLimit = ChannelsLimit;
    await user.save();

    return user;
  } catch ({ message }) {
    throw new Error(message);
  }
}
