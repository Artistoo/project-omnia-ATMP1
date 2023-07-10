import React from "react";
import { MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SettingsOptions from "../../components/SettingsOptions.jsx";
/* <--- CONTEXT ----> */
import user from "../../context/userState.jsx";

/*<--- ICONS ---->  */
import {
  IoMdColorWand as Apperance,
  IoIosFingerPrint as Privacy,
} from "react-icons/io";
import { BsPersonGear as Personal } from "react-icons/bs";
import { MdSecurity as Secuirty } from "react-icons/md";
import { BiArrowBack, BiCheck, BiCheckCircle } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import { GrRadialSelected } from "react-icons/gr";

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
  const [parameterMatch, setParameterMatch] = React.useState("");

  const [Parameter, setParameter] = React.useState({
    currentlySelected: 0,
    ParameterCategories: [
      {
        Title: "Personal",
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
            valid: (strength) => strength > 1,
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
            value: JSON.parse(localStorage?.user)?.Verify || "",
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
            value: "",
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
            value: "",

            choise: ["my friends", "my friends friends", "no noe", "every one"],
          },
          {
            param: "i wanna recevie email about",
            type: "enum",
            valid: () => true,
            value: "",
            choise: [
              "updates and new features",
              "when someone join my channel",
              "security alerts",
            ],
          },
        ],
      },
    ],
  });

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

  return (
    /* SETTINGS PAGE */
    <div
      className={`m-auto my-[50px]  min-h-[600px] w-full max-w-[1300px] border p-[15px] px-[25px]`}
    >
      {/*SETTINGS PAGE HEADER (TITLE AND INPUT FOR SEARCH)*/}
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

      {/* THE SETTINGS CONTAINER */}
      <div
        className={`min-h-[650px] w-full rounded-sm border border-green-500  bg-gradient-to-tl from-black to-gray-900 py-[15px]`}
      >
        <div
          className={`relative  flex h-[450px]   w-full flex-wrap items-center justify-center p-[12px] py-[15px]  md:h-[350px] md:min-h-[300px]`}
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
              className={`CostumeScroller absolute flex h-full w-[90%] origin-top flex-col items-start justify-center  gap-y-[15px] overflow-y-scroll rounded-md border border-white bg-opacity-60 bg-gradient-to-tl from-gray-900  to-gray-950 backdrop-blur-lg
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
                        {/* Icon of current Category */}
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
                            style={{
                              "--FadeSpeed": `${i * 500}`,
                            }}
                            onClick={() =>
                              setParameter((c) => ({
                                ...c,
                                currentlySelected:
                                  Parameter.ParameterCategories.map((x, i) =>
                                    x.About === Icon.About ? i + 1 : null
                                  ).filter(Boolean)[0],
                              }))
                            }
                            className={` group flex  cursor-pointer items-center justify-center rounded-full border-white bg-white hover:border hover:bg-transparent 
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
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* the Content */}
                    <div
                      className={`itmes-center flex h-[65%] w-full justify-center `}
                    >
                      <div
                        className={`hideScroller absolute flex h-max w-full flex-wrap items-center justify-center gap-x-[25px] gap-y-[30px] overflow-y-scroll py-[15px]`}
                      >
                        {(() => {
                          const target =
                            Parameter.ParameterCategories[
                              Parameter.currentlySelected - 1 || 0
                            ];

                          const DefaultStringInputStyling = `bg-transparent border-none placeholder:text-gray-200 font-[brandinkLight] placeholder:opacity-50 border-bottom border-white  outline-none text-white focus:border border-white  
                          `;

                          /* FUNCTIONS */

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

                              if (
                                currentSetting.valid &&
                                currentSetting.valid instanceof Function
                              ) {
                                const calcValidity = currentSetting.valid(
                                  e.target.value
                                );
                                currentSetting = {
                                  ...currentSetting,
                                  valid: calcValidity,
                                };
                              }

                              return {
                                ...prevState,
                                ParameterCategories: updatedCategories,
                              };
                            });
                          };

                          /* INPUT STYLINGS AND FUNCTIONALITY */
                          const StringInput = (input, index) => {
                            return (
                              <>
                                {" "}
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
                                        `current password`,
                                        `new password `,
                                      ].map((pass) => (
                                        <div
                                          className={`flex h-1/2 w-full items-center justify-center  border border-green-600 `}
                                        >
                                          <p>{pass}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                <hr
                                  style={{
                                    transition: `height 250ms , background 250ms ease `,
                                  }}
                                  className={`  w-[1px] translate-x-[-15px]
                                  ${
                                    input?.value
                                      ? input?.valid instanceof Function &&
                                        input?.inputType != "password"
                                        ? input?.valid(input.value)
                                          ? `h-[26px] bg-green-400`
                                          : `h-[26px] bg-red-400 `
                                        : input?.valid(
                                            input.strength(input.value)
                                          )
                                        ? `h-[26px] bg-green-400`
                                        : `h-[26px] bg-red-400 `
                                      : `h-[20px] bg-gray-500`
                                  }`}
                                />
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
                                  className={`${DefaultStringInputStyling} w-[60%] `}
                                />
                                {/* STARTS FOR PASSWORD STRENGTH */}
                                {input?.inputType === "password" && (
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
                                          ${input?.strength} 
                                          ${
                                            index + 1 <
                                            input?.strength(input?.value)
                                              ? `translate-y-0 opacity-100`
                                              : `translate-y-[25px] opacity-0`
                                          }`}
                                        />
                                      ))}
                                  </div>
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
                                        onClick={(e) => {
                                          setParameter((p) => {
                                            const update = { ...p };
                                            const Enum =
                                              update.ParameterCategories[
                                                update.currentlySelected - 1
                                              ].Settings[index];
                                            Enum.ParameterCategories.forEach(
                                              (indOpt) => {
                                                indOpt.value = [];
                                                indOpt.value.push(
                                                  indOpt.choise[i]
                                                );
                                              }
                                            );
                                            return update;
                                          });
                                        }}
                                        style={{
                                          transition: `background 150ms , color 200ms ease-in-out`,
                                        }}
                                        className={`relative flex w-[50px] min-w-max flex-grow cursor-pointer items-center justify-center overflow-hidden rounded-full  border px-[5px] py-[2px] text-[0.8rem]  hover:bg-white hover:text-black`}
                                      >
                                        <p>{opt}</p>
                                        <BiCheckCircle
                                          className={`absolute right-[5px] ${
                                            Array.isArray(input?.value) &&
                                            opt in input.value
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
                            return <></>;
                          };

                          const PickerInput = () => {
                            return <></>;
                          };

                          /* <----- THE RETURN STATEMENT FOR THE DETAILS SETTINGS */
                          return target?.Settings?.map((input, index) => {
                            return (
                              /* THE MAIN CONTAINER OF EACH INPUT IN THE SETTING DETAILS PAGE */
                              <div
                                style={{
                                  width: 100 / target.Settings.length - 5 + "%",
                                }}
                                className={`relative flex min-h-[50px]  min-w-[350px] flex-wrap  items-center  justify-around gap-y-[15px] font-[brandinkLight]  text-[0.9rem] text-gray-100 lg:w-[40%] 

                                ${
                                  input?.type === String
                                    ? `border-b border-white`
                                    : input?.type === "enum"
                                    ? ``
                                    : ``
                                }`}
                              >
                                {(() => {
                                  switch (input.type) {
                                    case String:
                                      return StringInput(input, index);
                                    case "enum":
                                      return EnumInput(input, index);
                                    case Boolean:
                                      return BooleanInput(input, index);
                                    case "Picker":
                                      return PickerInput(input, index);
                                  }
                                })()}
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>

                    {/* THE SAVE BUTTON */}

                    <div
                      onMouseMove={(e) =>
                        setBtnBgPosition((c) => ({
                          left: e.clientX + "%",
                          top: e.clientY + "%",
                        }))
                      }
                      className={`sticky top-0 m-auto mb-[5px] flex h-[10%] w-[80%] items-center justify-center self-center overflow-hidden rounded-full border`}
                    >
                      <button
                        className={`flex h-full  w-[100%] items-center justify-center   font-[openSauceReg] text-gray-300`}
                      >
                        save
                      </button>

                      <div
                        style={{
                          left: BtnBgPosition.left,
                          top: BtnBgPosition.top,
                        }}
                        className={`absolute -z-10 aspect-square w-[15px] translate-x-[50%] translate-y-[50%] scale-[50] rounded-full bg-blue-500`}
                      />
                    </div>
                  </>
                );
              })()}
            </div>
          }
        </div>
      </div>
    </div>
  );
}
