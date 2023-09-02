import React, { useState, useEffect } from "react";
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
import { useGetAllApps } from "../common/services/apps.service";
import { Footer } from "./footer";
import { Offers } from "./offers";
import { LoaderBig } from "../common/loader/loader";
import { AppList } from "../store/app-list/index";

export const HomePage = () => {
  const [banners, setBanners] = useState<IApp[]>([]);
  const [apps, setApps] = useState<IApp[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const getAllBannersMutation = useGetAllBanners();
  const getAllAppsMutation = useGetAllApps();
  const history = useHistory();

  useEffect(() => {
    async function fetchAllBanners() {
      const data = await getAllBannersMutation.mutateAsync();
      console.log("response on HomePage: ", data);
      setBanners(data);
      setIsLoading(false);
    }
    async function fetchAllApps() {
      const data = await getAllAppsMutation.mutateAsync();
      console.log("response on HomePage: ", data);
      setApps(data);
      setIsLoading(false);
    }
    fetchAllApps();
    fetchAllBanners();
  }, []);

  console.log(banners, 'banners')
  
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
          {isLoading ? (
            <LoaderBig />
          ) : (
            <Swiper {...swiperParams}>
              {banners.map((banner) => (
                <SwiperSlide
                  onClick={() => handleNavigate(banner.appid)}
                  key={banner._id}
                >
                  <GameBannerComponent appInfo={banner}></GameBannerComponent>
                </SwiperSlide>
              ))}
              <StyledPagination>
                <div className="swiper-pagination"></div>
              </StyledPagination>
            </Swiper>
          )}
          {isLoading ? <LoaderBig /> : <Offers appsArray={apps} />}
          {isLoading ? <LoaderBig /> : <AppList sliceIndex={5} minHeight="fit-content" />}
        </ContentContainer>
      </MainContainer>
      <Footer />
    </>
  );
};
