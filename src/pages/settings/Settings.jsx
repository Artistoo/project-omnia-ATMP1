import React from "react";
import { MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";

/* <--- CONTEXT ----> */
import user from "../../context/userState.jsx";

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

  /* EVENT HANDLER  */
  const handleChange = (e) => {
    setRotateOnTyping((c) => (c = e.target.value?.length * 45));
  };

  return (
    /* SETTINGS PAGE */
    <div
      className={`m-auto my-[50px] aspect-square h-[600px] w-full max-w-[1300px] border p-[15px]`}
    >
      {/* SETTINGS TITLE AND INPUT FOR SEARCH */}
      <div
        className={`flex h-[20%] w-full items-center justify-around border font-[Garet] text-[35px] md:text-[40px] text-white  `}
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
        className={`h-full w-full rounded-sm  bg-gradient-to-tl from-black to-gray-900`}
      ></div>
    </div>
  );
}
