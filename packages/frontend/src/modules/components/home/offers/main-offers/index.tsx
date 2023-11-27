import { useHistory } from "react-router-dom";
import { APP_KEYS } from "../../../../common/consts";
import { useDiscountData } from "../../../../common/context/discounts-context";
import { IApp } from "../../../../common/types/app.interface";
import { calculatePercentageDecrease } from "../../../../common/utils/countPercentage";
import { BigCard, DiscountPrice, MainContainer, NewPrice, OldPrice, PriceAmounts, PriceContainer, SaleRow, SmallCard, TitleImageBig, TitleImageSmall } from "./index.styled"

export const BigOffers = () => {
  const appsWithNewPrice = useDiscountData();
  const history = useHistory()
  const chunkArray = (arr: any, size: any) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
      arr.slice(index * size, index * size + size)
    );
  };

  const bigCards = appsWithNewPrice.discountApps.slice(0, 6);
  const smallCards = appsWithNewPrice.discountApps.slice(10); 

  const chunkedBigCards = chunkArray(bigCards, 3);
  const chunkedSmallCards = chunkArray(smallCards, 4);

  return (
    <MainContainer>
      {chunkedSmallCards.slice(0, 1).map((row, rowIndex) => (
        <SaleRow key={rowIndex}>
          {row.map((app: IApp, index: number) => (
            <SmallCard key={index}>
              <TitleImageSmall
                onClick={() =>
                  history.push("/" + APP_KEYS.ROUTER_KEYS.APPS + "/" + app._id)
                }
                src={app.titleImage}
              />
              <PriceContainer>
                <DiscountPrice>
                  -
                  {calculatePercentageDecrease(
                    Number(app.price),
                    app.newPrice,
                    0
                  )}
                  %
                </DiscountPrice>
                <PriceAmounts>
                  <OldPrice>{app.price}$</OldPrice>
                  <NewPrice>{app.newPrice}$</NewPrice>
                </PriceAmounts>
              </PriceContainer>
            </SmallCard>
          ))}
        </SaleRow>
      ))}
      {chunkedBigCards.slice(0, 1).map((row, rowIndex) => (
        <SaleRow key={rowIndex}>
          {row.map((app: IApp, index: number) => (
            <BigCard key={index}>
              <TitleImageBig
                onClick={() =>
                  history.push("/" + APP_KEYS.ROUTER_KEYS.APPS + "/" + app._id)
                }
                src={app.titleImage}
              />
              <PriceContainer>
                <DiscountPrice>
                  -
                  {calculatePercentageDecrease(
                    Number(app.price),
                    app.newPrice,
                    0
                  )}
                  %
                </DiscountPrice>
                <PriceAmounts>
                  <OldPrice>{app.price}$</OldPrice>
                  <NewPrice>{app.newPrice}$</NewPrice>
                </PriceAmounts>
              </PriceContainer>
            </BigCard>
          ))}
        </SaleRow>
      ))}
      {chunkedSmallCards.slice(1, 2).map((row, rowIndex) => (
        <SaleRow key={rowIndex}>
          {row.map((app: IApp, index: number) => (
            <SmallCard key={index}>
              <TitleImageSmall
                onClick={() =>
                  history.push("/" + APP_KEYS.ROUTER_KEYS.APPS + "/" + app._id)
                }
                src={app.titleImage}
              />
              <PriceContainer>
                <DiscountPrice>
                  -
                  {calculatePercentageDecrease(
                    Number(app.price),
                    app.newPrice,
                    0
                  )}
                  %
                </DiscountPrice>
                <PriceAmounts>
                  <OldPrice>{app.price}$</OldPrice>
                  <NewPrice>{app.newPrice}$</NewPrice>
                </PriceAmounts>
              </PriceContainer>
            </SmallCard>
          ))}
        </SaleRow>
      ))}
      {chunkedBigCards.slice(1, 2).map((row, rowIndex) => (
        <SaleRow key={rowIndex}>
          {row.map((app: IApp, index: number) => (
            <BigCard key={index}>
              <TitleImageBig
                onClick={() =>
                  history.push("/" + APP_KEYS.ROUTER_KEYS.APPS + "/" + app._id)
                }
                src={app.titleImage}
              />
              <PriceContainer>
                <DiscountPrice>
                  -
                  {calculatePercentageDecrease(
                    Number(app.price),
                    app.newPrice,
                    0
                  )}
                  %
                </DiscountPrice>
                <PriceAmounts>
                  <OldPrice>{app.price}$</OldPrice>
                  <NewPrice>{app.newPrice}$</NewPrice>
                </PriceAmounts>
              </PriceContainer>
            </BigCard>
          ))}
        </SaleRow>
      ))}
    </MainContainer>
  );
}