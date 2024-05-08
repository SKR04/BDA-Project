import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
} from "../assets";

export const navlinks = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "campaign",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "payment",
    imgUrl: payment,
    link: "",
  },
  {
    name: "withdraw",
    imgUrl: withdraw,
    link: "/",
  },
  {
    name: "profile",
    imgUrl: profile,
    link: "/profile",
  },
  {
    name: "logout",
    imgUrl: logout,
    link: "/",
  },
];

export const coursesArray = [
  {
    name: "Course Title",
    description: "Sample Description 2.0",
  },
];

export const authors = [
  "John Doe",
  "K S Eashwarakumar",
  "M K Stalin",
  "Modi JI",
];
