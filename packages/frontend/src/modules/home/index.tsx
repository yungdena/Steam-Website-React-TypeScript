import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { APP_KEYS } from "../common/consts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";

import { IApp } from "../common/types/app.interface";
import { Header } from "../header";
import {
  ContentContainer,
  MainContainer,
  StyledPagination,
} from "./index.styled";
import { GameBannerComponent } from "./banner";
import { HomepageHeader } from "./home-header";
import { useGetAllBanners } from "../common/services/banners.service";
import { Footer } from "./footer";
import { Offers } from "./offers";

export const HomePage = () => {
  const [apps, setApps] = useState<IApp[]>([]);
  const getAllBannersMutation = useGetAllBanners();
  const history = useHistory();

  useEffect(() => {
    async function fetchAllApps() {
      const data = await getAllBannersMutation.mutateAsync();
      console.log("response on HomePage: ", data);
      setApps(data);
    }
    fetchAllApps();
  }, []);

  
  const swiperParams = {
    modules: [EffectFade, Autoplay, Navigation, Pagination],
    effect: "fade",
    navigation: true,
    slidesPerView: 1,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    className: "swiper",
  };

  const handleNavigate = (appId: string) => {
    history.push(
      `${APP_KEYS.ROUTER_KEYS.ROOT}${APP_KEYS.ROUTER_KEYS.APPS}/${appId}`
    );
  };

  return (
    <>
      <Header />
      <MainContainer>
        <ContentContainer>
          <HomepageHeader />
            <Swiper {...swiperParams}>
              {apps.map((app) => (
                <SwiperSlide
                  onClick={() => handleNavigate(app.appid)}
                  key={app._id}
                >
                  <GameBannerComponent appInfo={app}></GameBannerComponent>
                </SwiperSlide>
              ))}
              <StyledPagination>
                <div className="swiper-pagination"></div>
              </StyledPagination>
            </Swiper>
            <Offers appsArray={apps}/>
        </ContentContainer>
      </MainContainer>
      <Footer />
    </>
  );
};
