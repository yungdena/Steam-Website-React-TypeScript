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
  AppsLine,
  ContentContainer,
  FeaturedButton,
  FeaturedTitle,
  HomeAppsContainer,
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
import { AppContainer, AppImage, AppImageContainer, AppLink, AppPrice, AppReleaseDate, AppReviews, AppTextContainer, AppTitle } from "../store/app-list/index.styled";
import { FinalPrice, OriginalPrice, PriceAmounts, PriceContainer, PricePercent } from "./offers/index.styled";
import { calculatePercentageDecrease } from "../common/utils/countPercentage";
import { calculateReviewTitle, getReviewImageURL } from "../common/utils/calculateReviewRate";
import { formatDate } from "../common/utils/formatDate";

export const HomePage = () => {
  const [banners, setBanners] = useState<IApp[]>([]);
  const [apps, setApps] = useState<IApp[]>([]);
  const [isLoadingApps, setIsLoadingApps] = useState(true);
  const [isLoadingBanners, setIsLoadingBanners] = useState(true);
  const getAllBannersMutation = useGetAllBanners();
  const getAllAppsMutation = useGetAllApps();
  const history = useHistory();

  useEffect(() => {
    async function fetchAllBanners() {
      const data = await getAllBannersMutation.mutateAsync();
      console.log("banners fetched: ", data);
      setBanners(data);
      setIsLoadingBanners(false);
    }
    async function fetchAllApps() {
      const data = await getAllAppsMutation.mutateAsync();
      console.log("apps fetched: ", data);
      setApps(data);
      setIsLoadingApps(false);
    }
    fetchAllBanners();
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

  const handleNavigateToApps = () => {
    history.push(
      `${APP_KEYS.ROUTER_KEYS.ROOT}${APP_KEYS.ROUTER_KEYS.STORE}`
    );
  };

  return (
    <>
      <Header />
      <MainContainer>
        <ContentContainer>
          <HomepageHeader />
          {isLoadingBanners ? (
            <LoaderBig marginTop="10rem" />
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
          {isLoadingApps ? (
            <LoaderBig marginTop="30rem" />
          ) : (
            <Offers appsArray={apps} />
          )}

          {isLoadingApps ? (
            <LoaderBig marginTop="20rem" marginBottom="10rem" />
          ) : (
            <>
              <AppsLine>
                <FeaturedTitle>Top Sellers</FeaturedTitle>
                <FeaturedButton onClick={handleNavigateToApps}>To apps</FeaturedButton>
              </AppsLine>
              <HomeAppsContainer>
                {apps.slice(0, 5).map((app) => (
                  <AppLink
                    key={app._id}
                    onClick={() => handleNavigate(app._id)}
                  >
                    <AppContainer>
                      <AppImageContainer>
                        <AppImage src={app.bannerImage} />
                      </AppImageContainer>
                      <AppTextContainer>
                        <AppTitle>{app.title}</AppTitle>
                        <AppReleaseDate>
                          {formatDate(app.releaseDate)}
                        </AppReleaseDate>
                        <AppReviews
                          src={getReviewImageURL(
                            calculateReviewTitle(app.reviews)
                          )}
                        />
                        {!app.newPrice && (
                          <AppPrice>
                            {app.price}
                            {app.price === "Free to Play" ? "" : "$"}
                          </AppPrice>
                        )}
                        {app.newPrice && (
                          <PriceContainer className="New-Price">
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
                        )}
                      </AppTextContainer>
                    </AppContainer>
                  </AppLink>
                ))}
              </HomeAppsContainer>
            </>
          )}
        </ContentContainer>
      </MainContainer>
      <Footer />
    </>
  );
};
