import styled from "styled-components";
import { COLORS } from "../../theme";

export const CustomSelectContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const SelectHeader = styled.div`
  padding: 8px 16px;
  background-color: #3d4450;
  color: white;
  cursor: pointer;
  font-size: 13px;
`;

export const SortBySpan = styled.span`
  color: ${COLORS.blue};
  font-size: 13px;
`;

export const OptionsContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

export const Option = styled.div`
  padding: 8px 16px;
  background-color: white;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  &.selected {
    font-weight: bold;
  }
`;
