import styled from "styled-components";
import { COLORS } from "../../../common/theme";

export const CustomSelectContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const SelectHeader = styled.div`
  width: 180px;
  padding: 8px 16px;
  background-color: #3d4450;
  color: white;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    filter: brightness(110%);
  }
`;

export const SortBySpan = styled.span`
  color: ${COLORS.blue};
  font-size: 13px;
  margin-right: 0.5rem;
`;

export const OptionsContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  background-color: #3d4450;
  top: 90%;
  left: 0;
  right: 0;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

export const Option = styled.div`
  width: 180px;
  padding: 8px 16px;
  background-color: #3d4450;
  color: white;
  cursor: pointer;

  &:hover {
    filter: brightness(110%);
  }

  &.selected {
    font-weight: bold;
  }
`;
