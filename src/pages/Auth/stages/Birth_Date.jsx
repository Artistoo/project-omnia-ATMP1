import React from "react";
import { CiCalendar } from "react-icons/ci";

import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { AnimatedCounter } from "react-animated-counter";

import { SwapSpinner } from "react-spinners-kit";

//API
import { useAccountConfigureMutation } from "../../../redux/API.js";

import { IoMdArrowForward } from "react-icons/io";

import { useNavigate, useOutletContext } from "react-router-dom";
import { useClickAway } from "@uidotdev/usehooks";
import FormatDate from "../../../utils/FomatDates_utility.js";
import { v4 } from "uuid";

const BirthDateCalendarPopover = ({
  handleUpdateDate,
  date,
  handleCalendarPopoverState,
}) => (
  <div
    popover={"auto"}
    id={`BirthDateCalendarPopover`}
    className={`hideScroller m-auto min-h-[334px]  w-max overflow-hidden rounded-md bg-gray-200 backdrop:bg-black/70`}
  >
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center p-[5px]`}
    >
      <Calendar
        maxDate={new Date()}
        date={date.Date || new Date()}
        onChange={handleUpdateDate}
        className={`  flex bg-gray-200  font-[openSauceReg] text-[13.5px] `}
      />
      <div
        className={`flex-center sticky top-0 h-[40px] w-full rounded-md border border-black font-[openSauceReg] text-sm hover:border-gray-300/50 hover:bg-black hover:text-gray-200`}
      >
        <button
          popoverTarget={`BirthDateCalendarPopover`}
          popoverAction={"hide"}
          className={`absolute h-full w-full`}
        >
          select date
        </button>
      </div>
    </div>
  </div>
);

export default function Birth_Date() {


  
  //STATES
  const [date, setDate] = React.useState({
    FormatedBD: "",
    invalid: true,
    Date: "",
    age: "",
    fields: [
      {
        placeholder: "day",
        show: false,
        value: "",
        range: new Array(32)
          .fill("")
          .map((_, i) => i)
          .filter(Boolean),
      },
      {
        placeholder: "month",
        show: false,
        value: "",
        range: new Array(13)
          .fill("")
          .map((_, i) => i)
          .filter(Boolean),
      },
      {
        placeholder: "year",
        show: false,
        value: "",
        range: new Array(100)
          .fill("")
          .map((_, i) => i + (+new Date().getFullYear() + 1 - 100))
          .filter(Boolean),
      },
    ],
  });



  //ROUTER DOM
  const [Auth_Error, setAuth_Error] = useOutletContext().Error;
  const { fade, setFade } = useOutletContext().Avatars;
  const navigate = useNavigate();



  //API
  const [
    config_account,
    {
      isLoading: isUpdating,
      error: UpdatingAccountError,
      success: AccountUpdated,
    },
  ] = useAccountConfigureMutation();

  //USEHOOKS
  const Inputs = useClickAway(() => {
    setDate((c) => ({
      ...c,
      fields: c.fields.map((x) => ({ ...x, show: false })),
    }));
  });

  //HANDLERS
  const handleThrowInvalidAgeError = (date) => {
    const BD = new Date(date);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - BD.getFullYear();
    console.log(age);
    if (age < 10) {
      setAuth_Error(`invalid age , please select a valid age to continue`);
      setDate((c) => ({ ...c, invalid: true }));
      return false;
    }
    setAuth_Error(``);
    setDate((c) => ({ ...c, invalid: false }));
    return age;
  };
  const handleUpdateDate = (dateJsFormat) => {
    setDate((c) => ({
      ...c,
      Date: dateJsFormat,
      age: handleThrowInvalidAgeError(dateJsFormat) || "",
      bd: FormatDate(dateJsFormat),
      fields: c.fields.map((f, i) => ({
        ...f,
        value: FormatDate(dateJsFormat).split("/")[i],
      })),
    }));
  };
  const handleCalendarPopoverState = (state) => {
    const BirthDatePopoverID = document.getElementById(
      "BirthDateCalendarPopover"
    );
    if (!BirthDatePopoverID) return;
    BirthDatePopoverID[state ? `showPopover` : "hidePopover"]();
  };

  //EFFECTS
  React.useEffect(() => {
    if (date.fields[2].value) {
      handleThrowInvalidAgeError(
        `${date.fields[0] || "01"}/${date.fields[1] || "01"}/${
          date.fields[2].value
        }`
      );
    } else {
      return;
    }
  }, [...date.fields]);

  return (
    <div
      className={`h-[190px] w-[390px] gap-y-[5px] rounded-md bg-gray-200 font-[openSauceReg]`}
    >

      {/* BACKDROP COVER */}
      <span
        style={{
          transition: `opacity 250ms ease`,
        }}
        className={`pointer-events-none absolute z-0 h-screen w-screen bg-black/80 ${
          date.fields.some(({ show }) => Boolean(show))
            ? `opacity-100`
            : `opacity-0`
        }`}
      />

      {/* SECTION TITLE */}
      <div
        className={`flex h-[22%] w-full items-center justify-between bg-gray-300/80 px-[12px]`}
      >
        <p>select your birth date</p>
        <IoMdArrowForward
          size={20}
          title={`set up later`}
          className={`cursor-pointer transition-[transform] duration-[250ms] hover:translate-x-[5px]`}
        />
      </div>

      {/* TEXT AND INPUTS */}
      <div
        className={`flex h-[60%]  flex-col items-start justify-center gap-y-[10px] px-[12px]`}
      >
        <small>please selet your birth date</small>
        <div className={`flex w-full justify-around text-sm `}>
          <span ref={Inputs} className={`flex-center-around w-[85%]`}>
            {date.fields.map(({ placeholder, range, show, value }, i) => (
              <form
                onSubmit={(e) => e.preventDefault()}
                className={`relative flex h-[30px] w-[32%] items-center justify-start ${
                  date.fields.some(({ show }) => show)
                    ? show
                      ? `opacity-100`
                      : `opacity-10`
                    : `opacity-100`
                }`}
              >
                <input
                  onClick={() => {
                    setDate((c) => ({
                      ...c,
                      fields: c.fields.map((opt, optIndex) =>
                        optIndex === i
                          ? { ...opt, show: !opt.show }
                          : { ...opt, show: false }
                      ),
                    }));
                  }}
                  value={""}
                  placeholder={!Boolean(value) ? placeholder : ""}
                  className={`absolute h-full w-full cursor-pointer rounded-md bg-gray-300 px-[5px] text-gray-500 outline-none`}
                />

                {/* COUNTER ANIMATION */}
                <div
                  className={`pointer-events-none absolute flex h-full w-full items-center justify-start px-[5px] ${
                    Boolean(value) ? `opacity-100` : `opacity-0`
                  }`}
                >
                  <AnimatedCounter
                    includeDecimals={false}
                    value={value}
                    fontSize={"13px"}
                    color={`gray`}
                    decrementColor={"black"}
                    incrementColor={"black"}
                  />
                </div>

                <ul
                  className={`hideScroller absolute top-[35px]  z-[3] flex max-h-[200px] w-full  flex-col-reverse   items-center justify-start overflow-scroll rounded-md bg-gray-200 px-[5px] 
                  ${
                    show
                      ? `pointer-events-auto opacity-100`
                      : `pointer-events-none opacity-0`
                  }`}
                >
                  {range.map((n) => (
                    <li
                      key={v4()}
                      onClick={() => {
                        setDate((c) => ({
                          ...c,
                          fields: c.fields.map((rangeItem, rangeIndex) =>
                            i === rangeIndex
                              ? {
                                  ...rangeItem,
                                  value: n,
                                  show: false,
                                }
                              : { ...rangeItem }
                          ),
                        }));
                      }}
                      className={`slide_inView_animation flex-center h-max w-full cursor-pointer rounded-sm py-[2px] hover:bg-gray-300/80 `}
                    >
                      {n}
                    </li>
                  ))}
                </ul>
              </form>
            ))}
          </span>

          <span
            onClick={() => {
              const BirthDatePopoverID = document.getElementById(
                "BirthDateCalendarPopover"
              );
              if (!BirthDatePopoverID) return;
              BirthDatePopoverID.showPopover();
            }}
            className={`flex-center relative h-full w-[12%] cursor-pointer  rounded-md border border-gray-700/80 bg-slate-200 hover:bg-blue-100`}
          >
            <CiCalendar size={18} />
            <BirthDateCalendarPopover
              handleCalendarPopoverState={handleCalendarPopoverState}
              handleUpdateDate={handleUpdateDate}
              date={date}
            />
          </span>
        </div>
      </div>

      {/* BUTTON */}
      <div
        className={`relative flex h-[32px] w-full items-center justify-center rounded-md px-[12px] `}
      >
        <button
          onClick={async () => {
            if (
              !date.fields.some(({ value }) => Boolean(value)) ||
              date.invalid
            ) {
              setAuth_Error("invalid age");
              return;
            }
            const update = await config_account({
              UserID: localStorage?.user && JSON.parse(localStorage.user)._id,
              categories: {
                Account: { Age: date.age },
              },
            });

            if (update.data?.user) {
              setFade(true);
              const fadeBeforeNav = new Promise((res, rej) => {
                setTimeout(() => {
                  navigate(`/AccountAuth/select_interest`);
                  res();
                }, 4000);
              }).then(() => clearTimeout(fadeBeforeNav));
            }
          }}
          className={` flex-center flex h-full w-full rounded-md border border-black/20   transition-[background] duration-[200ms] hover:bg-black hover:text-gray-200 
          ${
            !date.fields.some(({ value }) => Boolean(value)) || date.invalid
              ? `pointer-events-none opacity-50 `
              : `pointer-events-auto opacity-100`
          }`}
        >
          <p className="m-auto">confirm</p>
          <span
            style={{
              transition: `opacity 250ms ease`,
            }}
            className={`flex-center  absolute right-[20%] h-full w-[30%] ${
              isUpdating ? `opacity-100` : `opacity-0`
            }`}
          >
            <SwapSpinner size={20} color={"#000000"} />
          </span>
        </button>
      </div>
    </div>
  );
}
