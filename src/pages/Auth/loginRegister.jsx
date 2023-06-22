import React from "react";
import axios from "axios";
import { useCurrentApiQuery } from "../../redux/API";
/* __________FORM HANDLING LIBRARIES __________ */

import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { userStateContext } from "../../context/userState";

//_____________ ICONS_____________

import { BiExit, BiMessageSquareError } from "react-icons/bi";
import { CiCircleRemove, CiWarning } from "react-icons/ci";
//______________Components________________
import EmailVarification from "./stages/EmailVarification.jsx";
import Loading from "../../../src/components/Loading";
import AuthenticateForm from "./stages/AuthenticateForm";

//_______________ DATA ________________
import {
  Avatars,
  AvatarArray,
  validEmailServiceProviders,
} from "../../../data";

// _____________GLOBAL STATES _____________
import { useSelector } from "react-redux";
import { GiCancel, GiReloadGunBarrel } from "react-icons/gi";
import { TbReload } from "react-icons/tb";
import { AiOutlineReload } from "react-icons/ai";
import { BsReverseLayoutSidebarReverse } from "react-icons/bs";

//_________________JSX ___________________

export default function loginRegister() {
  //<---------- CONTEXT ---------->
  const { userState } = React.useContext(userStateContext);
  const { loged, admin } = userState;
  const navigate = useNavigate();

  /* Preventing the page from Reloading */
  React.useEffect(() => {
    const BeforeReload = (e) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", BeforeReload);
    return () => removeEventListener("beforeunload", BeforeReload);
  }, []);

  //<-----------COMPONENTS------------->
  const FormErrorBox = ({ Error, form }) => {
    /* Error Component Descructering Data */
    const { setFormError, formError } = Error;
    const { formData, setformData } = form;
    return (
      formError && (
        <div
          style={{
            transition: `border 400ms 100ms , opacity 200ms , background 220ms ease`,
          }}
          onClick={(e) => setFormError((current) => "")}
          className={`
       bg-tranparnet group  absolute top-[100px] h-[50px] w-[80%] min-w-[350px] max-w-[600px] cursor-pointer items-center  justify-center overflow-hidden rounded-md  border  bg-opacity-[0.7] font-[brandinkLight] text-[15px] leading-[13px] text-white  backdrop-blur-[4px] md:w-[40%] ${
         Object.keys(formData)?.length ? `translate-y-[65px]` : ``
       } ${
            formError
              ? "flex border-white opacity-[1]"
              : `hidden border-transparent opacity-0`
          }`}
        >
          <>
            <BiMessageSquareError
              fill={"red"}
              className="absolute left-0 h-full translate-x-[25px] scale-[2]  text-red-600  opacity-[0.8] transition-transform duration-[300ms] group-hover:scale-0"
            />
            <CiCircleRemove
              fill={"red"}
              className="absolute left-0 h-full translate-x-[25px]   scale-0  text-red-600 opacity-[0.8] transition-transform duration-[300ms] group-hover:scale-[2]"
            />

            <p className="h-max w-full pl-[75px]  pr-[20px]">{formError} </p>
          </>
        </div>
      )
    );
  };

  const {
    data: locationData,
    isLoading,
    Error: LocationApiError,
  } = useCurrentApiQuery();
  const [userGeoLocation, setUserGeoLocation] = React.useState({
    allow: false,
    location: locationData?.country,
  });

  const RegisterRequest = () => {
    const [formError, setFormError] = React.useState();

    const [EmailSentTo, setEmailSentTo] = React.useState(""); // the email that recieved the email of verification
    const [formData, setformData] = React.useState({}); // form data

    const dataToBeSent = {
      Error: {
        formError,
        setFormError,
      },
      form: {
        formData,
        setformData,
      },

      useMyLocation: {
        userGeoLocation,
        setUserGeoLocation,
      },
      location: {
        locationData,
        isLoading,
      },
    };
    const [CurrentStage, setCurrentStage] = React.useState(
      () => AuthenticateForm
    );
    React.useEffect(() => {
      if (Object.keys(formData).length) {
        setCurrentStage((c) => (c = EmailVarification));
      }
    }, [formData]);

    return (
      <>
        <FormErrorBox {...dataToBeSent} />
        {/* <-------- FORM STAGES ----------> */}
        <CurrentStage {...dataToBeSent} />
      </>
    );
  };
  /* <-------- THE AVATARS ARTWORK -------> */
  const RegisterArt = () => {
    const [PageLoaded, setPageLoaded] = React.useState(false);
    const [FadeBeforeRedirect, setFadeBeforeRedirect] = React.useState(false);

    React.useEffect(() => {
      const handleLoad = () => {
        setPageLoaded(true);
      };
      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad);
      }
      return () => {
        window.removeEventListener("load", handleLoad);
      };
    }, []);

    React.useEffect(() => {
      if (localStorage?.user) {
        setFadeBeforeRedirect(true);
      }
    }, [localStorage?.user]);

    return (
      <div
        className={`absolute left-[-260px] flex min-h-[250vh] w-[600px] translate-y-[-50px]  rotate-[22deg] items-center justify-center opacity-[0.2] lg:opacity-[0.5] `}
      >
        {/* CONTAINER */}
        <div className="relative h-full w-full">
          {/* DARK SPOT ABOVE */}
          <div
            className={`pointer-events-none absolute top-[0px] z-[1] h-[300px] w-[110%] bg-gradient-to-b   from-black via-black to-transparent    opacity-[0.7] `}
          />
          {/* <------ARTWORK-----> */}
          <div className={`flex h-full w-full flex-wrap border  `}>
            {AvatarArray?.map((Avatarimg, index) => (
              <div
                onClick={() => setAvatar(Avatarimg)}
                className={`h-1/4   w-1/3 border transition-transform duration-[150ms] hover:scale-[1.03]`}
              >
                <img
                  style={{
                    transition: `opacity 500ms  , transform 400ms ease-in-out`,
                    transitionDelay: `${
                      Math.floor(Math.random() * AvatarArray.length) * 150
                    }ms`,
                  }}
                  src={Avatarimg}
                  className={`object-fit h-full w-full ${
                    FadeBeforeRedirect ? `opacity-0` : `opacity-[1]`
                  } ${
                    PageLoaded
                      ? `scale-[1] opacity-[1]`
                      : `scale-[1.3] opacity-[0]`
                  }`}
                />
              </div>
            ))}
          </div>
          {/* DARK SPOT DOWN */}

          <div
            className={`pointer-events-none absolute  bottom-0 z-[1]  h-[300px] w-[110%] bg-gradient-to-t   from-black via-black to-transparent   opacity-[0.9]`}
          />
        </div>
      </div>
    );
  };

  //-----------MAIN SECTION DISPLAY-------------
  return (
    <div
      className={`  my-[50px] flex min-h-[530px] flex-wrap items-center justify-center  `}
    >
      {!loged ? (
        <>
          <RegisterArt />
          <RegisterRequest />
        </>
      ) : (
        navigate("./")
      )}
    </div>
  );
}
