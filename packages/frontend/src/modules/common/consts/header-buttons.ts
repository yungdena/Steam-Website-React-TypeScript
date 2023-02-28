export const HEADER_LABELS = {
  STORE: 'store',
  COMMUNITY: 'community',
  ABOUT: 'about',
  SUPPORT: 'support'
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
        linkTo: "/home",
      },
      {
        title: "WISHLIST",
        linkTo: "/home",
      },
      {
        title: "POINTS SHOP",
        linkTo: "/home",
      },
      {
        title: "NEWS",
        linkTo: "/home",
      },
      {
        title: "STATS",
        linkTo: "/home",
      },
      {
        title: "ABOUT",
        linkTo: "/home",
      },
    ],
  },
  {
    id: "community",
    content: [
      {
        title: "HOME",
        linkTo: "/home",
      },
      {
        title: "DISCUSSIONS",
        linkTo: "/home",
      },
      {
        title: "WORKSHOP",
        linkTo: "/home",
      },
      {
        title: "MARKET",
        linkTo: "/home",
      },
      {
        title: "BROADCASTS",
        linkTo: "/home",
      }
    ],
  },
];