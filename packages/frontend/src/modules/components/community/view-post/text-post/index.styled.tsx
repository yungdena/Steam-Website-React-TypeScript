import styled from "styled-components";
import { COLORS } from "../../../../common/theme";

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

export const TextBlock = styled.div`
  padding: 1rem;
  position: relative;
  top: 50%;
  left: 2px;
  transform: translateY(-50%);
  width: 60%;
  border: 1px solid #304a66;
  border-right: none;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  z-index: 9999;
  min-height: 500px;
  background: ${COLORS.darkBlueGrey}
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background: #aaa;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const InfoBlock = styled.div`
  position: relative;
  top: 50%;
  right: 2px;
  transform: translateY(-50%);
  width: 40%;
  background-color: ${COLORS.communityGrey};
  border: 1px solid #304a66;
  border-left: 1px solid transparent;
  display: flex;
  flex-direction: column;
  min-height: 500px
`;

export const PostDescription = styled.div`
  font-family: "Motiva Sans", Sans-serif;
  font-weight: 300;
  font-size: 18px;
  color: #7cc5fb;
  margin-top: 0px;
  margin-bottom: 4px;
  padding: 0 0.5rem;
  white-space: pre-wrap;
`;
