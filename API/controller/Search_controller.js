import users_model from '../models/Users.js';
import chans_model from '../models/Channels.js';

export default async function (req, res) {
  try {
    //DEST
    const { search_param, search_filters } = req.body;

    //MODELS
    const chans_feilds = [`Name`, `_id`, `Members`, `Categories`, `Locked` , `Cover` ];
    const users_feilds = `Channels LastName userName DisplayName gender Location`;

    const users_chans = await users_model.find().select(users_feilds).populate('Channels', chans_feilds).lean();
    let { chans, users } = (() => {
      let chans,
        users = [];
      users_chans.forEach(({ Channels, ...Users }) => {
        chans = Channels;
        users.push(Users);
      });
      return { chans, users };
    })();

    //APPLYING FILTERS
    const handleParamResultFor = (schema) => schema.filter((model) => Object.values(model).some((model_value) => String(model_value).includes(search_param)));

    chans = handleParamResultFor(chans);
    users = handleParamResultFor(users);


    if (!Boolean(Object.values(search_filters || []).length)) return res.status(200).json({ chans, users });

    const { search_category, selected, filter_type } = search_filters;
    //<------DIAGRAM------>
    //req.body = {search_category : users | chans , selected : {id : Locations , options : [] , type : selected},}

    //#ERR
    if (!Array.isArray(eval(search_category))) throw new Error(search_category + `is not an array`);

    //HANLDERS
    const handleFiltersApplication = {
      select: (model) => model[selected.id] && selected.options.filter((opt) => model[selected.id].includes(opt)),
      range: (model) =>
        model[selected.id] &&
        ((model) =>
          Array.from(selected.options[1])
            .fill(0)
            .map((_, index) => model > selected.options[0]))(Array.isArray(model[selected.id]) ? model[selected.id].length : model[selected.id]),
    }[selected.type];
    const updated_value = eval(search_category)?.filter((model) => handleFiltersApplication(model));

    //UPDATING MODELS DYNAMICALLY
    eval(`${search_category} = ${updated_value}`);
  } catch ({ message: error }) {
    console.log({ error });
    return res.status(500).json({ error });
  }
}
