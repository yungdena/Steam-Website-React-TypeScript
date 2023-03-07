import styled from 'styled-components';
import { COLORS } from '../../theme';

export const ContentContainer = styled.div`
  display: flex;
  background-color: ${COLORS.darkBlueGrey};
  width: 100%;
  height: 100%;
  background-color: ${COLORS.grey}
  margin-top: 6.5rem;
  color: ${COLORS.lightBlue};
  font-size: 3rem;
`;

export const AppsList = styled.div`
  background-color: ${COLORS.storeBlue};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  height: fix-content;
  width: 100%;
`;

export const AppContainer = styled.div`
  display: flex;
  width: 38.625rem;
  height: 2.75rem;
  background-color: ${COLORS.darkBlueGrey};
`;

export const AppImageContainer = styled.div`
  width: 9.5rem;
`;

export const AppImage = styled.img`
  width: 7.5rem;
  height: 100%;
`;

export const AppTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 300;
  color: ${COLORS.greyText}
  padding-top: 0.25rem;
`

export const AppPrice = styled.div`
  font-size: 0.75rem;
  color: ${COLORS.lightGrey};
`

export const AppTextContainer = styled.div`
  height: 100%;
  width: 100%
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
`