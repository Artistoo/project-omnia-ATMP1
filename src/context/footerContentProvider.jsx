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
            /* <---- VISION SECTIONS-----> */
            /* FIRST SECTION */
            {
              type: "H_ITB",
              style: {
                container:
                  "bg-gradient-to-l from-white to-gray-200 px-[25px] py-[20px] gap-y-[20px]",
                subtitle: `text-[38px] font-[Now] uppercase`,
                para: "font-[Poppins] text-[18px] text-black ",
              },
              content: {
                subtitle: "our vision",
                para: [
                  `we aim is to create a global platform that brings together individuals from all walks of life who share common interests and passions. We believe that the world is filled with diverse talents, perspectives, and ideas, and our mission is to connect people across borders and boundaries. `,
                ],
                image: Vision,
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
            /* SECOND SECTION */

            {
              type: "T",
              style: {
                container:
                  " px-[25px] py-[20px] gap-y-[20px] text-gray-50 min-h-[250px] my-[20px]",
                subtitle: `text-[35px] uppercase text-gray-100 `,
                para: "font-[Poppins] text-[18px] text-gray-200 ",
              },
              content: {
                subtitle: "Connecting Like-Minded Individuals",
                para: [
                  `we see a world where people from all over the globe can be togather , communicate their ideas , and help eachother to support their causes , and open up about what makes they have in common`,
                ],
                image: Vision,
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
          ],
        },
        {
          about: "our history",
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
