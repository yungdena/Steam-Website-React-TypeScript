import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { BigTagsObject } from "../../../common/utils/tags";
import { StyledPagination } from "./index.styled";
import { BigTagItem, BigTagTitle, Gradient, MainContainer } from "./index.styled"

export const BigTags = () => {
  const swiperParams = {
    modules: [EffectFade, Autoplay, Navigation, Pagination],
    effect: "fade",
    navigation: true,
    slidesPerView: 4,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    className: "swiper",
  };

  const tagChunks = [];
  for (let i = 0; i < Object.keys(BigTagsObject).length; i += 4) {
    tagChunks.push(Object.keys(BigTagsObject).slice(i, i + 4));
  }

  return (
    <MainContainer>
      <Swiper style={{ padding: "1.5rem" }} {...swiperParams}>
        {tagChunks.map((tagGroup, index) => (
          <SwiperSlide
            key={index}
            style={{
              display: "flex",
              width: "1050px",
              gap: "16px",
              marginLeft: "-16px",
              padding: "1rem",
            }}
          >
            {tagGroup.map((tag) => (
              <BigTagItem
                key={tag}
                style={{
                  position: "relative",
                  backgroundImage: `url(${
                    BigTagsObject[tag as keyof typeof BigTagsObject].bg
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  overflow: "hidden",
                }}
              >
                <Gradient
                  style={{
                    background:
                    BigTagsObject[tag as keyof typeof BigTagsObject].color,
                  }}
                />
                <BigTagTitle>
                  {BigTagsObject[tag as keyof typeof BigTagsObject].title}
                </BigTagTitle>
              </BigTagItem>
            ))}
          </SwiperSlide>
        ))}
        <StyledPagination>
          <div className="swiper-pagination"></div>
        </StyledPagination>
      </Swiper>
    </MainContainer>
  );
}