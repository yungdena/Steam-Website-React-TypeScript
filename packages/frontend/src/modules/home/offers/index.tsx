import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory } from "react-router-dom";

import { FinalPrice, MainContainer, OfferImage, OriginalPrice, PriceAmounts, PriceContainer, PricePercent } from "./index.styled"
import { IApp } from "../../common/types/app.interface";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { APP_KEYS } from "../../common/consts";
import { Offer, OffersContainer, StyledPagination } from "./index.styled";

export const Offers = ({ appsArray }: { appsArray: IApp[] }) => {
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

  const history = useHistory();

  const handleNavigate = (appId: string) => {
    history.push(
      `${APP_KEYS.ROUTER_KEYS.ROOT}${APP_KEYS.ROUTER_KEYS.APPS}/${appId}`
    );
  };

  return (
    <MainContainer>
      <Swiper {...swiperParams}>
        {[...Array(Math.ceil(appsArray.length / 6))].map((_, slideIndex) => (
          <SwiperSlide key={slideIndex}>
            <OffersContainer>
              {appsArray
                .slice(slideIndex * 6, (slideIndex + 1) * 6)
                .map((app) => (
                  <Offer key={app._id}>
                    <OfferImage src={app.titleImage} />
                    <PriceContainer>
                      <PricePercent>-60%</PricePercent>
                      <PriceAmounts>
                        <OriginalPrice>300$</OriginalPrice>
                        <FinalPrice>100$</FinalPrice>
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