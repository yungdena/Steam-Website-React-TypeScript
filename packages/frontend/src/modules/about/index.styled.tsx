import styled from "styled-components";

import { COLORS } from "../theme";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.storeBlue};
  padding-top: 6.5rem;
`;

export const TextContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  color: ${COLORS.white};
  padding: 0.5rem 10rem;
`;
