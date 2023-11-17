import React from "react";

import M1Avatar from "/src/assets/img/Characters/Male/No comments 7.png";
import M2Avatar from "/src/assets/img/Characters/Male/Teamwork-1.png";
import M3Avatar from "/src/assets/img/Characters/Male/No gravity-2.png";
import M4Avatar from "/src/assets/img/Characters/Male/No gravity.png";
import M5Avatar from "/src/assets/img/Characters/Male/Upstream-8.png";

import M6Avatar from "/src/assets/img/Characters/Male/Upstream-4.png";
import M7Avatar from "/src/assets/img/Characters/Male/Upstream-7.png";
import M8Avatar from "/src/assets/img/Characters/Male/Teamwork-7.png";
import M9Avatar from "/src/assets/img/Characters/Male/Teamwork-8.png";
/* FEMALE */
import F1Avatar from "/src/assets/img/Characters/Female/Funny Bunny-6.png";
import F2Avatar from "/src/assets/img/Characters/Female/Funny Bunny-8.png";
import F3Avatar from "/src/assets/img/Characters/Female/No gravity-1.png";
import F4Avatar from "/src/assets/img/Characters/Female/Upstream-12.png";
import F6Avatar from "/src/assets/img/Characters/Female/Upstream-10.png";

import { IoMdAdd } from "react-icons/io";
import { FaNewspaper } from "react-icons/fa";
import { RiBellLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";

// <---------- MENU AND NAV BAR CONTENT -------->

export const NavData = {
  out: [
    [
      {
        type: "text",
        func: "nav",
        to: "/",
        title: "more",
        mediaQueryClass: `md:flex hidden`,
      },
      {
        type: "text",
        func: "nav",
        to: "/",
        title: "works",
        mediaQueryClass: `flex`,
      },
      {
        type: "text",
        func: "nav",
        to: "/",
        title: "about",
        mediaQueryClass: `md:flex hidden`,
      },
    ],
    [
      {
        type: "btn",
        func: "nav",
        to: "/",
        title: "sign in",
        mediaQueryClass: `md:flex hidden`,
      },
      {
        type: "btn",
        func: "nav",
        to: "/",
        title: "sign up",
        mediaQueryClass: `md:flex hidden`,
      },
    ],
  ],
  in: [
    [
      {
        type: "form",
        func: "nav",
        to: "",
        onClick: () => null,
        Icon: FiSearch,
        placeholder: "search for members and channels",
      },
    ],

    [
      {
        type: "icon",
        func: "update",
        onClick: () => null,
        Icon: RiBellLine,
        menu: {
          title: "Notifications",
          options: [[]],
        },
      },
      {
        type: "icon",
        func: "update",
        Icon: IoMdAdd,
        menu: {
          title: "create channel",
          options: [
            [
              {
                title: "create a tribe",
                type: "text",
                func: "open",
                onClick: (popover) => {
                  try {
                    popover?.showPopover();
                  } catch (err) {
                    console.log(err);
                  }
                },
              },
              {
                title: "create a community",
                type: "text",
                func: "open",
                onClick: (popover) => {
                  try {
                    popover?.showPopover();
                  } catch (err) {
                    console.log(err);
                  }
                },
              },
            ],
          ],
        },
      },
      {
        type: "img",
        func: "update",

        img: localStorage?.user ? JSON.parse(localStorage?.user)?.Avatar : null,
        menu: {
          title: "profile",
          options: [
            [
              { title: "Profile", type: "text", func: "nav", to: "/" },
              { title: "settings", type: "text", func: "nav", to: "/" },
              { title: "more", type: "text", func: "nav", to: "/" },
              { title: "contact", type: "text", func: "nav", to: "/" },
            ],
            [
              {
                title: "log out",
                type: "btn",
                fun: "fire",
                onClick: () => null,
              },
              {
                title: "change user",
                type: "btn",
                fun: "fire",
                onClick: () => null,
              },
            ],
          ],
        },
      },
    ],
  ],
};

export const NavContent = {
  notLoged: [
    {
      type: "text",
      content: [
        {
          type: "link",
          text: `more`,
          onClick: {
            to: `/details`,
          },
        },
        {
          type: "show",
          text: `works`,
          onClick: () => {
            setshowTutorial((current) => (current = !current));
          },
        },
        {
          type: "link",
          text: `about us`,
          onClick: {
            to: `/details`,
          },
        },
        {
          type: "link",
          text: `discover`,
          onClick: {
            to: `/details`,
          },
        },
      ],
    },
    {
      type: "btn",
      content: [
        {
          type: "btn",
          text: `sign in `,
          onClick: {
            to: `AccountAuth/Authentication?q=in`,
          },
        },
        {
          type: "btn",
          text: `sign up`,
          onClick: {
            to: `AccountAuth/Authentication?q=up`,
          },
        },
      ],
    },
  ],
  Loged: {},
};

export const MenuContent = {
  notLoged: [
    [
      {
        title: "Account",
        content: [
          {
            title: "sign in",
            to: `AccountAuth/Authentication?q=in`,
          },
          {
            title: "sign up",
            to: `AccountAuth/Authentication?q=up`,
          },
        ],
      },
      {
        title: "Works",
        to: "/details",
      },
    ],
    [
      {
        title: `About`,
        to: "/details",
      },
      {
        title: `career`,
        to: "/details",
      },
      {
        title: `contact`,
        to: "/details",
      },
    ],
  ],
  Loged: [],
};

export const Avatars = [
  {
    M1Avatar,
    M2Avatar,
    M3Avatar,
    M4Avatar,
    M5Avatar,
    M6Avatar,
    M7Avatar,
    M8Avatar,
    M9Avatar,
  },
  { F1Avatar, F2Avatar, F3Avatar, F4Avatar, F6Avatar, M8Avatar },
];

export const validEmailServiceProviders = [
  {
    name: "Gmail",
    domain: "gmail",
  },
  {
    name: "Outlook",
    domain: "outlook",
  },
  {
    name: "Yahoo Mail",
    domain: "yahoo",
  },
  {
    name: "ProtonMail",
    domain: "protonmail",
  },
  {
    name: "Zoho Mail",
    domain: "zoho",
  },
  {
    name: "Apple Mail",
    domain: "icloud",
  },
  {
    name: "FastMail",
    domain: "fastmail",
  },
  {
    name: "Tutanota",
    domain: "tutanota",
  },
  {
    name: "Mail.com",
    domain: "mail",
  },
  {
    name: "AOL Mail",
    domain: "aol",
  },
  {
    name: "GMX Mail",
    domain: "gmx",
  },
  {
    name: "Yandex.Mail",
    domain: "yandex",
  },
  {
    name: "Mail.ru",
    domain: "mail.ru",
  },
  {
    name: "ProtonMail",
    domain: "pm.me",
  },
  {
    name: "Comcast",
    domain: "comcast",
  },
];

export const AvatarArray = Avatars.map((x) => Object.values(x)).flat();

export const categoryExamples = {
  Tribe: [
    {
      example: "sport",
      styling: {
        bg: "white",
        fontColor: `text-black`,
      },
    },

    {
      example: "video game",
      styling: {
        bg: "#4682B4",
        fontColor: `text-black`,
      },
    },
    {
      example: "Books",
      styling: {
        bg: "transparent",
        fontColor: `text-green-300`,
      },
    },
    {
      example: "Astrology and Spirituality",
      styling: {
        bg: "#00BFFF",
        fontColor: `text-black`,
      },
    },
    {
      example: "Books",
      styling: {
        bg: "#8A2BE2",
        fontColor: `text-black`,
      },
    },
    {
      example: "Pets",
      styling: {
        bg: "transparent",
        fontColor: `text-gray-50`,
      },
    },
    {
      example: "Motivation",
      styling: {
        bg: "white",
        fontColor: `text-black`,
      },
    },
    {
      example: "",
      styling: {
        bg: "transparent",
        fontColor: `text-transparent`,
      },
    },
    {
      example: "Art and design",
      styling: {
        bg: "white",
        fontColor: `text-black`,
      },
    },
    {
      example: "Gardening",
      styling: {
        bg: "#6A5ACD",
        fontColor: `text-gray-200`,
      },
    },
    {
      example: "Travel",
      styling: {
        bg: "tranpsarent",
        fontColor: `text-gray-50`,
      },
    },
    {
      example: "Music",
      styling: {
        bg: "#4B0082",
        fontColor: `text-white`,
      },
    },
    {
      example: "Movies",
      styling: {
        bg: "#483D8B",
        fontColor: `text-white`,
      },
    },
    {
      example: "Food",
      styling: {
        bg: "transparent",
        fontColor: `text-gray-100`,
      },
    },
    {
      example: "Fitness and Wellness",
      styling: {
        bg: "#4169E1",
        fontColor: `text-black`,
      },
    },
    {
      example: "Fashion",
      styling: {
        bg: "transparent",
        fontColor: `text-white`,
      },
    },
  ],
  Community: [
    {
      example: "Gender Equality Initiative",
      styling: {
        bg: "#76b4bd",
        fontColor: `text-black`,
      },
    },
    {
      example: "Interfaith Dialogue",
      styling: {
        bg: "transparent",
        fontColor: `text-white`,
      },
    },
    {
      example: "Climate Change Advocacy",
      styling: {
        bg: "#009688",
        fontColor: `text-green-500`,
      },
    },
    {
      example: "Religions and Phylosophy",
      styling: {
        bg: "transparent",
        fontColor: `text-white`,
      },
    },
    {
      example: "Digital Privacy Advocacy",
      styling: {
        bg: "#ffffff",
        fontColor: `text-black`,
      },
    },
    {
      example: "Documents and Research",
      styling: {
        bg: "#4d648d",
        fontColor: `text-white`,
      },
    },
    {
      example: "Youth Empowerment",
      styling: {
        bg: "transparent",
        fontColor: `text-white`,
      },
    },
    {
      example: "Youth Empowerment",
      styling: {
        bg: "#4d648d",
        fontColor: `text-black`,
      },
    },
    {
      example: "Youth Empowerment",
      styling: {
        bg: "#76b4bd",
        fontColor: `text-black`,
      },
    },
    {
      example: "Youth Empowerment",
      styling: {
        bg: "#dcedc1",
        fontColor: `text-black`,
      },
    },
    {
      example: "Animal Rights Activism",
      styling: {
        bg: "#6495ED",
        fontColor: `text-white`,
      },
    },
    {
      example: "Digital Rights and Freedom",
      styling: {
        bg: "transparent",
        fontColor: `text-white`,
      },
    },
    {
      example: "Civic Engagement",
      styling: {
        bg: "white",
        fontColor: `text-black`,
      },
    },
    {
      example: "Cancer Support",
      styling: {
        bg: "#5F9EA0",
        fontColor: `text-black`,
      },
    },
    {
      example: "Refugee Support",
      styling: {
        bg: "#3D9970",
        fontColor: `text-black`,
      },
    },
    {
      example: "Disability Rights",
      styling: {
        bg: "#6495ED",
        fontColor: `text-white`,
      },
    },
  ],
};

export const HideAt = {
  Footer: ["channel_chat_room"],
  Nav: ["channel"],
  Logo: ["channel_chat_room"],
};
