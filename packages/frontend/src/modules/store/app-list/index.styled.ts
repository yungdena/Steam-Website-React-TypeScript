import styled from 'styled-components';
import { COLORS } from '../../theme';

interface CustomProps {
  minHeight?: string;
  margin?: string;
}

export const ContentContainer = styled.div<CustomProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: ${(props) => (props.minHeight ? props.minHeight : "fit-content")};
  width: 100%;
  color: ${COLORS.lightBlue};
  font-size: 3rem;
  margin-top: 20rem;
`;

export const AppsList = styled.div<CustomProps>`
  max-width: 1200px;
  margin: ${(props) => (props.margin ? props.margin : "0")} auto;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  height: fix-content;
`;

export const SearchBarContainer = styled.div`
  display: flex;
  width: 686px;
  height: 40px;
  padding: 6px;
  margin-bottom: 0.25rem;
  background: rgba(0, 0, 0, 0.4);
`;

export const SearchBarInput = styled.input`
  position: relative;
  all: unset;
  background-color: rgba(103, 193, 245, 0.2);
  color: #fff;
  border: 1px solid #000;
  border-radius: 3px;
  box-shadow: 1px 1px 0px rgba(103, 193, 245, 0.15);
  width: 300px;
  padding: 5px;
  max-width: calc(100% - 80px - 2px);
  font-size: 13px;

  &::placeholder {
    top: 5px;
    position: absolute;
    font-size: 13px;
    color: white;
  }
`;

export const SearchBarButton = styled.div`
  height: 25px;
  width: 69px;
  margin-left: 5px;
  margin-top: 2px;
  border-radius: 2px;
  border: none;
  padding-left: 15px;
  padding-top: 2px;
  display: inline-block;
  cursor: pointer;
  text-decoration: none !important;
  color: #67c1f5;
  background: rgba( 103, 193, 245, 0.2 );
  font-size: 12px;
  line-height: 20px;
  transition: all 0.1s;

  &:hover {
    background: -webkit-linear-gradient( 150deg, #417a9b 5%,#67c1f5 95%);
    background: linear-gradient( -60deg, #417a9b 5%,#67c1f5 95%);
    color: white;
  }
`;

export const SearchBarSortByTitle = styled.div`
  font-size: 12px;
  color: #4c6c8c;
  display: inline-block;
  margin: 0.25rem 0.5rem 0 7rem;
`;


export const SearchBarSortBySelect = styled.select`
  width: 120px;
  height: 21px;
  margin-top: 0.25rem;
  display: block;
  color: #67c1f5;
  background-color: rgba(103, 193, 245, 0.2);
  font-size: 12px;
  line-height: 21px;
  border: 0;
  border-radius: 3px;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
`;

export const SearchBarOption = styled.option`
  background: #417a9b;
  width: 229px;
`;

export const Dropdown = styled.div`
  background: #417a9b;
  width: 229px;
`;

export const AppContainer = styled.div`
  position: relative;
  display: flex;
  width: 42.875rem;
  height: 2.75rem;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid ${COLORS.storeBlue}
  cursor: pointer;
  transition: 0.3s;

  :hover {
    border: 1px solid ${COLORS.grey}
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export const AppImageContainer = styled.div`
  width: 9.5rem;
`;

export const AppImage = styled.img`
  width: 7.5rem;
  height: 100%;
`;

export const AppTitle = styled.div`
  width: 275px;
  text-align: start;
  font-size: 0.75rem;
  font-weight: 300;
  color: ${COLORS.greyText}
  padding-top: 0.25rem;
`

export const AppPrice = styled.div`
  font-size: 0.75rem;
  padding: 0.25rem 1rem 0 0;
  color: ${COLORS.priceGrey};
  position: absolute;
  right: 0;
  top: 0.5rem;
`

export const AppReviews = styled.img`
  align-self: center;
  margin-left: 1rem;
  width: 1rem;
  height: 1rem;
`

export const AppTextContainer = styled.div`
  height: 100%;
  width: 100%
  display: flex;
  padding: 0 0.5rem;

  .New-Price {
    position: absolute;
    right: 0;
  }
`

export const AppLink = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
`

export const AppReleaseDate = styled.div`
  width: 85px;
  color: #4c6c8c;
  font-size: 11px;
  line-height: 45px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;