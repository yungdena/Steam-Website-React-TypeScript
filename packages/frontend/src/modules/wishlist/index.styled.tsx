import styled from "styled-components";
import { COLORS } from "../theme";

export const Background = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: ${COLORS.storeBlue};
  padding-top: 10rem;
`

export const MainContainer = styled.div`
  margin: 0 auto;
  max-width: 1050px;
  min-height: 10rem;
  border: 1px solid ${COLORS.tagBlue};
`

export const WishlistItem = styled.div`
  color: ${COLORS.greyishWhite};
`
export const NoItems = styled.div`
  color: ${COLORS.greyishWhite};
`;