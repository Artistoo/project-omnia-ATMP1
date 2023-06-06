import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { categoryExamples } from "../../../../data";
export default function features() {
  const [CategorySample, setCategorySample] = React.useState([
    {
      title: `Community`,
      selected: false,
      Example: categoryExamples.Community,
    },
    {
      title: `Tribe`,
      selected: false,
      Example: categoryExamples.Tribe,
    },
  ]);

  return (
    <div
      className={`flex h-[420px] w-full translate-y-[-50px] items-center justify-center md:px-[10px] lg:h-[490px] lg:justify-between `}
    >
      {/* TEXT */}
      <div
        style={{
          transition: `opacity 250ms  , ${
            !CategorySample.some((x) => x.selected) ? "3000ms" : "0ms"
          }, transform 150ms ease  `,
        }}
        className={`  flex h-[100%] w-full  flex-col  items-start justify-center  px-[15px] pt-[35px] sm:flex-col md:flex-row lg:flex  lg:w-[42%] lg:translate-y-[0] lg:flex-col lg:items-center lg:gap-y-[10px] lg:px-[22px] lg:pt-0 lg:opacity-[1] ${
          CategorySample.some((x) => x.selected)
            ? `translate-y-[-50px] opacity-[0]`
            : `translate-y-[0] opacity-[1]`
        }`}
      >
        <div
          className={`flex h-[65%]  w-full items-center justify-center  py-[5px]  text-gray-100 md:w-[50%] md:justify-center lg:h-[43%] lg:w-full lg:justify-start `}
        >
          <h2
            className={`w-[80%] scale-[1.1] font-[openSauce] text-[60px] font-semibold leading-none  md:w-[90%] md:scale-[1] md:text-[70px] lg:text-[74px] lg:leading-[64px]  `}
          >
            no matter what you <br className="hidden md:flex" />{" "}
            <b
              className={`bg-gradient-to-tl from-purple-600 via-purple-500 to-teal-500 bg-clip-text text-transparent`}
            >
              fight for
            </b>
          </h2>
        </div>
        <div
          className={`md:px-0 relative flex min-h-[50%]  w-[100%] flex-col items-start justify-start md:pl-auto  pl-[20px] font-[Poppins] text-[17px] text-gray-200 md:h-[65%] md:w-[50%] lg:h-[45%] lg:w-full lg:gap-y-[15px] `}
        >
          <p
            className={`flex h-[30%] w-[90%] translate-y-[10px] flex-col items-center justify-center text-[18px] leading-tight md:h-[50%]  md:w-full md:translate-y-[0] md:break-all md:text-[20px] lg:w-[95%]`}
          >
            we got the right time for you , our communities can offter poeple
            from all over the globe who fight for the same thing{" "}
            <b className="mt-[10px] w-[100%] text-[0.9rem] md:hidden">
              press the button below to see what each group may involve around ?
            </b>
          </p>

          {/* BUTTON */}
          <div
            className={`absolute bottom-0 flex h-[30%] w-[90%] items-center justify-around md:w-full md:justify-between lg:relative lg:justify-start lg:gap-x-[30px]`}
          >
            {CategorySample.map((btn, index) => (
              <button
                style={{
                  transition: `background 350ms , color 252ms ease`,
                }}
                onClick={() =>
                  setCategorySample((current) =>
                    current.map((item, i) =>
                      i === index
                        ? { ...item, selected: true }
                        : { ...item, selected: false }
                    )
                  )
                }
                className={`max-h-[100%] w-[48%] rounded-full border border-white py-[10px] md:max-w-[220px]  ${
                  CategorySample.some((item) => item.selected)
                    ? btn.selected
                      ? `bg-white text-black`
                      : `bg-transparent text-white`
                    : !index
                    ? `bg-white text-black`
                    : `bg-transparent text-white`
                }`}
              >
                {btn.title}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* SECOND BOXS SECTION */}
      <div
        onClick={() =>
          setCategorySample((current) => {
            const update = [...current];
            const updated = current.map((item) => ({
              ...item,
              selected: false,
            }));
            return updated;
          })
        }
        className={`items-ceter absolute flex h-full w-full translate-y-[-1px] flex-col  flex-wrap justify-center lg:pointer-events-auto lg:relative lg:flex lg:w-[55%] ${
          !CategorySample.some((x) => x.selected)
            ? `pointer-events-none`
            : `pointer-events-auto`
        }`}
      >
        {/* GO BACK BUTTON */}
        <div
          style={{
            transition: `border 350ms ease`,
          }}
          className={`group absolute top-0 flex aspect-[3.5/1] h-[45px] translate-y-[-110%] items-center justify-around overflow-hidden rounded-full  border border-transparent hover:border-black lg:hidden ${
            CategorySample.some((item) => item.selected)
              ? `opacity-[1]`
              : `opacity-[0]`
          }`}
        >
          <div className="relative flex aspect-square w-[30px] cursor-pointer items-center justify-center  rounded-full group-hover:border-transparent">
            <BsArrowLeft
              style={{
                transition: `transform 450ms ease`,
              }}
              className="group-hover:translate-x-[-5px]"
            />
            <div
              style={{
                transition: `transform 350ms ease `,
              }}
              className="absolute z-[-1] h-full w-full scale-[1] rounded-full bg-purple-300 group-hover:scale-[16]  "
            />
            <div
              style={{
                transition: `transform 350ms ease `,
              }}
              className="absolute z-[-1] h-full w-full scale-[0] rounded-full bg-white group-hover:translate-x-[-5px]  group-hover:scale-[1]"
            />
          </div>
          <p
            style={{
              transition: `transform 550ms ease`,
            }}
            className={`pointer-events-none font-[poppins] font-semibold ${
              CategorySample.some((item) => item.selected)
                ? `translate-y-0`
                : `translate-y-[50px]`
            }`}
          >
            Go Back
          </p>
        </div>

        {/* BOXS */}
        {(() => {
          const Selected = CategorySample.some((item) => item.selected);
          const targetIndex = CategorySample.findIndex((item) => item.selected);
          const defaultIndex = 0;
          const randomize = Math.floor(Math.random() * 400);
          return Array(CategorySample[0].Example.length)
            .fill("")
            .map((_, index) => {
              const randomize = Math.floor(Math.random() * 400);

              return (
                <div
                  style={{
                    transition: `opacity 250ms ${randomize}ms , transform 220ms ease`,
                  }}
                  className={`relative flex h-1/4 w-1/4 items-center justify-center hover:scale-[0.98] lg:opacity-[1] ${
                    !Selected ? `opacity-0` : `opacity-[1]`
                  }`}
                >
                  <div
                    style={{
                      transition: `transform 1050ms , opacity 1500ms ${randomize}ms ease-in-out`,
                      transitionDelay: `${randomize}ms`,
                      background:
                        CategorySample[Selected ? targetIndex : defaultIndex]
                          .Example[index].styling.bg,
                      transform: `rotateY(${
                        Selected
                          ? !targetIndex
                            ? `360deg`
                            : 0
                          : targetIndex
                          ? `0`
                          : `360deg`
                      })`,
                    }}
                    className={`absolute flex h-full w-full items-center justify-center  font-[opensauce] font-normal ${""}`}
                  >
                    <p
                      className={`w-[60%] ${
                        CategorySample[Selected ? targetIndex : defaultIndex]
                          .Example[index].styling.fontColor
                      }`}
                    >
                      {" "}
                      {
                        CategorySample[Selected ? targetIndex : defaultIndex]
                          .Example[index].example
                      }
                    </p>
                  </div>
                </div>
              );
            });
        })()}
      </div>
    </div>
  );
}
