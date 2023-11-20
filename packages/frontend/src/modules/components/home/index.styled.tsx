import styled from "styled-components";
import { COLORS } from "../../common/theme";

const backgroundURL = 'https://res.cloudinary.com/didkbrlcz/image/upload/v1693031862/System/colored_body_top_dl0m6y.png'

export const MainContainer = styled.div`
  background-image: url('${backgroundURL}');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  min-height: 100vh;
  overflow-x: hidden;
`;

export const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 1050px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top: 4rem;

  .swiper {
    width: 1050px;
    overflow: hidden;
    position: relative;
    z-index: 10 !important;

    .banner-slide {
      z-index: 1;
    }
  }
`;

export const ContentWrap = styled.div`
  display: flex; 
  flex-direction: column;
  position: relative;

  @media(max-width: 1500px) {
    left: 120px;
  }
`;

export const FeaturedContainer = styled.div`
  margin-top: 2.5rem;
`

export const StyledPagination = styled.div`
  z-index: 9999 !important;
  .swiper-pagination {
    transform: translateX(46%);
    bottom: 50px !important;
    display: flex;
    z-index: 9999 !important;

    .swiper-pagination-bullet {
      z-index: 9999 !important;
      display: inline-block;
      margin: 2px !important;
      width: 15px;
      height: 9px;
      border-radius: 2px;
      transition: background-color 0.5s;
      background-color: hsla(202, 60%, 100%, 0.2);
      cursor: pointer;

      &.swiper-pagination-bullet-active {
        background-color: hsla(202, 60%, 100%, 0.4);
      }
    }
  }
`;

export const AppsLine = styled.div`
  position: relative;
  display: flex;
  align-self: start;
  margin: 0 auto;
  width: 686px;
`;

interface TitleProps {
  top: string;
  left: string;
}

export const FeaturedTitle = styled.div<TitleProps>`
  position: absolute;
  top: ${(props) => (props.top ? props.top : "0")}
  left: ${(props) => (props.left ? props.left : "0")}
  align-self: start;
  font-family: "Motiva Sans", Sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 0.03em;
`;

export const FeaturedButton = styled.button`
  all: unset;
  position: absolute;
  right: 180px;
  bottom: 10px;
  padding: 0 1rem;
  max-width: 122px;
  height: 24px;
  border: 1px solid ${COLORS.lightGrey};
  border-radius: 2px;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none !important;
  color: #fff !important;
  background: transparent;

  &:hover {
    border-color: white;
  }
`;


export const HomeAppsContainer = styled.div`
  align-self: start;
  margin-left: 55px;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const wishlistUrl = 'https://res.cloudinary.com/didkbrlcz/image/upload/v1694246344/System/background_wishlist_rz7wjf.jpg'

export const WishlistButton = styled.button`
  all: unset;
  cursor: pointer;
  color: #ffffff;
  display: inline-block;
  position: absolute;
  top: 80px;
  right: 55px;
  padding: 0 25px;
  margin: 0 1px;
  line-height: 20px;
  text-align: center;
  text-transform: uppercase;
  font-size: 11px;
  background: url(${wishlistUrl});

  &:hover {
    color: black;
    background: linear-gradient(135deg, #ffffff 0%,#919aa3 100%);
  }
`;

const mainBanner =
  "https://res.cloudinary.com/didkbrlcz/image/upload/v1696141569/System/page_bg_english_gcflca.jpg";


export const MainBanner = styled.div`
  position: absolute;
  height: 450px;
  width: 100%;
  background-image: url(${mainBanner});
  background-position: center;
  background-repeat: no-repeat;
  top: 104px;
  left: 50%;
  transform: translateX(-50%);

  @media (min-width: 1850px) {
    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      height: 100%;
      width: 13.65%;
      z-index: -1;
    }

    &::before {
      left: 0;
      background: #d9d8d7;
    }

    &::after {
      right: 0;
      background: #e07d0e;
    }
  }
`;


export const AppContainer = styled.div`
  width: 632px;
  height: 69px;
  background: rgba(0, 0, 0, 0.2);
  margin-bottom: 5px;
  display: flex;
  cursor: pointer;
  position: relative;

  &:hover {
    background: linear-gradient(to right, #c6e6f8 5%, #95bcd3 95%);
  }
`;

export const AppImage = styled.img`
  width: 184px;
  height: 69px;
`

export const AppTitle = styled.div`
  color: #c7d5e0;
  font-size: 16px;
  margin-top: 0.5rem;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  overflow: hidden;
  transition: color 0.25s;
  width: fit-content;
  margin-left: 0.5rem;

  ${AppContainer}:hover & {
    color: #10161b;
  }
`;

export const AppTags = styled.div`
  color: #384959;
  font-size: 12px;
  margin-top: 1rem;
  margin-left: 0.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: fit-content;
`

export const AppPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const AppPrice = styled.div`
  padding: 0 6px;
  color: white;
  line-height: 16px;
  font-size: 15px;
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
`;

export const AppNewPrice = styled.div`
  color: #beee11;
  line-height: 16px;
  font-size: 15px;
  position: absolute;
  right: 0;
  top: 60%;
  transform: translateY(-50%);

  ${AppContainer}:hover & {
    color: #10161b;
  }
`;

export const AppOldPrice = styled.div`
  width: fit-content;
  color: #738895;
  font-size: 11px;
  line-height: 12px;
  position: absolute;
  right: 0;
  top: 40%;
  transform: translateY(-50%);
  text-decoration: line-through;
`;

export const PricePercent = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 18px;
  padding: 0 4px;
  border-radius: 1px;
  color: #beee11;
  background: #4c6b22;
  height: 26px;
  position: absolute;
  left: 35%;
  top: 50%;
  transform: translateY(-50%);
`;

export const PriceWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 16px;
  width: 200px;
  height: 100%;
`