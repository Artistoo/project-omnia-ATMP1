import React from "react";
import { useNavigate } from "react-router-dom";
import NotFound from "../../assets/img/NotFound.png";
export default function NoPageFound() {
  const navigate = useNavigate();
  const [pageLoaded, setPageLoaded] = React.useState(false);
  /* <---- REDIRECT TO HOME PAGE AFTER TIMEOUT ----> */
  React.useEffect(() => {
    let redirected = false;
    const redirect = setTimeout(() => {
      navigate("/");
      redirected = true;
    }, Infinity);
    redirected && clearTimeout(redirect);
    setPageLoaded(true);
  }, []);
  return (
    <div
      className={`flex h-[700px] w-full flex-col items-start justify-center gap-y-[20px] text-gray-300 lg:flex-row my-[15px] max-w-[1200px] m-auto`}
    >
      <div
        className={`flex h-1/2 w-full items-center justify-center overflow-hidden lg:h-[70%] lg:w-[45%] lg:overflow-visible   lg:px-[5px]`}
      >
        <img
          className={` pointer-events-none  bottom-0 h-full w-auto scale-[1.9] select-none lg:h-[90%] lg:translate-x-[15px]`}
          src={NotFound}
        />
      </div>
      <div
        className={`flex h-max w-full flex-col items-center justify-center gap-[20px] py-[30px]  font-[Poppins] lg:h-[500px] lg:w-1/2`}
      >
        <div>
          <h2
            style={{
              transition: `opacity 1500ms , transform 3000ms ease`,
            }}
            className={`font-[OpenSauce] text-[45px] font-bold lg:text-[60px] ${
              pageLoaded
                ? `translate-y-[0] opacity-[1]`
                : `transalte-y-[50px] opacity-0`
            }`}
          >
            Page Not Found
          </h2>
        </div>
        <div
          className={`flex w-full flex-wrap items-center justify-around  lg:flex-col lg:gap-y-[50px] md:flex-row flex-col `}
        >
          <p
            className={` min-w-[250px] md:w-[45%] lg:w-[80%] lg:text-center lg:text-[19px]`}
          >
            this page wasn't found , if you think this is an error please don't
            hasitate to contact us
          </p>
          <div className={`flex w-[40%] items-center justify-center`}>
            <button
              onClick={() => navigate(`/contactUs`)}
              style={{
                transition: `border 350ms   ease`,
              }}
              className={`group relative flex  w-[60%] items-center justify-center  overflow-hidden rounded-full border border-white py-[5px] hover:rounded-[0px] hover:border-transparent  hover:border-b-red-600 lg:scale-[1.1]`}
            >
              <p className={`z-10 group-hover:text-red-100`}>REPORT ERROR</p>
              <span
                style={{
                  transition: `transform 250ms 150ms , opacity 200ms 150ms ease `,
                }}
                className="absolute  aspect-square w-full translate-y-[250%] scale-[3] rounded-full bg-gradient-to-tl from-purple-500 to-red-600 opacity-[0] blur-lg group-hover:translate-y-[180%]  group-hover:opacity-[1]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
