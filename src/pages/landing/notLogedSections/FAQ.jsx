import React from "react";
import { BiPlus } from "react-icons/bi";
import { useInView } from "react-intersection-observer";
export default function FAQ() {
  const [Faq, setFaq] = React.useState([
    {
      q: `what is jolly bravo ?`,
      ans: `jolly bravo is a social media like website that aims to revelotionize the way we use social media ,with the ability for its users to interect with people who have simmilar interest and contribute in what they fight for`,
      selected: false,
    },
    {
      q: `how to get use ?`,
      ans: `to use jolly bravo all you have to do is to sign up for a free account , pick the communities that interest you and start your journy aboard `,
      selected: false,
    },
    {
      q: `is it free ?`,
      ans: `depending on what you will use it for , it can be absolutly free or partly , if you wanna create a channel (tribe or community) you can have your first 2 channels for free if you want more you have to pay for the creation fee, while using the site for other purposes is completly free `,
      selected: false,
    },
    {
      q: `how much fee will be dedicated for the site ?`,
      ans: `the site take up to 6.3% of the channels revinew that help us cover our expenses and provide a better expirence for our users`,
      selected: false,
    },
    {
      q: `can i make money for myself with jolly bravo ? `,
      ans: `when creating a channel you may select how much will go to your personal gain  , the value you select will be displayed for all users to see alongside how much is dedicated for the tribe members or the community cause`,
      selected: false,
    },
  ]);
  const [FaqRef, FaqInView] = useInView({
    rootMargin: "0px",
    triggerOnce: false,
  });
  return (
    <div
      className={`relative m-auto my-[25px] flex h-[600px] max-h-[650px] w-full flex-col items-center  justify-center bg-gradient-to-tl from-zinc-900 to-zinc-900 px-[10px] md:px-[20px] `}
    >
      {/* <---- FAQ TEXT CONTAINER ----> */}
      <div
        ref={FaqRef}
        className={`flex min-h-[130px] w-full flex-col gap-y-[15px] py-[10px] lg:p-[25px]`}
      >
        {/* <---- FAQ TEXT TITLE ----> */}
        <h2
          className={` rleative relative w-max font-[openSauce] text-[50px] font-bold leading-none text-gray-300`}
        >
          FAQ {/* <---- QUESTION MARK ----> */}
          <b
            style={{
              transition: `opacity 150ms , transform 500ms ease`,
            }}
            className={`right-0 ${
              FaqInView
                ? "absolute translate-x-[45px]  scale-[1.2] opacity-[1]"
                : `absolute translate-x-[0px]  opacity-[0]`
            }`}
          >
            ?
          </b>
        </h2>
        {/* <---- FAQ TEXT PARA ----> */}
        <p
          className={`  w-[70%] font-[brandinkLight] text-[17px] font-bold text-gray-300 md:w-[50%] `}
        >
          have any question about how the site functionality and how it works ?{" "}
        </p>
      </div>

      {/* <---- Questions Answers Box CONTAINER ----> */}
      <div className={`relative h-[70%] w-full  p-[10px] lg:p-[25px]`}>
        <div
          className={` relative  flex h-full w-full flex-col items-center justify-center gap-y-[5px] `}
        >
          {Faq.map((QA, index) => {
            return (
              <>
                <div
                  onClick={() =>
                    setFaq((c) => {
                      const select = [...c];
                      select[index] = {
                        ...select[index],
                        selected: !select[index].selected,
                      };
                      return select;
                    })
                  }
                  style={{
                    height: `${100 / Faq.length - 2}%`,
                    transition: `opacity 350ms ${
                      index * Math.floor(Math.random() * 50)
                    }ms , top 500ms ${QA.selected ? `500ms` : "0ms"} ease `,
                    top: !QA.selected ? (index * 300) / Faq.length : 0,
                  }}
                  key={QA.q}
                  className={`group absolute flex w-full cursor-pointer items-center justify-between overflow-hidden border-b px-[20px] font-[brandinkLight] text-[18px] font-semibold text-gray-300  ${
                    Faq.some((x) => x.selected)
                      ? QA.selected
                        ? `z-[1] opacity-[1] hover:border-red-600`
                        : `z-0 opacity-[0] hover:border-blue-500`
                      : `opacity-[1] hover:border-blue-500`
                  }`}
                >
                  {/* <-QUESTION-> */}
                  <p>{QA.q}</p>
                  {/* <-PLUS EXIT ICON-> */}

                  <BiPlus
                    style={{
                      transition: `transform right-[15px] 1500ms ease`,
                    }}
                    className={`z-[1] group-hover:scale-[1.1]  ${
                      QA.selected
                        ? `rotate-[45deg] scale-[1.2] rounded-full  group-hover:text-black`
                        : `rotate-0 scale-[1]`
                    }`}
                  />
                  {/* <-LIGHT UNDERNEATH WHEN NOT SELECTED-> */}

                  <div
                    style={{
                      transition: `transform 600ms  ease `,
                    }}
                    className={`absolute left-[10%] top-[100%]  h-full w-[80%] translate-y-[40px] scale-0 rounded-full bg-gradient-to-tl    blur-[50px] group-hover:scale-[1] ${
                      QA.selected && `hidden`
                    }`}
                  />
                  {/* <-THE EXIT CIRCLE-> */}
                  <div
                    style={{
                      transition: `transform 300ms , opacity 150ms ease`,
                    }}
                    className={`backdrop-lg absolute right-[15px] h-[20px] w-[20px] translate-x-[-4px] translate-y-[30px] rounded-full bg-white opacity-0   group-hover:translate-y-[0] group-hover:opacity-[0.9] ${
                      QA.selected ? `flex` : `hidden`
                    }`}
                  />
                </div>
              </>
            );
          })}
          {/* THE ANSWERS CONTAINER */}
          <div
            style={{
              transition: `opacity 500ms ease`,
              transitionDelay: `500ms`,
            }}
            className={` absolute flex h-full w-full items-center justify-start p-[15px] py-[15px] md:pr-[35px] ${
              Faq.some((x) => x.selected)
                ? `pointer-events-auto opacity-[1]`
                : `pointer-events-none opacity-[0]`
            }`}
          >
            <p
              className={`h-[50%] font-[Poppins] text-gray-50
            `}
            >
              {
                (Faq.some((x) => x.selected) &&
                  Faq.filter((x) => x.selected))[0]?.ans
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
