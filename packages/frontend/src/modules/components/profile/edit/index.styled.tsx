import styled from "styled-components";
import { COLORS } from "../../../common/theme";

export const Background = styled.div`
  height: 100vh;
  background: linear-gradient(180deg, #262d33 -3.38%, #1d1e20 78.58%);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: auto 100%;
  padding-top: 10rem;
  padding-left: 2rem;
`;

export const MainContainer = styled.div`
  width: 1050px;
  margin: 0 auto;
`;

export const ProfileHeading = styled.div`
  display: flex;
  padding: 1rem;
  margin-bottom: 3rem;
  width: 100%;
  height: 102px;
  background: rgba(58, 62, 71, 0.5);
`;

export const Avatar = styled.img`
  width: 64px;
  height: 64px;
`

export const ProfileName = styled.div`
  color: #ebebeb;
  text-decoration: none;
  cursor: pointer;
  font-size: 26px;
  margin-left: 1rem;
  margin-top: 0.75rem;
`;

export const AboutTitle = styled.div`
  color: #ebebeb;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 26px;
`;

export const AboutSection = styled.div`
  display: flex;
  color: #969696;
  max-width: 740px;
  justify-content: flex-start;
  margin-bottom: 15px;
  padding-bottom: 5px;
  line-height: normal;
`;

export const About = styled.div``

export const FormTitle = styled.div`
  width: 100%;
  font-size: 16px;
  line-height: 28px;
  letter-spacing: 0em;
  text-transform: uppercase;
  color: #e4e4e4;
  padding: 0px 0px 6px 0x;
  border-bottom: 2px solid rgba(228, 228, 228, 0.1);
`;

export const Form = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`

export const StyledInput = styled.input`
  height: 40px;
  color: #909090;
  padding-left: 0.5rem;
  width: 740px;
  box-shadow: inset 1px 1px 0px rgba(0, 0, 0, 0.6666666667);
  border: none;
  background-color: rgba(0, 0, 0, 0.25);
`;

export const StyledLabel = styled.label`
  font-weight: 300;
  color: #969696;
  text-transform: uppercase;
  line-height: 19px;
  font-size: 13px;
  margin-bottom: 4px;
  user-select: none;
  letter-spacing: initial;
`;

export const CancelButton = styled.button`
  box-sizing: content-box;
  border: 0;
  padding: 0;
  margin: 2px 0;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  line-height: 32px;
  color: #dfe3e6;
  font-size: 14px;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
  width: 200px;
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
  background: #3d4450;
  height: 32px;

  &::before {
    pointer-events: none;
    user-select: none;
    content: " ";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    filter: brightness(110%);
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`

export const SaveButton = styled.button`
  box-sizing: content-box;
  border: 0;
  padding: 0;
  margin: 2px 0;
  user-select: none;
  line-height: 32px;
  color: #dfe3e6;
  font-size: 14px;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
  width: 200px;
  transition: all 0.2s ease-out, color 0.2s ease-out;
  background: linear-gradient(to right, #47bfff 0%, #1a69c2 60%);

  &::before {
    pointer-events: none;
    user-select: none;
    content: " ";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }

  &:hover {
    background: linear-gradient(to right, #47bfff 0%, #1a44c2 60%);
    background-position: 0%;
    background-size: 330% 100%;
    color: #fff;
  }

  &:hover::before {
    opacity: 1;
  }
`;

export const AvatarSection = styled.div`
  margin-top: 4rem;
  margin-bottom: 2rem;
`

export const AvatarWrapper = styled.div`
  display: flex;
`

export const EditAvatar = styled.img`
  width: 184px;
  height: 184px;
`

export const EditAvatarDescription = styled.div`
  font-size: 14px;
  color: gray;
  width: 220px;
`;