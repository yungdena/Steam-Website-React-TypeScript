import { useState, useEffect, Fragment } from "react";
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
  ContentContainer,
  ContentWrap,
  FeaturedTitle,
  MainBanner,
  MainContainer,
  StyledPagination,
  WishlistButton,
} from "./index.styled";
import { GameBannerComponent } from "./banner";
import { HomepageHeader } from "./home-header";
import { Footer } from "./footer";
import { Offers } from "./offers";
import { LoaderBig } from "../../common/loader/loader";
import { useAppsData } from "../../common/context/apps-context";
import { useBannersData } from "../../common/context/banners-context";
import { useUserData } from "../../common/context/user-context";
import SearchApps from "./search-dropdown";
import { IApp } from "../../common/types/app.interface";
import { DiscountDataProvider } from "../../common/context/discounts-context";
import { HomeMenu } from "./home-menu";
import { BigTags } from "./big-tags";
import { BigOffers } from "./offers/main-offers";
import { useGetAppsByTitle } from "../../common/services/apps.service";
import { HomeAppList } from "./home-apps-list";

export const HomePage = () => {
  const { isLoadingApps, appsData } = useAppsData();
  const [selectedApp, setSelectedApp] = useState<IApp | null>(null);
  const [searchedApps, setSearchedApps] = useState<IApp[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoadingBanners, bannersData } = useBannersData();
  const history = useHistory();
  const UserDataContext = useUserData();
  const getAppsByTitleMutation = useGetAppsByTitle();

  useEffect(() => {
    let isMounted = true;

    const setSelectedAppIdOnMount = async () => {
      if (isMounted) {
        setSelectedApp(appsData[0]);
      }
    };

    setSelectedAppIdOnMount();

    return () => {
      isMounted = false;
    };
  }, [appsData]);

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

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchedApps(null);
    } else {
      try {
        const response = await getAppsByTitleMutation.mutateAsync(query);
        if (Array.isArray(response)) {
          setSearchedApps(response)
        }
      } catch (error) {
        console.error("Error searching apps:", error);
      }
    }
  };

  const handleSelectApp = (app: IApp) => {
    setSelectedApp(app);
  };

  return (
    <>
      <Header />
      <MainBanner
        onClick={() => history.push("/apps/656069c3110b426928da8340")}
      />
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
            <HomepageHeader
              smallScreenMarginLeft="-60px"
              margin="6.5rem 0 0 55px"
              onSearch={handleSearch}
            />
            <SearchApps apps={searchedApps} searchQuery={searchQuery} />
            {isLoadingBanners ? (
              <LoaderBig marginTop="40rem" marginBottom="10rem" />
            ) : (
              <>
                <FeaturedTitle left="60px" top="33rem">
                  FEATURED & RECOMMENDED
                </FeaturedTitle>
                <Swiper
                  style={{ marginLeft: "0", marginTop: "21rem" }}
                  {...swiperParams}
                >
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
              <HomeAppList
                appsData={appsData}
                selectedApp={selectedApp}
                handleNavigateToApps={handleNavigateToApps}
                handleNavigate={handleNavigate}
                handleSelectApp={handleSelectApp}
              />
            )}
            <BigTags />
            <DiscountDataProvider>
              <BigOffers />
            </DiscountDataProvider>
          </ContentWrap>
        </ContentContainer>
      </MainContainer>
      <Footer />
    </>
  );
};
