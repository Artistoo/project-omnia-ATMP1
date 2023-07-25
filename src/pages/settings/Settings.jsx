import React from "react";
import { useNavigate } from "react-router-dom";

/*<---- Components ----> */
import SettingsOptions from "../../components/SettingsOptions.jsx";
import InputToggle from "../../components/InputToggle.jsx";

/* <--- CONTEXT ----> */
import user from "../../context/userState.jsx";
import {
  useConfirmPasswordMutation,
  useDeleteUserMutation,
  useSendMeEmailMutation,
  useAccountConfigureMutation,
  useCurrentApiQuery,
} from "../../redux/API";

/*<--- ICONS ---->  */
import { MdChangeCircle, MdSettings } from "react-icons/md";
import {
  IoMdColorWand as Apperance,
  IoIosFingerPrint as Privacy,
} from "react-icons/io";
import { BsArrowRight, BsPersonGear as Personal } from "react-icons/bs";
import { MdSecurity as Secuirty } from "react-icons/md";
import {
  BiArrowBack,
  BiArrowToBottom,
  BiCheckCircle,
  BiError,
  BiLogOut,
  BiPlus,
} from "react-icons/bi";
import {
  AiOutlineLoading,
  AiOutlineLoading3Quarters,
  AiOutlineStar,
} from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { changeUserUtility } from "../../utils/changeUser";
import { ModelContext } from "../../context/Dialog.jsx";
import { RxArrowTopRight } from "react-icons/rx";

//<---- ASSETS ----->
import done from "../../assets/img/Done.png";
import Modal from "../../components/Modal.jsx";

/* ___________ THE JSX FOR THE SETTINGS PAGE ____________  */
export default function Settings() {
  const navigate = useNavigate();

  /* REDIRECTING THE USER TO THE LOG IN PAGE IF NOT LOGGED */
  React.useEffect(() => {
    if (!user) {
      navigate(`/user/AccountAuth`);
    }
  }, [user]);

  /* <----- SETTINGS API CALL ------> */
  const [
    confirmPassword,
    {
      error: confirmPasswordError,
      isLoading: isConfirmingPassword,
      status: confirmingPasswordStatus,
      data: confirmPasswordResponce,
      isSuccess: PasswordConfirmed,
    },
  ] = useConfirmPasswordMutation();
  const [
    deleteUser,
    {
      isLoading: isDeletingUser,
      error: ErrorDeletingUser,
      status: DeletingUserStatus,
      isSuccess: userDeleted,
    },
  ] = useDeleteUserMutation();
  const [
    submitFeedback,
    {
      isLoading: isSubmittingFeedback,
      error: submitFeedbackError,
      isSuccess: FeedbackSubmited,
      status: FeedbackSubmitedStatus,
    },
  ] = useSendMeEmailMutation();
  const [
    configureAccount,
    {
      isError: ConfigurationApiError,
      isSuccess: AccountConfiguredSuccessfully,
      data: ConfiguringAccountResponse,
      isLoading: isConfiguringAccount,
    },
  ] = useAccountConfigureMutation();
  const {
    data: Location,
    isLoading: isFetchingLocation,
    isSuccess: LocationFetched,
  } = useCurrentApiQuery();

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
            ref: React.createRef(),
            param: "change user name",
            apiObjKey: "userName",
            placeholder: `select a new name`,
            type: String,
            valid: (value) => !/\s/g.test(value),
            inputType: "text",
            value: "",
          },
          {
            ref: React.createRef(),
            param: "change lastname",
            apiObjKey: "LastName",
            placeholder: `select a new lastName`,
            type: String,
            valid: (value) => !/\s/g.test(value),
            inputType: "text",
            value: "",
          },
          {
            ref: React.createRef(),
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
        Settings: [
          {
            ref: React.createRef(),
            param: "change password",
            apiObjKey: "Password",
            placeholder: `select a new password`,
            valid: (val) =>
              [val ? [PasswordConfirmed, val.length > 5] : true]
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
            ref: React.createRef(),
            param: "enable email verification",
            apiObjKey: "Verification",
            type: Boolean,
            value: false,
            valid: () => true,
          },
        ],
      },

      {
        ref: React.createRef(),
        Title: "Payment",
        About:
          "make your profile apperance shine unique using the apperance Settings",
        Icon: Apperance,
        match: 0,
        style: { bg: `bg-yellow-200` },
        ref: React.createRef(),
        Settings: [],
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
            ref: React.createRef(),
            param: "who can find me ?",
            apiObjKey: "whoCanFindMe",
            type: "enum",
            valid: (val) => val?.length,
            value: [],
            choise: ["my friends", "my friends friends", "no noe", "every one"],
          },
          {
            ref: React.createRef(),
            param: "i wanna recevie email about",
            apiObjKey: "ReciveEmailAbout",
            type: "enum",
            valid: (val) => val?.length,
            value: [],
            choise: [
              "updates and new features",
              "when someone join my channel",
              "security alerts",
            ],
          },
          {
            ref: React.createRef(),
            param: "hide my Location",
            apiObjKey: "HideLocation",
            type: Boolean,
            valid: (val) => val?.length,
            value:
              JSON.parse(localStorage?.user)?.Location != "blue planet"
                ? false
                : true,
          },
        ],
      },
    ],
  });
  const [FeedbackSelect, setFeedbackSelect] = React.useState([
    {
      dbq: `i want to delete my account because`,
      costume: false,
      selected: "",
      options: [
        "not sure",
        "the service is slow",
        "i got scamed",
        `can't recive my payments `,
      ],
    },
    {
      dbq: `how can we make our service better ?`,
      costume: false,
      selected: "",
      options: [
        "not sure",

        "work on the speed",
        "maybe add more features",
        `change the ui`,
      ],
    },
    {
      dbq: `how was your expirence at jolly bravo`,
      selected: "",
      costume: false,
      options: ["not sure", "bad", "not bad", `ok `, `good `, `perfect`],
    },
  ]);

  /*<------ VARIABLE AND CONSTS -----> */
  const target =
    Parameter.ParameterCategories[Parameter.currentlySelected - 1 || 0];

  /*<--- GLOBAL STATES ---->*/
  const [SettingScrolling, setSettingScrolling] = React.useState(false);

  /*<---- EVENT HANDLER ---->  */
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

  /* <--- REFS -----> */
  const DeleteAccountPasswordConfirmRef = React.useRef(null);

  return (
    /* SETTINGS PAGE */
    <div
      className={`m-auto my-[50px]  min-h-[600px] w-full max-w-[1300px]  p-[15px] px-[25px]`}
    >
      {/*________ SETTINGS PAGE HEADER (TITLE AND INPUT FOR SEARCH ) ________ */}
      <div
        className={`flex h-[12%] max-h-[120px] w-full items-center justify-around  font-[Garet] text-[35px] text-white md:text-[40px]  `}
      >
        {/* SETTINGS TEXT */}
        <h2>Settings</h2>
        {/* SETTINGS INPUT CONTAINER */}
        <div
          className={`group relative flex h-full w-[45%] items-center justify-center overflow-hidden  px-2 `}
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
        className={`rounded-ms relative flex min-h-[540px] w-full flex-col items-center justify-center    gap-y-[15px] bg-gradient-to-tl from-gray-950 to-gray-900 py-[15px]`}
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
                /* <---- EXTRACT VARIABLES ------> */
                const { Title, About, Icon } =
                  Parameter.ParameterCategories[
                    Parameter.currentlySelected - 1
                  ] || Parameter.ParameterCategories[0];

                /* <----- SETTINGS CONTAINER VARIABLES ------> */
                /* <----- SETTINGS CONTAINER STATES ------> */
                const [BtnBgPosition, setBtnBgPosition] = React.useState({
                  left: 0,
                  top: 0,
                });
                const [passwordConfirmed, setPasswordConfirmed] =
                  React.useState(false);
                /* ACOUNT  */
                const [AccountDeleted, setAccountDeleted] =
                  React.useState(false);
                const [DeleteAccountFeedback, setDeleteAccountFeedback] =
                  React.useState(false);
                const { Model, setModel } =
                  React.useContext(ModelContext)?.ModelConfiguration;
                const [openModal, setOpenModal] = React.useState(false);

                /* SET THE PASSWORD TO CONFIRMED TO TRUE IF THE API RETURN SUCCESS*/
                React.useEffect(() => {
                  setPasswordConfirmed(!!PasswordConfirmed);
                }, [PasswordConfirmed]);

                //deleting the user and displaying the goodbye message
                React.useEffect(() => {
                  if (
                    DeleteAccountFeedback
                      ? FeedbackSubmited && userDeleted
                      : userDeleted
                  ) {
                    setAccountDeleted(true);
                    const RemoveUser = setTimeout(() => {
                      navigate("/");
                      localStorage.removeItem("user");
                    }, 8000);
                  }
                }, [FeedbackSubmited, userDeleted]);

                return (
                  <>
                    {/*<--------------- the Header -------------> */}
                    <div
                      style={{
                        transition: `height 150ms ease`,
                      }}
                      className={`sticky top-0 z-10 flex min-h-max  w-full origin-top flex-wrap  items-center  justify-around  px-[25px]    
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
                        className={`group flex h-full w-1/2 cursor-pointer flex-wrap items-center justify-start gap-x-[15px]  text-gray-100`}
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
                        className={`  relative flex h-full  w-[50%] flex-wrap items-center justify-center  gap-x-[35px] `}
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
                            className={` group relative  flex cursor-pointer items-center justify-center rounded-full border-white bg-white py-[3px] hover:border  hover:bg-transparent
                              ${
                                SettingScrolling
                                  ? `w-[70%] md:h-[60px] md:w-[30px] `
                                  : `w-[70%] md:h-[60px] md:w-[25px] `
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

                    {/* <---------------- the Content -------------->*/}
                    <div
                      className={`relative flex h-[60%] w-full items-center justify-center `}
                    >
                      <div
                        className={`hideScroller absolute flex h-full w-full flex-wrap items-start justify-center gap-x-[25px] overflow-y-scroll py-[15px] pt-[5px] md:gap-y-[10px] lg:justify-start  lg:pl-[95px]`}
                      >
                        {/* the Settings Content Self Provocative Function  */}
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
                          const handleDeleteUser = async () => {
                            const DeleteUser = await deleteUser({
                              userEmail: JSON.parse(localStorage?.user)?.Email,
                            });
                          };
                          const handleSubmitFeedback = () => {
                            submitFeedback({
                              interest: "",
                              email: localStorage?.user?.Email,
                              subject: `user delete account Feedback`,
                              message: "hello world",
                              from: localStorage?.user?.userName,
                            })
                              .then((response) => {
                                console.log(response);
                              })
                              .catch((err) => {
                                console.log(err); // Handle any errors that occur during the API call
                              });
                          };
                          const handleModalState = () => {
                            setOpenModal((c) => (c = !c));
                          };

                          /* <-------- INPUT STYLINGS AND FUNCTIONALITY -------> */
                          const SayGoodBye = () => {
                            return (
                              <>
                                {/* SAY GOODBYE ON ACCOUNT DELETED */}
                                <div
                                  style={{
                                    transition: `transform 250ms  , opacity 100ms  ease-in-out`,
                                  }}
                                  className={` absolute z-10 flex   w-full origin-center   scale-[1.1]  flex-col items-center justify-center bg-black  
                            ${
                              AccountDeleted
                                ? `h-[400px] translate-y-[40px] opacity-100 `
                                : `h-[0px]  translate-y-full opacity-0`
                            }`}
                                >
                                  <img
                                    style={{
                                      transition: `opacity 250ms 380ms ease-in-out`,
                                    }}
                                    className={`h-[35px] w-[35px] translate-y-[-50px] scale-[5] ${
                                      AccountDeleted
                                        ? `opacity-100`
                                        : `opacity-0`
                                    }
                              `}
                                    src={done}
                                    alt={`done`}
                                  />
                                  <h2
                                    style={{
                                      transition: `opacity 250ms 300ms ease-in-out`,
                                    }}
                                    className={`translate-y-[15px] bg-gradient-to-tl from-yellow-400  via-purple-400 to-blue-400 bg-clip-text text-lg text-transparent ${
                                      AccountDeleted
                                        ? `opacity-100`
                                        : `opacity-0`
                                    }`}
                                  >
                                    GoodBye{" "}
                                    {JSON.parse(
                                      localStorage?.user
                                    )?.gender.toLowerCase() === "male"
                                      ? `mr`
                                      : `mrs`}{" "}
                                    {JSON.parse(localStorage?.user)?.userName}
                                  </h2>
                                  {DeleteAccountFeedback && (
                                    <p
                                      style={{
                                        transition: `color 250ms 400ms , transform 150ms 450ms ease-in`,
                                      }}
                                      className={` translate-y-[60px] text-center ${
                                        AccountDeleted
                                          ? `translate-y-0 text-gray-200`
                                          : `translate-y-full text-black`
                                      }`}
                                    >
                                      thank you for the feedback <br /> we will
                                      work hard to meet your <br />
                                      <b>expectation</b>{" "}
                                    </p>
                                  )}
                                </div>
                              </>
                            );
                          };
                          const StringInput = (input, index) => {
                            return (
                              <>
                                {/* Parameter Title , The first part is for simple display the second is for Password Confirmation */}
                                {input?.inputType != "password" ? (
                                  <p className={`w-[35%] truncate`}>
                                    {input?.param}
                                  </p>
                                ) : (
                                  /* making sure the user has the password before he can change it  */
                                  <div
                                    className={` relative flex h-[35px] w-[35%]  justify-center   overflow-hidden   `}
                                  >
                                    <div
                                      style={{
                                        transition: `transform 250ms ease-in-out`,
                                      }}
                                      className={` absolute h-[200%] min-h-[50px] ${
                                        !passwordConfirmed
                                          ? `translate-y-0`
                                          : `-translate-y-1/2`
                                      }`}
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
                                          className={`group flex h-1/2 w-full items-center  justify-center   ${
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
                                  className={`absolute right-[64%]   w-[1px] 
                                  ${
                                    input?.value
                                      ? input?.valid instanceof Function &&
                                        input?.valid(input.value)
                                        ? `h-[26px] bg-green-400`
                                        : `h-[26px] bg-red-400 `
                                      : `h-[18px] bg-gray-200`
                                  }
                                  `}
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
                                  className={`border-bottom w-[55%] border-none  border-white bg-transparent px-[8px]  font-[brandinkLight] text-white outline-none placeholder:text-gray-200 placeholder:opacity-50 focus:border `}
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
                                    `}
                                    >
                                      <BiError
                                        style={{
                                          transition: `transform 450ms , opacity 250ms ease-in-out`,
                                          transitionDelay: `300ms `,
                                        }}
                                        title={
                                          confirmPasswordError?.data?.error
                                        }
                                        className={`designTitleBefore scale-[1.3] text-orange-200 ${
                                          confirmPasswordError &&
                                          !isConfirmingPassword &&
                                          confirmingPasswordStatus != 200
                                            ? `translate-y-0 opacity-100`
                                            : `translate-y-[20px] opacity-0 `
                                        }`}
                                      />
                                      <AiOutlineLoading
                                        style={{
                                          transition: ` opacity 100ms ease-in-out`,
                                        }}
                                        className={`absolute animate-spin  ${
                                          isConfirmingPassword
                                            ? `opacity-100`
                                            : ` opacity-0 `
                                        }`}
                                      />
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
                            const [
                              currentUserPassword,
                              setCurrentUserPassword,
                            ] = React.useState();

                            if (input?.param === "delete account") {
                              return (
                                <>
                                  <div
                                    className={`relative flex h-full w-full  items-center justify-between `}
                                  >
                                    <p>i want to delete my account </p>
                                    <button
                                      onClick={handleModalState}
                                      className={`flex w-[52px] min-w-max items-center justify-center rounded-full border px-[15px] py-[3px] hover:border-red-500/50`}
                                    >
                                      {input?.param}
                                    </button>
                                  </div>
                                  {/* <--------------- THE DIALOG  ---------------> */}
                                  <Modal
                                    closeMessage={`changed my mind`}
                                    switchCase={AccountDeleted}
                                    OnSwitch={SayGoodBye}
                                    modalState={openModal}
                                    handleModalState={handleModalState}
                                    showAvatar={true}
                                  >
                                    {/* Dialog Content  */}
                                    <div
                                      className={`flex h-[280px]  w-full items-center justify-center `}
                                    >
                                      <div
                                        className={`hideScroller flex  w-full flex-col items-center justify-center gap-y-[18px] overflow-y-scroll px-[12px] `}
                                      >
                                        {/* CONDITIONAL RENDERING FOR THE DIALOG  */}

                                        {passwordConfirmed ? (
                                          !DeleteAccountFeedback ? (
                                            <>
                                              <p
                                                className={`my-[8px] px-[15px]`}
                                              >
                                                would you like to submit a
                                                feedback stating why you choose
                                                to delete your account
                                              </p>
                                              <div
                                                className={`flex w-full items-center justify-between px-[15px] `}
                                              >
                                                {[
                                                  {
                                                    title: `tell us why`,
                                                    onClick: () =>
                                                      setDeleteAccountFeedback(
                                                        true
                                                      ),
                                                  },
                                                  {
                                                    title: `just delete`,
                                                    onClick: () => "",
                                                  },
                                                ].map(
                                                  (Feedback, FeedbackIndex) => (
                                                    <button
                                                      onClick={() =>
                                                        Feedback?.onClick()
                                                      }
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
                                                  )
                                                )}
                                              </div>
                                            </>
                                          ) : (
                                            <div
                                              className={`flex h-max w-full  translate-y-[30px] flex-col items-center justify-center gap-y-[12px] border `}
                                            >
                                              {(() => {
                                                return FeedbackSelect?.map(
                                                  (
                                                    FeedBackinput,
                                                    FeedBackInputIndex
                                                  ) => {
                                                    return (
                                                      <div
                                                        key={`FeedbackSelect${FeedBackinput.dbq}`}
                                                        className={`flex min-h-[70px] w-[100%] max-w-[420px] flex-wrap items-center justify-center gap-y-[20px] border  px-[50px] py-[10px] font-[brandinkLight] text-[0.9rem] leading-none`}
                                                      >
                                                        {/*<-------------- QUESTION ----------------->  */}
                                                        <div
                                                          className={` flex  w-full  items-center justify-center`}
                                                        >
                                                          <p>
                                                            {FeedBackinput.dbq}
                                                          </p>
                                                        </div>

                                                        {/*<--------------  DROP DOWN SELECT -----------> */}
                                                        <div
                                                          className={`flex   w-full  items-center justify-center`}
                                                        >
                                                          <div
                                                            className={`group/selectContainer relative flex w-full items-center justify-around`}
                                                          >
                                                            <select
                                                              onChange={(e) => {
                                                                setFeedbackSelect(
                                                                  (
                                                                    prevFeedbackSelect
                                                                  ) => {
                                                                    const updatedFeedbackSelect =
                                                                      [
                                                                        ...prevFeedbackSelect,
                                                                      ];
                                                                    updatedFeedbackSelect[
                                                                      FeedBackInputIndex
                                                                    ].selected =
                                                                      e.target.value;
                                                                    return updatedFeedbackSelect;
                                                                  }
                                                                );
                                                              }}
                                                              className={`absolute  flex w-full cursor-pointer appearance-none items-center justify-between gap-y-[5px]  rounded-sm border border-black px-[12px] py-[6px] outline-none  `}
                                                            >
                                                              {FeedBackinput?.options.map(
                                                                (
                                                                  option,
                                                                  optionIndex
                                                                ) => (
                                                                  <>
                                                                    <option
                                                                      className={`w-max cursor-pointer   bg-none `}
                                                                    >
                                                                      <p
                                                                        className={`absolute h-full w-full `}
                                                                      >
                                                                        {option}
                                                                      </p>
                                                                    </option>
                                                                  </>
                                                                )
                                                              )}
                                                            </select>
                                                            <BiArrowToBottom className="transition-color pointer-events-none  absolute right-[10px] z-[5] duration-[150ms] group-hover/selectContainer:text-blue-800" />
                                                          </div>
                                                        </div>
                                                      </div>
                                                    );
                                                  }
                                                );
                                              })()}
                                              <button
                                                onClick={() => {
                                                  handleSubmitFeedback();
                                                  handleDeleteUser();
                                                  console.log(
                                                    FeedbackSubmitedStatus
                                                  );
                                                }}
                                                className={`group relative my-[10px] flex  w-[90%] border-spacing-3  items-center justify-center overflow-hidden rounded-full  border border-gray-700 bg-black py-[4px] text-white ring-offset-lime-500 hover:bg-transparent hover:text-black`}
                                              >
                                                <p>submit and Delete account</p>

                                                <AiOutlineLoading
                                                  style={{
                                                    transition: `top 450ms ease-in-out`,
                                                  }}
                                                  className={`absolute right-[30px] animate-spin text-white duration-200 group-hover:text-black  ${
                                                    !isSubmittingFeedback
                                                      ? `top-[150%]`
                                                      : `top-auto`
                                                  }`}
                                                />
                                              </button>
                                            </div>
                                          )
                                        ) : (
                                          <>
                                            <p className={`w-full`}>
                                              please enter your password to
                                              continue deleting your account
                                            </p>
                                            <div
                                              className={`flex min-h-[35px] w-full  items-center justify-center overflow-hidden`}
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
                                                placeholder={`${
                                                  JSON.parse(localStorage?.user)
                                                    ?.userName
                                                } current password`}
                                                className={` w-full border  p-[5px]  py-[10px] text-[14px] text-gray-950 outline-none placeholder:text-black/50  ${
                                                  !isConfirmingPassword
                                                    ? confirmPasswordError
                                                      ? currentUserPassword
                                                        ? ` border-b-red-500`
                                                        : ` border-b-black`
                                                      : `border-transparent border-b-black`
                                                    : `border-b-transparent`
                                                }`}
                                              />
                                              {/* THE PASSWORD SUBMIT BUTTON */}
                                              <div
                                                className={`absolute right-[15px] flex h-[32px] w-[110px] min-w-max items-center justify-center   `}
                                              >
                                                <hr
                                                  className={`h-[11px] w-[1px]  items-center   bg-black/80 `}
                                                />

                                                <div
                                                  className={`relative flex h-full w-full flex-col items-center  justify-start  overflow-hidden   `}
                                                >
                                                  <div
                                                    style={{
                                                      transition: `transform 250ms ease-in-out`,
                                                    }}
                                                    className={`absolute flex h-[200%] w-full flex-col items-center justify-center ${
                                                      isConfirmingPassword
                                                        ? `-translate-y-1/2`
                                                        : `translate-y-0`
                                                    }`}
                                                  >
                                                    <div
                                                      className={`flex h-1/2 w-full items-center justify-center  `}
                                                    >
                                                      <button
                                                        onClick={async () => {
                                                          const confirmUserPassword =
                                                            await confirmPassword(
                                                              {
                                                                userEmail:
                                                                  JSON.parse(
                                                                    localStorage?.user
                                                                  )?.Email,
                                                                userPassword:
                                                                  currentUserPassword,
                                                              }
                                                            );
                                                        }}
                                                        className={`flex h-[1/2] w-full items-center justify-center gap-x-[5px] `}
                                                      >
                                                        <p>submit</p>
                                                        <RxArrowTopRight />
                                                      </button>
                                                    </div>
                                                    <div
                                                      className={`flex h-1/2 w-full items-center justify-between px-[5px] `}
                                                    >
                                                      <p
                                                        className={`text-[13px]`}
                                                      >
                                                        confirming
                                                      </p>
                                                      <AiOutlineLoading
                                                        className={`animate-spin`}
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </Modal>
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
                                      transition: `transform 250ms, opacity 250ms, border 250ms 250ms ,   background 150ms ease-in-out`,
                                    }}
                                    className={`m-[5px] flex  min-h-[50px]  w-[80%]  max-w-[80%] flex-wrap items-center  gap-y-[15px] p-[15px]  font-[brandinkLight] text-[0.9rem] text-gray-100  hover:bg-white hover:bg-opacity-[0.07] hover:backdrop-blur-lg  md:w-[60%] lg:w-[45%]
                                    ${
                                      Categoryindex ===
                                      Parameter.currentlySelected - 1
                                        ? `pointer-events-auto relative translate-y-0 opacity-100 `
                                        : `pointer-events-none absolute translate-y-full opacity-0`
                                    }
                                    ${
                                      setting?.type === String
                                        ? `max-h-[65px] justify-start rounded-sm border-b ${
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

                    {/*<--------- THE SETTINGS SAVE BUTTON --------->  */}
                    <div
                      onClick={async () => {
                        const obj = {};
                        Parameter.ParameterCategories.forEach((category) => {
                          const { Title, Settings } = category;
                          const validInputs = Settings.filter((x) =>
                            x.valid(x.value)
                          );
                          const categoryObj = {};

                          for (let i = 0; i < validInputs.length; i++) {
                            categoryObj[validInputs[i].apiObjKey] =
                              validInputs[i]?.value;
                          }

                          if (Object.keys(categoryObj).length > 0) {
                            const FilterBoolean = Object.entries(
                              categoryObj
                            ).filter((x) => x.every(Boolean));
                            obj[Title] = Object.fromEntries(FilterBoolean);
                          }
                        });
                        configureAccount({
                          UserID: JSON.parse(localStorage?.user)?._id,
                          categories: obj,
                        })
                          .then((res) => {
                            if (res?.data?.user) {
                              localStorage.setItem(
                                "user",
                                JSON.stringify(res?.data?.user)
                              );
                              location.reload();
                            } else {
                              console.log({ error: res });
                            }
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }}
                      onMouseMove={(e) =>
                        setBtnBgPosition((c) => ({
                          left: e.clientX + "%",
                          top: e.clientY + "%",
                        }))
                      }
                      className={`group sticky top-0 m-auto mb-[5px] flex h-[10%] max-h-[35px] w-[80%] items-center justify-center self-center overflow-hidden rounded-full border `}
                    >
                      <button
                        className={`relative flex h-full w-[100%] items-center justify-center   py-[10px] font-[openSauceReg] text-gray-300 mix-blend-screen`}
                      >
                        save
                        <AiOutlineLoading3Quarters
                          className={`absolute right-[12px] animate-spin ${
                            isConfiguringAccount
                              ? `top-auto opacity-100 `
                              : `top-[120%] opacity-0`
                          }`}
                        />
                      </button>

                      {/* THE SHINING BEAUTIFUL BACKGROUND EFFECT */}
                      {/* TODO: find a way to make the background consume less memory then add it  */}

                      <div
                        style={{
                          left: BtnBgPosition.left,
                          top: BtnBgPosition.top,
                        }}
                        className={`absolute -z-10 hidden aspect-square w-[15px] translate-x-[-9000%] scale-[50] rounded-full opacity-[0.5] blur-sm group-hover:flex md:translate-x-[-30000%] 
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
                      />
                    </div>
                  </>
                );
              })()}
            </div>
          }
        </div>

        {/* <---- LOGOUT CHANGE USER BUTTONS CONTAINER ----> */}
        <div
          className={` relative my-[20px] flex min-h-[150px] w-full flex-col  items-center justify-center  gap-y-[5px]  p-[12px] px-[50px] md:px-[70px]`}
        >
          <div
            /* TODO:when you create the how to save user intruction page make sure to navigate the users to it onClick */
            /* onClick={()=> navigate('/')} */
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
            className={`  flex  min-h-[80%] w-full flex-wrap items-center justify-center `}
          >
            {/* THE TWO BUTTONS (CHANGE USER ) (LOG OUT) */}
            <div
              className={`flex h-full w-full min-w-[420px] flex-wrap items-center justify-around gap-x-[12px]  font-[brandinkLight] `}
            >
              {[
                {
                  title: `log out`,
                  onClick: () => "",
                  icon: BiLogOut,
                  style: { bg: "red", border: "border-white border" },
                },
                {
                  title: `change user`,
                  onClick: () => {
                    if (localStorage?.savedUsers) {
                      changeUserUtility();
                      if (changeUserUtility()?.navigate) {
                        navigate(changeUserUtility()?.navigate);
                      } else {
                        return;
                      }
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
                    className={`group relative my-[5px]  flex w-[45%] min-w-[400px] flex-grow items-center justify-center overflow-hidden  rounded-sm bg-opacity-50 py-[10px]
                    ${
                      btn?.title === `change user`
                        ? localStorage?.savedUsers
                          ? `text-white`
                          : `text-white/50 hover:bg-gray-300 hover:text-gray-800`
                        : `text-white`
                    } 
                    ${btn?.style.border}`}
                  >
                    <p className={`pointer-events-none z-[5]`}>
                      {btnIndex === 1
                        ? localStorage?.savedUsers
                          ? btn.title
                          : `no saved users`
                        : btn.title}
                    </p>
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
                          }-500 
                           ${
                             showBg
                               ? `scale-[500] opacity-100`
                               : `scale-0 opacity-0`
                           }`}
                        />
                      </div>
                    )}
                    {localStorage?.savedUsers && btnIndex ? (
                      <div
                        style={{
                          transition: `transform 250ms 400ms, opacity 250ms 500ms ease-in-out`,
                        }}
                        className={`absolute  right-0 flex h-full w-[150px] translate-y-full items-center justify-center overflow-hidden opacity-0 group-hover:translate-y-0 group-hover:opacity-100`}
                      >
                        <div
                          className={`absolute right-0 z-[5] h-full w-[40px] translate-x-[20%] bg-gradient-to-l from-black to-transparent `}
                        />
                        {JSON.parse(localStorage?.savedUsers)?.map(
                          (user, userPhotoindex) => (
                            <img
                              style={{
                                transition: `transform 250ms  , opacity 250ms ease-in-out`,
                                transitionDelay: userPhotoindex * 5000 + "ms",
                              }}
                              src={user?.Avatar}
                              className={`h-[35px] w-[35px] translate-y-full scale-[0.8] rounded-full object-cover opacity-0 group-hover:translate-y-0 group-hover:opacity-100`}
                            />
                          )
                        )}
                        {JSON.parse(localStorage?.savedUsers)?.slice(0, 3)
                          ?.length > 3 && (
                          <>
                            <div
                              className={`absolute right-[5px] z-[6] flex h-[15px] w-[15px] items-center justify-center rounded-full border border-white text-white`}
                            >
                              <BiPlus className={`scale-[1] `} />
                            </div>
                            <p
                              style={{
                                transition: `transform 250ms 500ms, opacity 250ms 600ms ease-in-out`,
                              }}
                              className={` absolute right-0 z-[6] translate-y-[10px]  scale-[0.7] text-white opacity-0 group-hover:translate-y-0 group-hover:opacity-100`}
                            >
                              {
                                JSON.parse(localStorage?.savedUsers)?.slice(
                                  0,
                                  3
                                )?.length
                              }
                            </p>
                          </>
                        )}
                      </div>
                    ) : (
                      ``
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
