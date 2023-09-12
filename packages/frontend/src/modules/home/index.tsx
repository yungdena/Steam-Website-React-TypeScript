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
  WishlistButton,
} from "./index.styled";
import { GameBannerComponent } from "./banner";
import { HomepageHeader } from "./home-header";
import { useGetAllBanners } from "../common/services/banners.service";
import { Footer } from "./footer";
import { Offers } from "./offers";
import { LoaderBig } from "../common/loader/loader";
import { AppContainer, AppImage, AppImageContainer, AppLink, AppPrice, AppReleaseDate, AppReviews, AppTextContainer, AppTitle } from "../store/app-list/index.styled";
import { FinalPrice, OriginalPrice, PriceAmounts, PriceContainer, PricePercent } from "./offers/index.styled";
import { calculatePercentageDecrease } from "../common/utils/countPercentage";
import { calculateReviewTitle, getReviewImageURL } from "../common/utils/calculateReviewRate";
import { formatDate } from "../common/utils/formatDate";
import { useGetWishlist } from "../common/services/user.service";
import { useAppsData } from "../common/context/apps-context";

export const HomePage = () => {
  const [banners, setBanners] = useState<IApp[]>([]);
  const [isLoadingBanners, setIsLoadingBanners] = useState(true);
  const [wishlishLength, setWishlishLength] = useState(0);
  const { isLoadingApps, appsData } = useAppsData();
  const getAllBannersMutation = useGetAllBanners();
  const history = useHistory();
  const getWishlistMutation = useGetWishlist();

  const apps = appsData;
  const user = localStorage.getItem('account');

  useEffect(() => {
    async function fetchAllBanners() {
      const data = await getAllBannersMutation.mutateAsync();
      setBanners(data);
      setIsLoadingBanners(false);
    }
    async function getUsersWishlistLength() {  
      if (user) {
        const id = JSON.parse(user)._id;
        const wishlistResponse = await getWishlistMutation.mutateAsync(id);
        const wishlist = wishlistResponse.wishlist;
        setWishlishLength(wishlist.length)
      }
    };

    getUsersWishlistLength();
    fetchAllBanners();
  }, []);

  console.log('apps: ', apps)
  const renderApps = !isLoadingApps && apps.length > 0;

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

  return (
    <>
      <Header />
      <MainContainer>
        <ContentContainer>
          <WishlistButton
            onClick={() =>
              history.push(
                `${APP_KEYS.ROUTER_KEYS.ROOT}${APP_KEYS.ROUTER_KEYS.WISHLIST}`
              )
            }
          >
            Wishlist ({wishlishLength})
          </WishlistButton>
          <HomepageHeader />
          {isLoadingBanners ? (
            <LoaderBig marginTop="10rem" />
          ) : (
            <>
              <FeaturedTitle left="60px" top="190px">
                FEATURED & RECOMMENDED
              </FeaturedTitle>
              <Swiper {...swiperParams}>
                {banners.map((banner) => (
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
            <LoaderBig marginTop="30rem" />
          ) : (
            <Offers appsArray={apps} />
          )}

          {isLoadingApps ? (
            <LoaderBig marginTop="20rem" marginBottom="10rem" />
          ) : (
            <>
              <AppsLine>
                <FeaturedTitle left="0" top="-20px">
                  Top Sellers
                </FeaturedTitle>
                <FeaturedButton onClick={handleNavigateToApps}>
                  To apps
                </FeaturedButton>
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
                            calculateReviewTitle(app.reviews).title
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
