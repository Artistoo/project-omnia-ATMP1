import React from "react";

/* ____ ICONS ____ */
import { BsArrowDown } from "react-icons/bs";
import { RxCookie } from "react-icons/rx";
import { TbReload } from "react-icons/tb";
import { useInView } from "react-intersection-observer";

/* ____ COMPONENTS ____ */
import Logo from "../../assets/icons/Logo.jsx";

/* ____ JSX ____ */
export default function PleaseEnableCookies() {
  const [loaded, setLoaded] = React.useState(false);
  const [BoxsRef, BoxsInView] = useInView();
  React.useEffect(() => setLoaded(true), []);

  return (
    <div
      className={`flex min-h-[1180px] w-full flex-col items-center justify-center text-gray-100`}
    >
      {/* LOGO AND ENABLE COOKIES  */}
      <div
        className={`flex min-h-[560px] w-[410px] flex-col items-center justify-center`}
      >
        {/* LOGO */}
        <Logo
          Menu={false}
          color={{ main: "white", colors: ["white", "white", "white"] }}
        />
        {/* ENABLE COOKIES ALERT */}
        <div
          className={`relative flex h-[150px]  w-[450px]  items-center justify-around overflow-hidden border-white bg-gradient-to-tl from-gray-50 to-green-200 px-[15px]  py-[10px] font-[OpenSauceReg] text-[14px] text-black`}
        >
          {/* COOKIES ICON */}
          <div className={`flex w-[20%] items-center justify-center `}>
            <RxCookie
              style={{
                transition: `transform 250ms 200ms , opacity 250ms 200ms ease`,
              }}
              className={`absolute translate-x-[-15px] scale-[5] text-green-500 opacity-[0.7] ${
                loaded
                  ? `translate-x-0 opacity-100`
                  : `-translate-x-[350px] opacity-0`
              }`}
            />
          </div>

          {/* COOKIES PARA AND BTN */}
          <div
            className={`flex h-full w-[75%] flex-col items-center justify-center  gap-y-[22px] `}
          >
            <p
              className={`z-10 ${
                loaded
                  ? `translate-y-0 opacity-100`
                  : `translate-y-[250px] opacity-0`
              }`}
              style={{
                transition: `transform 250ms 100ms , opacity 1
                250ms 100ms ease`,
              }}
            >
              Oops! Cookies are disabled in your browser. Please enable cookies
              to continue.
            </p>
            <button
              style={{
                transition: `transform 250ms 150ms , opacity 250ms 150ms  ease`,
              }}
              onClick={() => location.reload()}
              className={`group z-10 flex min-w-max items-center  justify-center overflow-hidden rounded-full border border-black bg-gradient-to-tl  from-gray-50  to-zinc-200 px-[12px] py-[2px] font-[garet] text-[0.8rem] text-black hover:border-black hover:from-transparent hover:to-transparent hover:text-black
              
              ${
                loaded
                  ? `translate-y-0 opacity-100`
                  : `translate-y-[250px] opacity-0`
              }`}
            >
              Already Enabled
              <div
                style={{
                  transition: `right 250ms ease`,
                }}
                className={`transalte-x-full absolute  -right-full flex h-full w-[30px] items-center justify-center bg-white bg-opacity-50 backdrop-blur-lg group-hover:right-0`}
              >
                {" "}
                <TbReload />{" "}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ARROW */}
      <div
        style={{
          transition: `transform 250ms ease`,
        }}
        onClick={() =>
          window.scrollTo({
            top: BoxsInView ? 0 : document.documentElement.scrollHeight,
            behavior: "smooth",
          })
        }
        className={`flex w-full items-center justify-center ${
          BoxsInView ? `rotate-[180deg]` : `rotate-0`
        }`}
      >
        <BsArrowDown
          style={{
            transition: `transform 150ms ease-in-out`,
          }}
          className={`scale-[2] cursor-pointer text-white hover:translate-y-[10px]`}
        />
      </div>

      {/* QUESTIONS AND ANSWERS ABOUT COOKIES */}
      <div
        className={`flex min-h-[600px] w-full flex-col flex-wrap items-center justify-center gap-y-[80px] md:px-[120px]`}
      >
        <h2 className={`font-[garet] text-[31px] `}>More about Cookies</h2>
        <div
          className={`flex w-full flex-wrap items-center justify-around gap-y-[25px]`}
        >
          {[
            {
              Q: `what is the cookies policiy`,
              A: `we use cookies to help use provide a better expirance for our users and to keep the website functional , we proirtize our users privacy above all`,
            },
            {
              Q: `can i disable cookies`,
              A: `cookies that are not nessesiray will be diabled automatically , if you wanna filter which cookies to block you can do it after you log in to your account in the settings menu`,
            },
          ].map((CookiesBox, index) => (
            <div
              key={CookiesBox.Q + `${index}`}
              style={{
                transition: `opacity 350ms , transform 350ms ease `,
                transitionDelay: index * 150 + "ms",
              }}
              ref={BoxsRef}
              className={`flex min-h-[120px] min-w-[350px] max-w-[500px] flex-col items-center justify-center rounded-sm border border-white bg-gradient-to-tl from-gray-950 to-stone-900 px-[12px] ${
                BoxsInView
                  ? `translate-y-0 opacity-100`
                  : `translate-y-[50px] opacity-0`
              }`}
            >
              <h3 className={`w-max font-[openSauce] text-[1rem]`}>
                {CookiesBox.Q}
              </h3>
              <p className={`font-[brandinkLight] text-[0.8rem] `}>
                {CookiesBox.A}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
