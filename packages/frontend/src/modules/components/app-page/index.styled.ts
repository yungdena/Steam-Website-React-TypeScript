import styled from "styled-components";
import { COLORS } from "../../common/theme";

export const Background = styled.div`
  background-color: ${COLORS.storeBlue};
  width: 100%;
  overflow: hidden;
  padding-bottom: 10rem;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.storeBlue};
  width: 58.75rem;
  margin: 0 auto;
`;

export const InfoContainer = styled.div`
  width: 58.75rem;
  height: fit-content;
  padding: 9.5rem 0 2rem;
  background: rgb(27, 40, 56);
  background: linear-gradient(
    180deg,
    rgba(27, 40, 56, 0.1) 21%,
    rgba(12, 19, 27, 0.7) 79%
  );
  border-radius: 0.25rem;
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
  flex-direction: column;
  height: 27.75rem;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  color: ${COLORS.white};
  font-size: 0.75rem;
  padding-bottom: 1rem;
`;

export const SmallInfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
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

export const AdditionalInfoContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`

export const AdditionalInfoTitleColumn = styled.div`
  display: flex;
  flex-direction: column;

  & > :nth-child(-n + 3) {
    margin-bottom: 0.75rem;
  }

  & > :nth-child(3) {
    margin-bottom: 0;
  }
`;

export const AdditionalInfoDescriptionColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;

  & > :nth-child(-n + 3) {
    margin-bottom: 0.75rem;
  }

  & > :nth-child(3) {
    margin-bottom: 0;
  }
`;

export const AdditionalInfoTitle = styled.div`
  color: ${COLORS.urbanGrey}
  font-size: 0.75rem;
`;

export const AdditionalInfoDescription = styled.div`
  color: ${COLORS.blue}
  font-size: 0.75rem;
`;

export const TagsContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
`
export const Tags = styled.div`
  display: flex;
  gap: 0.25rem;
`
export const Tag = styled.div`
  font-size: 0.75rem;
  border-radius: 2px;
  width: fit-content;
  color: ${COLORS.tagBlue};
  background-color: rgba(103, 193, 245, 0.2);
  padding: 0.1rem 0.25rem;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${COLORS.blue};
    color: ${COLORS.white};
  }
`;

export const PurchaseMenu = styled.div`
  align-self: start;
  position: relative;
  background: linear-gradient(
    -60deg,
    rgba(226, 244, 255, 0.3) 5%,
    rgba(84, 107, 115, 0.3) 95%
  );
  margin-top: 1rem;
  width: 616px;
  padding: 16px;
  padding-bottom: 26px;
  border-radius: 4px;
`;

export const PurchaseTitle = styled.div`
  font-size: 21px;
  font-family: "Motiva Sans", Sans-serif;
  font-weight: normal;
  color: #ffffff;
  font-weight: normal;
`;

export const PurchaseButton = styled.button`
  border-radius: 2px;
  border: none;
  padding: 1px;
  display: inline-block;
  cursor: pointer;
  text-decoration: none !important;
  color: #d2efa9;
  background: -webkit-linear-gradient(top, #6fa720 5%, #588a1b 95%);
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.3);
  padding: 0.25rem 0.75rem;
  margin: 2px;

  &:hover {
    background: #6fa720;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  background-color: black;
  border-radius: 2px;
  position: absolute;
  right: 16px;
  bottom: -17px;
  white-space: nowrap;
  text-align: right;

  .New-Price {
    padding: 0;
  }

  .appstore-prices {
    padding-top: 8px;
    padding-left: 12px;
    padding-right: 12px;
    position: static;
  }

  .wishlist-price {
    padding: 6px;
    width: 5rem;
    font-size: 14px;
    position: static;
    color: white;
  }

  .to-cart-button {
    height: 32px;
  }
`;

export const QueueContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  width: 100%;
  height: 68px;
  background-color: rgba(0, 0, 0, 0.2)
`

export const QueueButton = styled.button`
  border-radius: 2px;
  border: none;
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  color: #67c1f5;
  background: rgba(103, 193, 245, 0.2);
  padding: 2px 15px;
  font-size: 15px;
  line-height: 30px;

  &:hover {
    color: white;
    background: linear-gradient( -60deg, #417a9b 5%,#67c1f5 95%);
  }
`;

export const ReviewsTitle = styled.div`
  font-family: "Motiva Sans", Sans-serif;
  font-weight: 300;
  font-weight: normal;
  font-size: 14px;
  color: #ffffff;
  text-transform: uppercase;
  padding-bottom: 5px;
  letter-spacing: 1px;
`

export const ReviewsContainer = styled.div`
  width: 616px;
  min-height: 10rem;
  border-top: 1px solid black;
  padding-top: 1rem;
  margin-top: 3rem;
  align-self: start;
`

export const Review = styled.div`
  display: flex;
  min-height: 220px;
  background-color: rgba( 0, 0, 0, 0.2 );
  margin-bottom: 26px;
  background-image: url('https://store.akamai.steamstatic.com/public/images/v6/maincol_gradient_rule.png');
  background-repeat: no-repeat;
  background-position: top left;
`

export const ReviewRightBlock = styled.div`
  width: 100%;
  padding-top: 8px;
  padding-right: 4px;
`

export const ReviewLeftBlock = styled.div`
  width: 200px;
  height: 100%;
  padding: 0.5rem;
  display: flex;
`;

export const ReviewDescription = styled.div`
  margin-top: 1rem;
  margin-right: 8px;
  font-family: "Motiva Sans", Sans-serif;
  font-weight: normal;
  font-size: 13px;
  line-height: 17px;
  color: #acb2b8;
  overflow-wrap: break-word;
  overflow: hidden;
`;

export const RecommendationContainer = styled.div`
  width: 100%;
  height: 40px;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
`;

export const RecommendationRate = styled.img`
  width: 40px;
  height: 40px;
`

export const RecommendationRateText = styled.div`
  font-family: "Motiva Sans", Sans-serif;
  font-weight: 300;
  font-weight: normal;
  font-size: 14px;
  color: #ffffff;
  padding-bottom: 5px;
  letter-spacing: 1px;
  margin-left: 0.5rem;
`;

export const UserName = styled.div`
  color: #c1dbf4;
  margin-left: 0.5rem;
  font-size: 13px;
  font-family: "Motiva Sans", Sans-serif;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 6rem;
`;

export const UserAvatar = styled.img`
  width: 34px;
  height: 34px;
`