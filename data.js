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

import { IoMdAdd } from 'react-icons/io';
import { FaEye, FaHatCowboySide, FaNewspaper } from 'react-icons/fa';
import { RiBellLine } from 'react-icons/ri';
import { FiSearch } from 'react-icons/fi';
import Logout_utility from './src/utils/Logout_utility';
import {
  MdBiotech,
  MdHistoryEdu,
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
import { CiMusicNote1 } from 'react-icons/ci';
import { TbBooks, TbBrandYoutubeKids, TbGardenCart, TbWriting, TbYoga } from 'react-icons/tb';
import { GiArabicDoor, GiCook, GiKnockedOutStars, GiRobotAntennas, GiTurtle } from 'react-icons/gi';
import { BsMusicPlayer } from 'react-icons/bs';
import ChannelCard from './src/components/ChannelCard.jsx';

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

export const channel_parameter = [
  [
    {
      type: 'input input',
      name: 'Name',

      placeholder: 'please select a unique name',
      value: '',
      ref: React.createRef(),
      validator: {
        validate: function (name = this.value) {
          if (!name) return false;
          return fetch(`http://localhost:5500/channels/check_availibility/${name}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(name);
              if ('available' in data) {
                console.log(data);
                return [data.available, Boolean(name?.length)].every(Boolean);
              }
              console.log(data);
              throw new Error(`the server didn't return true or false for the availibility`);
            })
            .catch(({ message: err }) => {
              console.log({ err });
            });
        },
        async: true,
        error_message: `please make sure the name is unique`,
      },
    },
  ],
  [
    {
      type: 'list popover',
      name: 'Type',

      placeholder: 'select type',
      value: [],
      options: ['community', 'tribe'],
      validator: {
        validate: function () {
          return ['community', 'tribe'].some((sel) => sel === this.value);
        },
        error_message: '',
        async: false,
        limit: { max: 1, min: 1 },
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
          return Boolean(this.value.length > 3);
        },
        error_message: 'please select at least three categories to continue',
        async: false,
        limit: { max: 8, min: 3 },
      },
    },
    {
      type: 'box',
      name: 'Goal',

      placeholder: `whats your goal`,
      validator: {
        validate: function () {
          return true;
        },
        error_message: '',
        async: false,
      },
    },
    {
      type: 'boolean',
      name: 'Locked',

      placeholder: 'everyone can join',
      value: [],
      options: [true, false],
      validator: {
        validate: function () {
          return this.value instanceof Boolean;
        },
        error_message: '',
        async: false,
        limit: { max: 1, min: 1 },
      },
    },
    {
      type: 'boolean',
      name: 'Visibility',

      placeholder: `make it private (no one can find it)`,
      value: [],
      options: [true, false],
      validator: {
        validate: function () {
          return this.value instanceof Boolean;
        },
        error_message: 'please select at least three categories to continue',
        async: false,
        limit: { max: 1, min: 1 },
      },
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
          return [/^.{300,520}$/u].map((con) => con.test(this.value)).every(Boolean);
        },
        async: false,
        error_message: `please make sure the describtion is longer than 300 letter and less than 520`,
      },
    },
  ],
];

/* 
name 
goal 
type ,
cover
category 
state = open - close
visibility 
admin
desc
*/

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
