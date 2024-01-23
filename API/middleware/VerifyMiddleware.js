import users_model from '../models/Users.js';
import channel_model from '../models/Channels.js';
import { compare, hash } from 'bcrypt';

async function verifyMiddleware(req, res, next) {
  try {
    //#ERR
    if (!('verify' in req.body) || req.body?.verify.status) return next();

    if (!req.body.verify?.method) throw new Error(`please select the method`);
    if (!req.body?.user_id) throw new Error(`please provide the user id, verification failed²`);

    //VAR
    const user_id = req?.user?._id || req.body.user_id;
    const user = await users_model.findById(user_id);

    //LOG
    console.log(req.body);

    //#ERR
    if (!user) throw new Error(`no user with this id found`);

    const verification_method = {
      password: () => {
        //#ERR
        if (!req.body?.verify.Password) throw new Error(`provide password in order to verify , verificaiton failed`);
        //DEST
        const { Password: plain_password } = req.body.verify;
        const { Password: user_password } = user;

        //HANDLERS
        const handlePasswordVerificationProcess = function (error, result) {
          if (error) return res.status(400).json({ verified: false, message: `something went wrong while verifying , verification failed` });
          if (!result) return res.status(403).json({ verified: false, message: `you entered the wrong password , verification failed` });
          return res.status(200).json({ verified: true, message: `success` });
        };

        //COMPARE
        compare(plain_password, user_password, handlePasswordVerificationProcess);
      },
    };
    verification_method[req.body.verify.method]();
  } catch ({ message: error }) {
    console.log({ error });
    return res.status(500).json({ error });
  }
}

export default verifyMiddleware;
