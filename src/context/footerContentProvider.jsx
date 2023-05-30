import React from "react";
//____________ IMAGES AND ASSET _______________
import oneCommunity from "../assets/img/VisionOneBigCommunity.png";
import Hands from "../assets/img/Hands.png";
import Vision from "../assets/img/VisionFooter.png";

//____________FOOTER CONTEXT _____________________
export const FooterContext = React.createContext();
export default function FooterContentProvider({ children }) {
  /* React state  */
  const [FooterContentLinks, setFooterContentLinks] = React.useState([
    {
      category: "company",
      links: [
        {
          about: "vision",
          render: [
            /* FIRST SECTION */
            {
              /* STYLING */
              style: {
                /* CONTAINERS */
                containers: {
                  main: `w-[80%] max-w-[1200px] md:min-h-[450px] min-h-[600px] flex flex-wrap items-center justify-around  bg-gradient-to-tl from-gray-300 to-white px-[25px] py-[50px]`,

                  text: `md:w-[40%] w-[90%] min-w-[320px] min-h-[80%] flex items-start justify-center gap-y-[20px]  flex-col `,
                  img: `md:w-[55%] w-[90%]  min-w-[350px] min-h-[80%] `,
                  button: {
                    style: {
                      transition: `border 500ms , color 200ms, background 300ms ease-in-out`,
                    },
                    className: `w-[100%] h-[35px] py-[20px] self-center flex items-center justify-center rounded-full bg-gradient-to-l from-gray-200 to-gray-50 border-black hover:border-white border hover:from-gray-800 hover:to-gray-950 hover:text-gray-50 font-[Poppins] group relative lg:mb-auto mb-[15px]`,
                  },
                },
                /* ELEMENTS STYLE */
                text: {
                  subtitle: `text-[59px] uppercase font-[Now]  leading-normal  bg-gradient-to-tr from-purple-800 to-blue-500 bg-[100% 100%] text-transparent bg-clip-text`,
                  para: `font-[Poppins] text-[18px] leading-[16px] text-black md:mb-[50px] mb-[20px]`,
                },

                img: `w-full h-auto scale-[1.3] lg:translate-y-0 translate-y-[30px]`,

                button: {
                  text: ` font-[Poppins]`,
                  img: `font-[Poppins] absolute w-[10%] h-auto left-[30px] scale-[1.3] group-hover:rotate-[360deg] transition-transform duration-[500ms]`,
                },
              },
              /* ELEMENTS */
              elements: {
                img: Vision,
                text: {
                  subtitle: `our vision`,
                  para: [
                    `we aim is to create a global platform that brings together individuals from all walks of life who share common interests and passions. We believe that the world is filled with diverse talents, perspectives, and ideas, and our mission is to connect people across borders and boundaries. `,
                  ],
                },
                button: {
                  B_image: Hands,
                  B_text: `join our community`,
                  functionality: {
                    type: "Nav",
                    to: "",
                  },
                },
              },
            },

            /* SECTION TWO */
            {
              style: {
                containers: {
                  main: `w-[80%] max-w-[1200px] min-h-[420px]  flex flex-wrap items-center justify-start border px-[20px]`,
                  text: `md:w-[60%] w-[90%] min-w-[320px] gap-y-[13px] min-h-[80%] flex flex-col items-center justify-center `,
                },
                text: {
                  subtitle: `text-[50px] font-[Garet] leading-[45px] text-gray-50 `,
                  para: `font-[Poppins] text-[20px] leading-[18px] text-gray-200`,
                },
                button: `w-[80%] `,
              },
              elements: {
                text: {
                  subtitle: `Connecting Like-Minded Individuals`,
                  para: [
                    `we see a world where people from all over the globe can be togather , communicate their ideas , and help eachother to support their causes , and open up about what makes they have in common`,
                  ],
                },
              },
            },
          ],
        },
        {
          about: "our history",
          render: [
            /* FIRST SECTION */
            {
              /* STYLING */
              style: {
                /* CONTAINERS */
                containers: {
                  main: `w-[80%] max-w-[1200px] md:min-h-[450px] min-h-[600px] flex flex-wrap items-center justify-around  bg-gradient-to-tl from-purple-300 to-purple-200 px-[25px] py-[50px]`,

                  text: `md:w-[40%] w-[90%] min-w-[320px] min-h-[80%] flex items-start justify-center gap-y-[20px]  flex-col `,
                  img: `md:w-[55%] w-[90%]  min-w-[350px] min-h-[80%] `,
                  button: {
                    style: {
                      transition: `border 500ms , color 200ms, background 300ms ease-in-out`,
                    },
                    className: `w-[100%] h-[35px] py-[20px] self-center flex items-center justify-center rounded-full bg-gradient-to-l from-gray-200 to-gray-50 border-black hover:border-white border hover:from-gray-800 hover:to-gray-950 hover:text-gray-50 font-[Poppins] group relative lg:mb-auto mb-[15px]`,
                  },
                },
                /* ELEMENTS STYLE */
                text: {
                  subtitle: `text-[59px] uppercase font-[Now]  leading-normal  bg-gradient-to-tr from-gray-950 to-gray-900 bg-[100% 100%] text-transparent bg-clip-text`,
                  para: `font-[Poppins] text-[18px] leading-[16px] text-black md:mb-[50px] mb-[20px]`,
                },

                img: `w-full h-auto scale-[1.3] lg:translate-y-0 translate-y-[30px]`,

                button: {
                  text: ` font-[Poppins]`,
                  img: `font-[Poppins] absolute w-[10%] h-auto left-[30px] scale-[1.3] group-hover:rotate-[360deg] transition-transform duration-[500ms]`,
                },
              },
              /* ELEMENTS */
              elements: {
                img: Vision,
                text: {
                  subtitle: `our history`,
                  para: [
                    `we aim is to create a global platform that brings together individuals from all walks of life who share common interests and passions. We believe that the world is filled with diverse talents, perspectives, and ideas, and our mission is to connect people across borders and boundaries. `,
                  ],
                },
                button: {
                  B_image: Hands,
                  B_text: `join our community`,
                  functionality: {
                    type: "Nav",
                    to: "",
                  },
                },
              },
            },

            /* SECTION TWO */
            {
              style: {
                containers: {
                  main: `w-[80%] max-w-[1200px] min-h-[420px]  flex flex-wrap items-center justify-start border px-[20px]`,
                  text: `md:w-[60%] w-[90%] min-w-[320px] gap-y-[13px] min-h-[80%] flex flex-col items-center justify-center `,
                },
                text: {
                  subtitle: `text-[50px] font-[Garet] leading-[45px] text-gray-50 `,
                  para: `font-[Poppins] text-[20px] leading-[18px] text-gray-200`,
                },
                button: `w-[80%] `,
              },
              elements: {
                text: {
                  subtitle: `Connecting Like-Minded Individuals`,
                  para: [
                    `we see a world where people from all over the globe can be togather , communicate their ideas , and help eachother to support their causes , and open up about what makes they have in common`,
                  ],
                },
              },
            },
          ],
        },
        {
          about: "about us",
        },
        {
          about: "goals",
        },
      ],
    },
    {
      category: "service",
      links: [
        {
          about: "usage",
        },
        {
          about: "tutorial",
        },
        {
          about: "security",
        },
      ],
    },
    {
      category: "social",
      links: [
        {
          about: "twitter",
        },
        {
          about: "instagram",
        },
        {
          about: "github",
        },
      ],
    },
  ]);
  return (
    <FooterContext.Provider
      value={{
        FooterContentLinks,
        setFooterContentLinks,
      }}
    >
      {children}
    </FooterContext.Provider>
  );
}
