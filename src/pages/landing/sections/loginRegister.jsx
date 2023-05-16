import React from "react";
import axios from "axios";
//------------ICONS ----------------
import { CgArrowAlignH, CgArrowBottomRight, CgGoogle } from "react-icons/cg";
import { FaMale, FaFemale } from "react-icons/fa";
//-----------ASSETS ------------
import Stars from "../../../assets/img/ThreeDStars.png";
//-----------GLOBAL STATES ---------------
import { useSelector } from "react-redux";

//-----------JSX ------------------
export default function loginRegister() {
  //-----------COMPONENTS-------------
  const RegisterForm = () => {
    const [logReg, setLogReg] = React.useState("reg");
    const [forminputs, setForminputs] = React.useState([
      {
        placeHolder: `user name`,
        type: "text",
        uses: ["reg"],
        style: `col-span-2`,
        valid: false,
        empty: true,
        onDisapear: `translate-x-[-400px] opacity-0`,
      },
      {
        placeHolder: `nickname`,
        type: "text",
        uses: ["reg"],
        style: `col-span-2`,
        valid: false,
        empty: true,
        onDisapear: `translate-x-[400px]  opacity-0`,
      },
      {
        placeHolder: `email`,
        type: "email",
        uses: ["reg", "log", "FP"],
        style: `col-span-4`,
        valid: false,
        empty: true,
        onDisapear: `translate-x-[400px]  opacity-0`,
      },
      {
        placeHolder: `password`,
        type: "password",
        uses: ["reg", "log"],
        style: `col-span-4`,
        valid: false,
        empty: true,
        onDisapear: `translate-y-[-400px]  opacity-0`,
      },
      {
        placeHolder: `repeat password`,
        type: "password",
        uses: ["reg"],
        style: `col-span-4`,
        valid: false,
        empty: true,
        onDisapear: `translate-y-[200px]  opacity-0`,
      },
    ]);
    const [userData, setUserData] = React.useState([
      { placeHolder: `user name`, data: "" },
      { placeHolder: `nickname`, data: "" },
      { placeHolder: `email`, data: "" },
      { placeHolder: `password`, data: "" },
      { placeHolder: `repeat password`, data: "" },
    ]);
    const [transitionAnimation, setTransitionAnimation] = React.useState("reg");
    React.useEffect(() => {
      if (logReg === "log") {
        setTransitionAnimation("log");
      } else {
        setTransitionAnimation("reg");
      }
    }, [logReg]);

    const userInterest = useSelector((state) => state.intReducer.userInterest);

    return (
      <div
        className={`min-w-[260px] border w-[95%] md:w-[500px] max-h-[550px] min-h-[480px] flex items-center justify-start md:translate-x-[-300px]  bg-white m-auto flex-col rounded-[15px] p-[20px] gap-y-[20px] relative`}
      >
        {/* --------- TEXT --------- */}
        <div
          className={`w-[50%] h-[180px]  flex items-start justify-start  font-[Now] uppercase text-[29px] self-start translate-x-[10px] tracking-tighter leading-[28px] m-[20px] mb-[50px]  overflow-hidden text-start`}
        >
          <div
            style={{
              transition: `transform 1000ms ease-in-out`,
            }}
            className={`absolute flex items-center justify-center ${
              transitionAnimation === "log"
                ? `translate-y-[-85px]`
                : "translate-y-[10px}"
            } gap-y-[30px] flex flex-col`}
          >
            <p>Register a new user Account</p>
            <p>Log in to your Account</p>
          </div>
        </div>

        {/* --------- FORM --------- */}
        <div
          className={`grid grid-cols-4 gap-x-[5px] gap-y-[12px] w-[90%] m-[20px] translate-y-[-40px] overflow-hidden min-h-[200px] `}
        >
          <>
            {forminputs.map((formInp, index) => (
              <input
                key={`LoginForm${formInp}${index}`}
                onChange={(e) => {
                  const updatedData = [...userData];
                  updatedData[index].data = e.target.value;
                  setUserData(updatedData);
                }}
                style={{
                  transition: `border 300ms , transform 900ms , opacity 400ms ease-in-out`,
                }}
                placeholder={formInp.placeHolder}
                type={formInp.type}
                className={`${
                  formInp.style
                } font-[BrandinkLight] h-[40px] text-[16px]  rounded-full bg-gradient-to-tr from-gray-100 to-gray-200  focus:bg-white focus:outline-none border py-[7px] px-[15px] focus:border-black border-white  ${
                  formInp.uses.join("").includes(transitionAnimation)
                    ? `translate-x-0 translate-y-0 `
                    : formInp.onDisapear
                }`}
              />
            ))}
          </>
        </div>

        {/* ------ SIGN OPTIONS --------- */}
        <div
          className={`flex  h-[120px] w-[90%] items-center justify-between  translate-y-[-50px]`}
        >
          {/* <-- LOGIN REGISTER SWITCH OPTION --> */}
          <span
            className={`font-[brandinkLight] w-max text-[14px]  cursor-pointer user-none`}
          >
            <p
              onClick={() =>
                setTransitionAnimation(
                  transitionAnimation === "reg" ? `log` : "reg"
                )
              }
            >
              {transitionAnimation === "log"
                ? `register a new Account`
                : `log in instead `}
            </p>
          </span>

          {/* <-- GOOGLE AUTH OPTION --> */}
          <span className={`font-[brandinkLight] w-max flex `}>
            <div
              style={{
                transition: `background 500ms , font 300ms , border 550ms ease-in-out`,
              }}
              className={`w-max min-w-[200px] px-[19px] py-[7px] flex justify-between text-[13px] gap-x-[15px] border bg-black text-gray-100 hover:bg-gradient-to-l hover:bg-transparent hover:border-black  border-transparent hover:text-black hover:backdrop-blur-lg cursor-pointer rounded-full items-center overflow-hidden relative `}
            >
              <CgGoogle size={20} />
              <p>
                {transitionAnimation === "log"
                  ? `login using google`
                  : `sign up using google`}
              </p>
            </div>
          </span>
        </div>

        {/* ------ SIGNUP BUTTON --------- */}
        <button
          style={{
            transition: `background 400ms , border 400ms , font 200ms ease-in-out`,
          }}
          className={` w-[90%] rounded-full h-[47px]  py-[9px]  bg-black flex items-center justify-center border text-white font-[Poppins] px-[15px] hover:text-gray-800 hover:bg-transparent hover:border-black cursor-pointer relative group`}
        >
          <p>{transitionAnimation === "log" ? `login` : "signup"}</p>
          <p
            className={`absolute right-[20px] h-[26px] text-gray-900 text-[12px] justify-center items-center flex text-semibold font-[Poppins] aspect-square bg-green-100 rounded-full border border-transparent group-hover:border-black group-hover:bg-transparent transition-opacity duration-[300ms] ${
              userInterest?.length ? `opacity-[1]` : `opacity-0 `
            }`}
          >
            {userInterest?.length}
          </p>
        </button>
      </div>
    );
  };
  const RegisterArt = () => {
    const [RegisterQuestions, setRegisterQuestions] = React.useState({
      index: 0,
      content: [
        {
          Q: "select your gender",
          ST: `select your gender and help us personalize your jolly Blab Expirence`,
          options: [
            { A: "male", style: { color: "blue-500" }, icon: FaMale },
            { A: "female", style: { color: "pink-400" }, icon: FaFemale },
          ],
        },
      ],
    });

    return (
      <div
        className={`md:w-[60%] w-full md:h-full h-[800px]  min-h-[400px]    right-[0px] flex items-center justify-center flex-wrap  absolute md:z-0 z-[-1] `}
      >
        <img
          src={Stars}
          className={`md:w-[600px] w-[800px] md:h-auto blur-md absolute  pointer-events-none`}
        />
        {/* LIGHT SPOT EFFECT */}
        <div
          className={`w-[400px] h-[400px] bg-blue-600 opacity-[0.5] absolute rounded-full z-[-1] blur-[120px] pointer-events-none`}
        />

        {/* ---- QUESTIONS BOX -----  */}
        <div
          className={` flex-col items-start justify-center min-w-[470px] w-[450px] min-h-[260px] backdrop-blur-lg bg-opacity-[0.9] bg-white  rounded-lg md:flex hidden `}
        >
          {/* --------------TITLE OF THE QUESTION ------------ */}
          <div
            className={`flex w-full items-center justify-center gap-x-[30px] mb-[12px]`}
          >
            <h2
              className={`font-[BrandinkLight] text-[30px] w-1/2 leading-[25px]`}
            >
              SELECT YOUR GENDER
            </h2>
            <CgArrowBottomRight size={70} />
          </div>
          {/* --------------TEXT OF THE QUESTION ------------ */}
          <div
            className={` px-[50px] w-full font-[Poppins] leading-[17px] flex items-center justify-center mb-[55px]`}
          >
            <p className={`max-w-[90%] w-[350px]`}>
              select your gender and help us personalize your expirance in jolly
              blab
            </p>
          </div>
          {/* --------------OPTIONS OF THE QUESTION ------------ */}
          <div
            className={`w-[80%] mx-auto flex items-center justify-around gap-x-[15px] text-[16px]`}
          >
            <button
              className={`border-blue-500 py-[6px] px-[55px] rounded-full border hover:bg-blue-600 hover:text-white `}
            >
              MALE
            </button>
            <button
              className={`border-pink-500 py-[6px] px-[55px] rounded-full hover:backdrop-blur-lg border hover:bg-pink-600 hover:text-gray-200 cursor-pointer `}
            >
              FEMALE
            </button>
          </div>
        </div>
      </div>
    );
  };
  //-----------MAIN SECTION DISPLAY-------------
  return (
    <div
      className={` m-[15px] flex flex-wrap min-h-[520px] items-center jsutify-between md:mb-auto mb-[50px]`}
    >
      {/* Register Login Form */}
      <RegisterForm />
      {/* Artwork */}
      <RegisterArt />
    </div>
  );
}
