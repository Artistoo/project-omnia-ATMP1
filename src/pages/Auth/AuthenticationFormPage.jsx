import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

//<---------ASSET------------>
import { AvatarArray } from "../../../data";

/* <--------COMPONENTS ---------> */
import Error_Box from "./Components/Error_Box.jsx";
import { AiOutlineRobot } from "react-icons/ai";

/* <-------- THE AVATARS ARTWORK -------> */
const RegisterArt = ({ fade = false }) => {
  //ARTWORK STATES
  const [PageLoaded, setPageLoaded] = React.useState(false);

  //ARTWORK EFFECTS
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

  //<----------- ARTWORK JSX --------------->
  return (
    <div
      className={`absolute left-[-260px] flex min-h-[250vh] w-[600px] translate-y-[-160px]  rotate-[22deg] items-center justify-center opacity-[0.2] lg:opacity-[0.5] `}
    >
      {/* CONTAINER */}
      <div className="relative h-full w-full">
        {/* DARK SPOT ABOVE */}
        <div
          className={`pointer-events-none absolute top-[0px] z-[1] h-[300px] w-[110%] bg-gradient-to-b   from-black via-black to-transparent    opacity-[0.7] `}
        />
        {/* <------ARTWORK-----> */}
        <div
          className={`flex h-full w-full flex-wrap border ${
            fade ? `border-[0px]` : `border-[1px]`
          }   `}
        >
          {AvatarArray?.map((Avatarimg, index) => (
            <div
              key={`AvatarAt${index}`}
              style={{
                transition: `opacity 350ms ${
                  index * Math.floor(Math.random() * 300)
                }ms cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
              }}
              className={`h-1/4   w-1/3 border transition-transform duration-[150ms] hover:scale-[1.03] ${
                fade ? `opacity-0` : `opacity-100`
              }`}
            >
              <img
                style={{
                  transition: `opacity 500ms  , transform 400ms ease-in-out`,
                  transitionDelay: `${
                    Math.floor(Math.random() * AvatarArray.length) * 150
                  }ms`,
                }}
                src={Avatarimg}
                className={`object-fit h-full w-full  ${
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

const Recaptcha = ({ Recaptcha, formReadyState = false }) => {
  const { not_Robot, handleUpdateRecaptcha } = Recaptcha;
  const { formIsReady } = formReadyState;
  return (
    <div
      style={{
        transition: `transform 400ms cubic-bezier(0.68, -0.55, 0.27, 1.55) , opacity 400ms cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
      }}
      className={`absolute top-full flex h-[120px] w-[450px] flex-col items-start justify-center gap-y-[12px] rounded-md  p-[10px] text-[15px] text-gray-200
      ${
        formIsReady
          ? not_Robot
            ? `translate-y-0 opacity-0`
            : `translate-y-[-110%] opacity-100`
          : `translate-y-0 opacity-0`
      }`}
    >
      <p className={`font-[openSauceReg] text-[13px] `}>
        one more step , please verify you're a human
      </p>
      <div className={`flex w-full items-center justify-between`}>
        <ReCAPTCHA
          sitekey={import.meta.env.VITE_RECAPTCHA_KEY_DEV}
          onChange={handleUpdateRecaptcha}
        />
        <span
          className={`flex h-full w-[30%] items-center justify-center overflow-hidden`}
        >
          <AiOutlineRobot
            size={65}
            className={`transition-[transform] duration-[250ms]
            ${formIsReady ? `translate-y-0` : `tranlsate-y-[100%] `}`}
          />
        </span>
      </div>
    </div>
  );
};

export default function () {
  const [Auth_Error, setAuth_Error] = React.useState("");
  const [not_Robot, setNot_Robot] = React.useState(false);
  const [formIsReady, setFormIsReady] = React.useState(false);
  const [fade, setFade] = React.useState(false);

  //Router_DOM
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.pathname.includes("select_interest")) {
      setFade(true);
    }

    if (
      [`Authentication`, "Verification_Code", "QR_verify"].some((x) =>
        x.includes(location.pathname)
      ) &&
      !Boolean(location.state)
    ) {
      navigate("/AccountAuth/Authentication");
      setAuth_Error(`data wasn't transfered successfully , please try again`);
    }
  }, [location]);

  const handleUpdateRecaptcha = (value) => {
    setNot_Robot(value);
  };
  const handleUpdateFormReadyState = (ready) => {
    setFormIsReady(ready);
  };

  const Components_Data = {
    Error: [Auth_Error, setAuth_Error],
    Recaptcha: { not_Robot, handleUpdateRecaptcha },
    Avatars: {
      fade,
      setFade,
    },
    formReadyState: {
      formIsReady,
      handleUpdateFormReadyState,
    },
  };

  return (
    <div
      className={`relative flex min-h-[550px] w-full items-center justify-center  border`}
    >
      <RegisterArt fade={fade} />
      <div className={`flex flex-col items-center justify-center`}>
        <div
          style={{
            transition: `opacity 250ms cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
          }}
          className={`pointer-events-none absolute top-[-150px] z-[5] h-[50vh]  w-[450px]   bg-gradient-to-b from-black via-black/50 to-transparent ${
            formIsReady ? `opacity-100` : `opacity-0`
          }`}
        />
        <div
          className={` relative flex min-h-[500px] w-full min-w-[450px] max-w-[1600px]  flex-col items-center justify-center`}
        >
          <Error_Box {...Components_Data} />
          <Outlet context={{ ...Components_Data }} />
        </div>
        <Recaptcha {...Components_Data} />
      </div>
    </div>
  );
}
