import { UserDataProvider, useUserData } from "../context/user-context";

export const HEADER_LABELS = {
  STORE: 'store',
  COMMUNITY: 'community',
  ABOUT: 'about',
  SUPPORT: 'support',
}

export const HEADER_LINKS = [
  {
    id: "store",
    label: HEADER_LABELS.STORE,
    link: "/store",
  },
  {
    id: "community",
    label: HEADER_LABELS.COMMUNITY,
    link: "/community",

  },
  {
    id: "about",
    label: HEADER_LABELS.ABOUT,
    link: "/about",
  },
  {
    id: "support",
    label: HEADER_LABELS.SUPPORT,
    link: "/support",
  },
  {
    id: "name",
    link: "/name",
  }
];

export const DROPDOWN_DATA = [
  {
    id: "store",
    content: [
      {
        title: "HOME",
        linkTo: "/home",
      },
      {
        title: "DISCOVERY QUEUE",
        linkTo: "/store",
      },
      {
        title: "WISHLIST",
        linkTo: "/wishlist",
      },
      {
        title: "POINTS SHOP",
        linkTo: "/store",
      },
      {
        title: "NEWS",
        linkTo: "/store",
      },
      {
        title: "STATS",
        linkTo: "/store",
      },
      {
        title: "ABOUT",
        linkTo: "/about",
      },
    ],
  },
  {
    id: "community",
    content: [
      {
        title: "HOME",
        linkTo: "/store",
      },
      {
        title: "DISCUSSIONS",
        linkTo: "/store",
      },
      {
        title: "WORKSHOP",
        linkTo: "/store",
      },
      {
        title: "MARKET",
        linkTo: "/store",
      },
      {
        title: "BROADCASTS",
        linkTo: "/store",
      },
    ],
  },
];

export const generateNameDropdownData = () => {
  const UserDataContext = useUserData();
  const userId = UserDataContext?.userData?._id;

  return {
    id: "name",
    content: [
      {
        title: "PROFILE",
        linkTo: `/profile/${userId}`,
      },
      {
        title: "FRIENDS",
        linkTo: "/friends",
      },
      {
        title: "LIBRARY",
        linkTo: "/library",
      },
      {
        title: "LOG OUT",
        linkTo: "/signin",
      },
    ],
  };
};

export const HOME_HEADER_LABELS = {
  STORE: "Your Store",
  NEW: "New & Noteworthy",
  CATEGORIES: "Categories",
  POINTS: "Points Shop",
  NEWS: "News",
  LABS: "Labs",
};

export const HOME_HEADER_LINKS = [
  {
    id: "store",
    label: HOME_HEADER_LABELS.STORE,
    link: "/store",
  },
  {
    id: "community",
    label: HOME_HEADER_LABELS.NEW,
    link: "/community",
  },
  {
    id: "about",
    label: HOME_HEADER_LABELS.CATEGORIES,
    link: "/about",
  },
  {
    id: "support",
    label: HOME_HEADER_LABELS.POINTS,
    link: "/support",
  },
  {
    id: "news",
    label: HOME_HEADER_LABELS.NEWS,
    link: "/support",
  },
  {
    id: "labs",
    label: HOME_HEADER_LABELS.LABS,
    link: "/support",
  },
];