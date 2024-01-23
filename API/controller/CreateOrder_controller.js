//MODEL
import Users from '../models/Users.js';
import Channels from '../models/Channels.js';
import JSONBig from 'json-bigint';

//LIB
import { Client, Environment } from 'square';
import { randomUUID } from 'crypto';
import ExtendChannelsLimit from '../utils/ExtendChannelsLimit.js';

const Payment = async function (req, res) {
  try {
    //DEST
    const { locationID } = req;
    const { plan, type, sourceId, payer_id } = req.body;

    const { price, offer } = plan;

    //ENV VARIABLES
    const {
      //ENV
      NODE_ENV,

      //SQUARE
      SQUARE_APPLICATION_ID_SANDBOX,
      SQUARE_ACCESS_TOKEN_SANDBOX,

      SQUARE_APPLICATION_ID_PRODCUTIN,
      SQUARE_ACCESS_TOKEN_PRODUCTION,
    } = process.env;

    //TO JSON PROTOTYPE
    BigInt.prototype.toJSON = function () {
      return this.toString();
    };

    //VAR
    const credentials = {
      dev: { accessToken: SQUARE_ACCESS_TOKEN_SANDBOX, environment: 'sandbox' },
      production: { accessToken: SQUARE_ACCESS_TOKEN_PRODUCTION, environment: 'prodction' },
    }[NODE_ENV];
    const { paymentsApi } = new Client(credentials);

    //REQ PARAMS
    const [idempotencyKey, amountMoney] = [randomUUID(), { currency: `USD`, amount: price }];
    const paymentInfo = { sourceId, idempotencyKey, amountMoney };

    //FULLFILL
    const Fullfill = {
      ExtendChannelsLimit: await ExtendChannelsLimit(offer, payer_id),
    }[type];

    //CAPTURING PAYMENT
    const { result } = await paymentsApi.createPayment(paymentInfo);
    const result_json = JSON.stringify(result, 1, null);
    console.log({ result_json, Fullfill });

    /* ER */
    if (!Boolean(result)) throw new Error(`could not create a payment`);

    return res.status(200).json({ locationID, Fullfill });
  } catch ({ message: error }) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

// Exporting Payment Controller
export default Payment;
