import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, EffectFade } from "swiper/modules";

import { HOME_HEADER_LINKS } from "../common/consts/header-buttons";
import { Header } from "../header";
import {
  ContentContainer,
  HomeHeader,
  Link,
  LinkGroup,
  MainContainer,
  SearchBar,
  SearchBarContainer,
  SearchBarWrap,
  SearchButton,
} from "./index.styled";
import { GameBannerComponent } from "./banner";

export const HomePage = () => {
  const SearchButtonURL =
    "https://res.cloudinary.com/didkbrlcz/image/upload/v1693034230/System/search_icon_btn_r7rp8b.png";
  const swiperParams = {
    modules: [Navigation, Pagination, EffectFade],
    navigation: true,
    effect: 'fade',
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    className: "swiper"
  };

  const MainImageURL1: string =
    "https://res.cloudinary.com/didkbrlcz/image/upload/v1677571728/Banners/BeamNG/capsule_616x353_lravgz.jpg";
  
    const MainImageURL2: string =
      "https://res.cloudinary.com/didkbrlcz/image/upload/v1677572043/Banners/Wo%20Long/capsule_616x353_rwe2di.jpg";

  const MainImageURL3: string =
    "https://res.cloudinary.com/didkbrlcz/image/upload/v1677571808/Banners/Destiny%202/capsule_616x353_qplwrm.jpg";

  const MainImageURL4: string =
    "https://res.cloudinary.com/didkbrlcz/image/upload/v1677571901/Banners/Sons%20Of%20The%20Forest/capsule_616x353_a9twp9.jpg";



  return (
    <>
      <Header />
      <MainContainer>
        <ContentContainer>
          <HomeHeader>
            <LinkGroup>
              {HOME_HEADER_LINKS.map((link) => {
                return (
                  <Link id={link.id} key={link.id}>
                    {link.label}
                  </Link>
                );
              })}
            </LinkGroup>
            <SearchBarWrap>
              <SearchBarContainer>
                <SearchBar placeholder="search" />
                <SearchButton src={SearchButtonURL} />
              </SearchBarContainer>
            </SearchBarWrap>
          </HomeHeader>
          <Swiper {...swiperParams}>
            <SwiperSlide>
              <GameBannerComponent
                MainImageURL={MainImageURL1}
              ></GameBannerComponent>
            </SwiperSlide>
            <SwiperSlide>
              <GameBannerComponent
                MainImageURL={MainImageURL2}
              ></GameBannerComponent>
            </SwiperSlide>
            <SwiperSlide>
              <GameBannerComponent
                MainImageURL={MainImageURL3}
              ></GameBannerComponent>
            </SwiperSlide>
            <SwiperSlide>
              <GameBannerComponent
                MainImageURL={MainImageURL4}
              ></GameBannerComponent>
            </SwiperSlide>
          </Swiper>
        </ContentContainer>
      </MainContainer>
    </>
  );
};
