import Channels from "../models/Channels.js";
import Users from "../models/Users.js";

export default async function (req, res) {
  try {
    //userID
    const userID = req?.user?.id || req.body.userID;
    const user = await Users.findById(req?.user?._id || userID);

    if (!user)
      return res
        .status(401)
        .json({ unautherized: `you need to be logged to preform this action` });

    await Users.find().populate("Channels");
    const Response = async () => {
      const feilds = ["userName", "LastName", "Avatar", "_id", "gender"];
      const unfilterdChannels = await Channels.find()
        .populate("Members", feilds)
        .populate("Admins", feilds)
        .populate("Admin", feilds);
      console.log(req.body?.filters);
      //name param search_param

      let FilterdChannels = [];
      if (req.body?.filters) {
        unfilterdChannels.map((channel) => {
          const { Name, Categories, Describtion, Admin } = channel;
          const { userName, LastName } = Admin;
          const RegExpSearchParam = new RegExp(
            req.body?.filters.search_filter,
            "gi"
          );

          const fieldsToSearch =
            Boolean(req.body?.filter_thro) &&
            Array.isArray(req.body?.filter_thro)
              ? req.body.filter_thro.map((x) => channel[x.title])
              : [
                  Name,
                  Describtion,
                  userName,
                  LastName,
                  ...(Categories || []),
                ].flat();

          console.log({ filter: fieldsToSearch });

          if (fieldsToSearch.some((l) => RegExpSearchParam.test(l))) {
            console.log({ channel });
            FilterdChannels.push(channel);
          }
        });
      }

      /* CREATING THE RESULT RESPOND */
      let Results;
      if (!req.body?.filters) {
        Results = [
          ...Array.from(
            new Set(
              [...unfilterdChannels, ...FilterdChannels].map((x) =>
                JSON.stringify(x)
              )
            )
          ).map((x) => JSON.parse(x)),
        ];
      } else {
        Results = [...FilterdChannels];
      }
      if (!Array.isArray(Results))
        return res.status(500).json({ error: "something wrong happen" });

      return Results;
    };

    const ChannelRespond = await Response();
    return res.status(200).json(JSON.stringify(ChannelRespond, null, 1));
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: `error occuring during fetching : ${err.message} , please try again later `,
    });
  }
}
