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
import { BiArrowBack } from "react-icons/bi";

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
        ref: React.createRef,

        Settings: [
          {
            param: "change user name",
            type: String,
            value: "",
          },
          {
            param: "change lastname",
            type: String,
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
        ref: React.createRef,

        Settings: [
          {
            param: "change password",
            type: String,
            value: "",
          },
          {
            param: "enable email verification",
            type: Boolean,
            value: JSON.parse(localStorage?.user)?.Verify || "",
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
        ref: React.createRef,

        Settings: [
          {
            param: "change password",
            type: String,
            value: "",
          },
          {
            param: "enable email verification",
            type: Boolean,
            value: JSON.parse(localStorage?.user)?.Verify || "",
          },
        ],
      },
      {
        Title: "Privacy",
        About: "set up your privacy settings and account parameters ",
        Icon: Privacy,
        match: 0,
        style: { bg: `bg-purple-500` },
        ref: React.createRef,
        Settings: [
          {
            param: "who can find me ?",
            type: "enum",
            choise: ["my friends", "my friends friends", "no noe", "every one"],
          },
          {
            param: "what kind of emails do i wanna see",
            type: "enum",
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
    /* the settings icons rotate on typing effect */
    setRotateOnTyping((c) => (c = e.target.value?.length * 45));
  };

  return (
    /* SETTINGS PAGE */
    <div
      className={`m-auto my-[50px]  min-h-[600px] w-full max-w-[1300px] border p-[15px] px-[25px]`}
    >
      {/* SETTINGS TITLE AND INPUT FOR SEARCH */}
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
            onChange={handleChange}
            placeholder={`search settings `}
            className={`  h-[40px] w-full rounded-full border border-transparent bg-gradient-to-l from-gray-800 to-zinc-900 px-[20px] font-[OpenSauceReg] text-[16px] text-gray-200 outline-none  placeholder:opacity-40 focus:border-gray-800 focus:placeholder:opacity-100 md:h-[45px] md:border-gray-800`}
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
        className={`min-h-[650px] w-full rounded-sm  bg-gradient-to-tl from-black to-gray-900 py-[15px]`}
      >
        <div
          className={`relative  flex min-h-[350px] w-full flex-wrap items-center justify-center  p-[12px] py-[15px]`}
        >
          {/* SETTINGS BOXS CONTAINER */}
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

          {/* SETTINGS INPUTS CONTAINER */}
          {
            <div
              onScroll={(e) => {
                setSettingScrolling(e.target.scrollTop > 0);
              }}
              style={{
                transition:
                  Parameter.currentlySelected > 0 &&
                  `transform 150ms , opacity 150ms , background 550ms 5550ms ease-in-out`,
                transitionDelay:
                  Parameter.currentlySelected > 0 &&
                  150 * Parameter.ParameterCategories.length + "ms",
              }}
              className={`CostumeScroller absolute flex h-full w-full origin-top flex-col items-center justify-center  overflow-y-scroll rounded-md border border-white   bg-opacity-60 backdrop-blur-lg
              ${Parameter.currentlySelected && "z-10"}
              
              ${
                Parameter.currentlySelected &&
                Parameter.ParameterCategories[Parameter.currentlySelected - 1]
                  .style.bg
              } 
              ${
                Parameter.currentlySelected
                  ? `scale-y-100  opacity-100`
                  : `scale-y-0 bg-black opacity-0`
              }`}
            >
              {(() => {
                const { Title, About, Icon } =
                  Parameter.ParameterCategories[
                    Parameter.currentlySelected - 1
                  ] || Parameter.ParameterCategories[0];

                React.useEffect(() => {
                  Parameter.ParameterCategories.forEach((item) => {
                    if (item.ref.current) {
                      item.ref.current.style.animation =
                        "fadeDown 150ms 150ms ease";
                    }
                  });

                  return () => {
                    Parameter.ParameterCategories.forEach((item) => {
                      if (item.ref.current) {
                        item.ref.current.classList.remove("fadeDown");
                      }
                    });
                  };
                }, [Parameter.currentlySelected]);

                return (
                  <>
                    <div
                      className={`sticky top-0 z-10 flex h-[25%] min-h-max w-full flex-wrap  items-center  justify-around border border-red-500 px-[12px] md:h-[30%] ${
                        SettingScrolling
                          ? `bg-black bg-opacity-80 backdrop-blur-lg`
                          : `bg-transparent`
                      }`}
                    >
                      {/* Title of Category and Current Category Icon */}
                      <div
                        onClick={() =>
                          setParameter((c) => ({ ...c, currentlySelected: 0 }))
                        }
                        className={`group flex h-full w-1/2 cursor-pointer flex-wrap items-center justify-start gap-x-[15px] border `}
                      >
                        <BiArrowBack
                          style={{
                            transition: `transform 150ms  , opacity 150ms  , scale 150ms  ease-in-out`,
                            transitionDelay: `150ms`,
                          }}
                          className={`absolute left-[10px] text-white opacity-0 group-hover:translate-y-0 group-hover:scale-[1.3] group-hover:opacity-100`}
                        />
                        <h2
                          style={{
                            transition: `transform 150ms  ease-in-out`,
                          }}
                          className={` font-[garet] text-[26px] text-white group-hover:translate-x-[20px]`}
                        >
                          {Title}
                        </h2>

                        <div
                          style={{
                            transition: `transform 150ms  ease-in-out`,
                          }}
                          className={`group-hover:aspcet-square  flex aspect-[1/2]  w-[25px] items-center justify-center rounded-full bg-green-300 text-black group-hover:translate-x-[20px]`}
                        >
                          {Parameter.currentlySelected && (
                            <Icon size={18} className={`scale-[1.2] `} />
                          )}
                        </div>
                      </div>

                      {/* THREE OTHER SETTING CATEGORIES */}
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
                            className={` group flex aspect-[1/2] w-[30px] cursor-pointer items-center justify-center rounded-full border-white bg-white hover:border hover:bg-transparent`}
                          >
                            <Icon.Icon
                              style={{
                                transition: `transform 250ms ease`,
                              }}
                              size={18}
                              className={`scale-[1.2] group-hover:text-white `}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      className={`itmes-center flex h-[70%] w-full justify-center `}
                    >
                      <div
                        className={`absolute flex h-max w-full items-center justify-center overflow-y-scroll border`}
                      ></div>
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
