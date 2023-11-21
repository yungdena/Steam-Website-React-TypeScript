import styled from 'styled-components';

import { COLORS } from "../../common/theme";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${COLORS.storeBlue};
`;

export const MainContent = styled.div`
  max-width: 1050px;
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
`

export const StoreWrap = styled.div`
  display: flex;
`