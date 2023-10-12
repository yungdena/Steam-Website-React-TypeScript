import styled from "styled-components";
import { COLORS } from "../theme";

export const MainContainer = styled.div`
  min-height: 100vh;
  background-image: url('https://res.cloudinary.com/didkbrlcz/image/upload/v1696235433/System/bg_dots_oshmgr.png');
  background-color: black;
  background-repeat: no-repeat;
  background-position: center top;
  padding-top: 6.5rem;
`

export const ProfileContainer = styled.div`
  height: 100vh;
  width: 926px;
  background: radial-gradient(
      farthest-side at top right,
      ${COLORS.gradientRight},
      transparent 500px
    ),
    radial-gradient(
      farthest-corner at top left,
      ${COLORS.gradientLeft},
      transparent 600px
    ),
    radial-gradient(
      farthest-corner at bottom right,
      ${COLORS.gradientBackgroundRight},
      transparent 500px
    ),
    radial-gradient(
      farthest-corner at bottom left,
      ${COLORS.gradientBackgroundLeft},
      transparent 600px
    );
  background-color: ${COLORS.gradientBackground};
  margin: 0 auto;
`;

export const ProfileHeading = styled.div`
  height: 224px;
  margin: 0 25px;
  padding-top: 24px;
  display: flex;
`

export const Avatar = styled.img`
  width: 164px;
  height: 164px;
`

export const Username = styled.div`
  line-height: 40px;
  font-size: 24px;
  color: #ffffff;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-family: "Motiva Sans", Sans-serif;
  font-weight: 200;
  margin-left: 2.5rem;
`;

export const Button = styled.div`
  height: fit-content;
  border-radius: 2px;
  color: lightgray;
  padding: 4px;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.1s ease-in-out;
  margin-left: auto;
  margin-top: 1rem;

  &:hover {
    filter: brightness(150%);
  }
`

export const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 652px;
  min-height: 617px;
  margin: 12px;
`

export const ActivityTitle = styled.div`
  border-bottom: none;
  padding: 3px 10px;
  line-height: 26px;
  border-radius: 3px;
  backdrop-filter: blur(20px);
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  font-size: 18px;
  font-weight: 300;
  font-family: 'Motiva-sans';
  color:rgb(150, 150, 150);
  margin-bottom: 12px;
`;

export const GameContainer = styled.div`
  backdrop-filter: blur(20px);
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  margin-bottom: 21px;
  width: 100%;
  height: 145px;
  padding: 8px 10px;
`;

export const GameTitle = styled.div`
  font-size: 14px;
  color: rgb(235, 235, 235);
  margin-left: 10px;
  margin-top: 10px;

  &:hover {
    color: ${COLORS.tagBlue};
    cursor: pointer;
  }
`;

export const GameImage = styled.img`
  width: 180px;
  height: 69px;
  cursor: pointer;
`;

export const AchievementsContainer = styled.div`
  padding: 14px 11px 10px;
  background-color: ${COLORS.gradientBackground};
  border-radius: 3px;
  margin-top: 9px;
  height: 50px;
  font-size: 14px;
  color: rgb(235, 235, 235);

  &:hover {
    color: ${COLORS.tagBlue};
    cursor: pointer;
  }
`;

export const ProfileInfoContainer = styled.div`
  width: 288px;
  height: 617px;
  background-color: rgba( 0, 0, 0, 0.3 );
  backdrop-filter: blur(20px);
  padding: 10px;
  border-radius: 3px;
  margin: 12px;
  margin-left: 0;
`;

export const InfoContainer = styled.div`
  display: flex;
`
