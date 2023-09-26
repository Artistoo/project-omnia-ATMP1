import React from "react";
import DOMPurify from "dompurify";
import axios from "axios";
import { useCurrentApiQuery } from "../../../redux/API";
import { useCreateUserMutation, useLoginMutation } from "../../../redux/API";
import { Router, useNavigate, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import userStateSlice, { updateUserState } from "../../../redux/userStateSlice";
import { userStateContext } from "../../../context/Data_context.jsx";
//_____________________API_____________________________
import { useGenerateResetPasswordLinkMutation } from "../../../redux/API";
//_____________________ICONS____________________
import { CgArrowRight, CgArrowUp, CgGoogle, CgTwitter } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { AiFillStar, AiOutlineEye, AiOutlineStar } from "react-icons/ai";

// ___________________ ASSETS ____________________
import Gender from "../../../assets/icons/gender.jsx";

// _____________________Data ____________________
import {
  Avatars,
  AvatarArray,
  validEmailServiceProviders,
} from "../../../../data";

//__________________UTILITIES_______________________
import { validEmail } from "../../../utils/validity";

// _____________AUTHENTICATION FORM ____________________
export default function AuthenticateForm({
  Error,
  form,
  location,
  useMyLocation,
}) {
  const navigate = useNavigate();

  const { formError, setFormError } = Error;
  const { formData, setformData } = form;
  const { locationData, isLoading } = location;
  const { userGeoLocation, setUserGeoLocation } = useMyLocation;
  /* <---------------- CONTEXT -----------------> */

  const dispatch = useDispatch();
  const userSlice = useSelector((c) => c.userState?.current_user);

  const [
    Login,
    {
      isLoading: isLogingIn,
      data: CurrentUser,
      isError: isSendingUserDataError,
    },
  ] = useLoginMutation();
  const [
    generateLink,
    {
      isLoading: isGenerating,
      isSuccess: LinkGenerated,
      error: GeneratingResetPasswordLinkError,
    },
  ] = useGenerateResetPasswordLinkMutation();

  /* <--------------  REACT INPUT REF -----------> */
  const Password = React.useRef(null);
  const UserName = React.useRef(null);
  const Email = React.useRef(null);
  const RepeatPassword = React.useRef(null);
  const LastName = React.useRef(null);

  /* <--------------  REACT STATES -----------> */

  const [name, setName] = React.useState({
    name: ["daniel", "albert", "Isac", "mark", "martin"],
    index: 0,
  });
  /* TODO : make the hide show password button work  */
  const [ResetPasswordLink, setResetPasswordLink] = React.useState("");
  const [showHidePassword, setShowHidePassword] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [gender, setGender] = React.useState("male");
  const [ProfileName, setProfileName] = React.useState("");
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
  const [formInputs, setForminputs] = React.useState({
    Req_Type: "up",
    inputs: [
      {
        id: "username",
        placeholder: "user name",
        value: "",
        type: `text`,
        display: "up",
        ready: {
          match: (value) => /^[^0-9]*$/.test(value),
          go: false,
          error: false,
          errorMSG: `user name can't contain numbers`,
        },
        ref: UserName,
        leave: `translate-x-[-150px] opacity-0`,
        span: `col-span-2 sm:col-span-1`,
      },
      {
        id: "lastname",
        placeholder: "lastname",
        value: "",
        type: `text`,
        display: "up",
        ready: {
          match: (value) => /^[^0-9]*$/.test(value),
          go: false,
          error: false,
          errorMSG: `lastname can't contain numbers`,
        },
        ref: LastName,
        leave: `translate-x-[150px] opacity-0`,
        span: `col-span-2 sm:col-span-1`,
      },
      {
        id: "email",
        placeholder: "your email",
        value: "",
        type: `email`,
        display: "in up fp",
        ready: {
          match: (value) => validEmail(value),
          go: false,
          error: false,
          errorMSG: `invalid email , please make sure the email is valid before trying again`,
        },
        ref: Email,
        leave: `translate-y-[-150px] opacity-0`,
      },
      {
        id: "password",
        placeholder: "password",
        value: "",
        type: "password",
        display: "in up",
        ready: {
          match: (value) => /^.{6,}$/.test(value),
          go: false,
          error: false,
          errorMSG: `please make sure the password is at least 6 characters long`,
        },
        ref: Password,
        leave: `translate-y-[150px] opacity-0`,
        stars: 0,
        Criteria: [/[a-z]/, /[A-Z]/, /\d/, /\W/],
      },
      {
        id: "repeatPassword",
        placeholder: "repeat password",
        value: "",
        type: `password`,
        display: "up",
        ready: {
          match: (password) => password === Password.current?.value,
          go: false,
          error: false,
          errorMSG: `passwords does not match`,
        },
        ref: RepeatPassword,

        leave: `translate-y-[150px] opacity-0`,
      },
    ],
  });

  /* <------------------ CONTEXT ----------------> */
  const userState = React.useContext(userStateContext);

  /* <------------------ VARIABLES ----------------> */
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
  //RESET THE VALUE FOR EACH INPUT WHEN THE FORM REQ TYPE CHANGE
  React.useEffect(() => {
    setForminputs((c) => ({
      ...c,
      inputs: formInputs.inputs.map((x) => {
        const updated = { ...x };
        if (updated.ref && updated.ref.current) {
          updated.ref.current.value = "";
        }
        return updated;
      }),
    }));
  }, [formInputs.Req_Type]);

  React.useEffect(() => {
    if (ResetPasswordLink) {
      localStorage.setItem("Link", ResetPasswordLink);
    }
  }, [ResetPasswordLink]);

  //INPUT EVENTS
  const handleBlur = (inputs, e) => {
    if (inputs.ready.error) {
      e.target.style.border = "solid red thin";
      setFormError(inputs.ready.errorMSG);
    } else {
      /* SETTING THE INPUT TO FALSE IF EMPTY */
      if (!inputs.value) {
        e.target.style.border = "solid red thin";
      } else {
        e.target.style.border = "solid green thin";
      }
      /* CLEARING THE TIME OUT AFTER 1 SECOND */
      const validTimer = new Promise((resolve) => {
        const Timer = setTimeout(() => {
          e.target.style.border = "solid white thin";
          e.target.style.border = e.target.style.border;
          resolve(Timer);
        }, [1000]);
      }).then((e) => clearTimeout(e));
    }
    if (formInputs.inputs.every((x) => x.ready.error === false)) {
      setFormError("");
    }
    setFocused(false);
  };

  const handleFocus = (inputs) => {
    if (!inputs.ready.error) {
      setFormError("");
    } else {
      setFormError(inputs.ready.errorMSG);
    }
    setFocused(true);
  };

  const handleChange = (index, e) => {
    const { value } = e.target;
    const { sanitize } = DOMPurify;
    const sanitizedValue = sanitize(value);
    setForminputs((current) => {
      const updated = [...current.inputs];
      const validation = updated[index].ready.match(sanitizedValue);

      //UPDATING THE PASSWORD SECURITY STARS
      const matchedCriteria = updated[3].Criteria.filter((cre) =>
        cre.test(value)
      );

      //UPDATING THE ERROR STATE
      updated[index] = {
        ...updated[index],

        value: sanitizedValue,

        stars: matchedCriteria.length,
        ready: {
          ...updated[index].ready,
          error: !validation,
          go: !!validation,
        },
      };

      // Trigger validation for repeat password whenever any of the password inputs change
      if (formInputs.inputs[4].value != formInputs.inputs[3].value) {
        formInputs.inputs[4] = {
          ...formInputs.inputs[4],
          ready: {
            ...formInputs.inputs[4].ready,
            error: true,
            go: false,
          },
        };
      }

      //Adding some Style on input Error
      if (formInputs.inputs[index].ready.error) {
        e.target.style.border = "solid red thin";
        setFormError(formInputs.inputs[index].ready.errorMSG);
      } else {
        e.target.style.border = "solid green thin";
        focused
          ? (e.target.style.border = "solid green thin")
          : setTimeout(
              () => (e.target.style.border = "solid black thin"),
              [1500]
            );

        if (formInputs.inputs.every((x) => !x.ready.error)) {
          setFormError("");
        } else current.Error = current.Error;
      }

      return {
        ...current,
        inputs: updated,
      };
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUserAvatar((prevState) => ({
      ...prevState,
      selected: file,
    }));
  };

  const RequiredData = formInputs.inputs.filter((x) =>
    x.display.includes(formInputs.Req_Type)
  );

  const RequiredDataReady = RequiredData.every((x) => x.ready.go);

  /* HANDLING FORM SUBMIT */
  const handleSubmit = async (e) => {
    if (!RequiredDataReady) {
      /* ADDING SOME FUNCTINALITY FOR THE INPUTS THAT AREN'T READY TO SUBMIT  */
      setForminputs((current) => {
        const update = [...current.inputs];
        update.map((inp) => {
          if (!inp.ready.go) {
            if (inp.ref && inp.ref.current) {
              /*  inp.ref.current.classList.add("invalidInput"); */
              inp.ref.current.style.border = "solid red thin";
              let excuted = false;
              const invalidInputTimer = setTimeout(() => {
                inp.ref.current.style.border = "solid white thin";
                inp.ref.current.style.border = inp.ref.current.style.border;
                excuted = true;
              }, 1500);
              excuted && clearTimeout(invalidInputTimer);
            }
          }
        });
        return {
          ...current,
          inputs: update,
        };
      });
    } else {
      let data;
      AuthenticationHandlers[formInputs.Req_Type](data);
    }
  };

  const AuthenticationHandlers = {
    up: (data) => {
      /* <------ REGISTER REQUIEST -------> */
      data = {};
      RequiredData.map((input) => (data[input.id] = input.value));
      /* FORM DATA */
      data.Avatar = userAvatar.selected
        ? URL.createObjectURL(userAvatar.selected)
        : userAvatar.default[gender];
      data.gender = gender;
      data.Location = userGeoLocation.allow
        ? locationData?.country
        : "blue planet";
      data.displayName = ProfileName;
      setformData(data);
    },
    in: (data) => {
      try {
        data = {};
        RequiredData.map((input) => (data[input.id] = input.value));
        Login(data).then((data) => {
          console.log(data);
          if (data?.data?.user) {
            const { user } = data.data;
            console.log(user);
            localStorage.setItem("user", JSON.stringify(user));
            navigate(`/Profile/${user?._id}`);
          } else if (data?.error?.status === 404) {
            setFormError(data?.error?.data?.err);
            console.log(data?.error);
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    fp: (data) => {
      generateLink({ userEmail: RequiredData[0]?.value })
        .then((data) => {
          console.log(data);
          if (data?.data) {
            localStorage.setItem("Link", JSON.stringify(data?.data?.data));
            localStorage.setItem(
              "userEmail",
              JSON.stringify(RequiredData[0]?.value)
            );
            console.log(data?.data);
          } else if (data?.error) {
            console.log(data?.error);
            setFormError(LinkGenerated?.data?.error);
          }
        })
        .catch((err) => console.log(err));
    },
  };











  
  return (
    <div
      className={`flex h-[500px] min-h-[470px] w-[80%]   min-w-[450px] max-w-[600px]
    flex-col items-center  justify-center gap-y-[20px] rounded-md bg-gradient-to-tr
    from-gray-100 via-gray-300
    to-gray-200 px-[22px] py-[5px] backdrop-blur-[50px] md:w-[40%] `}
    >
      {/*<----------- FORM TITLE AND CARD ----------->*/}
      <div
        style={{
          transition: `transform 320ms ease`,
        }}
        className={`flex h-[120px] w-full items-center   justify-between  ${
          formInputs.Req_Type != "up"
            ? `translate-y-[20px]`
            : `translate-y-[-30px]`
        }`}
      >
        {/* <----- REGISTER TEXT -----> */}
        <div
          className={`relative flex h-full w-[48%] select-none flex-col overflow-hidden   font-[OpenSauce] text-[33px]  font-bold leading-[30px] text-gray-800 `}
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
            className={`absolute h-[300%] w-full  `}
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

        {/* <----- USER CREDINTIALS ------> */}
        <div
          style={{
            transition: `opacity 250ms ease`,
          }}
          className={` relative flex h-full w-1/2  items-center justify-around rounded-md border border-black bg-gradient-to-tl from-gray-200 to-white ${
            formInputs.Req_Type != "up" && "pointer-events-none opacity-0"
          }`}
        >
          {/*<-- THE LEFT ID CARD SECTION --> */}
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
                defaultValue={
                  name.name[Math.floor(Math.random() * name.name.length)]
                }
                onChange={(e) => setProfileName(e.target.value)}
                maxLength={8}
                className="w-[70%] appearance-none truncate bg-transparent px-[7px] outline-none valid:text-green-600 focus:border-none focus:text-black"
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
            <div className="relatvie group h-[30px] w-full scale-[0.85] overflow-hidden rounded-full border border-black py-[8px]">
              <p>
                {userGeoLocation.allow
                  ? locationData && isLoading
                    ? `loading`
                    : locationData?.country
                  : "blue planet"}
              </p>
              <div
                onClick={() => {
                  setUserGeoLocation((c) => ({
                    ...c,
                    allow: !userGeoLocation.allow,
                  }));
                }}
                style={{
                  transition: `transform 150ms , opacity 150ms ease`,
                }}
                className={`absolute top-0 flex h-full w-full  cursor-pointer  items-center justify-center rounded-full bg-green-400 text-[10px] font-semibold text-gray-800 opacity-0  group-hover:opacity-[1]`}
              >
                <p>
                  {userGeoLocation.allow ? `blue planet` : `Fetch my Location`}
                </p>
              </div>
            </div>
          </div>

          {/*<-- THE RIGHT ID CARD SECTION --> */}
          <div
            className={`relative flex h-full w-[30%] appearance-none items-center justify-center `}
          >
            <label
              htmlFor={"userAvatarFile"}
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

      {/*<------------------ FORM -----------------> */}
      <div
        className={`flex min-h-[40%] w-full  translate-y-[-20px] items-center justify-center   `}
      >
        {/* <--- FORM INPUTS CONTAINER ---> */}
        <div
          className={`relative grid h-max w-full grid-cols-2 grid-rows-4 items-center justify-center  gap-y-[6px] overflow-hidden `}
        >
          {/* <--- FORM INPUTS MAPPING  ---> */}
          {formInputs?.inputs.map((inputs, index) => (
            <div
              key={inputs.id}
              style={{
                transition: `border 200ms , background 1500ms , transform 300ms , opacity 300ms , height 150ms ease-in-out`,
              }}
              className={`relative flex h-[38px] w-full items-center justify-center 
        ${inputs?.span ? `col-span-1` : `col-span-4`} ${
                inputs.display.includes(formInputs.Req_Type) ? "" : inputs.leave
              } ${
                (index === 2 || index === 3) && formInputs.Req_Type === "in"
                  ? `my-[6px] h-[42px] translate-y-[-15px]`
                  : `my-[0px] translate-y-[0px]`
              }`}
            >
              {/* Password */}
              {index === 3 && formInputs.Req_Type === "up" && (
                <div
                  className={` absolute right-0 z-[1]  mr-[-5px] flex h-[30px] w-[150px] translate-x-[-13px]  items-center justify-center rounded-full border border-black bg-opacity-[1] bg-gradient-to-tl from-white to-gray-200 px-[12px] font-[brandinkLight] opacity-[1]`}
                >
                  {/* SECURITY STARS */}
                  <div
                    className={`flex h-full w-[65%] items-center justify-center `}
                  >
                    {[{ fill: false }, { fill: false }, { fill: false }].map(
                      (star, index) => {
                        return (
                          <div
                            key={`SecurityStars${index}`}
                            className={`flex h-full w-[30%] items-center justify-center `}
                          >
                            {/* STAR ONE */}

                            <AiOutlineStar
                              style={{
                                transition: `color 200ms ease`,
                              }}
                              className={`absolute z-[1] h-full w-full scale-[0.7] ${
                                index + 1 < formInputs.inputs[3].stars
                                  ? `text-yellow-500 `
                                  : `text-black `
                              }`}
                            />
                            {/* STAR TWO */}
                            <AiFillStar
                              style={{
                                transition: `opacity 130ms , color 130ms ease `,
                              }}
                              className={`absolute h-full w-full scale-[0.7]  ${
                                index + 1 < formInputs.inputs[3].stars
                                  ? `text-yellow-300 opacity-[1]`
                                  : `text-black opacity-0`
                              }`}
                            />
                          </div>
                        );
                      }
                    )}
                  </div>
                  {/* EYE PASSWORD */}
                  <div
                    onClick={() => {
                      setShowHidePassword((current) => {
                        return (current = !showHidePassword);
                      });
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
                    className={`group  z-[1] flex h-full w-[30%] cursor-pointer items-center justify-center`}
                  >
                    <div
                      style={{
                        transition: `transform 350ms ease`,
                      }}
                      className={`origin-bottom-center h-[2px] w-[17px] rotate-[-40deg] bg-black  ${
                        showHidePassword ? `scale-x-0` : `scale-x-1`
                      }`}
                    />
                    <AiOutlineEye
                      size={22}
                      className={`absolute  ${
                        showHidePassword ? `text-green-500` : `text-gray-700`
                      }`}
                    />
                  </div>
                </div>
              )}

              {/* <----- INPUTS ------> */}
              <input
                style={{
                  transition: `border 200ms , background 1500ms , transform 300ms , opacity 300ms , height 150ms ease-in-out`,
                }}
                ref={inputs.ref}
                name={inputs.id}
                type={inputs.type}
                placeholder={inputs.placeholder}
                /*  INPUT ON BLUR  */
                onBlur={(e) => handleBlur(inputs, e)}
                onFocus={() => handleFocus(inputs)}
                onInput={(e) => handleChange(index, e)}
                className={` mx-[2px] h-full w-full rounded-full border border-white bg-white bg-opacity-[0.3] px-[16px]  font-[brandinkLight] placeholder-slate-500 outline-none focus:border-black  focus:bg-opacity-[0.6] focus:placeholder-slate-300 focus:shadow-inner focus:shadow-gray-200 `}
              />

              {/* Forget Password */}
              {index === 3 && formInputs.Req_Type === "in" && (
                <div
                  className={`group absolute top-[120%] flex h-[35px] w-[90%] items-center justify-start font-[brandinkLight] text-[15px] `}
                >
                  <p
                    onClick={async () => {
                      setForminputs((current) => {
                        const updated = { ...current };
                        updated.Req_Type = "fp";
                        return updated;
                      });
                    }}
                    style={{
                      transition: `opacity 500ms , transform 200ms ease`,
                    }}
                    className={`cursor-pointer group-hover:translate-x-[18px]`}
                  >
                    forget Password
                  </p>
                  <IoIosArrowForward
                    style={{
                      transition: `opacity 500ms , transform 200ms ease`,
                    }}
                    className={`absolute left-0 translate-x-[-15px]  opacity-0 group-hover:translate-x-[2px] group-hover:opacity-[1]`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/*<---------------- BUTTONS ----------------> */}
      <div
        className={`absolute bottom-[15px]  flex h-[10%] w-[90%] items-center justify-around`}
      >
        {/* <----- SUBMIT BUTTON ----> */}
        <div
          onClick={handleSubmit}
          style={{
            transition: `border 1000ms ease `,
          }}
          className={`group relative flex h-[82%] w-[60%] cursor-pointer select-none items-center justify-center overflow-hidden rounded-full border border-white bg-green-400 bg-opacity-[0.7] font-[Poppins] text-[18px] text-gray-800  hover:border-black `}
        >
          {/* OTHER WAYS TO SIGN UP */}
          <div
            className={`z-[1] flex w-[40%]  items-center ${
              isLogingIn ? `Registering gap-x-[0px]` : `gap-x-[16px]`
            } justify-center`}
          >
            {/* MAPPING THO LOGOS  */}
            {[CgGoogle, FaGithub, CgTwitter].map((MediaLogo, index) => (
              <MediaLogo
                key={`mediaSignupLogo${index}`}
                style={{
                  "--sendingUserDataDelay": `${index}`,
                  transition: `transform 350ms ease`,
                }}
                className={`hover:fill-blackorigin-center  translate-x-[-12px]  hover:rotate-[360deg] hover:scale-[1.4] ${
                  isLogingIn || isGenerating
                    ? ` Registering scale-[0.3] rounded-full border border-black bg-black p-[12px]`
                    : `scale-[1.1]`
                }`}
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
          className={`group relative  flex h-[82%] w-[35%] cursor-pointer select-none  overflow-hidden  rounded-full border border-black bg-transparent  bg-white  bg-opacity-[0.5] pl-[15px] font-[Poppins]  text-[18px] hover:border-white hover:bg-black hover:text-gray-400 `}
        >
          {formInputs.Req_Type != "fp" ? (
            <>
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
            </>
          ) : (
            <div className="flex h-full w-full translate-x-[-7.5px] items-center justify-center text-[0.9rem]">
              <p>Remambered !</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
