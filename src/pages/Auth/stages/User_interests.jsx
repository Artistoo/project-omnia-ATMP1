import React from "react";

import { usePageLoaded } from "../../../hooks/usePageLoaded.jsx";

//API
import { useAccountConfigureMutation } from "../../../redux/API.js";
//ASSET
import Table from "../../../assets/mask/ProfileBgMasks/TableLike.png";

//DATA
import { Interests } from "../../../../data";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate, useOutletContext } from "react-router-dom";
import { SwapSpinner } from "react-spinners-kit";

export default function User_interests() {
  const [loaded] = usePageLoaded();
  const [IntParam, setIntParam] = React.useState("");
  const [Interests_state, updateInterests_state] = React.useState(Interests);

  //CONTEXT
  const [_, setAuth_Error] = useOutletContext().Error;
  const navigate = useNavigate();

  //API
  const [
    updateAccount,
    { isLoading: isUpdatingAccount, error: updatingAccountError },
  ] = useAccountConfigureMutation();

  //VAR
  const Ready =
    Interests_state.filter(({ selected }) => Boolean(selected))?.length >= 5;

  return (
    <div
      className={`relative my-[20px] flex  w-full flex-col items-center justify-start gap-y-[30px] px-[40px] md:px-[20px]`}
    >
      <span
        style={{
          maskImage: `url('${Table}')`,
          maskSize: "150% 150%",
          maskPosition: "center",
          WebkitMaskImage: `url(${Table})`,
        }}
        className={`absolute z-[-1] flex aspect-square h-[200px] scale-[1.4] bg-gradient-to-l from-blue-500 via-purple-50  to-purple-500/10 opacity-[.15]`}
      />

      <div
        className={`flex w-full flex-wrap items-end justify-between  gap-x-[12px] `}
      >
        {/* TITLE AND TEXT_BUTTON */}
        <span
          className={`flex-center min-h-[218px] w-full min-w-[400px] flex-col gap-y-[10px] px-[5px] py-[8px] md:w-[40%]  lg:w-[50%]`}
        >
          {/* TITLE */}
          <h2
            style={{
              transition: `background 5000ms 600ms ease`,
              backgroundPosition: `${loaded ? 100 : 0}% 100%`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "400%",
            }}
            className={`bg-gradient-to-l from-blue-200 via-purple-50 to-transparent  bg-clip-text font-[PoppinsBold]  text-[62px] leading-none  tracking-wide text-transparent`}
          >
            Select Your Interests{" "}
          </h2>

          {/* BUTTON AND SUBTITLE */}
          <div
            className={`relative flex  min-h-[80px] flex-wrap items-center justify-start gap-[10px] gap-y-[20px] `}
          >
            {/* SUBTITLE */}
            <p
              style={{
                transitionProperty: `color, opacity`,
                transitionTimingFunction:
                  "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                transitionDelay: "800ms",
                transitionDuration: "500ms",
              }}
              className={`text-md w-full flex-none   font-[openSauceReg] leading-none   [text-wrap:balance]  md:flex-grow lg:w-1/2
                ${
                  loaded
                    ? `text-gray-300 opacity-100`
                    : `text-gray-600 opacity-20 `
                }`}
            >
              for a better expereince in jolly bravo please select at least five
              boxs
            </p>

            {/* BUTTON */}
            <button
              onClick={async () => {
                if (!Ready) {
                  setAuth_Error(`please select at least five interests`);
                  return;
                }
                const updateAccountResponse = await updateAccount({
                  UserID:
                    localStorage?.user && JSON.parse(localStorage.user)?._id,
                  categories: {
                    Account: {
                      Interests: Interests_state.filter(({ selected }) =>
                        Boolean(selected)
                      ).map(({ title }) => title),
                    },
                  },
                });
                if (updateAccountResponse?.data?.user) {
                  localStorage.setItem(
                    "user",
                    JSON.stringify(updateAccountResponse?.data?.user)
                  );
                  navigate(
                    `/Profile/${updateAccountResponse?.data?.user?._id}`
                  );
                }
                console.log(updateAccountResponse);
              }}
              className={`relative flex h-[42px] w-[200px] min-w-[120px] flex-grow items-center justify-around overflow-hidden rounded-sm border border-gray-200/20 bg-black/40 font-[brandinkLight] text-gray-200 backdrop-blur-lg md:w-[200px] md:flex-none`}
            >
              <span
                style={{
                  transition: `width 250ms ease , background 250ms ease`,
                  width: `${
                    (100 / 5) *
                    Interests_state.filter(({ selected }) => Boolean(selected))
                      ?.length
                  }%`,
                }}
                className={`absolute left-0  top-0 z-[-1] h-full 
                    ${
                      Interests_state.filter(({ selected }) =>
                        Boolean(selected)
                      )?.length >= 5
                        ? `bg-green-400/60`
                        : `${
                            [
                              "bg-red-400/60",
                              "bg-orange-400/60",
                              "bg-purple-400/60",
                              "bg-blue-400/60",
                              "bg-green-500/60",
                            ][
                              Interests_state.filter(({ selected }) =>
                                Boolean(selected)
                              )?.length
                            ]
                          }`
                    }`}
              />

              <b className={`absolute`}>start now</b>
              <div className={`absolute right-[12%]`}>
                {React.createElement(
                  isUpdatingAccount ? SwapSpinner : FiArrowRight,
                  {
                    className: ` transition-[transform_opacity] 
                    ${
                      Interests_state.filter(({ selected }) =>
                        Boolean(selected)
                      )?.length >= 5
                        ? `translate-x-0 opacity-100`
                        : `translate-x-[-50%] opacity-0`
                    }`,
                    color: "#ffffff",
                    size: 15,
                  },
                  null
                )}
              </div>
            </button>
          </div>
        </span>

        {/* TODO: IF NO CONTENT REMOVE THE DIV CONTAINER */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIntParam(e.target.Interests_searchInput.value);
          }}
          className={`flex-center h-[100px] min-w-[200px] flex-grow md:w-[400px] md:flex-grow lg:w-[40%] `}
        >
          <input
            name={`Interests_searchInput`}
            onChange={(e) => setIntParam(e.target.value)}
            placeholder={`search categories`}
            className={`text-md w-full  rounded-sm border-[.5px] border-gray-50/50 bg-transparent bg-gradient-to-tl from-gray-50 to-zinc-200 p-[12px_10px] font-[openSauceReg] text-sm text-gray-900 opacity-90 outline-none placeholder:text-gray-500 focus:opacity-100 lg:w-[80%]`}
          />
        </form>
      </div>

      <div
        className={`hideScroller flex  h-max max-h-[500px] min-h-[300px] w-full max-w-[1500px] flex-wrap items-start justify-start gap-[5px] overflow-scroll rounded-[11px] border border-gray-200/50 p-[5px] md:w-[95vw]`}
      >
        {/* LOOPING THRO THE INTEREST BOX */}
        {Interests_state.filter(({ title }) =>
          title.toUpperCase().includes(IntParam.toUpperCase())
        ).map(({ Icon, selected, title }, interest_index) => (
          <div
            key={title.concat(`interest_box`)}
            onClick={() =>
              updateInterests_state((c) =>
                c.map((int) =>
                  int.title === title
                    ? { ...int, selected: !int.selected }
                    : { ...int }
                )
              )
            }
            style={{
              transition: `opacity 250ms 
              ${Math.floor(
                Math.random() * Interests_state.length
              )}ms cubic-bezier(0.85, 0, 0.15, 1)`,
            }}
            className={`flex-center-around fade_inView_animation relative h-[120px] w-[20%] min-w-[200px]  flex-grow cursor-pointer overflow-hidden rounded-md border md:max-w-[260px]
              ${
                loaded
                  ? selected
                    ? `border-gray-200/50 opacity-100`
                    : `border-gray-200/20 opacity-70`
                  : `opacity-0`
              }
            `}
          >
            <b className={`font-[openSauce] text-gray-100`}>{title}</b>
            <span className={`flex-center absolute right-[15%] h-full`}>
              <Icon
                style={{
                  transition: `filter 400ms  cubic-bezier(0.68, -0.55, 0.27, 1.55) , transform 400ms cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
                }}
                className={`absolute  z-[-1]  
                  ${
                    selected
                      ? `scale-[10] text-blue-700 blur-[1.5px] `
                      : `text-gray-100`
                  }`}
                size={25}
              />
              <Icon
                style={{
                  transition: `transform 400ms cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
                }}
                className={`absolute  z-[0] text-gray-50  ${
                  selected ? `scale-[1]` : `scale-0`
                }`}
                size={25}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
