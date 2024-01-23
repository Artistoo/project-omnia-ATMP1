import React from 'react';
import { PaymentForm, CreditCard, ApplePay } from 'react-square-web-payments-sdk';
import { v4 } from 'uuid';

//API
import { useCreateOrderMutation } from '../../redux/API.js';
import LoadingSkeleton from './LoadingSkeleton.jsx';

export default function PaypalButton({ price, service, plan_data, handleErrorState, type, onPay = () => null }) {
  //STATES
  const [locationId, setlocationId] = React.useState('');
  const [formLoaded, setFormLoaded] = React.useState(true);

  //API
  const [create_payment, { isLoading: isMakingOrder, data }] = useCreateOrderMutation();

  //HANDLERS
  const getLocationID = React.useCallback(async function () {
    try {
      const GetLocationId = create_payment;

      //API CALL
      const { data: order_response } = await GetLocationId({});
      console.log(order_response);
      //ERROR
      if (!order_response.locationID) throw new Error(`no id`);

      //RESULT
      setlocationId(order_response.locationID);
    } catch ({ message: error }) {
      console.log({ error });
    }
  }, []);
  //EFFECT
  React.useEffect(() => {
    getLocationID();
  }, []);

  //COMPONENTS
  const PaymentFormComponent = React.memo(() => {
    //STATE
    const [paymentFormParams, setPaymentFormParams] = React.useState([
      [
        {
          placeholder: 'card number',
          data: 'card-number',
          key: React.useId(),
          pattern: /^\d{16}$/,
          maxLength: 16,
        },
      ],
      [
        {
          placeholder: 'exp-date',
          data: 'exp-date',
          key: React.useId(),
          pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
          maxLength: 5,
        },
        { placeholder: 'cvv', data: 'cvv', key: React.useId(), pattern: /^\d{3}$/, maxLength: 3 },
      ],
    ]);
    //PROP
    const credentials = {
        applicationId: {
          dev: import.meta.env.VITE_SQUARE_APPLICATION_ID_SANDBOX,
          production: import.meta.env.VITE_SQUARE_APPLICATION_ID_PRODUCTION,
        }[import.meta.env.VITE_NODE_ENV],

        locationId: locationId,
      },
      ButtonStyling = {
        //TRANSIITOn
        transitionProperty: `border , background`,
        transitionDuration: `250ms , 250ms`,
        transitionTimingFunction: `linear ,linear`,

        //COLOR
        background: 'black',
        color: 'whitesmoke',

        //FONT
        fontSize: '14px',
        fontFamily: `openSauce`,

        translate: `0% -29px`,
        padding: 0,

        height: '40px',
        width: `100%`,
        //HOVER
        '&:hover': {
          background: 'white',
          color: `black`,
          border: `solid black thin`,
        },
      };

    //HANDLERS
    const handleCardTokenizeResponseReceived = async function ({ token = '' }, buyer) {
      try {
        //PAYMENT REQUIEST
        const {
          data: { Fullfill },
        } = await create_payment({
          type,
          plan: plan_data,
          sourceId: token,
          payer_id: JSON.parse(localStorage?.user)._id,
        });

        /* ERR */
        if (!Fullfill) throw new Error(`an error occured while processing payment`);

        //TODO : send the user an email letting so can aware of his purchase
        console.log(Fullfill);

        //DISPLAY SUCCESS PAYMENT MESSAGE
        onPay({ state: true, response: Fullfill });
      } catch ({ message }) {
        handleErrorState(message);
        onPay({ state: false, response: null });
      }
    };

    const FormMemo = React.memo(() => (
      <PaymentForm
        {...credentials}
        //EVENTS
        cardTokenizeResponseReceived={handleCardTokenizeResponseReceived}
      >
        <CreditCard key={`PaymentFormInputSquare`} buttonProps={{ css: ButtonStyling }} />
      </PaymentForm>
    ));

    return {
      form: (
        <div key={`PaymentFormContainer`} className={`flex-center relative  m-auto p-[8px] pt-[29px]`}>
          <FormMemo />
        </div>
      ),

      error: (
        <div
          className={`m-[10px] flex h-max w-full flex-col items-start  rounded-md  bg-gradient-to-r from-red-400 to-red-300 p-[5px] text-start font-[openSauceReg] leading-normal text-gray-100`}
        >
          <small>
            something went wrong for now <br /> could not render payment form
          </small>
        </div>
      ),

      loading: <LoadingSkeleton count={2} wrapper={true} />,
    }[isMakingOrder || !formLoaded ? `loading` : Boolean(locationId) ? `form` : `error`];
  });

  return (
    <div
      key={`PaymentFormPageContainer`}
      className={`flex-center relative h-full w-full flex-wrap overflow-hidden rounded-[10px]`}
    >
      <PaymentFormComponent />
    </div>
  );
}
