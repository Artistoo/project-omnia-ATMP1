import channels_model from '../models/Channels.js';
import users_model from '../models/Users.js';

import schedule from 'node-schedule';

export default async function (req, res, next) {
  try {
    //DES
    const { user_id, Name, claimed_by } = req.body;

    //LOGS
    console.log(req.body);

    //API
    const target_user = await users_model.findById(user_id);
    const target_chan = await channels_model.findOne({ Name });

    //#ERR
    if (!target_chan || !target_user) return res.status(500).json({ deleted: false, message: `something went wrong , please try again later` });
    if (!target_chan?.Admin.equals(user_id)) return res.status(500).json({ deleted: false, message: `you need to be an admit` });

    //TIME
    const delete_at = new Date();
    const currentTime = new Date();
    delete_at.setHours(delete_at.getHours() + 24);
    const left = delete_at - currentTime;

    //HANDLERS

    //UPDATING CLAIM STATE PROPERTY
    const handleClaimState = async function (claimable) {
      target_chan.Claimable.is_claimable = claimable;
      target_chan.Claimable.until = delete_at;

      if (!claimable) target_chan.Admin = claimed_by;
      await target_chan.save();
    };
    await handleClaimState(true);

    const handleDelete = async () => {
      await target_chan.deleteOne();
    };

    //PROCESS
    let job_scheduled = schedule.scheduledJobs[`${Name}_delete`];

    if (job_scheduled && !claimed_by) return res.status(200).json({ deleted: false, scheduled: `channel delete is already scheduled , ${left} left` });

    const job = schedule.scheduleJob(delete_at, async () => await handleDelete());
    if (claimed_by) {
      schedule.cancelJob(job);
      await handleClaimState(false);
    }

    //RESPONSE
    return res.status(200).json({ deleted: true, message: `channel will be deleted in 24h`, timer: delete_at });
  } catch (error) {
    console.log(error);
  }
}
