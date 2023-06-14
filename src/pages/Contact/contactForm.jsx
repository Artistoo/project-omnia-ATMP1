import React from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import { Navigate, useNavigate } from "react-router-dom";

/*  */
import { validEmail } from "../../utils/validity";
import { useSendMeEmailMutation } from "../../redux/API";
//______________ ICONS ________________
import { IoIosArrowForward } from "react-icons/io";
import {
  BiAtom as science,
  BiBaseball as sport,
  BiBot as tech,
  BiCategory as design,
  BiCommentDots as chat,
  BiErrorAlt,
} from "react-icons/bi";

export default function ContactForm() {
  const navigate = useNavigate();
  /*<--------- UTILS CONTEXT ---------> */
  const { ReqState, MakeApiReq } = React.useContext(Utils).API;

  /*<--------- Redux Context -------> */
  const [sendMeEmail, { isLoading: isSending, isError, error }] =
    useSendMeEmailMutation();

  /*<----------- STATES --------> */
  const [emailInputs, setEamilInputs] = React.useState([
    [
      {
        title: `name`,
        value: "",
        ref: React.createRef(),
        placeHolder: `first and lastname`,
        req: true,
        valid: {
          validate: (val) => {
            return /^[a-zA-Z]+$/.test(val);
          },
          isValid: false,
        },
      },
      {
        title: `Email`,
        value: localStorage?.submitedEmail || "",
        ref: React.createRef(),

        placeHolder: `profissional or personal email`,
        req: true,
        valid: {
          validate: (val) => validEmail(val),
          isValid: false,
        },
      },
      {
        title: `Subject`,
        value: "",
        ref: React.createRef(),

        placeHolder: `first and lastname`,
        req: true,
        valid: {
          validate: (val) => {
            return /^\w+$/.test(val);
          },
          isValid: false,
        },
      },
      {
        title: `phone number (not rquired)`,
        value: "",
        ref: React.createRef(),

        placeHolder: `your phone number`,
        req: false,
        valid: {
          validate: (val) => {
            return /^\+?\d{1,3}[-.\s]?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$/.test(val);
          },
          isValid: false,
        },
      },
    ],
    [
      {
        title: `let us know how we can make our services better for you`,
        value: ``,
        placeHolder: `how can we help you make our services better and what complains do you have ?`,
        req: true,
        valid: {
          validate: (val) => {
            return [typeof val === "string", val?.length > 40].every((x) => x);
          },
          isValid: false,
        },
      },
    ],
    [
      {
        sectionTitle: `what category of groups are you interested in the most`,
        req: false,
        options: [
          {
            title: `science`,
            icon: science,
            value: false,
          },
          {
            title: `sport`,
            icon: sport,
            value: false,
          },
          {
            title: `tech`,
            icon: tech,
            value: false,
          },
          {
            title: `design`,
            icon: design,
            value: false,
          },
          {
            title: `just for chat`,
            icon: chat,
            value: false,
          },
        ],
        placeHolder: ``,
      },
    ],
  ]);
  const [SendReq, setSendReq] = React.useState({
    sending: false,
    sent: false,
    error: "",
  });
  const [submitted, setSubmited] = React.useState(false);

  /* <------- USE EFFECT ------> */
  React.useEffect(() => {
    const clearStorage = setTimeout(() => {
      localStorage.removeItem("submitedEmail");
    }, 1000);

    return () => clearTimeout(clearStorage);
  }, []);

  /*<----- EVENT HANDLERS ----->*/
  const ArrowIcon = (index) => {
    return (
      <div
        className={`  flex h-full w-[40px] items-center justify-center  group-hover:w-[20px] `}
      >
        {Array(3)
          .fill("")
          .map((dot, i) => (
            <div
              style={{
                transition: `transform 600ms ${
                  i * 100
                }ms , background 300ms , highet 300ms ,  background 200ms ease `,
              }}
              className={` absolute m-0 flex aspect-square h-[10px] scale-[1.5] items-center justify-center rounded-full bg-transparent outline outline-[0.1px]  group-hover:relative group-hover:h-[8px] group-hover:scale-[0.5] group-hover:bg-blue-600 group-hover:opacity-[0.9] group-hover:outline-transparent opacity-[${
                !i ? 1 : 0
              }]`}
            >
              {!i && (
                <IoIosArrowForward
                  style={{
                    transition: `transform 550ms ease `,
                  }}
                  size={8}
                  className={`group-hover:absolute group-hover:translate-x-[56px] group-hover:scale-[5]`}
                />
              )}
            </div>
          ))}
      </div>
    );
  };
  const handleChange = (e, index, inpindex) => {
    /* checking if any of the inputs is already valid when any input value changes */
    setEamilInputs((current) => {
      const update = [...current];
      if (update[index][inpindex].valid.validate(e.target.value)) {
        update[index][inpindex] = {
          ...update[index][inpindex],
          valid: {
            ...update[index][inpindex].valid,
            isValid: true,
          },
        };
      }
      /* adding some stying when the input is not valid onChange  */
      if (
        current[index][inpindex].ref &&
        current[index][inpindex].ref.current
      ) {
        let DoneReset = false;
        current[index][inpindex].ref.current.style.color = current[index][
          inpindex
        ].valid.isValid
          ? `green`
          : `#ff7675`;
        const resetBorder = setTimeout(() => {
          current[index][inpindex].ref.current.style.color = current[index][
            inpindex
          ].value.length
            ? "white"
            : `gray`;
          DoneReset = true;
        }, 1500);
        if (DoneReset) clearTimeout(resetBorder);
      }

      /* validating the inputs on change  */
      const validate = update[index][inpindex]?.valid.validate(e.target.value);
      update[index][inpindex] = {
        ...update[index][inpindex],
        value: e.target.value,
        valid: {
          ...update[index][inpindex].valid,
          isValid: validate,
        },
      };
      return update;
    });
  };
  const handleSubmit = async () => {
    const data = {
      interest: emailInputs[2][0].options
        .filter((selected) => selected.value)
        .map((i) => i.title),
      email: emailInputs[0][1].value,
      subject: emailInputs[0][2].value,
      message: emailInputs[1][0]?.value,
      from: emailInputs[0][0]?.value,
    };

    if (
      emailInputs
        .slice(0, 1)
        .flat()
        .filter((x) => x?.req)
        .every((i) => i?.valid?.isValid)
    ) {
      try {
        const respond = await sendMeEmail(data);
        if (respond.error.originalStatus === 200) {
          setSubmited(true);
          let done = false;
          const returnHomeTimer = setTimeout(() => {
            navigate("/");
            done = true;
          }, 6000);
          done && clearTimeout(returnHomeTimer);
        } else setSubmited(true);
      } catch (err) {
        setSendReq((c) => ({ ...c, error }));
        setSubmited(false);
      }
    }
  };

  return (
    /* <------------------- PAGE CONTAINER -----------------> */
    <div
      id={`contactFormContainer`}
      className={`relative mb-[150px] mt-[50px] flex h-[1300px] w-full flex-col-reverse flex-wrap gap-y-[0px] px-[20px]  md:h-[1300px] md:gap-y-[50px] lg:h-[900px] lg:flex-row lg:justify-between  `}
    >
      {/*<----------- TEXT TEXT PARENT CONTAINER --------------> */}
      <div
        className={`relative flex h-[40%] w-full   translate-x-[-30px]  scale-[0.9] pt-[20px] md:h-[30%] md:translate-x-0 md:scale-[1]  lg:h-full lg:w-[38%]`}
      >
        {/* TEXT CONTAINER */}
        <div
          className={`top-0 flex  h-[50%] w-full flex-col items-center justify-between gap-x-[30px] gap-y-[30px] px-[10px] pt-[50px] text-gray-300 md:sticky md:h-[60%] md:flex-row lg:flex-col lg:gap-x-0 `}
        >
          {/* FIRST BOX TEXT */}
          <div
            className={`flex h-max w-full  flex-col items-center justify-center gap-y-[12px]  md:h-[45%]
            md:w-1/2 lg:w-full `}
          >
            <h2
              className={`font-[brandinkLight] text-[50px] font-semibold leading-[45px]`}
            >
              Questions About Our Services
            </h2>
            <p className={`font-[garet] text-[semibold]`}>
              We're here to help! If you have any queries, concerns, or simply
              need more information about our services , feel free to reach out
              to us.
            </p>
          </div>

          {/* SECOND BOX TEXT */}
          <div
            className={`flex  h-max w-full flex-col justify-center gap-y-[30px] md:h-[45%] md:w-1/2 lg:w-full lg:items-center`}
          >
            <h2
              className={`font-[brandinkLight]  text-[50px] font-semibold leading-[45px]`}
            >
              Want To Learn more about us ?
            </h2>
            <div
              className={` flex flex-row items-center justify-center gap-y-[5px] font-[garet] text-[18px] md:flex-col lg:w-full lg:gap-y-0`}
            >
              {[
                { title: `more about us`, to: `` },
                { title: `more about how it work`, to: `` },
              ].map((link, index) => (
                <div
                  key={link.title}
                  className={`animate-dots group group flex h-[30px] w-full cursor-pointer items-center justify-start gap-x-[10px] font-[Poppins] text-[17px] font-semibold hover:text-blue-600 lg:gap-x-[50px]`}
                >
                  <p className={`w-max lg:w-1/2 `}>{link.title} </p>
                  <ArrowIcon index />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*<-------------------- THE FORM  ------------------>*/}
      <div
        className={`relative flex h-[55%] items-center justify-center   md:h-[65%] md:w-full lg:h-full lg:w-[55%] lg:px-[30px]`}
      >
        <div
          className={`relative top-0 flex h-[90%] w-full flex-col items-center justify-center  gap-y-[20px]  font-[Poppins] text-[16px] font-semibold text-gray-500 lg:sticky lg:h-[80%]`}
        >
          {/* SUCCESSFULLY SENT */}
          <div
            style={{
              transition: `opacity 250ms , transform 300ms ease `,
            }}
            className={`pointer-events-none absolute flex h-full w-full flex-col items-center justify-center text-[1.2rem] text-gray-200 ${
              submitted
                ? `translate-y-0 opacity-[1]`
                : `translate-y-[50px] opacity-0`
            }`}
          >
            <img />
            <p>sent successfully</p>
          </div>
          {emailInputs.map((inputSection, index) => {
            return (
              <div
                style={{
                  transition: `opacity 250ms , transform 300ms ease `,
                }}
                key={`inputContactSectionN${index}`}
                className={`flex h-[35%] w-full  flex-wrap items-center justify-center gap-x-[20px]   gap-y-[12px] lg:h-[32%] ${
                  submitted ? `translate-y-[-200px] opacity-0` : ``
                }`}
              >
                {/* THE FIRST AND SECOND SECION CONTAINER */}
                {index != 2
                  ? inputSection.map((inp, inpindex) => (
                      <div
                        style={{
                          height: 100 / inputSection.length - 30 + "%",
                        }}
                        className={`min-w-1/2  relative w-[40%] flex-grow   ${
                          index === 1
                            ? `border border-white px-[0px] pl-[15px]`
                            : ` border-b px-[15px] md:h-max`
                        }`}
                      >
                        {/* THE ERROR ICON */}
                        <BiErrorAlt
                          style={{
                            transition: `transform 350ms , opacity 250ms ease`,
                          }}
                          className={`absolute left-0 lg:left-[15px] ${
                            inp?.value?.length > 0
                              ? inp?.valid?.isValid
                                ? `translate-y-[50px] opacity-[0]`
                                : `translate-y-[22px] opacity-[1]`
                              : `translate-y-[50px] opacity-[0]`
                          } ${
                            index === 1
                              ? `translate-x-[550px] lg:translate-x-[600px]`
                              : `translate-x-[270px] `
                          }  fill-red-300  `}
                        />

                        <div
                          className={`flex h-[100%]  translate-x-[-10px]  ${
                            index === 1 ? `items-start` : `items-end`
                          } `}
                        >
                          <label
                            className={` absolute h-[30%] text-gray-300  ${
                              index === 1
                                ? ` top-[-80px] translate-y-[50px]`
                                : `top-[-20px] translate-y-[5px]`
                            }`}
                            for={inp.title}
                          >
                            {inp.title}
                          </label>

                          {(() => {
                            const { placeHolder, title, ref } = inp;
                            const className = `h-full w-full  bg-transparent text-[16px] py-[10px] pt-[15px]  scroller text-gray-200 placeholder:text-gray-600 focus:outline-none resize-none`;
                            const styling = {
                              transition: `color 300ms ,filter 300ms ease `,
                            };
                            return index === 1 ? (
                              <textarea
                                style={styling}
                                onChange={(e) =>
                                  handleChange(e, index, inpindex)
                                }
                                id={title}
                                placeholder={placeHolder}
                                className={className}
                              />
                            ) : (
                              <input
                                style={styling}
                                ref={ref}
                                defaultValue={
                                  title === "Email"
                                    ? localStorage.emailSubmited || ""
                                    : ""
                                }
                                onChange={(e) =>
                                  handleChange(e, index, inpindex)
                                }
                                id={title}
                                placeholder={placeHolder}
                                className={className}
                              />
                            );
                          })()}
                        </div>
                        {/* <------- SERVER RES ERROR ---->  */}
                        {index === 1 && (
                          <div
                            style={{
                              transition: `transform 150ms ease`,
                            }}
                            className={`absolute bottom-0 left-0 h-[30px] w-full translate-y-[35px]  select-none items-center justify-start overflow-hidden font-[Poppins] text-sm font-normal text-red-500 ${
                              ReqState.error
                                ? `flex translate-y-0 opacity-[1]`
                                : `hidden translate-y-[100%] opacity-[0]`
                            } `}
                          >
                            <p> {ReqState.error} : server error</p>
                          </div>
                        )}
                      </div>
                    ))
                  : inputSection.map((inp) => (
                      <div className="flex h-full w-full flex-col items-start justify-start gap-y-[15px]   ">
                        <h2 className={`h-[12%]  text-gray-200 lg:h-[20%]`}>
                          {inp.sectionTitle}
                        </h2>
                        <div
                          className={`flex h-[85%] flex-wrap items-center justify-center gap-[15px] gap-y-0 md:w-full  lg:h-[75%] `}
                        >
                          <div
                            className={`flex h-max w-[90%] flex-wrap gap-[15px] py-[30px]`}
                          >
                            {inp.options?.map((check, checkIndex) => (
                              <div
                                onClick={() => {
                                  let toggle = !check.value;
                                  setEamilInputs((current) => {
                                    const update = [...current];
                                    update[2][0].options[checkIndex] = {
                                      ...update[2][0].options[checkIndex],
                                      value: toggle,
                                    };
                                    return update;
                                  });
                                }}
                                className={`  flex h-[25px] min-w-[40%] max-w-[45%] flex-grow cursor-pointer items-center justify-start gap-x-[25px]  `}
                              >
                                <check.icon
                                  style={{
                                    transition: `transform 500ms ease`,
                                  }}
                                  className={`${
                                    check.value
                                      ? `rotate-[360deg] scale-[1.1] text-green-400`
                                      : ""
                                  }`}
                                  size={20}
                                />
                                <p
                                  className={`font-thin  ${
                                    check.value
                                      ? `text-gray-200`
                                      : `text-gray-400`
                                  }`}
                                >
                                  {check.title}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            );
          })}
          <div
            stlye={{
              transition: `background 250ms , color 250ms ease`,
            }}
            onClick={() => handleSubmit()}
            className={`flex h-[15%] max-h-[50px] w-full cursor-pointer items-center justify-center rounded-sm border bg-gradient-to-tl from-gray-300 to-gray-100 text-[18px] font-normal text-black hover:from-transparent hover:to-transparent hover:text-white lg:h-[8%]`}
          >
            {isSending ? `sending` : `submit`}
          </div>
        </div>
      </div>
    </div>
  );
}
