import styled from "styled-components";
import { COLORS } from "../theme";

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${COLORS.storeBlue};
  width: 100%;
  height: 100vh;
`;

export const InfoContainer = styled.div`
  width: 58.75rem;
  padding: 9.5rem 0;
`;

export const InfoWrapper = styled.div`
  display: flex;
`;

export const AppTitle = styled.div`
  width: 100%;
  font-size: 1.625rem;
  color: ${COLORS.white};
`;

export const SmallInfoContainer = styled.div`
  display: flex;
  height: 27.75rem;
`;

export const SmallInfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  min-height: 100%;
  color: ${COLORS.white};
  font-size: 0.75rem;
`;

export const TitleImage = styled.img`
  width: 100%;
`

export const BigInfoContainer = styled.div`
  width: 38.5rem;
  height: 27rem;
`;