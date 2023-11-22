import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory } from "react-router-dom";

import { FinalPrice, MainContainer, OfferImage, OriginalPrice, PriceAmounts, PriceContainer, PricePercent } from "./index.styled"
import { IApp } from "../../../common/types/app.interface";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { APP_KEYS } from "../../../common/consts";
import { Offer, OffersContainer, StyledPagination } from "./index.styled";
import { calculatePercentageDecrease } from "../../../common/utils/countPercentage";
import { useDiscountData } from "../../../common/context/discounts-context";

export const Offers = () => {
  const appsWithNewPrice = useDiscountData()

  const swiperParams = {
    modules: [EffectFade, Autoplay, Navigation, Pagination],
    effect: "fade",
    navigation: true,
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    className: "swiper",
  };

  const chunks = [];
  for (let i = 0; i < appsWithNewPrice.discountApps.length; i += 6) {
    chunks.push(appsWithNewPrice.discountApps.slice(i, i + 6));
  }

  const history = useHistory();

  const handleNavigate = (appId: string) => {
    const recentGamesKey = "recentGames";
    const maxRecentGames = 7;

    let recentGames: string[] = JSON.parse(
      localStorage.getItem(recentGamesKey) || "[]"
    );

    const alreadyInList = recentGames.includes(appId);

    if (!alreadyInList) {
      if (recentGames.length >= maxRecentGames) {
        recentGames.shift();
      }

      recentGames.push(appId);

      localStorage.setItem(recentGamesKey, JSON.stringify(recentGames));
    }

    history.push(
      `${APP_KEYS.ROUTER_KEYS.ROOT}${APP_KEYS.ROUTER_KEYS.APPS}/${appId}`
    );
  };

  return (
    <MainContainer>
      <Swiper style={{ marginLeft: "0" }} {...swiperParams}>
        {chunks.map((appsChunk, slideIndex) => (
          <SwiperSlide key={slideIndex}>
            <OffersContainer>
              {appsChunk.map((app) => (
                <Offer onClick={() => handleNavigate(app._id)} key={app._id}>
                  <OfferImage src={app.titleImage} />
                  <PriceContainer style={{ marginTop: "5px" }}>
                    <PricePercent>
                      -
                      {calculatePercentageDecrease(
                        Number(app.price),
                        Number(app.newPrice),
                        0
                      )}
                      %
                    </PricePercent>
                    <PriceAmounts>
                      <OriginalPrice>{app.price}$</OriginalPrice>
                      <FinalPrice>{app.newPrice}$</FinalPrice>
                    </PriceAmounts>
                  </PriceContainer>
                </Offer>
              ))}
            </OffersContainer>
          </SwiperSlide>
        ))}
        <StyledPagination>
          <div className="swiper-pagination"></div>
        </StyledPagination>
      </Swiper>
    </MainContainer>
  );
};