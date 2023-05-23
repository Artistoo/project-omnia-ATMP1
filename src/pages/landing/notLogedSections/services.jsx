import React from "react";
import { useInView } from "react-intersection-observer";

//__________________ICONS___________________
import { CgArrowLeft } from "react-icons/cg";

//_________________ASSETS___________________
import GetHelp from "../../../assets/img/GetHelp.png";

export default function services() {
  /* <----------- THE SECTION BOXS ----------> */
  const ServicesBoxArt = () => {
    const [ServicesBoxsRef, ServicesBoxsInView] = useInView({
      rootMargin: "50px",
      triggerOnce: true,
      threshold: 0.5,
      root: null,
    });

    const [rotateDegree, setRotateDegree] = React.useState(90);
    const [ServiceBoxs, setCategoriesBoxs] = React.useState([
      {
        grids: {
          width: `21%`,
          boxs: [
            {
              span: `60%`,
              content: {
                img: ``,
              },
              style: {
                bg: null,
              },
            },
            {
              span: `40%`,
              content: {
                img: ``,
              },
              style: {
                bg: `bg-gradient-to-l from-yellow-50 to-yellow-200`,
              },
            },
          ],
        },
      },
      {
        grids: {
          width: `21%`,
          boxs: [
            {
              span: `50%`,
              content: {
                img: ``,
              },
              style: {
                bg: `bg-gradient-to-tl from-orange-200 to-orange-300`,
              },
            },
            {
              span: `50%`,
              content: {
                img: ``,
              },
              style: {
                bg: `bg-gradient-to-tl from-orange-200 to-orange-300`,
              },
            },
          ],
        },
      },
      {
        grids: {
          width: "21%",
          boxs: [
            {
              span: `70%`,
              content: {
                img: ``,
              },
              style: {
                bg: `bg-gradient-to-tl from-orange-200 to-orange-300`,
              },
            },
            {
              span: `30%`,
              content: {
                img: ``,
              },
              style: {
                bg: `bg-gradient-to-tl from-orange-200 to-orange-300`,
              },
            },
          ],
        },
      },
      {
        grids: {
          width: `36%`,
          boxs: [
            {
              span: `100%`,
              content: {
                text: {
                  subtitle: `find the help you need`,
                  detail: `whatever your going thro , find the help you need in a one big community `,
                },
                img: GetHelp,
                btn: `find out more`,
              },
              style: {
                bg: "bg-transparent",
                light: `bg-gradient-to-t from-purple-500 via-purple-900 to-purple-transparent`,
                hover: {
                  before: `bg-gradient-to-tl from-orange-500 to-orange-600`,
                },
              },
            },
          ],
        },
      },
    ]);
    console.log(ServicesBoxsInView);
    React.useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.pageYOffset;
        const rotationSpeed = 0.01;
        const rotationAngle = ServicesBoxsInView
          ? 0
          : (scrollPosition / rotationSpeed) % 90;
        setRotateDegree(rotationAngle);
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [ServicesBoxsInView]);

    return (
      <div
        ref={ServicesBoxsRef}
        style={{
          /* transform: `rotateX(${ServicesBoxsInView ? `0` : `${rotateDegree}deg`})`, */
          transition: `transform 1000ms  ease-in-out`,
        }}
        className={`min-w-[300px] lg:w-[80%] w-[90%] flex min-h-max  gap-x-[5px] origin-bottom`}
      >
        {/* <------ MAPPING THRO ARRAY OF OBJECTS ------> */}
        {ServiceBoxs.map((grid, index) => (
          /* <------ COLUMNS CONTAINER -----> */
          <div
            key={`categoriesBoxN${index}`}
            style={{
              width: grid.grids.width,
            }}
            className={`flex flex-col lg:h-[380px] h-[300px]   gap-y-[5px]`}
          >
            {/* <------ ROWS CONTANERS -------> */}
            {grid.grids.boxs.map((box) => (
              <div
                style={{
                  height: box.span,
                  transition: `border 500ms ease-in-out`,
                }}
                className={`flex justify-stretch w-[100%] rounded-[5px]  ${box?.style?.bg} border-gray-400 border hover:border-white  items-center justify-center flex-col py-[15px] px-[5px] gap-y-[10px] overflow-hidden relative group `}
              >
                {/* <----- THE SUBTITLE ------> */}
                <h2
                  className={`font-[Now] text-[28px] lg:text-[40px] leading-[25px] lg:leading-[33px] text-gray-100 uppercase lg:translate-x-[-15px]  lg:w-[70%] w-full`}
                >
                  {box?.content?.text?.subtitle}
                </h2>

                {/* <----- THE DETAILS PARAGRAPH ------> */}
                <p
                  className={`font-[brandinkLight] lg:translate-x-[-15px] w-full lg:w-[70%] text-white text-[13px] lg:text-[15px] leading-[14px] `}
                >
                  {box?.content?.text?.detail}
                </p>

                {/* <----- ART WORK IMAGE -------> */}
                <img
                  className={`z-[-1] h-auto scale-[1.2]  lg:h-[70%] lg:w-auto lg:aspect-auto aspect-square  bottom-[30px] lg:relative absolute lg:opacity-[1] opacity-[0.4]`}
                  src={box?.content?.img}
                />
                {/* <------ MORE ABOUT BUTTON IF EXIST ------> */}
                {box?.content?.btn && (
                  <button
                    style={{
                      transition: `background 450ms ease-in-out`,
                    }}
                    className={`absolute bottom-[15px] lg:top-[5px] self-start mx-[5px] h-[20px] lg:self-end py-[3px] backdrop-blur-[70px]  bg-gray-100 bg-opacity-[0.5] flex text-white items-center justify-center hover:border-white hover:text-white rounded-[1px]  border border-transparent w-max px-[14px] font-[Poppins] text-[11px] group-hover:bg-black group-hover:bg-opacity-[0.3]`}
                  >
                    {box?.content?.btn}
                  </button>
                )}
                {/* <-------- LIGHT BOX IF EXIST -------> */}
                {box?.style?.light && (
                  <div
                    className={`w-full h-[50%] absolute ${box?.style?.light} bottom-0 opacity-[0.5] z-[-1]`}
                  />
                )}
                {/* <------- BOX GROW ON HOVER IF EXIST ------> */}
                {box?.style?.hover?.before && (
                  <div
                    style={{
                      transition: `transform 650ms ease-in-out`,
                    }}
                    className={`absolute w-full h-full scale-0 group-hover:scale-[2] ${box?.style?.hover?.before} rounded-full z-[-2] opacity-[0.9] blur-lg`}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  /* <----------- THE SECTION TEXT ----------> */
  const ServicesText = () => (
    <div
      className={`lg:w-[80%] w-[90%]  py-[25px] flex flex-wrap items-center justify-between lg:px-0 px-[15px] gap-y-[40px]  `}
    >
      {/* <------- CATEGORIES TEXT ---------> */}
      <div
        className={`flex items-center justify-center flex-col lg:w-[45%] w-full  gap-y-[10px]`}
      >
        <h2 className={`font-[Now] text-[50px] text-gray-50 leading-[43px]`}>
          COMMUNITIY CATEGORIES
        </h2>
        <p
          className={`font-[Poppins] text-gray-200 text-[15px] leading-[20px] w-[90%] self-start break-all`}
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa et
          nobis temporibus fugit vel libero ipsum rem laboriosam recusandae
          ullam?
        </p>
      </div>
      <div className="w-[10%]  items-center justifyt-center h-[150px] text-white lg:flex hidden translate-x-[-15px]">
        <CgArrowLeft
          fill={`white`}
          size={40}
          className={` rotate-180 w-full h-full mx-[5px]`}
        />
      </div>
      {/* <------- COMMENTS TEXT ---------> */}

      <div
        className={`text-gray-950 font-[Poppins] text-[13px]  flex  lg:w-[45%] w-full flex-col gap-y-[10px] `}
      >
        <p
          style={{
            transition: `border 500ms , color 300ms , background 150ms ease-in-out`,
          }}
          className={`lg:w-[90%] w-full bg-gray-100 hover:bg-black  py-[5px] px-[10px] hover:text-gray-100 hover:border   rounded-[5px]  cursor-none select-none`}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod
          voluptatem eaque cupiditate obcaecati adipisci accusantium voluptate
          repellat, voluptatum ullam at.
        </p>
        <p
          style={{
            transition: `border 500ms , color 300ms , background 150ms ease-in-out`,
          }}
          className={`lg:w-[90%] w-full bg-gray-100 hover:bg-black  py-[5px] px-[10px] hover:text-gray-100 hover:border   rounded-[5px]  cursor-none select-none`}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod
          voluptatem eaque cupiditate obcaecati adipisci accusantium voluptate
          repellat, voluptatum ullam at.
        </p>
      </div>
    </div>
  );
  /* <------------ THE MAIN PAGE RETURN ---------> */
  return (
    <div
      className={`min-h-[600px] px-[15px] flex  flex-col  mb-[110px] gap-y-[20px] justify-center items-center  scale-[1.1]`}
    >
      <ServicesBoxArt />
      <ServicesText />
    </div>
  );
}
