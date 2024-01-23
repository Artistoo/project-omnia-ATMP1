import { Client, Environment } from 'square';
export default async function (req, res, next) {
  try {
    // DEST
    const { Production, Sandbox: dev } = Environment;
    const { NODE_ENV, SQUARE_ACCESS_TOKEN_SANDBOX: accessToken } = process.env;
    const { plan, type, sourceId } = req.body;


    // VAR
    const environment = { dev, Production }[NODE_ENV];
    const squareClient = new Client({ environment, accessToken });

    const { result } = await squareClient.locationsApi.listLocations();

    //ERROR HANDLING
    if (!result?.locations || !!!result.locations.length) throw new Error('No locations found.');

    // DATA
    const locationIdResult = result.locations[0].id;
    req.locationID = locationIdResult;

    // PASSING DATA CONDITIONALY
    if (!plan || !type || !sourceId) return res.status(200).json({ locationID: locationIdResult });

    next();
  } catch ({ message: error }) {
    return res.status(500).json({ error });
  }
}
