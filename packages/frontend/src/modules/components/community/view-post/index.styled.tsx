import styled from "styled-components";
import { COLORS } from "../../../common/theme";

export const MainContainer = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.4);
  padding: 4rem;
  z-index: 9999;
`;

export const ImageBlock = styled.div`
  position: relative;
  top: 50%;
  left: 2px;
  transform: translateY(-50%);
  width: 60%;
  border: 1px solid ${COLORS.tagBlue};
  border-right: none;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  z-index: 9999;
`;

export const InfoBlock = styled.div`
  position: relative;
  top: 50%;
  right: 2px;
  transform: translateY(-50%);
  width: 40%;
  background-color: ${COLORS.communityGrey};
  border: 1px solid ${COLORS.tagBlue};
  border-left: 1px solid transparent;
  display: flex;
  flex-direction: column;
`;

export const PostImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  background-color: black;

  object-fit: contain;
`;

export const AuthorBlock = styled.div`
  display: flex;
  width: 100%;
  height: 45px;
  padding: 4px 0 4px 4px;
  margin-bottom: 4px;
  font-size: 11px;
  line-height: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
  background-color: rgba(84, 133, 183, 0.2);
`;

export const AuthorAvatar = styled.img`
  width: 36px;
  height: 36px;
  margin: 0 0.25rem;
`

export const AuthorName = styled.div`
  color: #898989;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
  line-height: 13px;
`;

export const PostText = styled.div`
  font-family: "Motiva Sans", Sans-serif;
  font-weight: 300;
  font-size: 18px;
  color: #7cc5fb;
  font-style: italic;
  margin-top: 0px;
  margin-bottom: 4px;
  padding: 0 0.5rem;
`;