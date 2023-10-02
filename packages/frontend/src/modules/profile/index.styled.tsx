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
  border-bottom: 2px solid black;
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