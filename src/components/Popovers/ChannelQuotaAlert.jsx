import React from 'react';
import { useNavigate } from 'react-router-dom';

//API
import { useVerifyAccountMutation, useConfirmPasswordMutation, useDeleteChannelMutation } from '../../redux/API';

//ICONS
import { FaDollarSign, FaPaypal, FaRegTrashAlt } from 'react-icons/fa';
import { CiCircleRemove, CiLocationOn, CiCircleInfo, CiSquareCheck } from 'react-icons/ci';
import { MdOutlineDelete, MdOutlineQuestionMark } from 'react-icons/md';

//ASSETS
import grad_one from '../../assets/img/BackDrop/Grad_09.png';
import grad_two from '../../assets/img/BackDrop/Grad_10.png';
import grad_three from '../../assets/img/BackDrop/Grad_11.png';
import Deleted from '../../assets/img/deleted.png';
import PaypalButton from '../Elements/PaypalButton';

//UTILITIES
import { handlePopoverState } from '../../utils/handlePopoverState.js';
import FormatDate from '../../utils/FomatDates_utility.js';

//DATA
import { transitionTimingFunctions, user_id } from '../../../data.js';

//COMPONENTS
import SuccessPopover from './SuccessWindowPopover.jsx';
import SuccessMessagePopover from './SuccessMessagePopover.jsx';
import ErrorPopover from './ErrorPopover.jsx';
import Delete_channel_infoPopover from './Delete_channel_infoPopover.jsx';
import RemoveChannelAlert from './RemoveChannelAlert.jsx';

//JSX
export default React.memo(({ channels }) => {
  //REACT ROUTER
  const navigate = useNavigate();

  //GLOBAL STATAES
  const [PaymentWindow, setPaymentWindow] = React.useState(false);
  const [Error_Msg, setError_Msg] = React.useState(``);

  const [channel_quota_success_state, setChannel_quota_success_state] = React.useState({
    isSuccess: false,
    process: '',
    message: ``,
    button_placeholder: ``,
    events: { onClick: () => null },
  });
  const [Payed, setPayed] = React.useState({
    state: false,
    response: null,
  });

  //MEMO
  const PaymentWindowMemo = React.useMemo(() => PaymentWindow, [PaymentWindow]);

  //EFFECT
  React.useEffect(() => {
    //CLOSING THE POPOVER IF NO CHANNELS
    if (!channels || !Array.isArray(channels)) {
      setError_Msg(`you have reached the free channels limits , failed to open the payment window`);
      handlePopoverState(`channel_creation_form_popover`, false);
    }
  }, [channels]);

  React.useEffect(() => {
    if (!Payed.state) return;
    setChannel_quota_success_state((c) => ({
      isSuccess: true,
      process: `payment successful`,
      message: `thank you for using our services ${((limit) => (limit ? `you are now able to create ${limit} more chanels` : ''))(Payed.response?.ChannelsLimit)}`,
      button_placeholder: `go back`,
      events: { onClick: () => handlePopoverState(`successMessagePopover`, false) },
    }));
  }, [Payed]);

  //DEST THE CHANNELS
  const { channels: channels_array } = channels;
  if (!channels_array) return;

  //COMPONENTS
  /* LAYOUT */
  const VerifySec = ({ key }) => {
    const [is_verified, setIs_verified] = React.useState(false);

    const [deleted, setDeleted] = React.useState({
      isDeleting: ``,
      state: false,
      deleted: '',
    });

    //API
    const [delete_channel, { isLoading: isDeleting, error: deleteChannelError, data: deleteChannelRes }] = useDeleteChannelMutation();

    //HANDLERS
    const handleConfirm_delete = React.useCallback(
      async function (Name = null, Password = null) {
        try {
          //#ERR
          if (!user_id) throw new Error(`not logged in`);

          //VAR
          const Req_body = { verify: { status: is_verified, method: `password`, Password, user_id }, user_id, Name };

          //API
          const Response = await delete_channel(Req_body);
          const { data = {} } = 'data' in Response ? Response : Response.error;

          if ('verified' in data) {
            const { verified, message = 'something went wrong' } = data;
            setIs_verified(verified);
            if (!verified) setError_Msg(`password wrong`);
          }

          if ('deleted' in data) {
            const { deleted, scheduled, message } = data;
            if (deleted) return setDeleted((prev) => ({ ...prev, deleted: Name, state: true }));
            else if (scheduled) setError_Msg(`alert is scheduled `);
          }

          //LOGS
          console.log(Response);
        } catch ({ message: error }) {
          console.log({ error });
        }
      },
      [is_verified]
    );

    //EFFECT
    React.useEffect(() => {
      if (!deleted.deleted) return;

      setChannel_quota_success_state((c) => ({
        isSuccess: true,
        process: `deletion scheduled`,
        message: `channel now will be deleted after 24/h unless a member claime it`,
        button_placeholder: `go back`,
        events: { onClick: () => navigate('/') },
      }));
    }, [deleted]);

    return (
      <span className={`flex h-full w-[43%] flex-col items-start justify-between px-[15px] py-[7px]`}>
        <SuccessMessagePopover open={deleted.state} auto_close={{ value: true, props: { delay: 8000 } }} message={`channel was deleted successfully`} />

        <div className={`relative flex h-[60%] w-full items-center justify-between gap-x-[5px] `}>
          <div className={` flex   flex-col items-start justify-center gap-y-[8px] leading-none `}>
            <h2 className={`font-[openSauce] text-[1.35em]`}>limit reached</h2>
            <p className={` font-[openSauceReg] text-[12.5px] [text-wrap:balance]`}>
              the 2 free channels already created <br />
              purchase a new package or delete one
            </p>
          </div>

          <img src={Deleted} className={` aspect-square w-[90px] scale-[1.6]`} />
        </div>

        <form
          className={`flex-center-between h-[40%] w-full gap-x-[10px]`}
          onSubmit={(e) => {
            e.preventDefault();
            const { value } = e.target.delete_channel_password_verification;
            //#ERR
            if (!Boolean(value)) return setError_Msg(`please enter your password to verify`);
            handleConfirm_delete(null, e.target.delete_channel_password_verification.value);
          }}
        >
          <div className={`relative flex h-full flex-grow items-center justify-start overflow-hidden  `}>
            <div className={`absolute top-0 flex h-[200%] w-full flex-col items-center justify-end`}>
              {/* FORM INPUT */}
              <div
                style={{
                  transitionProperty: `transform`,
                  transitionDelay: `${!is_verified ? 250 : 0}ms`,
                  transtionDuration: `250ms`,
                  transitionTimingFunction: transitionTimingFunctions.Carousel_Ride,
                }}
                className={`flex-center  absolute h-1/2 w-full ${!is_verified && `-translate-y-full`}`}
              >
                <input
                  name={`delete_channel_password_verification`}
                  placeholder={`please verify your account`}
                  type={`password`}
                  className={`h-[35px] flex-grow rounded-[6px] bg-gray-200 px-[7px] text-gray-900  outline-none `}
                />
              </div>

              {/* CHANNELS */}
              <div
                style={{
                  transitionProperty: `transform`,
                  transitionDelay: `${is_verified ? 250 : 0}ms`,
                  transtionDuration: `250ms`,
                  transitionTimingFunction: transitionTimingFunctions.Carousel_Ride,
                }}
                className={`scroller-rounded absolute  flex  h-1/2 w-full items-center justify-start gap-x-[3px] overflow-x-scroll
                ${is_verified && `-translate-y-full`}`}
              >
                {channels.channels.map(({ Name, Type, Describtion, Date: Create_at = new Date(), Claimable = { is_claimable: false, until: new Date() } }) => (
                  <span
                    title={Claimable.is_claimable && `this channel is already scheduled`}
                    style={{ transitionTimingFunction: transitionTimingFunctions.Carousel_Ride }}
                    className={`flex-center-around h-[90%] min-w-[100px] select-none flex-col px-[2px] text-gray-100 transition-[opacity_transform_position] ${
                      deleted.deleted === Name && `absolute translate-y-full opacity-0`
                    } ${Claimable.is_claimable && ` opacity-50`}`}
                  >
                    <Delete_channel_infoPopover Name={Name} Type={Type} Describtion={Describtion} Date={Create_at} />
                    <div className={`flex-center-between w-full text-black`}>
                      <h2 className={`font-[openSauce] text-[14px] text-black `}>{Type}</h2>
                      <MdOutlineQuestionMark
                        size={16}
                        style={{ transitionTimingFunction: transitionTimingFunctions.Soft_Jitter }}
                        className={`cursor-pointer transition-transform duration-300 hover:rotate-6 hover:scale-110`}
                        onClick={() => handlePopoverState(`delete_channel_info_dialog_${Name}`, true)}
                      />
                    </div>

                    <div className={`border-sm  relative h-[70%] w-full cursor-pointer overflow-hidden bg-slate-100 text-black`}>
                      <span
                        onClick={
                          () => (!Claimable.is_claimable ? setDeleted((prev) => ({ ...prev, isDeleting: prev.isDeleting == Name ? `` : Name })) : setDeleted((prev) => ({ ...prev, deleted: true })))
                          //setError_Msg(`this channel will be deleted after ${Math.floor((new Date(Claimable.until).getTime() - new Date().getTime()) / (1000 * 60 * 60))}/h `)
                        }
                        className={`stretch flex-center-around relative`}
                      >
                        <FaRegTrashAlt />
                        <h3 className={`w-[70%] truncate font-[openSauceReg] text-[11px]`}>{Name}</h3>
                      </span>
                      <span
                        style={{ transitionTimingFunction: transitionTimingFunctions.Funky_Flip }}
                        className={`flex-center absolute right-0 z-[1] h-full w-[30%] rounded-sm  transition-[transform_background] 
                          ${deleted.isDeleting === Name ? `translate-x-0 bg-red-50` : `translate-x-full bg-transparent`}`}
                      >
                        <CiSquareCheck
                          size={21}
                          onClick={() => handlePopoverState(`remove_channel_alert`, true)}
                          style={{ transitionTimingFunction: transitionTimingFunctions.Smooth_Start_Quick_Middle_Slow_End }}
                          className={`transition-transform hover:scale-105`}
                        />
                        <RemoveChannelAlert onClick={() => !Claimable.is_claimable && handleConfirm_delete(Name)} isDeleting={isDeleting} />
                      </span>
                    </div>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            type={`submit`}
            style={{
              //BACKGROUND
              backgroundSize: `1000%`,
              backgroundPosition: `0% 50%`,
              //TRANSITION
              transitionTimingFunction: transitionTimingFunctions.Disco_Fever,
            }}
            className={`h-[35px] rounded-[6px] bg-gradient-to-r from-black via-green-200 to-blue-200 px-[7px] text-gray-300 outline outline-[.5px] outline-white  transition-[color] hover:bg-white  hover:outline-black  
            ${isDeleting && `loading_screen`}`}
          >
            <p className={`mix-blend-difference`}>confirm</p>
          </button>
        </form>
      </span>
    );
  };

  const PaymentNav = ({ key, style }) => (
    <div
      key={key}
      style={{
        //TRANSIITONNAME
        ...style.style,
        //TRANSITION
        transitionProperty: `transform`,
        transitionDuration: `250ms`,
        transitionDelay: `250ms`,
        transitionTimingFunction: `linear`,
      }}
      className={`absolute right-1/2 h-[90%]  max-h-[200px] w-[7%] self-center bg-blue-100 
      ${PaymentWindowMemo ? `translate-x-full rounded-[0_7px_7px_0]` : `rounded-[7px_0_0_7px]`}`}
    >
      {[
        {
          id: `Payment_Cancel`,
          Icon: CiCircleRemove,
          onClick: () => handlePopoverState(`channels_quota_alert_popover`, false),
        },
        {
          id: `paypal_payment`,
          Icon: FaPaypal,
          onClick: () => setPaymentWindow((c) => !c),
        },
      ].map(({ id, Icon, onClick }) => (
        <span key={id} onClick={onClick} className={`flex-center group h-1/2 w-full`}>
          <Icon style={{ transition: `transform 250ms ease` }} size={22} className={`group-hover:scale-[1.1]`} />
        </span>
      ))}
    </div>
  );

  const PaymentSec = ({ key, style }) => {
    //STATES
    const [plans, setPlans] = React.useState([
      {
        id: 'channel_plan_offer_one',
        price: 5,
        offer: 1,
        backdrop: grad_one,
        selected: true,
        txt: `One channel, unlimited possibilities.`,
      },
      {
        id: 'channel_plan_offer_two',
        price: 8,
        offer: 5,
        backdrop: grad_two,
        selected: false,
        txt: `Manage five channels seamlessly`,
      },
      {
        id: 'channel_plan_offer_three',
        price: 15,
        offer: 8,
        backdrop: grad_three,
        selected: false,
        txt: `Unlock creativity with up to eight channels`,
      },
    ]);

    return (
      <span {...style} className={`relative flex h-full w-[43%] flex-col items-center justify-between gap-y-[10px] py-[15px] pl-[8px] `}>
        {/* PLANS */}
        <ul className={`flex-center  m-auto h-[30%] w-full gap-[2px] rounded-[7px] p-[3px]  pt-[10px]`}>
          {plans.map(({ id, price, offer, backdrop, selected, txt }, plan_box_index) => (
            <li
              key={id}
              //EVENTS
              onClick={() => setPlans((c) => c.map((plan, index) => (plan_box_index == index ? { ...plan, selected: true } : { ...plan, selected: false })))}
              //STYLE
              style={{ transition: `all 2500ms ease` }}
              className={`flex-center relative h-full w-[32%] cursor-pointer rounded-[15px]  border border-gray-200 p-0 shadow-[0_0_15px_0px_white_inset] 
              ${PaymentWindowMemo ? `translate-y-0 opacity-100` : `translate-y-full opacity-0`}`}
            >
              {/* CONTENT */}
              <div className={`inset-0 z-[1] m-auto h-[98%] w-[98.5%] translate-y-[.5%] rounded-[12px] bg-gray-100/90  p-[8px] backdrop-blur-[${{ true: `20px`, false: `7px` }[selected]}]`}>
                {/* BOX #N */}
                <div className={`flex-center h-[60%] w-full gap-x-[5px]`}>
                  <h2
                    style={{
                      //Transition
                      transitionProperty: `background , transform`,
                      transitionDuration: `1000ms ,100ms`,
                      transitionTimingFunction: `cubic-bezier(0,0,0.2,1)`,
                      //BG
                      backgroundPosition: selected ? 0 : 100 + '% 0',
                      backgroundSize: `2000%`,
                      backgroundRepeat: 'no-repeat',
                    }}
                    className={`flex-center h-full bg-gradient-to-l from-gray-700 via-blue-300 to-purple-600 bg-clip-text font-[PoppinsBold] text-[40px] text-transparent 
                    ${selected && `scale-[1.2]`}`}
                  >
                    {price}
                  </h2>
                  <small className="absolute translate-x-[27px]">$</small>
                </div>

                {/* PLAN DESC */}
                <div className={`flex h-[40%] items-center justify-start`}>
                  <small className={`font-[garet] text-[9px] leading-none text-gray-700`}>{txt}</small>
                </div>
              </div>

              {/* BACKDROP */}
              <div className={`stretch`}>
                <div className={`h-full w-full overflow-hidden rounded-[13px]`}>
                  <img
                    style={{ transition: `opacity 250ms ease` }}
                    src={backdrop}
                    className={` scale-[7] object-cover blur-[10px]
                    ${selected ? `opacity-100` : `opacity-20 `} `}
                  />
                </div>
              </div>

              <CiLocationOn size={18} className={` absolute bottom-full text-purple-500 ${selected ? `translate-y-[-5px] scale-y-100 animate-bounce` : `translate-y-1/2 scale-y-0 animate-none`}`} />
            </li>
          ))}
        </ul>

        {/* PAYMENT */}
        <div className={`group   relative flex  h-[60%] w-full items-center justify-center overflow-visible  rounded-[10px]  border border-black/20 bg-gray-50 p-[15px]`}>
          {/* FORM LABEL */}
          <small className={`absolute top-0 z-[2] -translate-y-1/2 bg-gray-50 p-[2px_4px]`}>select payment method</small>

          {/* FORM */}
          <PaypalButton
            price={plans.filter(({ selected }) => selected)[0].price}
            service={`Extend Channel Quota`}
            plan_data={plans.filter(({ selected }) => selected)[0]}
            type={`ExtendChannelsLimit`}
            //HANDLERS
            handleErrorState={(error) => setError_Msg(error)}
            onPay={(payed) => setPayed(payed)}
          />
        </div>
      </span>
    );
  };

  return (
    <div
      id={`channels_quota_alert_popover`}
      popover={'auto'}
      style={{ transitionTimingFunction: transitionTimingFunctions.Elastic_Out_And_Settle }}
      className={`m-auto h-full w-full cursor-default bg-transparent backdrop:bg-black/70 backdrop:transition-all `}
    >
      <div className={`stretch flex-center`}>
        <div
          className={`pointer-events-none relative inset-0 flex min-h-max w-[430px] flex-col items-center justify-between  overflow-hidden rounded-[10px] bg-transparent
          ${!PaymentWindowMemo ? `h-[180px] ` : ` h-[400px] `}`}
        >
          <div
            style={{
              transitionProperty: `transform , opacity`,
              transitionDuration: `260ms`,
              transitionTimingFunction: transitionTimingFunctions.Elastic_Out_And_Settle_Alternate,
            }}
            className={`pointer-events-auto relative inset-0 flex h-full w-full   items-center justify-start bg-gray-50 py-[10px]
            ${!PaymentWindowMemo ? `overflow-hidden` : `scroller-rounded`}`}
          >
            <div
              style={{ transition: `transform 250ms cubic-bezier(0.15, 0.72, 0.37, 0.99)` }}
              className={`flex-center-between absolute h-full w-[200%]
              ${PaymentWindowMemo && `-translate-x-1/2 `}`}
            >
              {[
                { id: `VerifySec`, Componnet: VerifySec },
                { id: `PaymentNav`, Componnet: PaymentNav },
                { id: `PaymentSec`, Componnet: PaymentSec },
              ].map(({ Componnet, id }) => (
                <Componnet key={id} style={{ style: { viewTransitionName: `userPayedMessageDispaly` } }} />
              ))}
            </div>
          </div>
        </div>

        <ErrorPopover message={Error_Msg} close={() => setError_Msg('')} />
        <SuccessPopover
          isSuccess={channel_quota_success_state.isSuccess}
          message={channel_quota_success_state.message}
          title={channel_quota_success_state.process}
          ProcessIcon={FaDollarSign}
          close={() => setPayed((c) => ({ ...c, state: false }))}
          BTN={{ BtnEvents: { ...channel_quota_success_state.events }, btnPlaceholder: channel_quota_success_state.button_placeholder }}
        />
      </div>
    </div>
  );
});
