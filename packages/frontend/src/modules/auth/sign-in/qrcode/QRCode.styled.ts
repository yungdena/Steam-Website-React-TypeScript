import styled from "styled-components";
import { COLORS } from "../../../theme";

export const QRCodeContainer = styled.div`
  display: grid;
  place-items: center;
  border: 1px solid black;
  width: 200px;
  height: 200px;
  background-color: ${COLORS.white};
  border-radius: 0.625em;
`;