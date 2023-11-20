import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { APP_KEYS } from "../../common/consts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";

import { Header } from "../header";
import {
  AppContainer,
  AppImage,
  AppNewPrice,
  AppOldPrice,
  AppPrice,
  AppPriceContainer,
  AppsLine,
  AppTags,
  AppTitle,
  ContentContainer,
  ContentWrap,
  FeaturedButton,
  FeaturedTitle,
  HomeAppsContainer,
  MainBanner,
  MainContainer,
  PricePercent,
  PriceWrapper,
  StyledPagination,
  WishlistButton,
} from "./index.styled";
import { GameBannerComponent } from "./banner";
import { HomepageHeader } from "./home-header";
import { Footer } from "./footer";
import { Offers } from "./offers";
import { LoaderBig } from "../../common/loader/loader";
import { AppLink } from "../store/app-list/index.styled";
import { useAppsData } from "../../common/context/apps-context";
import { useBannersData } from "../../common/context/banners-context";
import { useUserData } from "../../common/context/user-context";
import SearchApps from "./search-dropdown";
import { IApp } from "../../common/types/app.interface";
import { DiscountDataProvider } from "../../common/context/discounts-context";
import { HomeMenu } from "./home-menu";
import { calculatePercentageDecrease } from "../../common/utils/countPercentage";

export const HomePage = () => {
  const [filteredApps, setFilteredApps] = useState<IApp[] | null>(null)
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoadingApps, appsData } = useAppsData();
  const { isLoadingBanners, bannersData } = useBannersData();
  const history = useHistory();
  const UserDataContext = useUserData();

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
    console.log('handleNavigate', appId);
    history.push(
      `${APP_KEYS.ROUTER_KEYS.ROOT}${APP_KEYS.ROUTER_KEYS.APPS}/${appId}`
    );
  };

  const handleNavigateToApps = () => {
    history.push(
      `${APP_KEYS.ROUTER_KEYS.ROOT}${APP_KEYS.ROUTER_KEYS.STORE}`
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filteredApps = appsData.filter((app) =>
      app.title.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredApps(filteredApps);
  };

  return (
    <>
      <Header />
      <MainBanner />
      <MainContainer>
        <ContentContainer>
          <HomeMenu />
          <ContentWrap>
            <WishlistButton
              onClick={() =>
                history.push(
                  `${APP_KEYS.ROUTER_KEYS.ROOT}${APP_KEYS.ROUTER_KEYS.WISHLIST}`
                )
              }
            >
              Wishlist ({UserDataContext?.userData?.wishlist.length})
            </WishlistButton>
            <HomepageHeader onSearch={handleSearch} />
            <SearchApps apps={filteredApps} searchQuery={searchQuery} />
            {isLoadingBanners ? (
              <LoaderBig marginTop="40rem" marginBottom="10rem" />
            ) : (
              <>
                <FeaturedTitle left="60px" top="33rem">
                  FEATURED & RECOMMENDED
                </FeaturedTitle>
                <Swiper style={{ marginTop: "21rem" }} {...swiperParams}>
                  {bannersData.map((banner) => (
                    <SwiperSlide key={banner._id} className="banner-slide">
                      <GameBannerComponent
                        onClick={handleNavigateToApps}
                        appInfo={banner}
                      />
                    </SwiperSlide>
                  ))}
                  <StyledPagination>
                    <div className="swiper-pagination"></div>
                  </StyledPagination>
                </Swiper>
              </>
            )}
            {isLoadingApps ? (
              <LoaderBig marginTop="20rem" marginBottom="10rem" />
            ) : (
              <DiscountDataProvider>
                <Offers />
              </DiscountDataProvider>
            )}

            {isLoadingApps ? (
              <LoaderBig marginTop="10rem" marginBottom="10rem" />
            ) : (
              <>
                <AppsLine>
                  <FeaturedTitle left="-125px" top="-30px">
                    Top Sellers
                  </FeaturedTitle>
                  <FeaturedButton onClick={handleNavigateToApps}>
                    To apps
                  </FeaturedButton>
                </AppsLine>
                <HomeAppsContainer>
                  {appsData.slice(0, 10).map((app) => (
                    <AppLink
                      key={app._id}
                      onClick={() => handleNavigate(app._id)}
                    >
                      <AppContainer>
                        <AppImage src={app.bannerImage} />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <AppTitle>{app.title}</AppTitle>
                          <AppTags>
                            {app.tags.map((tag, index) => (
                              <>
                                <span>{tag}</span>
                                {index < app.tags.length - 1 && <span>, </span>}
                              </>
                            ))}
                          </AppTags>
                        </div>
                        {!app.newPrice && (
                          <AppPrice>
                            {app.price}
                            {app.price === "Free to Play" ? "" : "$"}
                          </AppPrice>
                        )}
                        {app.newPrice && (
                          <PriceWrapper>
                            <PricePercent style={{ marginLeft: "4px" }}>
                              -
                              {calculatePercentageDecrease(
                                Number(app.price),
                                Number(app.newPrice),
                                0
                              )}
                              %
                            </PricePercent>
                            <AppPriceContainer>
                              <AppOldPrice>{app.price}$</AppOldPrice>
                              <AppNewPrice>{app.newPrice}$</AppNewPrice>
                            </AppPriceContainer>
                          </PriceWrapper>
                        )}
                      </AppContainer>
                    </AppLink>
                  ))}
                </HomeAppsContainer>
              </>
            )}
          </ContentWrap>
        </ContentContainer>
      </MainContainer>
      <Footer />
    </>
  );
};
