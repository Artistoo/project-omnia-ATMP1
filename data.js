import React from 'react';

import M1Avatar from '/src/assets/img/Characters/Male/No comments 7.png';
import M2Avatar from '/src/assets/img/Characters/Male/Teamwork-1.png';
import M3Avatar from '/src/assets/img/Characters/Male/No gravity-2.png';
import M4Avatar from '/src/assets/img/Characters/Male/No gravity.png';
import M5Avatar from '/src/assets/img/Characters/Male/Upstream-8.png';

import M6Avatar from '/src/assets/img/Characters/Male/Upstream-4.png';
import M7Avatar from '/src/assets/img/Characters/Male/Upstream-7.png';
import M8Avatar from '/src/assets/img/Characters/Male/Teamwork-7.png';
import M9Avatar from '/src/assets/img/Characters/Male/Teamwork-8.png';
/* FEMALE */
import F1Avatar from '/src/assets/img/Characters/Female/Funny Bunny-6.png';
import F2Avatar from '/src/assets/img/Characters/Female/Funny Bunny-8.png';
import F3Avatar from '/src/assets/img/Characters/Female/No gravity-1.png';
import F4Avatar from '/src/assets/img/Characters/Female/Upstream-12.png';
import F6Avatar from '/src/assets/img/Characters/Female/Upstream-10.png';

import Create_Community from './src/assets/img/CreateCommunity.png';
import Create_Tribe from './src/assets/img/CreateTribe.png';

import { IoIosFemale, IoIosMale, IoMdAdd } from 'react-icons/io';
import { FaEye, FaHatCowboySide, FaNewspaper } from 'react-icons/fa';
import { RiBellLine } from 'react-icons/ri';
import { FiSearch } from 'react-icons/fi';
import Logout_utility from './src/utils/Logout_utility';
import {
  MdBiotech,
  MdHistoryEdu,
  MdLockOpen,
  MdLockOutline,
  MdMovieFilter,
  MdOutlineCamera,
  MdOutlineDesignServices,
  MdOutlineDraw,
  MdOutlineEmojiNature,
  MdOutlineModeOfTravel,
  MdOutlinePsychology,
  MdOutlineScience,
  MdOutlineSportsFootball,
} from 'react-icons/md';
import { CgGames, CgGym } from 'react-icons/cg';
import { CiDollar, CiMusicNote1 } from 'react-icons/ci';
import { TbBooks, TbBrandYoutubeKids, TbGardenCart, TbWriting, TbYoga } from 'react-icons/tb';
import { GiArabicDoor, GiCook, GiKnockedOutStars, GiRobotAntennas, GiTurtle } from 'react-icons/gi';
import { BsMusicPlayer } from 'react-icons/bs';
import ChannelCard from './src/components/Elements/CreateChannelCard.jsx';

// <---------- MENU AND NAV BAR CONTENT -------->

export const NavData = {
  out: [
    [
      {
        type: 'text',
        func: 'nav',
        to: '/',
        title: 'more',
        mediaQueryClass: `md:flex hidden`,
      },
      {
        type: 'text',
        func: 'nav',
        to: '/',
        title: 'works',
        mediaQueryClass: `flex`,
      },
      {
        type: 'text',
        func: 'nav',
        to: '/',
        title: 'about',
        mediaQueryClass: `md:flex hidden`,
      },
    ],
    [
      {
        type: 'btn',
        func: 'nav',
        to: '/AccountAuth/Authentication?q=in',
        title: 'sign in',
        mediaQueryClass: `md:flex hidden`,
      },
      {
        type: 'btn',
        func: 'nav',
        to: '/AccountAuth/Authentication?q=up',
        title: 'sign up',
        mediaQueryClass: `md:flex hidden`,
      },
    ],
  ],
  in: [
    [
      {
        type: 'form',
        func: 'nav',
        to: '',
        onClick: () => null,
        Icon: FiSearch,
        placeholder: 'search for members and channels',
      },
    ],

    [
      {
        type: 'icon',
        func: 'update',
        onClick: () => null,
        Icon: RiBellLine,
        menu: {
          title: 'Notifications',
          options: [[]],
        },
      },
      {
        type: 'icon',
        func: 'update',
        Icon: IoMdAdd,
        menu: {
          title: 'create channel',
          options: [
            [
              {
                title: 'create a tribe',
                type: 'box',
                func: 'open',
                box_art: Create_Community,
                onClick: (popover) => {},
              },
              {
                title: 'create a community',
                type: 'box',
                func: 'open',
                box_art: Create_Tribe,
                onClick: (popover) => {},
              },
            ],
            [],
          ],
        },
      },
      {
        type: 'img',
        func: 'update',
        img: localStorage?.user ? JSON.parse(localStorage?.user)?.Avatar : null,
        menu: {
          title: 'profile',
          options: [
            [
              { title: 'Profile', type: 'text', func: 'nav', to: '/' },
              { title: 'settings', type: 'text', func: 'nav', to: '/settings' },
              { title: 'more', type: 'text', func: 'nav', to: '/' },
              { title: 'contact', type: 'text', func: 'nav', to: '/contactUs' },
            ],
            [
              {
                title: 'log out',
                type: 'btn',
                fun: 'fire',
                onClick: () => Logout_utility(),
              },
              {
                title: 'change user',
                type: 'btn',
                fun: 'fire',
                onClick: () => null,
              },
            ],
          ],
        },
      },
    ],
  ],
};

export const Interests = [
  { title: 'Technology', Icon: MdBiotech, selected: false },
  { title: 'Video Games', Icon: CgGames, selected: false },
  { title: 'Music', Icon: CiMusicNote1, selected: false },
  { title: 'Sport', Icon: MdOutlineSportsFootball, selected: false },
  { title: 'Books', Icon: TbBooks, selected: false },
  { title: 'Cooking', Icon: GiCook, selected: false },
  { title: 'Travel', Icon: MdOutlineModeOfTravel, selected: false },
  { title: 'Art', Icon: MdOutlineDraw, selected: false },
  { title: 'Science', Icon: MdOutlineScience, selected: false },
  { title: 'Fitness', Icon: CgGym, selected: false },
  { title: 'Movies', Icon: MdMovieFilter, selected: false },
  { title: 'Fashion', Icon: FaHatCowboySide, selected: false },
  { title: 'Photography', Icon: MdOutlineCamera, selected: false },
  { title: 'History', Icon: MdHistoryEdu, selected: false },
  { title: 'Nature', Icon: MdOutlineEmojiNature, selected: false },
  { title: 'Gardening', Icon: TbGardenCart, selected: false },
  { title: 'Animals', Icon: GiTurtle, selected: false },
  { title: 'Space Exploration', Icon: GiKnockedOutStars, selected: false },
  { title: 'Anime', Icon: TbBrandYoutubeKids, selected: false },
  { title: 'Desgin', Icon: MdOutlineDesignServices, selected: false },
  { title: 'Religion', Icon: GiArabicDoor, selected: false },
  { title: 'Comic', Icon: FaEye, selected: false },
  { title: 'Dancing', Icon: BsMusicPlayer, selected: false },
  { title: 'Writing', Icon: TbWriting, selected: false },
  { title: 'Psychology', Icon: MdOutlinePsychology, selected: false },
  { title: 'Yoga', Icon: TbYoga, selected: false },
  { title: 'Robotics', Icon: GiRobotAntennas, selected: false },
];

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
    name: 'Gmail',
    domain: 'gmail',
  },
  {
    name: 'Outlook',
    domain: 'outlook',
  },
  {
    name: 'Yahoo Mail',
    domain: 'yahoo',
  },
  {
    name: 'ProtonMail',
    domain: 'protonmail',
  },
  {
    name: 'Zoho Mail',
    domain: 'zoho',
  },
  {
    name: 'Apple Mail',
    domain: 'icloud',
  },
  {
    name: 'FastMail',
    domain: 'fastmail',
  },
  {
    name: 'Tutanota',
    domain: 'tutanota',
  },
  {
    name: 'Mail.com',
    domain: 'mail',
  },
  {
    name: 'AOL Mail',
    domain: 'aol',
  },
  {
    name: 'GMX Mail',
    domain: 'gmx',
  },
  {
    name: 'Yandex.Mail',
    domain: 'yandex',
  },
  {
    name: 'Mail.ru',
    domain: 'mail.ru',
  },
  {
    name: 'ProtonMail',
    domain: 'pm.me',
  },
  {
    name: 'Comcast',
    domain: 'comcast',
  },
];

export const AvatarArray = Avatars.map((x) => Object.values(x)).flat();

export const transitionTimingFunctions = {
  Swirl: `cubic-bezier(0.76, 0.21, 0.39, 1.1)`,
  Bounce_and_Twist: `cubic-bezier(0.42, 0.02, 0.72, 1.2)`,
  Swaying_Hula: `cubic-bezier(0.6, -0.05, 0.4, 1.3)`,
  Moonwalk: `cubic-bezier(0.15, 1, 0.4, -0.4)`,
  Jelly_Bounce: `cubic-bezier(0.4, -0.3, 0.7, 1.5)`,
  Funky_Slide: `cubic-bezier(0.6, 0.1, 0.2, 1)`,
  Disco_Fever: `cubic-bezier(0.5, 0.1, 0.5, 0.9)`,
  Twist_and_Shout: `cubic-bezier(0.5, 0.3, 0.8, 1)`,
  Happy_Hop: `cubic-bezier(0.4, -0.3, 0.7, 1.5)`,
  Playful_Bounce: `cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
  Dizzy_Spin: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
  Whimsical_Waltz: `cubic-bezier(0.35, 0.1, 0.5, 0.95)`,
  Carousel_Ride: `cubic-bezier(0.55, 0.15, 0.45, 0.85)`,
  Mysterious_Moonwalk: `cubic-bezier(0.15, 1, 0.4, -0.4)`,
  Quirky_Quake: `cubic-bezier(0.6, -0.05, 0.4, 1.3)`,
  Wavy_Wonder: `cubic-bezier(0.76, 0.21, 0.39, 1.1)`,
  Cheeky_Chacha: `cubic-bezier(0.5, 0.3, 0.8, 1)`,
  Funky_Flip: `cubic-bezier(0.42, 0.02, 0.72, 1.2)`,
  Groovy_Glide: `cubic-bezier(0.6, 0.1, 0.2, 1)`,
  Jovial_Jig: `cubic-bezier(0.5, 0.1, 0.5, 0.9)`,
  Merry_Motion: `cubic-bezier(0.55, 0.15, 0.45, 0.85)`,
  Peppy_Parade: `cubic-bezier(0.35, 0.1, 0.5, 0.95)`,
  Radiant_Rumba: `cubic-bezier(0.76, 0.21, 0.39, 1.1)`,
  Snazzy_Slide: `cubic-bezier(0.42, 0.02, 0.72, 1.2)`,
  Tango_Twist: `cubic-bezier(0.6, -0.05, 0.4, 1.3)`,
  Soft_Swing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
  Quick_Bounce: `cubic-bezier(0.17, 0.67, 0.83, 0.67)`,
  Slow_Swing: `cubic-bezier(0.22, 0.61, 0.36, 1)`,
  Smooth_Start_Quick_Middle_Slow_End: `cubic-bezier(0.4, 0, 0.2, 1)`,
  Elastic_Out_And_Settle: `cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
  Slow_Sine_Wave: `cubic-bezier(0.445, 0.05, 0.55, 0.95)`,
  Soft_Sigmoid_Swing: `cubic-bezier(0.455, 0.03, 0.515, 0.955)`,
  Quick_Bounce_And_Overshoot: `cubic-bezier(0.17, 0.67, 0.83, 0.67)`,
  Elastic_Bounce_And_Settle_Alternate: `cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
  Soft_Swing_And_Settle: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
  Smooth_Anticipation_And_Quick_Settle: `cubic-bezier(0.36, 0.66, 0.04, 1)`,
  Quick_Start_Slow_Middle_Quick_End: `cubic-bezier(0.77, 0, 0.175, 1)`,
  Soft_Sigmoid: `cubic-bezier(0.455, 0.03, 0.515, 0.955)`,
  Slow_Start_Quick_Middle_Slow_End_Alternate: `cubic-bezier(0.37, 0.26, 0.26, 0.87)`,
  Stiff_Bounce_Variation: `cubic-bezier(0.68, 1.55, 0.27, 1.55)`,
  Smooth_Parabolic_Swing: `cubic-bezier(0.25, 0.1, 0.25, 1)`,
  Quick_Overshoot_And_Settle_Variation: `cubic-bezier(0.22, 0.61, 0.36, 1)`,
  Soft_Jitter: `cubic-bezier(0.3, 0.71, 0.2, 1)`,
  Slight_Elasticity_Variation: `cubic-bezier(0.39, 0.26, 0.4, 0.98)`,
  Quick_Swing: `cubic-bezier(0.36, 0.66, 0.04, 1)`,
  Soft_Back_And_Forth: `cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
  Quick_Bounce_And_Settle: `cubic-bezier(0.17, 0.67, 0.83, 0.67)`,
  Slow_Swing_Variation: `cubic-bezier(0.22, 0.61, 0.36, 1)`,
  Smooth_Start_Quick_Middle_Slow_End_Alternate: `cubic-bezier(0.4, 0, 0.2, 1)`,
  Elastic_Out_And_Settle_Alternate: `cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
  Slow_Sine_Wave: `cubic-bezier(0.445, 0.05, 0.55, 0.95)`,
  Soft_Sigmoid_Swing: `cubic-bezier(0.455, 0.03, 0.515, 0.955)`,
  Quick_Bounce_And_Overshoot: `cubic-bezier(0.17, 0.67, 0.83, 0.67)`,
  Elastic_Bounce_And_Settle_Alternate: `cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
  Soft_Swing_And_Settle: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
  Smooth_Anticipation_And_Quick_Settle: `cubic-bezier(0.36, 0.66, 0.04, 1)`,
  Quick_Start_Slow_Middle_Quick_End: `cubic-bezier(0.77, 0, 0.175, 1)`,
  Soft_Sigmoid: `cubic-bezier(0.455, 0.03, 0.515, 0.955)`,
  Slow_Start_Quick_Middle_Slow_End_Alternate: `cubic-bezier(0.37, 0.26, 0.26, 0.87)`,
  Stiff_Bounce_Variation: `cubic-bezier(0.68, 1.55, 0.27, 1.55)`,
  Smooth_Parabolic_Swing: `cubic-bezier(0.25, 0.1, 0.25, 1)`,
  Quick_Overshoot_And_Settle_Variation: `cubic-bezier(0.22, 0.61, 0.36, 1)`,
  Soft_Jitter: `cubic-bezier(0.3, 0.71, 0.2, 1)`,
  Slight_Elasticity_Variation: `cubic-bezier(0.39, 0.26, 0.4, 0.98)`,
  Quick_Swing: `cubic-bezier(0.36, 0.66, 0.04, 1)`,
  Soft_Back_And_Forth: `cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
  Quick_Bounce_And_Settle: `cubic-bezier(0.17, 0.67, 0.83, 0.67)`,
  Slow_Swing_Variation: `cubic-bezier(0.22, 0.61, 0.36, 1)`,
  Smooth_Start_Quick_Middle_Slow_End_Alternate: `cubic-bezier(0.4, 0, 0.2, 1)`,
  Elastic_Out_And_Settle_Alternate: `cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
};

export const user_id = localStorage?.user && JSON.parse(localStorage.user)?._id;

export const channel_parameter = [
  [
    {
      type: 'input input',
      name: 'Name',

      placeholder: 'please select a unique name',
      value: '',
      ref: React.createRef(),
      validator: {
        validate: function () {
          if (!this.value || !Boolean(this.value.length)) return false;
          return fetch(`http://localhost:5500/channels/check_availibility/${this.value}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          })
            .then((response) => response.json())
            .then((data) => {
              if ('available' in data) {
                return data.available;
              }
              throw new Error(`the server didn't return true or false for the availibility`);
            })
            .catch(({ message: err }) => console.log({ err }));
        },
        async: true,
        error_message: `please make sure the name is unique`,
      },
    },
  ],
  [
    {
      type: 'list popover',
      name: 'Languages',

      placeholder: 'select a language',
      value: [],
      options: async () => {
        try {
          const fetch_params = {
            method: 'GET',
            headers: { 'Content-Type': 'Application/json' },
          };
          const fetch_languages = await fetch(`https://restcountries.com/v3.1/all`, fetch_params);
          const languages_json = await fetch_languages.json();
          const languages_array = Array.from(new Set(languages_json.map((lang) => lang.languages && lang.languages[Object.keys(lang.languages)[0]])));

          console.log(languages_array);

          return languages_array;
        } catch ({ message: error }) {
          console.log({ error });
        }
      },
      validator: {
        validate: function () {
          return [this.value.length >= 1, this.value.length <= 4].every(Boolean);
        },
        async: false,
        limit: { max: 4, min: 1 },
        error_message: 'please select few languages',
      },
    },
    {
      type: 'list popover',
      name: 'Categories',
      placeholder: 'select some categories',
      value: [],
      options: [...Interests.map((int) => int.title)],
      validator: {
        validate: function () {
          return [this.value.length >= 2, this.value.length <= 8].every(Boolean);
        },
        error_message: 'please select at least three categories to continue',
        async: false,
        limit: { max: 8, min: 2 },
      },
    },
    {
      type: 'box',
      name: 'Goal',
      value: '',
      placeholder: `whats your goal`,
    },
    {
      /* TODO : maybe add a joining price option */
      type: 'boolean',
      name: 'Locked',
      explain: `if set to true every one will be able to join your channel without sending a requiest`,
      placeholder: 'is open',
      value: true,
    },
    {
      type: 'boolean',
      name: 'Visibility',
      explain: `the channel won't apear on the search resuls if private `,
      placeholder: `is private`,
      value: false,
    },
  ],
  [
    {
      type: 'input textarea',
      name: 'Describtion',
      placeholder: 'how would you describe the channel',
      value: '',
      ref: React.createRef(),
      validator: {
        validate: function () {
          return [/^.{100,300}$/u].map((con) => con.test(this.value)).every(Boolean);
        },
        async: false,
        error_message: `describtion must be between 100 and 300`,
      },
    },
  ],
];

export const search_page_filters = {
  chans: [
    {
      param: `category`,
      id: `Categories`,
      selected: [],
      options: Interests.map(({ title: select, Icon }) => ({
        select,
        Icon,
      })),
    },
    {
      param: `language`,
      id: `Languages`,
      selected: [],
      options: (async () => {
        try {
          const fetch_params = {
            method: 'GET',
            headers: { 'Content-Type': 'Application/json' },
          };
          const fetch_languages = await fetch(`https://restcountries.com/v3.1/all`, fetch_params);
          const localtion_data_json = await fetch_languages.json();
          const Loclanguages_array = Array.from(new Set(localtion_data_json.map((lang) => lang?.languages && lang.languages[Object.keys(lang.languages)[0]])));
          const LocFlagsList_array = Array.from(new Set(localtion_data_json.map((flag) => flag?.flags && flag?.flags?.png)));

          return Array.from(
            new Set(
              localtion_data_json.map((location_data) => ({
                select: location_data?.languages && location_data.languages[Object.keys(location_data.languages)[0]],
                image: location_data?.flags && location_data?.flags?.png,
              }))
            )
          );
        } catch ({ message: error }) {
          console.log({ error });
        }
      })(),
    },
    {
      param: `state`,
      id: `Locked`,
      selected: [],
      options: [
        { select: 'open', Icon: MdLockOpen },
        { select: 'locked', Icon: MdLockOutline },
      ],
    },
    { param: `members`, id: `Members`, selected: [], options: { range: [0, 20000] } },
  ],
  users: [
    { param: `age`, id: 'Age', selected: [], options: { range: [0, 70] } },
    {
      param: `interest`,
      id: `Interests`,
      selected: [],
      options: Interests.map(({ title: select, Icon }) => ({
        select,
        Icon,
      })),
    },
    {
      param: `gender`,
      id: `gender`,
      selected: [],
      options: [
        { select: `male`, Icon: IoIosMale },
        { select: `female`, Icon: IoIosFemale },
      ],
    },
    {
      param: `location`,
      id: `Location`,
      selected: [],
      options: (async () => {
        try {
          const fetch_params = {
            method: 'GET',
            headers: { 'Content-Type': 'Application/json' },
          };
          const fetch_languages = await fetch(`https://restcountries.com/v3.1/all`, fetch_params);
          const localtion_data_json = await fetch_languages.json();
          const Loclanguages_array = Array.from(new Set(localtion_data_json.map((lang) => lang?.languages && lang.languages[Object.keys(lang.languages)[0]])));
          const LocFlagsList_array = Array.from(new Set(localtion_data_json.map((flag) => flag?.flags && flag?.flags?.png)));

          return Array.from(
            new Set(
              localtion_data_json.map((location_data) => ({
                select: location_data?.name?.common && location_data?.name?.common,
                image: location_data?.flags && location_data?.flags?.png,
              }))
            )
          );
        } catch ({ message: error }) {
          console.log({ error });
        }
      })(),
    },
  ],
};

export const categoryExamples = {
  Tribe: [
    {
      example: 'sport',
      styling: {
        bg: 'white',
        fontColor: `text-black`,
      },
    },

    {
      example: 'video game',
      styling: {
        bg: '#4682B4',
        fontColor: `text-black`,
      },
    },
    {
      example: 'Books',
      styling: {
        bg: 'transparent',
        fontColor: `text-green-300`,
      },
    },
    {
      example: 'Astrology and Spirituality',
      styling: {
        bg: '#00BFFF',
        fontColor: `text-black`,
      },
    },
    {
      example: 'Books',
      styling: {
        bg: '#8A2BE2',
        fontColor: `text-black`,
      },
    },
    {
      example: 'Pets',
      styling: {
        bg: 'transparent',
        fontColor: `text-gray-50`,
      },
    },
    {
      example: 'Motivation',
      styling: {
        bg: 'white',
        fontColor: `text-black`,
      },
    },
    {
      example: '',
      styling: {
        bg: 'transparent',
        fontColor: `text-transparent`,
      },
    },
    {
      example: 'Art and design',
      styling: {
        bg: 'white',
        fontColor: `text-black`,
      },
    },
    {
      example: 'Gardening',
      styling: {
        bg: '#6A5ACD',
        fontColor: `text-gray-200`,
      },
    },
    {
      example: 'Travel',
      styling: {
        bg: 'tranpsarent',
        fontColor: `text-gray-50`,
      },
    },
    {
      example: 'Music',
      styling: {
        bg: '#4B0082',
        fontColor: `text-white`,
      },
    },
    {
      example: 'Movies',
      styling: {
        bg: '#483D8B',
        fontColor: `text-white`,
      },
    },
    {
      example: 'Food',
      styling: {
        bg: 'transparent',
        fontColor: `text-gray-100`,
      },
    },
    {
      example: 'Fitness and Wellness',
      styling: {
        bg: '#4169E1',
        fontColor: `text-black`,
      },
    },
    {
      example: 'Fashion',
      styling: {
        bg: 'transparent',
        fontColor: `text-white`,
      },
    },
  ],
  Community: [
    {
      example: 'Gender Equality Initiative',
      styling: {
        bg: '#76b4bd',
        fontColor: `text-black`,
      },
    },
    {
      example: 'Interfaith Dialogue',
      styling: {
        bg: 'transparent',
        fontColor: `text-white`,
      },
    },
    {
      example: 'Climate Change Advocacy',
      styling: {
        bg: '#009688',
        fontColor: `text-green-500`,
      },
    },
    {
      example: 'Religions and Phylosophy',
      styling: {
        bg: 'transparent',
        fontColor: `text-white`,
      },
    },
    {
      example: 'Digital Privacy Advocacy',
      styling: {
        bg: '#ffffff',
        fontColor: `text-black`,
      },
    },
    {
      example: 'Documents and Research',
      styling: {
        bg: '#4d648d',
        fontColor: `text-white`,
      },
    },
    {
      example: 'Youth Empowerment',
      styling: {
        bg: 'transparent',
        fontColor: `text-white`,
      },
    },
    {
      example: 'Youth Empowerment',
      styling: {
        bg: '#4d648d',
        fontColor: `text-black`,
      },
    },
    {
      example: 'Youth Empowerment',
      styling: {
        bg: '#76b4bd',
        fontColor: `text-black`,
      },
    },
    {
      example: 'Youth Empowerment',
      styling: {
        bg: '#dcedc1',
        fontColor: `text-black`,
      },
    },
    {
      example: 'Animal Rights Activism',
      styling: {
        bg: '#6495ED',
        fontColor: `text-white`,
      },
    },
    {
      example: 'Digital Rights and Freedom',
      styling: {
        bg: 'transparent',
        fontColor: `text-white`,
      },
    },
    {
      example: 'Civic Engagement',
      styling: {
        bg: 'white',
        fontColor: `text-black`,
      },
    },
    {
      example: 'Cancer Support',
      styling: {
        bg: '#5F9EA0',
        fontColor: `text-black`,
      },
    },
    {
      example: 'Refugee Support',
      styling: {
        bg: '#3D9970',
        fontColor: `text-black`,
      },
    },
    {
      example: 'Disability Rights',
      styling: {
        bg: '#6495ED',
        fontColor: `text-white`,
      },
    },
  ],
};

export const HideAt = {
  Footer: ['channel_chat_room'],
  Nav: ['channel'],
  Logo: ['channel_chat_room'],
};
