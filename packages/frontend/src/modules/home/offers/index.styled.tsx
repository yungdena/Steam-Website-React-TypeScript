import styled from "styled-components";

const offerBackground =
  "https://res.cloudinary.com/didkbrlcz/image/upload/v1693208976/System/background_spotlight_lqsoz8.jpg";

export const MainContainer = styled.div`
  height: 500px;
`;

export const OffersContainer = styled.div`
  width: 940px;
  height: 404px;
  display: grid;
  margin: 0 auto;
  gap: 0;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  position: relative;
`;

export const OffersSlide = styled.div`
  width: 940px;
  display: grid;
  margin: 0 auto;
  gap: 0;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  position: relative;
`;

export const Offer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 306px;
  height: 186px;
  background-image: url(${offerBackground});
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
`

export const OfferImage = styled.img`
  width: 100%;
  height: 140px;
`;

export const StyledPagination = styled.div`
  z-index: 9999 !important;
  .swiper-pagination {
    transform: translateX(50%);
    bottom: -2px !important;
    display: flex;
    z-index: 9999 !important;

    .swiper-pagination-bullet {
      z-index: 9999 !important;
      display: inline-block;
      margin: 2px !important;
      width: 15px;
      height: 9px;
      border-radius: 2px;
      transition: background-color 0.5s;
      background-color: hsla(202, 60%, 100%, 0.2);
      cursor: pointer;

      &.swiper-pagination-bullet-active {
        background-color: hsla(202, 60%, 100%, 0.4);
      }
    }
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  margin: 4px;
  text-align: right;
  padding-right: 5px;
  line-height: 17px;
  font-size: 12px;
  width: 135px;

  .wishlist-price-amounts {
    background-color: transparent;
  }
`;

export const PricePercent = styled.div`
  line-height: 34px;
  padding: 0 5px;
  font-size: 26px;
  font-weight: 400;
  color: #beee11;
  background-color: #4c6b22;
`;

export const PriceAmounts = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0.25rem;
  background-color: rgba(20, 31, 44, 0.8);

  .wishlist-price-final-price {
    color: white;
  }
`;

export const OriginalPrice = styled.div`
  position: relative;
  text-decoration: line-through;
  width: fit-content;
  color: #738895;
  font-size: 11px;
  line-height: 12px;
`;

export const FinalPrice = styled.div`
  color: #beee11;
  line-height: 16px;
  font-size: 15px;
`;