import styled from "styled-components";
import { COLORS } from "../theme";

const backgroundURL = 'https://res.cloudinary.com/didkbrlcz/image/upload/v1693031862/System/colored_body_top_dl0m6y.png'

export const MainContainer = styled.div`
  height: 100vh;
  background-image: url(${backgroundURL});
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url(${backgroundURL});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-top: 2rem;

  .swiper {
    width: 1050px;
    overflow: hidden;
  }
`;

export const HomeHeader = styled.div`
  display: flex;
  width: 940px;
  height: 35px;
  justify-content: space-between;
  margin-top: 6.5rem;
  background-image: linear-gradient(
    90deg,
    rgba(62, 103, 150, 0.918) 11.38%,
    rgba(58, 120, 177, 0.8) 25.23%,
    rgb(15, 33, 110) 100%
  );
  background-repeat: no-repeat;
  background-size: 100% 100%;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
`;

export const LinkGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const Link = styled.div`
  border: none;
  color: ${COLORS.greyishWhite};
  background-color: transparent;
  font-size: 0.813rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 0.75rem;

  :hover {
    color: ${COLORS.white};
    background: linear-gradient(
      90deg,
      rgba(33, 162, 255, 0.25) 0%,
      rgba(33, 162, 255, 0.15) 50%,
      rgba(50, 50, 51, 0) 100%
    );
  }
`;

export const SearchBar = styled.input`
  all: unset;
  width: 210px;
  height: 28px;
  background-color: ${COLORS.searchBarBlue};
  border-radius: 0.25rem;
  padding-left: 0.5rem;
  color: ${COLORS.white};
  font-size: 14px;

  &::placeholder {
    color: ${COLORS.searchBarBlack};
    font-size: 14px;
    font-style: italic;
    text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.1);
    font-family: "Motiva Sans", Sans-serif;
  }
`;

export const SearchBarContainer = styled.div`
  display: flex;
  width: 210px;
  height: 30px;
  background-color: ${COLORS.searchBarBlue};
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  transition: all 0.3s;

  &:hover {
    border: 1px solid ${COLORS.blue};
  }

  &::placeholder {
    color: ${COLORS.searchBarBlack};
    font-size: 14px;
    font-style: italic;
    text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.1);
    font-family: "Motiva Sans", Sans-serif;
  }
`;

export const SearchBarWrap = styled.div`
  padding: 3px 4px 2px;
`;

export const SearchButton = styled.img`
  width: 25px;
  height: 25px;
  transition: all 0.3s;
  margin: 2px 2px 0 0;

  &:hover {
    filter: brightness(150%);
  }
`