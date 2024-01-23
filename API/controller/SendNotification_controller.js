import Users from '../models/Users.js'
import Channels from '../models/Channels.js'



export default function (req, res) {
  try {
    const { to, about } = req.body;





  } catch ({ message }) {
    res.status(500).json({ err: message });
  }
}




/* 

    user interpersonal notifications 
    channel based kind notifications 
    user personal kind notifications 

*/
