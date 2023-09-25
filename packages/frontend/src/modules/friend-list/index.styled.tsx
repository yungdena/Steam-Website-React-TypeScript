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

export const ButtonsMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  min-height: 600px;
`

export const MenuTitle = styled.div`
  color: #7092a5;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  padding: 12px 0 0 8px;
  font-size: 11px;
`;

export const ButtonWrapper = styled.div`
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

export const Button = styled.div<any>`
  color: #ebebeb;
  font-weight: 300;
  font-size: 14px;
  background-repeat: no-repeat;
  background-size: 16px 192px;
  display: inline-block;
  line-height: 16px;
  padding-left: 35px;
  background-image: url(https://community.cloudflare.steamstatic.com/public/images/iconsheet_friends.png?v=5);
  background-position: ${(props) => props.backgroundPosition};
`;

export const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
`