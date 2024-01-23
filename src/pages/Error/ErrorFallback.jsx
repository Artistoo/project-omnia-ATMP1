import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useInView} from 'react-intersection-observer';

//** COSTUME HOOKS  **
import {usePageLoaded} from '../../hooks/usePageLoaded.jsx';

//** ASSETS **
import ERROR_IMG from '../../assets/img/404.png';
import {transitionTimingFunctions} from '../../../data';

//** API **
import {useSendMeEmailMutation} from '../../redux/API.js';
import {FaArrowDown} from 'react-icons/fa';
import {IoIosArrowRoundDown} from 'react-icons/io';
import {BsQuestionDiamond} from 'react-icons/bs';

export default function ErrorFallback({error: component_error, resetErrorBoundary}) {
  //STATES
  const [error_insights, setError_insights] = React.useState([
    {Q: `What happened?`, A: `There was an unexpected error in the application that we are actively working to resolve.`, isOpen: false},
    {Q: `Is my data safe?`, A: `Yes, your data is safe. The error is related to the application's functionality, and no data has been compromised.`, isOpen: false},
    {Q: `what should i do next ?`, A: `You can try refreshing the page . If the issue persists, wait while we are working on fixing it`, isOpen: false},
    {Q: `Why did this error occur?`, A: `Errors can happen for various reasons, such as network issues, server problems, or unexpected user actions. The development team is investigating the specific cause.`, isOpen: false},
  ]);

  //OBVSERVER
  const [sections_scrolling_arrow_ref, sections_scrolling_arrow_inview] = useInView({threshold: 0.05});

  //API
  const [email_me, {isLoading: isSending, error}] = useSendMeEmailMutation();

  //COSTUME
  const [Loaded] = usePageLoaded();

  //EFFECTS
  /* TODO: make sure the email is getting sent to the admin  */
  React.useEffect(() => {
    (async () => await email_me({message: `an error occured : ${component_error}`}))();
  }, []);

  //LOGS
  console.log(sections_scrolling_arrow_inview);

  return (
    <div className={`flex w-full flex-wrap  items-start justify-between gap-y-[70px] scroll-smooth  p-[30px_15px] md:gap-y-[0px]`}>
      <div //THE ERROR MESSAGE DISPLAY SECTION
        className={`flex h-max min-w-[500px] flex-grow flex-wrap items-start justify-center md:items-center lg:w-[500px] lg:min-w-0  lg:flex-none  `}>
        <span // ERROR WRAPPER
          className={`relative flex h-full w-max    flex-col-reverse flex-wrap items-center justify-center rounded-sm p-[8px] md:flex-row  md:justify-between  `}>
          <span //ERROR IMAGE
            className={`flex-center min-h-[200px] w-full md:min-h-[300px] `}>
            {/* DISPLAY */}
            <img src={ERROR_IMG} className={` absolute aspect-square w-[600px] translate-y-[50px] object-contain md:w-[400px] `} />
            {/* BACKDROp */}
            <img src={ERROR_IMG} className={` absolute -z-10 aspect-square w-[600px] translate-y-[50px] scale-[1.3] object-contain opacity-70 blur-[50px] md:w-[400px] `} />
          </span>
          <span // ERROR CONTENT CONTAINER
            className={`z-10  flex max-w-[450px] flex-grow flex-col  items-start justify-evenly gap-y-[20px] self-end md:w-[70%]`}>
            <h2 // _SMTH WENT WRONG_
              style={{backgroundSize: `3000%`, transitionTimingFunction: transitionTimingFunctions.Disco_Fever}}
              className={`delay-800 h-[50px] bg-gradient-to-r from-red-400 via-transparent to-gray-300  bg-clip-text  font-[PoppinsBold] text-[33px] leading-none text-transparent transition-all ${Loaded ? `bg-right` : `bg-left`}`}>
              something went wrong
            </h2>
            <p // ERROR TEXT
              className={`text-md font-[openSauceReg] text-gray-200 `}>
              We apologize for the inconvenience. Our team has been notified, and we're working to fix the issue. Please try again later.
            </p>
            <button // RELOAD PAGE _ TRY AGAIN BUTTON
              onClick={() => location.reload()}
              className={`h-[35px] w-full rounded-full border border-gray-500 font-[openSauce] text-gray-100 outline outline-[.5px] outline-offset-[1px] outline-gray-400`}>
              try again
            </button>
          </span>
        </span>
      </div>

      <hr // THE LINE BETWEEN THE TWO PARTS IN LG DISPLAY
        style={{transitionTimingFunction: transitionTimingFunctions.Carousel_Ride}}
        className={`delay-600 absolute left-[52%] hidden h-[180px] w-[1px] origin-top translate-x-[-50%] translate-y-[150%] scale-x-[.5] border-none bg-white transition-transform duration-[1500ms] lg:flex  ${Loaded ? `scale-y-100` : `scale-y-0`}`}
      />

      <div // Troubleshooting FAQ CONTAINER
        ref={sections_scrolling_arrow_ref}
        className={`flex min-h-screen w-[420px]  flex-grow flex-col items-start justify-center gap-y-[30px] p-[20px] lg:flex-none `}>
        <div // SECTION TITLE
          className={`w-max text-gray-100 `}>
          <h2 className={`font-[openSauce] text-[35px] `}>Troubleshooting FAQ</h2>
          <p className={`max-w-[500px] font-[Poppins] text-sm leading-none [text-wrap:balance]`}>here are some answers and questions that can help you understand what happened , please be patient</p>
        </div>

        <div //Q & A LOOPING CONTAINER
          className={`relative flex w-full flex-col items-start justify-around gap-y-[10px]`}>
          {error_insights.map(({Q, A, isOpen}) => (
            <div // IND ERROR
              key={React.useId()}
              onClick={() => setError_insights((c) => c.map((err) => (err.Q === Q ? {...err, isOpen: !err.isOpen} : {...err})))}
              style={{backgroundSize: `3000%`, backgroundRepeat: `no-repeat`, transitionTimingFunction: transitionTimingFunctions.Dizzy_Spin}}
              className={`relative flex  w-full cursor-pointer flex-col  overflow-hidden rounded-[10px]  bg-gradient-to-r from-gray-100 via-blue-200 to-purple-200 px-[15px] text-[14.5px] transition-all duration-200  md:w-[400px] ${isOpen ? `bg-right` : `bg-left`}  ${isOpen ? `h-[130px]` : `h-[50px]`}`}>
              <div // Q
                className={` absolute top-0 flex h-[50px]  w-full items-center justify-start   font-[openSauceReg] text-[15px] text-black `}>
                <h2>{Q}</h2>
                <BsQuestionDiamond size={17} className={`absolute right-[35px]`} />
              </div>
              <div // A
                className={` absolute top-[55px] flex h-max  items-center justify-start  font-[openSauceReg] text-[13px] text-black `}>
                <p>{A}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
