import styled from "styled-components";
import { COLORS } from "../theme";

const backgroundURL = 'https://res.cloudinary.com/didkbrlcz/image/upload/v1693031862/System/colored_body_top_dl0m6y.png'

export const MainContainer = styled.div`
  background-image: url(${backgroundURL});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  min-height: 100vh;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1440px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-top: 2rem;

  .swiper {
    width: 1050px;
    overflow: hidden;
    position: relative;
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
  margin: 0 0 0 16rem;
  width: 686px;
`;

export const FeaturedTitle = styled.div`
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
  right: 0;
  bottom: 4px;
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
  margin-left: 16rem;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`