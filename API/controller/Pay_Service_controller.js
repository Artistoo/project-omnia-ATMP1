import Users from '../models/Users.js';
export default async function (req, res) {
  try {
    const { type } = req.body;
    const { _id } = req?.user || req.body;
    const { plan } = req.body;

    //Access token 
    const create_accessToken = async function (){
      return null
    }




    switch (type) {
      case 'CLNTtoWBST':
        const { approved } = req.body;
        if (approved) throw new Error(`payment was not approved`);
        const payer = await Users.findOneAndUpdate(
          { _id },
          { $set: { ChannelsLimit: ChannelsLimit + plan.offer } },
          { returnDocument: `after` }
        );
        console.log(req.body);

        res.status(200).json({
          success: `thank you for purchasing , you can create ${
            payer.ChannelsLimit - payer.Channels?.length + 'more channels now' || 'more'
          }`,
        });

      case 'Donation':
        return;
      default:
        return;
    }
  } catch ({ message: error }) {
    return res.status(500).json({ error });
  }
}
