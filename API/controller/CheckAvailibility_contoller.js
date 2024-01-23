import User from '../models/Users.js';
import Channel from '../models/Channels.js';

export default async function (req, res, next) {
  const { name } = req.params;

  if (!name) return;

  console.log({name});
  const name_available = await Channel.findOne({ Name: req.params.name });

  if (!name_available) {
    return res.status(200).json({ available: true });
  }
  return res.status(200).json({ available: false });
}
