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
        title: "ABOUT",
        linkTo: "/about",
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
  WISHLIST: "Wishlist",
  ABOUT: "About",
  SUPPORT: "Support",
};

export const HOME_HEADER_LINKS = [
  {
    id: "store",
    label: HOME_HEADER_LABELS.STORE,
    link: "/store",
  },
  {
    id: "store2",
    label: HOME_HEADER_LABELS.NEW,
    link: "/store",
  },
  {
    id: "store3",
    label: HOME_HEADER_LABELS.CATEGORIES,
    link: "/store",
  },
  {
    id: "wishlist",
    label: HOME_HEADER_LABELS.WISHLIST,
    link: "/wishlist",
  },
  {
    id: "news",
    label: HOME_HEADER_LABELS.ABOUT,
    link: "/about",
  },
  {
    id: "support",
    label: HOME_HEADER_LABELS.SUPPORT,
    link: "/support",
  },
];