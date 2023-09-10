import styled from "styled-components";
import { COLORS } from "../../theme";

export const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: all 0.5s;
  width: 9rem;
  position: absolute;
  top: 100%;
  z-index: 9999;
  background-color: ${COLORS.darkBlueGrey};
  padding: 5px 15px;
`;

export const DropdownLink = styled.button`
  width: fit-content;
  border: none;
  background-color: transparent;
  font-size: 11px;
  padding: 6px 10px 6px 0;
  color: ${COLORS.lightGrey};
  cursor: pointer;

  :hover {
    color: ${COLORS.white}
  }
`;