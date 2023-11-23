import styled from "styled-components";

export const MainContainer = styled.div`
  margin-left: -40px;
  width: fit-content;
  margin-bottom: 10rem;

  @media (max-width: 1500px) {
    margin-left: -160px;
  }
`;

export const SaleRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`

export const BigCard = styled.div`
  width: 368px;
  height: 206px;
  position: relative;
`;

export const SmallCard = styled.div`
  width: 273px;
  height: 166px;
`;

export const TitleImageBig = styled.img`
  width: 100%;
  height: 180px;
  object-fit: fill;
  box-shadow: 2px 2px 4px #0e0a0a;
  z-index: 3;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s

  &:hover {
    transform: scale(105%);
    z-index: 1;
  }
`;

export const TitleImageSmall = styled.img`
  width: 100%;
  height: 140px;
  object-fit: fill;
  box-shadow: 2px 2px 4px #0e0a0a;
  z-index: 3;
  position: relative;
    cursor: pointer;
  transition: transform 0.3s

  &:hover {
    transform: scale(105%);
    z-index: 1;
  }
`;

export const PriceContainer = styled.div`
  position: absolute;
  height: 27px;
  display: flex;
`

export const DiscountPrice = styled.div`
  font-weight: bold;
  color: #000000;
  background: #a1cd44;
  padding: 6px;
  font-size: 16px;
  line-height: 15px;
  width: fit-content;
  z-index: 2;
`;

export const PriceAmounts = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-shrink: 1;
  overflow: hidden;
  justify-content: end;
  background: rgba(0, 0, 0, 0.6);
  padding: 5px 8px;
  z-index: 2;
  position: relative;
`;

export const NewPrice = styled.div`
  font-size: 15px;
  color: #ffffff;
  line-height: 12px;
`;

export const OldPrice = styled.div`
  font-size: 14px;
  padding-right: 4px;
  color: #848e94;
  line-height: 12px;
  text-decoration: line-through;
`;