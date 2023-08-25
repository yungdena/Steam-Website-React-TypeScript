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
        linkTo: "/store",
      },
      {
        title: "DISCOVERY QUEUE",
        linkTo: "/store",
      },
      {
        title: "WISHLIST",
        linkTo: "/store",
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
        linkTo: "/store",
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

export const NAME_DROPDOWN_DATA = {
  id: "name",
  content: [
    {
      title: "PROFILE",
      linkTo: "/store",
    },
    {
      title: "LOG OUT",
      linkTo: "/signin",
    },
  ],
};