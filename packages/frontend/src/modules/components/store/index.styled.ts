import styled from 'styled-components';

import { COLORS } from "../../common/theme";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${COLORS.storeBlue};
`;
