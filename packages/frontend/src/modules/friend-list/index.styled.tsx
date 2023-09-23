import styled from "styled-components";
import { COLORS } from "../theme";

const backgroundURL =
  "https://res.cloudinary.com/didkbrlcz/image/upload/v1695458002/System/colored_body_top2_s0bbru.png";
const backgroundGradient =
  "https://res.cloudinary.com/didkbrlcz/image/upload/v1695458605/System/bg_highlight_nzz37n.png";

export const Background = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.storeBlue};
`;

export const BackgroundImage = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: url(${backgroundURL});
  background-repeat: no-repeat;
  background-position: top;
`;

export const UserContainer = styled.div`
  width: 100%;
  height: 128px;
  background: url(${backgroundGradient}) center bottom no-repeat;
  margin: 0 auto;
`;

export const MainContainer = styled.div`
  margin: 0 auto;
  max-width: 1050px;
  width: 100vw;
  padding-top: 6.5rem;
`;

export const UserName = styled.div`
  color: #ebebeb;
  text-decoration: none;
  cursor: pointer;
  font-size: 26px;
  font-weight: 300;
  padding-top: 2.5rem;
  padding-left: 2.5rem;
`;