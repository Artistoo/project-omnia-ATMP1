import React from "react";
import { MdCancel, MdChangeCircle, MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";

/* Components */
import SettingsOptions from "../../components/SettingsOptions.jsx";
import InputToggle from "../../components/InputToggle.jsx";

/* <--- CONTEXT ----> */
import user from "../../context/userState.jsx";
import {
  useConfirmPasswordMutation,
  useCurrentApiQuery,
  useLogOutQuery,
} from "../../redux/API";

/*<--- ICONS ---->  */
import {
  IoMdColorWand as Apperance,
  IoIosFingerPrint as Privacy,
} from "react-icons/io";
import { BsArrowRight, BsPersonGear as Personal } from "react-icons/bs";
import { MdSecurity as Secuirty } from "react-icons/md";
import { BiArrowBack, BiCheckCircle, BiError, BiLogOut } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { changeUserUtility } from "../../utils/changeUser";
import { ModelContext } from "../../context/Dialog.jsx";
import { RxArrowTopRight } from "react-icons/rx";

/* ___________ THE JSX FOR THE SETTINGS PAGE ____________  */
export default function Settings() {
  const navigate = useNavigate();

  /* REDIRECTING THE USER TO THE LOG IN PAGE IF NOT LOGGED */
  React.useEffect(() => {
    if (!user) {
      navigate(`/user/AccountAuth`);
    }
  }, [user]);

  const [rotateOnTyping, setRotateOnTyping] = React.useState(0);

  const [Parameter, setParameter] = React.useState({
    currentlySelected: 0,
    ParameterCategories: [
      {
        Title: "Account",
        About: "edit your Personal information and profile display settings",
        Icon: Personal,
        match: 0,
        style: { bg: `bg-green-300` },
        ref: React.createRef(),
        Settings: [
          {
            param: "change user name",
            placeholder: `select a new name`,
            type: String,
            valid: (value) => !/\s/g.test(value),
            inputType: "text",
            value: "",
          },
          {
            param: "change lastname",
            placeholder: `select a new lastName`,
            type: String,
            valid: (value) => !/\s/g.test(value),
            inputType: "text",
            value: "",
          },
          {
            param: "delete account",
            placeholder: `select a new lastName`,
            type: "BTN",
            valid: () => true,
            inputType: "text",
            value: "",
          },
        ],
      },

      {
        Title: "Security",
        About: "password and security based settings  , protect your account ",
        Icon: Secuirty,
        match: 0,
        style: { bg: `bg-pink-300` },
        ref: React.createRef(),
        Settings: [
          {
            param: "change password",
            placeholder: `select a new password`,
            valid: (val, confirmed, strength) =>
              [val?.length ? [confirmed ? strength > 1 : true] : true]
                .flat()
                .every(Boolean),
            inputType: "password",
            type: String,
            value: "",
            strength: (value) =>
              [/[0-9]/, /[a-z]/, /^.{8,}$/, /[A-Z]/].filter((test) =>
                test.test(value)
              ).length,
          },
          {
            param: "enable email verification",
            type: Boolean,
            value: false,
            valid: () => true,
          },
        ],
      },
      {
        Title: "Apperance",
        About:
          "make your profile apperance shine unique using the apperance Settings",
        Icon: Apperance,
        match: 0,
        style: { bg: `bg-yellow-200` },
        ref: React.createRef(),
        Settings: [
          {
            param: "edit your profile cover theme",
            type: "Picker",
            valid: () => true,
            value: "",
          },
          {
            param: "make the text on your profile larget or smaller",
            type: "enum",
            valid: () => true,
            value: [],
            choise: [1, 2, , 3, 4],
          },
        ],
      },
      {
        Title: "Privacy",
        About: "set up your privacy settings and account parameters ",
        Icon: Privacy,
        match: 0,
        style: { bg: `bg-purple-500` },
        ref: React.createRef(),
        Settings: [
          {
            param: "who can find me ?",
            type: "enum",
            valid: () => true,
            value: [],
            choise: ["my friends", "my friends friends", "no noe", "every one"],
          },
          {
            param: "i wanna recevie email about",
            type: "enum",
            valid: () => true,
            value: [],
            choise: [
              "updates and new features",
              "when someone join my channel",
              "security alerts",
            ],
          },
          {
            param: "hide my Location",
            type: Boolean,
            valid: () => true,
            value:
              JSON.parse(localStorage?.user)?.Location != "blue planet"
                ? false
                : true,
          },
        ],
      },
    ],
  });

  const target =
    Parameter.ParameterCategories[Parameter.currentlySelected - 1 || 0];

  const [SettingScrolling, setSettingScrolling] = React.useState(false);

  /* EVENT HANDLER  */
  const handleChange = (e) => {
    const { value } = e.target;
    /* the settings icons rotate on typing effect */
    setRotateOnTyping((c) => (c = e.target.value?.length * 45));

    const matchParameter = Parameter.ParameterCategories.map((category) => {
      return category?.Settings.map((x) => x.param).filter((x) =>
        x.includes(value)
      ).length;
    });

    setParameter((c) => {
      const update = { ...c };
      update.ParameterCategories = update.ParameterCategories.map(
        (category, index) => ({
          ...category,
          match: value ? matchParameter[index] : 0,
        })
      );

      return update;
    });
  };

  const handleKeyDown = (e) => {
    if (e.target.value) {
      if (e.key === "Enter") {
        setParameter((c) => {
          const update = { ...c };
          update.currentlySelected =
            update.ParameterCategories.findIndex(
              (c) =>
                c.match ===
                Math.max(...update.ParameterCategories.map((x) => x.match))
            ) + 1;
          return update;
        });
      }
    }
  };
  const DeleteAccountPasswordConfirmRef = React.useRef(null);
  return (
    /* SETTINGS PAGE */
    <div
      className={`m-auto my-[50px]  min-h-[600px] w-full max-w-[1300px] border p-[15px] px-[25px]`}
    >
      {/*________ SETTINGS PAGE HEADER (TITLE AND INPUT FOR SEARCH ) ________ */}
      <div
        className={`flex h-[12%] max-h-[120px] w-full items-center justify-around border font-[Garet] text-[35px] text-white md:text-[40px]  `}
      >
        {/* SETTINGS TEXT */}
        <h2>Settings</h2>
        {/* SETTINGS INPUT CONTAINER */}
        <div
          className={`group relative flex h-full w-[45%] items-center justify-center overflow-hidden border px-2 `}
        >
          {/* SEARCH SETTING INPUT */}
          <input
            id={`searchSettings`}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            placeholder={`search settings `}
            className={`h-[40px] w-full rounded-full border border-transparent bg-gradient-to-l from-gray-800 to-zinc-900 px-[20px] font-[OpenSauceReg] text-[16px] text-gray-200 outline-none  placeholder:opacity-40 focus:border-gray-800 focus:placeholder:opacity-100 md:h-[45px] md:border-gray-800`}
          />
          {/* THE SETTINGS ICON AND BG */}
          <div
            className={`absolute right-[10px] flex h-[60px] w-[80px] translate-x-[2px] items-center justify-end bg-gradient-to-l from-black to-transparent opacity-[0.8] md:h-[90px]`}
          >
            <MdSettings
              style={{ transition: `transform 250ms ease` }}
              className={` scale-[0.5] text-gray-400 rotate-[${rotateOnTyping}deg] md:scale-[0.6]`}
            />
          </div>
        </div>
      </div>

      {/* ________________  THE SETTINGS CONTAINER ________________  */}
      <div
        className={`relative flex min-h-[540px] w-full flex-col items-center justify-center gap-y-[15px] rounded-sm border border-green-500  bg-gradient-to-tl from-black to-gray-900 py-[15px]`}
      >
        {/* <---- THE BOXS AND SETTINGS DETAILS CONTAINER ----> */}
        <div
          className={`relative  flex h-[500px]   w-full flex-wrap items-center justify-center p-[12px] py-[15px]  md:h-[400px] md:min-h-[300px]`}
        >
          {/* <------- SETTINGS BOXS CONTAINER  ------> */}
          <div
            className={`flex h-full w-full flex-wrap items-center justify-center gap-[5px]`}
          >
            {Parameter?.ParameterCategories?.map((opt, index) => (
              <SettingsOptions
                inputData={opt}
                ParameterObj={{
                  Parameter,
                  setParameter,
                }}
                index={index}
              />
            ))}
          </div>

          {/* <------- SETTINGS DETAILS CONTAINER ------>  */}
          {
            <div
              onScroll={(e) => {
                setSettingScrolling(e.target.scrollTop > 0);
              }}
              style={{
                transition:
                  Parameter.currentlySelected > 0 &&
                  `transform 150ms , opacity 650ms , background 550ms 5550ms ease-in-out`,
                transitionDelay:
                  Parameter.currentlySelected > 0 &&
                  150 * Parameter.ParameterCategories.length + "ms",
              }}
              className={`absolute flex h-full w-[90%] origin-top flex-col items-start justify-center  gap-y-[15px] overflow-y-scroll rounded-md border border-white bg-gray-950 bg-opacity-60   backdrop-blur-lg
              ${Parameter.currentlySelected && "z-10"}
              ${
                Parameter.currentlySelected
                  ? `  opacity-100`
                  : ` bg-black opacity-0`
              }`}
            >
              {(() => {
                const { Title, About, Icon } =
                  Parameter.ParameterCategories[
                    Parameter.currentlySelected - 1
                  ] || Parameter.ParameterCategories[0];

                const [BtnBgPosition, setBtnBgPosition] = React.useState({
                  left: 0,
                  top: 0,
                });

                const { Model, setModel } =
                  React.useContext(ModelContext)?.ModelConfiguration;

                const [
                  confirmPassword,
                  {
                    error: confirmPasswordError,
                    isLoading: isConfirmingPassword,
                    status: confirmingPasswordStatus,
                    data: confirmPasswordResponce,
                  },
                ] = useConfirmPasswordMutation();

                const [passwordConfirmed, setPasswordConfirmed] =
                  React.useState(false);

                return (
                  <>
                    {/* the Header */}
                    <div
                      style={{
                        transition: `height 150ms ease`,
                      }}
                      className={`sticky top-0 z-10 flex min-h-max  w-full origin-top flex-wrap  items-center  justify-around border border-red-500 px-[12px]    
                      ${
                        SettingScrolling
                          ? `h-[18%] bg-white bg-opacity-80 backdrop-blur-[20px] md:h-[20%] `
                          : ` h-[25%] bg-transparent md:h-[30%]`
                      }`}
                    >
                      {/* Title & Icon of current Category */}
                      <div
                        onClick={() =>
                          setParameter((c) => ({ ...c, currentlySelected: 0 }))
                        }
                        className={`group flex h-full w-1/2 cursor-pointer flex-wrap items-center justify-start gap-x-[15px] border text-gray-100`}
                      >
                        {/* The Arrow Back To the main Menu */}
                        <BiArrowBack
                          style={{
                            transition: `transform 150ms  , opacity 150ms  , scale 150ms  ease-in-out`,
                            transitionDelay: `150ms`,
                          }}
                          className={`absolute left-[10px]  opacity-0 group-hover:translate-y-0 group-hover:scale-[1.3] group-hover:opacity-100`}
                        />
                        {/* Title of current category */}
                        <h2
                          style={{
                            transition: `transform 150ms  ease-in-out`,
                          }}
                          className={` font-[garet] text-[26px]  group-hover:translate-x-[20px]`}
                        >
                          {Title}
                        </h2>

                        {/* THE ICON OF THE CURRENT CATEGORY */}
                        <div
                          style={{
                            transition: `transform 150ms  ease-in-out`,
                          }}
                          className={`group-hover:aspcet-square  flex   items-center justify-center rounded-full border bg-green-300 text-black group-hover:translate-x-[20px] ${
                            SettingScrolling
                              ? `aspect-[1/1] w-[30px]`
                              : `aspect-[1/2] w-[25px]`
                          }`}
                        >
                          {Parameter.currentlySelected && (
                            <Icon size={18} className={`scale-[1.2] `} />
                          )}
                        </div>
                      </div>

                      {/* THREE OTHER SETTING CATEGORIES ICONS*/}
                      <div
                        className={`  flex    h-full w-[50%] items-center justify-center  gap-x-[35px] border`}
                      >
                        {Parameter.ParameterCategories.filter(
                          (x, i) => i + 1 != Parameter.currentlySelected
                        )?.map((Icon, i) => (
                          <div
                            onClick={() =>
                              setParameter((c) => ({
                                ...c,
                                currentlySelected:
                                  Parameter.ParameterCategories.map((x, i) =>
                                    x.About === Icon.About ? i + 1 : null
                                  ).filter(Boolean)[0],
                              }))
                            }
                            className={` group relative  flex cursor-pointer items-center justify-center rounded-full border-white bg-white hover:border hover:bg-transparent
                              ${
                                SettingScrolling
                                  ? `aspect-[1/1] w-[30px]`
                                  : `aspect-[1/2] w-[25px]`
                              }`}
                          >
                            <Icon.Icon
                              style={{
                                transition: `transform 250ms , opacity 300ùs ease-in`,
                              }}
                              size={18}
                              className={`scale-[1.2] group-hover:text-white 
                                ${
                                  Parameter.currentlySelected
                                    ? `translate-y-0 opacity-100`
                                    : `translate-y-[-25px] opacity-0`
                                }`}
                            />

                            {/* Changes made in each section */}

                            <div
                              style={{
                                transition: `transform 250ms , opacity 250ms ease-in-out`,
                              }}
                              title={`change made`}
                              className={`absolute bottom-[-5px] right-[-11px] flex  h-[15px] w-[15px] items-center justify-center rounded-full font-[openSauceReg] text-[10px] text-gray-100 ${
                                Icon.Settings.filter((x) => x.value.length)
                                  .length
                                  ? `translate-y-0 opacity-100`
                                  : `translate-y-[22px] opacity-0`
                              }`}
                            >
                              <p>
                                {Icon.Settings.filter((x) => x.value).length}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* the Content */}
                    <div
                      className={`relative flex h-[60%] w-full items-center justify-center `}
                    >
                      <div
                        className={`hideScroller absolute flex h-full w-full flex-wrap items-start justify-center gap-x-[25px] overflow-y-scroll py-[15px] pt-[5px] md:gap-y-[10px] lg:justify-start  lg:pl-[75px]`}
                      >
                        {(() => {
                          /*<-------------- FUNCTIONS ------------> */
                          const handleSettingInputChange = (e, input, i) => {
                            setParameter((prevState) => {
                              const updatedCategories = [
                                ...prevState.ParameterCategories,
                              ];
                              let currentSetting =
                                updatedCategories[
                                  prevState.currentlySelected - 1
                                ].Settings[i];

                              updatedCategories[
                                prevState.currentlySelected - 1
                              ].Settings[i] = {
                                ...updatedCategories[
                                  prevState.currentlySelected - 1
                                ].Settings[i],
                                value: e.target.value,
                              };

                              //TODO : check and add the validity when the user input change

                              return {
                                ...prevState,
                                ParameterCategories: updatedCategories,
                              };
                            });
                          };
                          const handleEnum = (e, isIn, EnumI, inputI) => {
                            setParameter((p) => {
                              const update = { ...p };
                              let currentInput =
                                update.ParameterCategories[
                                  update.currentlySelected - 1
                                ].Settings[inputI];
                              if (currentInput.type === "enum") {
                                currentInput.value = currentInput.value || [];
                                isIn
                                  ? currentInput.value.splice(
                                      currentInput.value.indexOf(
                                        currentInput.choise[EnumI]
                                      ),
                                      1
                                    )
                                  : currentInput.value.push(
                                      currentInput.choise[EnumI]
                                    );
                              }

                              return update;
                            });
                          };
                          const handleBooleanToggleInput = (isCheck, index) => {
                            setParameter((p) => {
                              const update = { ...p };
                              let targetInput =
                                update.ParameterCategories[
                                  update.currentlySelected - 1
                                ]?.Settings[index];

                              console.log({
                                update: update,
                                target: targetInput,
                              });

                              if (targetInput) {
                                targetInput.value = !isCheck;
                              } else {
                                alert("false");
                              }

                              return update;
                            });
                          };

                          
                          /* <-------- INPUT STYLINGS AND FUNCTIONALITY -------> */
                          const StringInput = (input, index) => {
                            return (
                              <>
                                {/* Parameter Title , The first part is for simple display the second is for Password Confirmation */}
                                {input?.inputType != "password" ? (
                                  <p className={`w-[35%]`}>{input?.param}</p>
                                ) : (
                                  /* making sure the user has the password before he can change it  */
                                  <div
                                    className={` relative flex h-[35px] w-[35%]  justify-center   overflow-hidden  border ${
                                      !passwordConfirmed
                                        ? `items-start`
                                        : `items-end`
                                    }`}
                                  >
                                    <div
                                      className={` absolute h-[200%] min-h-[50px]`}
                                    >
                                      {[
                                        !input?.value
                                          ? `current password`
                                          : `submit password`,
                                        `new password `,
                                      ].map((pass, i) => (
                                        <div
                                          key={`confirmChangePasswordN${i}`}
                                          onClick={() => {
                                            !passwordConfirmed && !i
                                              ? confirmPassword({
                                                  userEmail: JSON.parse(
                                                    localStorage?.user
                                                  )?.Email,
                                                  userPassword: input?.value,
                                                })
                                              : null;
                                          }}
                                          className={`group flex h-1/2 w-full items-center  justify-center border border-green-600 ${
                                            !passwordConfirmed
                                              ? `cursor-pointer`
                                              : `cursor-auto`
                                          }`}
                                        >
                                          {!i &&
                                            !passwordConfirmed &&
                                            input?.value && (
                                              <BsArrowRight
                                                style={{
                                                  transition: `transform 250ms , opacity 100ms ease-in-out`,
                                                }}
                                                className={`absolute left-0 translate-x-[-50px] scale-[1.5] opacity-0 group-hover:translate-x-[-20px] group-hover:opacity-100`}
                                              />
                                            )}
                                          <p
                                            style={{
                                              transition: `transform 200ms ease-in-out`,
                                            }}
                                            className={` leading-[15px]
                                            ${
                                              !i &&
                                              !passwordConfirmed &&
                                              input?.value
                                                ? `group-hover:translate-x-[5px]`
                                                : ``
                                            }`}
                                          >
                                            {pass}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* THE VALIDITY LINE */}
                                <hr
                                  style={{
                                    transition: `height 250ms , background 250ms ease `,
                                  }}
                                  className={`  w-[1px] translate-x-[-10px] lg:translate-x-[-15px]
                                  ${
                                    input?.value
                                      ? input?.valid instanceof Function &&
                                        input?.inputType != "password"
                                        ? input?.valid(input.value)
                                          ? `h-[26px] bg-green-400`
                                          : `h-[26px] bg-red-400 `
                                        : passwordConfirmed
                                        ? input?.valid(
                                            input?.value,
                                            passwordConfirmed,
                                            input.strength(input.value)
                                          )
                                        : `h-[20px] bg-gray-500`
                                        ? `h-[26px] bg-green-400`
                                        : `h-[26px] bg-red-400 `
                                      : `h-[20px] bg-gray-500`
                                  }`}
                                />

                                {/* THE MAIN INPUT DESIGN FOR EACH STRING TYPE  */}
                                <input
                                  value={input?.value}
                                  onInput={(event) =>
                                    handleSettingInputChange(
                                      event,
                                      input,
                                      index
                                    )
                                  }
                                  type={input?.inputType}
                                  placeholder={
                                    input?.inputType === "password"
                                      ? passwordConfirmed
                                        ? input?.placeholder
                                        : `please confirm your password`
                                      : input?.placeholder
                                  }
                                  className={`border-bottom w-[60%] border-none  border-white bg-transparent font-[brandinkLight]  text-white outline-none placeholder:text-gray-200 placeholder:opacity-50 focus:border `}
                                />

                                {/* STARTS FOR PASSWORD STRENGTH  AND PASSSWORD AUTH */}
                                {input?.inputType === "password" ? (
                                  passwordConfirmed ? (
                                    <div
                                      className={`absolute right-0 flex items-center justify-center gap-x-[2px]`}
                                    >
                                      {Array(4)
                                        .fill(AiOutlineStar)
                                        .map((Star, index) => (
                                          <Star
                                            style={{
                                              transition: `translate 250ms , opacity 250ms ease`,
                                            }}
                                            className={`
                                          
                                          ${
                                            index + 1 <
                                            input?.strength(input?.value)
                                              ? `translate-y-0 opacity-100`
                                              : `translate-y-[25px] opacity-0`
                                          }`}
                                          />
                                        ))}
                                    </div>
                                  ) : (
                                    <div
                                      className={` absolute right-[10px] flex aspect-square w-[35px] items-center justify-center
                                    ${
                                      confirmPasswordError ||
                                      /* isConfirmingPassword */ true
                                        ? `opacity-100`
                                        : `opacity-0`
                                    }`}
                                    >
                                      <BiError
                                        style={{
                                          transition: `transform 450ms , opacity 250ms ease-in-out`,
                                          transitionDelay: `300ms `,
                                        }}
                                        title={confirmPasswordError?.data}
                                        className={`designTitleBefore scale-[1.3] text-orange-200 ${
                                          confirmPasswordError &&
                                          !isConfirmingPassword &&
                                          confirmingPasswordStatus != 200
                                            ? `translate-y-0 opacity-100`
                                            : `translate-y-[20px] opacity-0 `
                                        }`}
                                      />
                                      <div
                                        className={`rounded-full border border-white px-[5px] py-[2px] font-[brandinkLight] text-[10px] ${
                                          isConfirmingPassword
                                            ? `flex`
                                            : `hidden`
                                        }`}
                                      >
                                        <p>confirming...</p>
                                      </div>
                                    </div>
                                  )
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          };
                          const EnumInput = (input, index) => {
                            return (
                              <>
                                <p
                                  className={`font-[brandinkLight] text-[0.9rem] text-[#ffffff] `}
                                >
                                  {input?.param}
                                </p>

                                <div
                                  className={` flex w-full flex-wrap items-center justify-between gap-[6px]`}
                                >
                                  {input?.choise &&
                                    input?.choise?.map((opt, i) => (
                                      <div
                                        onClick={(e) =>
                                          input?.value.includes(opt)
                                            ? handleEnum(e, true, i, index)
                                            : handleEnum(e, false, i, index)
                                        }
                                        style={{
                                          transition: `background 150ms , color 200ms ease-in-out`,
                                        }}
                                        className={`relative flex w-[50px] min-w-max flex-grow cursor-pointer items-center justify-center overflow-hidden rounded-full  border px-[5px] py-[2px] text-[0.8rem]   
                                        ${
                                          Array.isArray(input?.value) &&
                                          input?.value.includes(opt)
                                            ? ` border-green-400 text-green-300 hover:border-white  hover:text-white`
                                            : `text-white`
                                        }`}
                                      >
                                        <p>{opt}</p>

                                        <BiCheckCircle
                                          style={{
                                            transition: `color 300ms , transform 200ms ease-in-out`,
                                          }}
                                          className={`absolute right-[5px] ${
                                            Array.isArray(input?.value) &&
                                            input.value.includes(opt)
                                              ? `translate-y-0 text-green-300 opacity-100`
                                              : `translate-y-[20px] text-gray-500 opacity-0`
                                          }`}
                                        />
                                      </div>
                                    ))}
                                </div>
                              </>
                            );
                          };
                          const BooleanInput = (input, index) => {
                            return (
                              <InputToggle
                                isCheck={input?.value}
                                Title={input?.param}
                                onClick={() =>
                                  handleBooleanToggleInput(input?.value, index)
                                }
                              />
                            );
                          };
                          const PickerInput = () => {
                            return <></>;
                          };
                          const ButtonInput = (input, index) => {
                            const Dialogstyle =
                              DeleteAccountPasswordConfirmRef?.current?.style;
                            React.useEffect(
                              () =>
                                DeleteAccountPasswordConfirmRef.current?.close(),
                              [DeleteAccountPasswordConfirmRef.current]
                            );

                            const [
                              currentUserPassword,
                              setCurrentUserPassword,
                            ] = React.useState();

                            const [
                              DeleteAccountFeefdback,
                              setDeleteAccountFeefdback,
                            ] = React.useState(false);

                            if (input?.param === "delete account") {
                              return (
                                <>
                                  <dialog
                                    style={{
                                      transition: "all 0ms ease",
                                    }}
                                    ref={DeleteAccountPasswordConfirmRef}
                                    className={` pointer-events-none z-10 m-auto flex h-[260px] w-[350px] flex-col items-center justify-start bg-white opacity-0 backdrop:bg-black/20 backdrop:backdrop-brightness-50`}
                                  >
                                    {/* Dialog Exit & PHOTO */}
                                    <div
                                      onClick={() => {
                                        /* TODO: set the confirm password to false when closing this window */
                                        /* setPasswordConfirmed(false); */
                                        if (
                                          DeleteAccountPasswordConfirmRef.current &&
                                          Dialogstyle
                                        )
                                          DeleteAccountPasswordConfirmRef?.current.close();
                                        Dialogstyle.opacity = 0;
                                        Dialogstyle.pointerEvents = "none";
                                      }}
                                      className={`group flex h-[22%] w-full items-center justify-center p-[5px]`}
                                    >
                                      {/* DIALOG EXIT ICON AND TEXT */}
                                      <div
                                        className={`relative  flex h-full w-[40%] translate-x-[-80%] translate-y-[60%] cursor-pointer items-center justify-between`}
                                      >
                                        <GrFormClose
                                          style={{
                                            transition: `transform 250ms    ease-in-out`,
                                          }}
                                          className="m-auto scale-[1.7] border border-transparent group-hover:translate-x-[-50px] group-hover:rotate-[-180deg] group-hover:scale-[1.1] group-hover:rounded-full group-hover:border-white group-hover:bg-red-500 "
                                        />
                                        <div
                                          style={{
                                            transition: `border 250ms ease-in-out`,
                                          }}
                                          className={`absolute flex h-[50%] w-full items-center justify-end rounded-full border  border-transparent group-hover:border-black`}
                                        >
                                          <p
                                            style={{
                                              transition: `opacity 250ms 300ms ease-in-out`,
                                            }}
                                            className={`w-max translate-x-[-5px] font-[Poppins] text-[10px] text-gray-800 opacity-0 group-hover:opacity-100`}
                                          >
                                            changed my mind
                                          </p>
                                        </div>
                                      </div>
                                      {/* Dialog CurrentAccount  */}
                                      <img
                                        src={
                                          JSON.parse(localStorage?.user)?.Avatar
                                        }
                                        alt={`avatar image`}
                                        className={`absolute aspect-square w-[21px] translate-y-full scale-[3] self-center rounded-full  border-[0.5px] border-white/50 object-cover `}
                                      />
                                    </div>

                                    {/* Dialog Content  */}
                                    <div className={`h-[70%] w-full `}>
                                      <div
                                        className={`hideScroller flex h-[220px] w-full flex-col items-center justify-center overflow-y-scroll`}
                                      >
                                        {passwordConfirmed ? (
                                          <div
                                            className={`flex h-full w-full items-center justify-around`}
                                          >
                                            {[
                                              {
                                                title: `tell us why`,
                                                onClick: () => "",
                                              },
                                              {
                                                title: `just delete`,
                                                onClick: () => "",
                                              },
                                            ].map((Feedback, FeedbackIndex) => (
                                              <button
                                                key={Feedback.title}
                                                style={{
                                                  transition: `background 50ms , color 300ms ease-in-out`,
                                                }}
                                                className={`group flex w-[45%] min-w-[80px] items-center justify-center rounded-full border border-white bg-black py-[3px] text-white outline-[0.5] outline-gray-200 hover:border-black hover:bg-transparent hover:text-black`}
                                              >
                                                {Feedback.title}
                                                <BiArrowBack
                                                  style={{
                                                    transition: `opacity 150ms , transform 250ms ease`,
                                                  }}
                                                  className={`absolute translate-x-[0] rotate-[180deg] ${
                                                    !FeedbackIndex
                                                      ? "text-green-500 "
                                                      : `text-red-500`
                                                  } opacity-0 group-hover:translate-x-[50px] group-hover:opacity-100`}
                                                />
                                              </button>
                                            ))}
                                          </div>
                                        ) : (
                                          <div
                                            className={`flex h-full w-full flex-col items-start justify-center gap-y-[30px] border px-[12px] font-[Poppins] text-[0.8rem]`}
                                          >
                                            <p className={`w-full`}>
                                              please enter your password to
                                              continue deleting your account
                                            </p>
                                            <div
                                              title={
                                                confirmPasswordError
                                                  ? confirmPasswordError?.data
                                                  : ""
                                              }
                                              className={`flex h-[35px] w-full  items-center justify-center overflow-hidden`}
                                            >
                                              <input
                                                style={{
                                                  transition: `border 250ms ease-in-out`,
                                                }}
                                                onChange={({ target }) => {
                                                  setCurrentUserPassword(
                                                    target.value
                                                  );
                                                }}
                                                type={"password"}
                                                placeholder={`current password please `}
                                                className={` w-full border border-transparent p-[5px] text-[0.8rem] text-gray-500 outline-none placeholder:text-black/50 ${
                                                  !isConfirmingPassword
                                                    ? confirmPasswordError
                                                      ? currentUserPassword
                                                        ? `border-b-red-500`
                                                        : `border-b-black `
                                                      : `border-b-black `
                                                    : `border-b-transparent`
                                                }`}
                                              />

                                              {/* THE PASSWORD SUBMIT BUTTON */}
                                              <div
                                                className={`absolute right-[5px] flex h-full w-[110px] min-w-max items-center justify-center  `}
                                              >
                                                <hr
                                                  className={`h-[11px] w-[1px] items-center  bg-black/80 `}
                                                />

                                                <button
                                                  onClick={async () => {
                                                    const confirmUserPassword =
                                                      await confirmPassword({
                                                        userEmail: JSON.parse(
                                                          localStorage?.user
                                                        )?.Email,
                                                        userPassword:
                                                          currentUserPassword,
                                                      });

                                                    if (
                                                      !confirmPasswordError &&
                                                      isConfirmingPassword &&
                                                      !confirmUserPassword?.error
                                                    ) {
                                                      setPasswordConfirmed(
                                                        true
                                                      );
                                                    }
                                                  }}
                                                  type={"submit"}
                                                  className={`flex h-[1/2] w-full items-center justify-center gap-x-[5px] `}
                                                >
                                                  <p>submit</p>
                                                  <RxArrowTopRight />
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </dialog>

                                  <div
                                    className={`relative flex h-full w-full  items-center justify-between `}
                                  >
                                    <p>i want to delete my account </p>
                                    <button
                                      onClick={() => {
                                        if (
                                          DeleteAccountPasswordConfirmRef?.current &&
                                          Dialogstyle
                                        ) {
                                          DeleteAccountPasswordConfirmRef?.current.showModal();
                                          Dialogstyle.opacity = 1;
                                          Dialogstyle.pointerEvents = "auto";
                                        }
                                      }}
                                      className={`flex w-[52px] min-w-max items-center justify-center rounded-full border px-[15px] py-[3px] hover:border-red-500/50`}
                                    >
                                      {input?.param}
                                    </button>
                                  </div>
                                </>
                              );
                            }
                          };

                          /* <----- THE RETURN STATEMENT FOR THE DETAILS SETTINGS */

                          return Parameter.ParameterCategories.map(
                            (Category, Categoryindex) => {
                              return Category.Settings.map((setting, index) => {
                                return (
                                  /* THE MAIN CONTAINER OF EACH INPUT IN THE SETTING DETAILS PAGE */
                                  <div
                                    key={index}
                                    style={{
                                      width:
                                        window.innerWidth > 750
                                          ? 100 / Category.Settings.length -
                                            5 +
                                            "%"
                                          : "65%",
                                      transition: `transform 250ms, opacity 250ms, border 250ms 250ms ,   background 150ms ease-in-out`,
                                    }}
                                    className={`m-[5px] flex  min-h-[50px] min-w-[55%] flex-grow flex-wrap items-center gap-y-[15px]  p-[15px] font-[brandinkLight]  text-[0.9rem] text-gray-100 hover:bg-white  hover:bg-opacity-[0.07] hover:backdrop-blur-lg md:max-w-[60%]  lg:w-[40%]
                                    ${
                                      Categoryindex ===
                                      Parameter.currentlySelected - 1
                                        ? `pointer-events-auto relative translate-y-0 opacity-100 `
                                        : `pointer-events-none absolute translate-y-full opacity-0`
                                    }
                                    ${
                                      setting?.type === String
                                        ? `justify-start rounded-sm border-b  ${
                                            Categoryindex ===
                                            Parameter.currentlySelected - 1
                                              ? `border-white`
                                              : `border-transparent `
                                          }`
                                        : setting?.type === "enum"
                                        ? `justify-start rounded-md`
                                        : `justify-between gap-x-[60px] rounded-md`
                                    }`}
                                  >
                                    {(() => {
                                      switch (setting.type) {
                                        case String:
                                          return StringInput(setting, index);
                                        case "enum":
                                          return EnumInput(setting, index);
                                        case Boolean:
                                          return BooleanInput(setting, index);
                                        case "Picker":
                                          return PickerInput(setting, index);
                                        case "BTN":
                                          return ButtonInput(setting, index);
                                        default:
                                          return null;
                                      }
                                    })()}
                                  </div>
                                );
                              });
                            }
                          );
                        })()}
                      </div>
                    </div>

                    {/*<--------- THE SAVE BUTTON --------->  */}
                    <div
                      onMouseMove={(e) =>
                        setBtnBgPosition((c) => ({
                          left: e.clientX + "%",
                          top: e.clientY + "%",
                        }))
                      }
                      className={`sticky top-0 m-auto mb-[5px] flex h-[10%] max-h-[35px] w-[80%] items-center justify-center self-center overflow-hidden rounded-full border`}
                    >
                      <button
                        className={`flex h-full w-[100%] items-center justify-center font-[openSauceReg]   text-gray-300 mix-blend-screen`}
                      >
                        save
                      </button>

                      {/* THE SHINING BEAUTIFUL BACKGROUND EFFECT */}
                      {/* TODO: find a way to make the background consume less memory then add it  */}

                      {/* <div
                        style={{
                          left: BtnBgPosition.left,
                          top: BtnBgPosition.top,
                        }}
                        className={`absolute  -z-10 aspect-square w-[15px] translate-x-[-9000%] scale-[50] rounded-full  blur-sm md:translate-x-[-30000%] 
                        ${
                          target?.Settings.some((x) => x.value.length)
                            ? target.Settings.every((x) =>
                                x.inputType === "password"
                                  ? x?.valid(
                                      x?.value,
                                      passwordConfirmed,
                                      x?.strength(x?.value)
                                    )
                                  : x?.valid(x?.value)
                              )
                              ? `bg-green-300`
                              : `bg-red-500`
                            : `bg-blue-600`
                        } `}
                      /> */}
                    </div>
                  </>
                );
              })()}
            </div>
          }
        </div>

        {/* <---- LOGOUT CHANGE USER BUTTONS CONTAINER ----> */}
        <div
          className={` relative my-[20px] flex min-h-[150px] w-full flex-col  items-center justify-center  gap-y-[5px] border border-red-500 p-[12px] px-[50px] md:px-[70px]`}
        >
          <div
            style={{
              transition: `color 150ms ease`,
            }}
            className={`group m-0 flex h-max cursor-pointer items-center justify-center gap-x-[12px] self-start  font-[Poppins] text-[0.7rem] text-white hover:text-blue-300/90`}
          >
            <p>learn more about how to save and change user</p>
            <BsArrowRight
              style={{
                transition: `transform 150ms , opacity 150ms ease`,
              }}
              className={`translate-x-[-15px] opacity-0 group-hover:translate-x-[-10px] group-hover:opacity-100`}
            />
          </div>

          <div
            className={`  flex  min-h-[80%] w-full flex-wrap items-center justify-center border`}
          >
            {/* THE TWO BUTTONS (CHANGE USER ) (LOG OUT) */}
            <div
              className={`flex h-full w-full min-w-[420px] flex-wrap items-center justify-around gap-x-[12px] border border-purple-500 font-[brandinkLight] `}
            >
              {[
                {
                  title: `log out `,
                  onClick: () => "",
                  icon: BiLogOut,
                  style: { bg: "red", border: "border-white border" },
                },
                {
                  title: `change user `,
                  onClick: () => {
                    if (localStorage?.savedUser) changeUserUtility();
                    if (changeUserUtility()?.navigate) {
                      navigate(changeUserUtility()?.navigate);
                    } else {
                      alert("something");
                    }
                  },
                  icon: MdChangeCircle,
                  style: { bg: "purple", border: "border-white border" },
                },
              ].map((btn, btnIndex) => {
                const [showBg, setShowBg] = React.useState(false);
                return (
                  <button
                    onClick={() => btn?.onClick()}
                    style={{
                      transition: `scale 250ms ease`,
                    }}
                    onMouseDown={(e) => {
                      e.target.style.scale = "0.99";
                      setShowBg(true);
                    }}
                    onMouseUp={(e) => {
                      e.target.style.scale = "1";
                      setShowBg(false);
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.scale = "1";
                      setShowBg(false);
                    }}
                    key={btn.title + btnIndex}
                    className={`relative my-[5px] flex  w-[45%] min-w-[400px] flex-grow items-center justify-center overflow-hidden rounded-sm  bg-opacity-50 py-[10px] text-white ${btn?.style.border}`}
                  >
                    <p className={`pointer-events-none z-[5]`}>{btn?.title}</p>
                    {btn.icon && (
                      <div
                        className={`absolute left-0 mx-[12px] flex scale-[1.1] items-center justify-center  `}
                      >
                        <btn.icon />
                        <div
                          style={{
                            transition: `transform 650ms ,opacity 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                          }}
                          className={`pointer-events-none  absolute h-[15px] w-[15px] rounded-full  bg-${
                            btn?.style.bg
                          }-500/50  ${
                            showBg
                              ? `scale-[500] opacity-100`
                              : `scale-0 opacity-0`
                          }`}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
