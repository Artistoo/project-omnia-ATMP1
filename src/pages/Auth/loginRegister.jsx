import React from "react";
import axios from "axios";
import Typist from "react-typist";
/* <----- FORM HANDLING LIBRARIES ------> */
import DOMPurify from "dompurify";
import { Route, Routes, useNavigate } from "react-router-dom";
import { userStateContext } from "../../context/userState";
//------------ICONS ----------------
import {
  CgArrowRight,
  CgArrowUp,
  CgEye,
  CgGoogle,
  CgTwitter,
} from "react-icons/cg";
import {
  FaMale,
  FaFemale,
  FaGithub,
  FaRandom,
  FaBullseye,
  FaQuestion,
  FaEyeDropper,
} from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { MdFemale, MdMale } from "react-icons/md";
import {
  GiCardRandom,
  GiEyelashes,
  GiPerspectiveDiceSixFacesRandom,
} from "react-icons/gi";
import { TbArrowsRandom } from "react-icons/tb";

//-----------ASSETS ------------
import Stars from "../../assets/img/ThreeDStars.png";

//<<_____________ DATA ________________
import {
  Avatars,
  AvatarArray,
  validEmailServiceProviders,
} from "../../../data";

//-----------GLOBAL STATES ---------------
import { useSelector } from "react-redux";
import Gender from "../../assets/icons/gender";
import Loading from "../../../src/components/Loading";
import { fill } from "lodash";
import {
  AiFillStar,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

//-----------JSX ------------------
export default function loginRegister() {
  //<---------- GLOBAL VARIABLES ---------->

  //<---------- REACT CONTEXT -------->
  const { userState } = React.useContext(userStateContext);
  const { loged, admin } = userState;
  const navigate = useNavigate();

  //<-----------COMPONENTS------------->
  const RegisterForm = () => {
    /* REACT REF */
    const Password = React.useRef(null);
    /* REACT STATE */
    const [gender, setGender] = React.useState("male");
    const [userAvatar, setUserAvatar] = React.useState({
      selected: false,
      default: {
        male: Object.values(Avatars[0])[
          Math.floor(Math.random() * Object.keys(Avatars[0])?.length)
        ],
        female: Object.values(Avatars[1])[
          Math.floor(Math.random() * Object.keys(Avatars[1])?.length)
        ],
      },
    });
    const [ProfileName, setProfileName] = React.useState();
    const [formInputs, setForminputs] = React.useState({
      Req_Type: "up",
      inputs: [
        {
          id: "username",
          placeholder: "user name",
          value: "",
          type: `text`,
          span: `col-span-2 sm:col-span-1`,
          display: "up",
          match: `/\w+/g`,
          error: {
            empty: "please fill in the lastname input to continue",
            invalid:
              "please make sure the email you entered is of a valid type ",
          },
        },
        {
          id: "lastname",
          placeholder: "lastname",
          value: "",
          type: `text`,
          span: `col-span-2 sm:col-span-1`,
          display: "up",
          match: "",
          error: {
            empty: "please fill in the lastname input to continue",
            invalid:
              "please make sure the email you entered is of a valid type ",
          },
        },
        {
          id: "email",
          placeholder: "email",
          value: "",
          type: `email`,
          display: "in up",
        },
        {
          id: "password",
          placeholder: "password",
          value: "",
          type: "password",
          display: "in up",
          invalid: ``,

          ref: Password,
        },
        {
          id: "repeatPassword",
          placeholder: "repeat password",
          value: "",
          type: `password`,
          display: "up",
        },
      ],
      gender: gender,
    });
    const [words, setWords] = React.useState({
      words: ["daniel", "albert", "ali", "mark", "martin"],
      index: 0,
    });
    const [userGeoLocation, setUserGeoLocation] = React.useState();
    const [showHidePassword, setShowHidePassword] = React.useState(false);
    /* VARIABLES */
    const FormReqTypeText = [
      {
        text: `Register New Account`,
        show: "up",
      },
      {
        text: `Log To Your Account`,
        show: "in",
      },
      {
        text: `forget Password `,
        show: "fp",
      },
    ];

    /* API */

    axios
      .get("https://geolocation-db.com/json/")
      .then((res) => res.data)
      .then((parse) => parse.json())
      .then((data) => setUserGeoLocation(data))
      .catch((err) => setUserGeoLocation(false));

    console.log(userGeoLocation);
    //FUNCTIONS
    const handleChange = (index, e) => {
      const { value } = e.target;

      setForminputs((current) => {
        const updated = [...current.inputs];

        updated[index] = {
          ...updated[index],
          value: DOMPurify.sanitize(value),
        };
        return {
          ...current,
          inputs: updated,
        };
      });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      if (formInputs.every((x) => x.value.test(x.match))) {
        return;
      }
      axios
        .post("")
        .then()
        .catch((err) => console.log(err));
    };
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      setUserAvatar((prevState) => ({
        ...prevState,
        selected: file,
      }));
    };
    return (
      <div
        className={`flex h-[500px] min-h-[470px] w-[80%]  min-w-[350px] max-w-[600px] flex-col
         items-center justify-center  gap-y-[20px] rounded-md bg-gradient-to-tr from-gray-100
        via-gray-300 
        to-gray-200 px-[20px] py-[5px] backdrop-blur-[50px] md:w-[40%] `}
      >
        {/*<-- FORM TITLE AND CARD -->*/}
        <div
          className={`flex h-[120px]  w-full items-center   justify-between border `}
        >
          {/* REGISTER TEXT */}
          <div
            className={`relative flex h-full w-[48%] select-none flex-col overflow-hidden  border font-[OpenSauce] text-[33px]  font-bold leading-[30px] text-gray-800`}
          >
            {/* THE CONTAINER OF THE THREE REQ TYPES */}
            <div
              style={{
                translate: `0 -${
                  (FormReqTypeText.map(
                    (x, index) =>
                      (x.show === formInputs.Req_Type && index) || false
                  ).filter(Boolean) *
                    100) /
                  (~~FormReqTypeText?.length || 3)
                }%`,
                transition: `translate 400ms ease`,
              }}
              className={`absolute h-[300%] w-full border `}
            >
              {/* MAPPING THO FORM REQ TEXT */}
              {FormReqTypeText.map((formReq, index) => (
                <p
                  style={{
                    transition: `opacity 500ms 200ms ease`,
                  }}
                  key={`formReqText${formReq.text}`}
                  className={`flex h-1/3 w-min items-center justify-start ${
                    formReq.show != formInputs.Req_Type && "opacity-0"
                  }`}
                >
                  {formReq.text}
                </p>
              ))}
            </div>
          </div>

          {/* USER CREDINTIALS */}
          <div
            style={{
              transition: `opacity 250ms ease`,
            }}
            className={` relative flex h-full w-1/2  items-center justify-around rounded-md border border-black bg-gradient-to-tl from-gray-200 to-white ${
              formInputs.Req_Type === "in" && "pointer-events-none opacity-0"
            }`}
          >
            {/* QUESTION SIGN */}
            <div className=" absolute -top-[18px] right-[5px] cursor-pointer  transition-transform duration-[300ms] ease-out hover:rotate-[10deg] hover:scale-[1.5] hover:text-green-500">
              <FaQuestion />
            </div>

            {/* THE LEFT ID CARD SECTION */}
            <div
              className={`flex h-[90%] w-[60%] flex-col items-center justify-center   px-[12px] text-center font-[Poppins] text-[13px] leading-[12px] text-gray-600`}
            >
              {/* SIR NAME */}
              <div
                className={`flex h-[20%] w-full translate-y-[-10px]  items-center justify-center font-[Now]  text-[16px] text-black`}
              >
                <h2 className="w-max uppercase">
                  {gender === "male" ? "mr" : "mrs"}:{" "}
                </h2>

                <input
                  onBlur={(e) =>
                    (e.target.value = e.target.value.replace(
                      /^\w/,
                      e.target.value.at(0).toUpperCase()
                    ))
                  }
                  onChange={(e) => setProfileName(e.target.value)}
                  maxLength={6}
                  className="w-[70%] appearance-none bg-transparent px-[7px] outline-none valid:text-green-600 focus:border-none focus:text-black"
                />
              </div>
              {/* GENDER */}
              <div
                onClick={() => {
                  setGender(gender === "male" ? "female" : "male");
                  setForminputs((current) => ({
                    ...current,
                    gender: gender,
                  }));
                }}
                style={{
                  transition: `background 300ms , border 500ms ease`,
                }}
                id="gender"
                className={`flex aspect-square h-[30px] w-[100%]  scale-[0.85] cursor-pointer items-center justify-around rounded-full border border-black bg-white bg-opacity-[0.5] px-[10px] font-[garet] text-[14px] hover:border-white hover:bg-black hover:bg-opacity-[0.8] hover:text-white`}
              >
                {/* ICON CONTAINER */}
                <div
                  className={`flex   h-full w-[20%] min-w-max scale-[0.7] cursor-pointer  items-center justify-center    `}
                >
                  <Gender SelectedGender={gender} setGender={setGender} />
                </div>

                <div className="flex h-full w-[75%] items-center justify-center ">
                  <p
                    style={{
                      transition: `color 300ms , opacity  ${
                        gender === "male" ? ` 300ms 300ms` : "10ms 0ms"
                      } ease-in-out`,
                    }}
                    className={` ${
                      gender === "male" ? "opacity-0" : `opacity-[1]`
                    }`}
                  >
                    fe
                  </p>
                  <p
                    className={`${
                      gender === "male"
                        ? `translate-x-[-7px]`
                        : `translate-x-[0px]`
                    }`}
                    style={{
                      transition: `color 300ms , transform 350ms  ease-in-out`,
                    }}
                  >
                    male
                  </p>
                </div>
              </div>
              {/* GEO LOCATION */}
              <div className="w-full scale-[0.85] rounded-full border border-black py-[8px]">
                {typeof userGeoLocation != "boolean"
                  ? userGeoLocation?.country_name || `Loading`
                  : `unknown`}
              </div>
            </div>

            {/* THE RIGHT ID CARD SECTION */}
            <div
              className={`relative flex h-full w-[30%] appearance-none items-center justify-center `}
            >
              <label
                for={"userAvatarFile"}
                className={`group flex h-[80%] w-[90%] cursor-pointer items-center justify-center `}
              >
                <img
                  style={{
                    transition: `filter 500ms  ease-in-out`,
                  }}
                  className={` h-full w-full rounded-full   border border-black object-cover font-[brandinkLight]  group-hover:opacity-[0.8] group-hover:grayscale-[100%]`}
                  src={
                    userAvatar.selected
                      ? URL.createObjectURL(userAvatar.selected) || <Loading />
                      : userAvatar.default[gender]
                  }
                  alt={`photo invalid`}
                />
                <CgArrowUp
                  style={{
                    transition: `opacity 300ms , transform 300ms ease`,
                  }}
                  className={`pointer-events-none absolute h-[50px] w-[50px]  translate-y-[25px] text-white opacity-0 group-hover:translate-y-[0] group-hover:opacity-[1]`}
                />
              </label>
              {/* <----- USE DEFAULT AVATAR -----> */}
              <div
                className={`group absolute bottom-0  aspect-square h-[30px] w-full flex-col items-center justify-center  ${
                  userAvatar.selected ? `flex` : `hidden`
                }`}
              >
                <div
                  style={{
                    transition: `background 300ms , color 400ms ease`,
                  }}
                  onClick={() =>
                    setUserAvatar((current) => ({
                      ...current,
                      selected: "",
                    }))
                  }
                  title={`use default `}
                  className={`flex aspect-square w-[25px]  cursor-pointer items-center justify-center rounded-full border border-black bg-white group-hover:border-white group-hover:bg-black group-hover:text-white `}
                >
                  <GiPerspectiveDiceSixFacesRandom className="" />
                </div>
              </div>
              {/* <---- THE USER AVATAR FILE INPUT ----> */}
              <input
                onChange={handleImageUpload}
                id={"userAvatarFile"}
                type={"file"}
                className={`pointer-events-none absolute w-full border-black opacity-0`}
              />
            </div>
          </div>
        </div>

        {/*<-- FORM --> */}
        <div
          className={`flex min-h-[40%] w-[100%] items-center justify-center border border-red-500  py-[10px]  `}
        >
          {/* <--- FORM INPUTS CONTAINER ---> */}
          <div
            type={"submit"}
            className={`relative grid h-max w-full grid-cols-2 grid-rows-4 items-center justify-center gap-x-[3px] gap-y-[6px] px-[5px]`}
          >
            {/* <--- FORM INPUTS  ---> */}

            {formInputs?.inputs.map((inputs, index) => (
              <>
                {index === 3 && formInputs.Req_Type === "up" && (
                  <div
                    className={` absolute right-0 flex h-[30px] w-[150px] translate-x-[-15px] translate-y-[22px] items-center justify-center rounded-full border bg-white bg-opacity-[0.9] px-[12px] font-[brandinkLight] `}
                  >
                    {/* SECURITY STARS */}
                    <div
                      className={`flex h-full w-[65%] items-center justify-center `}
                    >
                      {[{ fill: false }, { fill: false }, { fill: false }].map(
                        (star, index) => (
                          <AiFillStar size={20} className={`text-black`} />
                        )
                      )}
                    </div>
                    {/* EYE PASSWORD */}

                    <div
                      onClick={() => {
                        setShowHidePassword((current) => (current = !current));
                        setForminputs((current) => {
                          const update = { ...current };
                          const currentType = update.inputs[3].type;
                          const newType =
                            currentType === "password" ? "text" : "password";
                          update.inputs[3] = {
                            ...update.inputs[3],
                            type: newType,
                          };

                          return update;
                        });
                      }}
                      className={`group flex h-full w-[30%] cursor-pointer items-center justify-center `}
                    >
                      <div
                        style={{
                          transition: `transform 350ms ease`,
                        }}
                        className={`origin-bottom-center h-[2px] w-[17px] rotate-[-40deg] bg-black ${
                          showHidePassword ? `scale-x-0` : `scale-x-1`
                        }`}
                      />
                      <AiOutlineEye
                        size={20}
                        className={`absolute group-hover:${
                          showHidePassword && `text-green-500`
                        }`}
                      />
                    </div>
                  </div>
                )}
                <input
                  style={{
                    transition: `border 200ms , background 1500ms ease-in-out`,

                    appearance: "none",
                  }}
                  key={inputs.id}
                  name={inputs.id}
                  type={inputs.type}
                  placeholder={inputs.placeholder}
                  onChange={(e) => handleChange(index, e)}
                  className={` mx-[2px] h-[38px] rounded-full border border-white bg-white bg-opacity-[0.3] px-[16px]  font-[brandinkLight] placeholder-slate-500 outline-none focus:border-black  focus:bg-opacity-[0.6] focus:placeholder-slate-300 focus:shadow-inner focus:shadow-gray-200 ${
                    inputs?.span ? `col-span-1` : `col-span-4`
                  }`}
                />
              </>
            ))}
          </div>
        </div>

        {/* BUTTONS */}
        <div className={`flex h-[10%]  w-full items-center justify-around `}>
          {/* <----- SUBMIT BUTTON ----> */}
          <div
            onClick={() => handleSubmit()}
            style={{
              transition: `border 1000ms ease `,
            }}
            className={`group relative flex h-[82%] w-[60%] cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white bg-green-400 bg-opacity-[0.7] font-[Poppins] text-[18px] text-gray-800  hover:border-black `}
          >
            {/* OTHER WAYS TO SIGN UP */}
            <div className="z-[1] flex w-[40%]  items-center justify-around">
              {/* MAPPING THO LOGOS  */}
              {[CgGoogle, FaGithub, CgTwitter].map((MediaLogo, index) => (
                <MediaLogo
                  key={`mediaSignupLogo${index}`}
                  style={{
                    transition: `transform 350ms ease`,
                  }}
                  className="translate-x-[-12px] scale-[1.1] hover:rotate-[360deg]  hover:scale-[1.4] hover:fill-black"
                />
              ))}
            </div>

            <p
              style={{
                transition: `transform 220ms ease`,
              }}
              className="z-[1] flex h-full 
               w-[45%] items-center justify-start rounded-full px-[15px] group-hover:translate-x-[-15px]  "
            >
              {formInputs.Req_Type === "in" ? `log in` : `submit `}
            </p>

            {/* <---- ARROWS -----> */}
            {/* out bg*/}
            <CgArrowRight
              style={{
                transition: `transform 500ms , color 100ms ease-in-out`,
              }}
              className="absolute right-[20px] translate-x-0 scale-[1.3] text-black group-hover:translate-x-[-150px]  group-hover:scale-[55]  group-hover:text-white   "
            />
            {/* in */}
            <CgArrowRight
              style={{
                transition: `transform 1000ms , opacity 500ms ease`,
              }}
              className="absolute right-[35px] scale-[1.3] rounded-full  text-green-700  opacity-0 group-hover:translate-x-[15px] group-hover:opacity-[1]  "
            />
          </div>
          {/* <--- SWITCH  BUTTON  --->*/}
          <div
            style={{
              transition: `color 200ms , border 500ms , background 100ms ease`,
            }}
            onClick={() =>
              setForminputs((current) => ({
                ...current,
                Req_Type: formInputs.Req_Type === "in" ? "up" : "in",
              }))
            }
            className={`group relative  flex h-[82%] w-[35%] cursor-pointer  select-none overflow-hidden rounded-full border  border-black bg-transparent bg-white bg-opacity-[0.5]  pl-[15px]  font-[Poppins] text-[18px] hover:border-white  hover:bg-black hover:text-gray-400`}
          >
            {/* BTN TEXT */}
            <div
              style={{
                transition: `transform 400ms 500ms, opacity 400ms 500ms ease `,
              }}
              className={`flex h-full w-[50%] items-center justify-center pl-[20px] group-hover:translate-x-[12px] group-hover:opacity-[0.4]`}
            >
              sign
            </div>
            {/* BTN TYPE */}
            <div
              style={{
                transition: `transform 500ms ease`,
              }}
              className={` flex h-[200%] w-[40%] flex-col  items-start  justify-start ${
                formInputs.Req_Type === "up"
                  ? `translate-y-[-0]`
                  : `translate-y-[-50%]`
              }`}
            >
              {["in", "up"].map((reqInUp, index) => (
                <p
                  key={`upinKeys${reqInUp}`}
                  className={`flex h-1/2 w-full  items-center justify-start pl-[7px] 
                  transition-transform delay-[500ms] group-hover:translate-x-[5px] group-hover:font-semibold`}
                >
                  {reqInUp}
                </p>
              ))}
            </div>
            {/* BTN ARROWS */}
            <div
              style={{
                transition: `transform 400ms 100ms, left 500ms , color 200ms ease`,
              }}
              className={`absolute left-[80%] flex h-full   w-[15%] scale-[1.1] items-center justify-end group-hover:text-white`}
            >
              {/* ARROW OUT */}
              <IoIosArrowForward
                style={{
                  transition: `transform 500ms 100ms , opacity 2000ms  , color 60ms  ease-in-out `,
                }}
                className=" translate-x-[10%] scale-[1.6]  group-hover:translate-x-[250%] group-hover:scale-[1.5] group-hover:opacity-0 "
              />

              {/* ARROW IN */}
              <IoIosArrowForward
                style={{
                  transition: `transform 200ms 300ms, opacity 200ms 300ms ease `,
                }}
                className=" translate-x-[-200px]  border-red-500 opacity-0 group-hover:translate-x-[-120px] group-hover:scale-[1.2]  group-hover:opacity-[1]"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* <-------- THE AVATARS ARTWORK -------> */
  const RegisterArt = () => {
    const [PageLoaded, setPageLoaded] = React.useState(false);
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

  const Policy = () => {
    <div className="absolute hidden lg:flex"></div>;
  };

  //-----------MAIN SECTION DISPLAY-------------
  return (
    <div
      className={`  my-[50px] flex min-h-[530px] flex-wrap items-center justify-center border `}
    >
      {!loged ? (
        <>
          {/* Artwork */}
          <RegisterArt />
          {/* Register Login Form */}
          <Routes>
            <Route path="/" element={<RegisterForm />} />
            <Route path="/emailVarification" element={<RegisterForm />} />
            <Route path="GetStarted" element={<RegisterForm />} />
          </Routes>
          {/* POLICY*/}
          <Policy />
        </>
      ) : (
        navigate("./")
      )}
    </div>
  );
}
