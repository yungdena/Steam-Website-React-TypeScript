import styled from "styled-components";
import { COLORS } from "../../../common/theme";

export const MainContainer = styled.div`
  position: absolute;
  right: 3.3rem;
  top: 8.7rem;
  max-height: 100%;
  z-index: 9999;
`

export const SearchList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #3d4450;
`;

export const App = styled.div`
  display: flex;
  width: 26.75rem;
  cursor: pointer;
  transition: all 0.5s;
  color: ${COLORS.white};
  padding: 0.25rem 0.5rem;

  &:hover {
    background-color: ${COLORS.white};
    color: ${COLORS.black};
  }
`;

export const AppImage = styled.img`
  width: 120px;
  height: 45px;
`
export const AppTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const AppTitle = styled.div`
  font-weight: 500;
  padding: 0 0 0 8px;
  font-size: 14px;
  width: 18rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AppPrice = styled.div`
  font-size: 13px;
  padding: 0 0 0 8px;
`;