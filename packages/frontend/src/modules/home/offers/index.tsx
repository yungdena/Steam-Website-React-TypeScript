import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory } from "react-router-dom";

import { FinalPrice, MainContainer, OfferImage, OriginalPrice, PriceAmounts, PriceContainer, PricePercent } from "./index.styled"
import { IApp } from "../../common/types/app.interface";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { APP_KEYS } from "../../common/consts";
import { Offer, OffersContainer, StyledPagination } from "./index.styled";
import { calculatePercentageDecrease } from "../../common/utils/countPercentage";

export const Offers = ({ appsArray }: { appsArray: IApp[] }) => {
  const appsWithNewPrice = useMemo(
    () => appsArray.filter((app) => app.newPrice),
    [appsArray]
  );

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
    for (let i = 0; i < appsWithNewPrice.length; i += 6) {
      chunks.push(appsWithNewPrice.slice(i, i + 6));
    }

    const history = useHistory();

    const handleNavigate = (appId: string) => {
      history.push(
        `${APP_KEYS.ROUTER_KEYS.ROOT}${APP_KEYS.ROUTER_KEYS.APPS}/${appId}`
      );
    };

    return (
      <MainContainer>
        <Swiper {...swiperParams}>
          {chunks.map((appsChunk, slideIndex) => (
            <SwiperSlide key={slideIndex}>
              <OffersContainer>
                {appsChunk.map((app) => (
                  <Offer onClick={() => handleNavigate(app._id)} key={app._id}>
                    <OfferImage src={app.titleImage} />
                    <PriceContainer>
                      <PricePercent>
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