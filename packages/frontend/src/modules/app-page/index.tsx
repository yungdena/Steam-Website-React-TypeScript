import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { APP_KEYS } from "../common/consts";
import { LoaderBig } from "../common/loader/loader";

import { useGetAppById } from "../common/services/apps.service";
import { useAddToLibrary, useAddToWishlist } from "../common/services/user.service";
import { IApp } from "../common/types/app.interface";
import { calculateReviewTitle } from "../common/utils/calculateReviewRate";
import { calculatePercentageDecrease } from "../common/utils/countPercentage";
import { formatDate } from "../common/utils/formatDate";
import { handleNavigate } from "../common/utils/handleNavigate";
import { Header } from "../header";
import { FinalPrice, OriginalPrice, PriceAmounts, PriceContainer, PricePercent } from "../home/offers/index.styled";
import { AppPrice } from "../store/app-list/index.styled";
import { AdditionalInfoContainer, Tag, AdditionalInfoDescription, AdditionalInfoDescriptionColumn, AdditionalInfoTitle, AdditionalInfoTitleColumn, AppTitle, BigInfoContainer, ImageContainer, InfoContainer, InfoWrapper, PageContainer, SmallInfoContainer, SmallInfoTextContainer, TagsContainer, TitleImage, Tags, PurchaseMenu, PurchaseTitle, ButtonWrapper, PurchaseButton, Background } from "./index.styled";
import { ImageSlider } from "./swiper";

interface AppRouteParams {
  id: string;
}

export const AppPage = () => {
  const [app, setApp] = useState<IApp>()
  const [isLoading, setIsLoading] = useState(true);
  const getAppByIdMutation = useGetAppById();
  const addToWishlistMutation = useAddToWishlist();
  const addToLibraryMutation = useAddToLibrary();
  const history = useHistory();

  const { id } = useParams<AppRouteParams>()
  
  useEffect(() => {
    async function fetchById() {
      const data = await getAppByIdMutation.mutateAsync(id);
      console.log("response on front: ", data);
      setApp(data);
      setIsLoading(false);
    }
    fetchById();
  }, []);

  const handleAddToWishlist = async () => {
    const user = localStorage.getItem(APP_KEYS.STORAGE_KEYS.ACCOUNT)
    if (user) {
      const appId = id;
      const userId = JSON.parse(user)._id;
      await addToWishlistMutation.mutateAsync({ userId, appId });
    } else {
      handleNavigate(history, APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.SIGNIN);
    }
  }

  const handleAddToLibrary = async () => {
    const user = localStorage.getItem(APP_KEYS.STORAGE_KEYS.ACCOUNT);
    if (user) {
      const appId = id;
      const userId = JSON.parse(user)._id;
      await addToLibraryMutation.mutateAsync({ userId, appId });
      console.log('App added successfully')
    } else {
      handleNavigate(history, APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.SIGNIN);
    }
  };

  return (
    <Background>
      <Header />
      <PageContainer>
        <InfoContainer>
          {isLoading ? (
            <LoaderBig marginTop="10rem" marginBottom="10rem" />
          ) : (
            <>
              <AppTitle>{app?.title}</AppTitle>
              <InfoWrapper>
                <BigInfoContainer>
                  <ImageSlider images={app?.imagesUrl} />
                </BigInfoContainer>
                <SmallInfoContainer>
                  <SmallInfoTextContainer>
                    <ImageContainer>
                      <TitleImage src={app?.titleImage} />
                    </ImageContainer>
                    {app?.description}
                  </SmallInfoTextContainer>
                  <AdditionalInfoContainer>
                    <AdditionalInfoTitleColumn>
                      <AdditionalInfoTitle>ALL REVIEWS</AdditionalInfoTitle>
                      <AdditionalInfoTitle>RELEASE DATE</AdditionalInfoTitle>
                      <AdditionalInfoTitle>DEVELOPER</AdditionalInfoTitle>
                      <AdditionalInfoTitle>PUBLISHER</AdditionalInfoTitle>
                    </AdditionalInfoTitleColumn>
                    <AdditionalInfoDescriptionColumn>
                      <AdditionalInfoDescription>
                        {app?.reviews && calculateReviewTitle(app?.reviews)} (
                        {app?.reviews.length})
                      </AdditionalInfoDescription>
                      <AdditionalInfoDescription>
                        {formatDate(app?.releaseDate)}
                      </AdditionalInfoDescription>
                      <AdditionalInfoDescription>
                        {app?.developer}
                      </AdditionalInfoDescription>
                      <AdditionalInfoDescription>
                        {app?.publisher}
                      </AdditionalInfoDescription>
                    </AdditionalInfoDescriptionColumn>
                  </AdditionalInfoContainer>
                  <TagsContainer>
                    <AdditionalInfoTitle>
                      Popular user-defined tags for this product:
                    </AdditionalInfoTitle>
                    <Tags>
                      {app?.tags.map((tag) => (
                        <Tag>{tag}</Tag>
                      ))}
                    </Tags>
                  </TagsContainer>
                </SmallInfoContainer>
              </InfoWrapper>
            </>
          )}
        </InfoContainer>
        <PurchaseMenu>
          <PurchaseTitle>
            {app?.price === "Free to Play"
              ? `Play ${app?.title}`
              : `Buy ${app?.title}`}
          </PurchaseTitle>
          <ButtonWrapper>
            {app?.newPrice ? (
              <PriceContainer className="New-Price">
                <PricePercent>
                  {calculatePercentageDecrease(
                    Number(app?.price),
                    Number(app?.newPrice),
                    0
                  )}
                  %
                </PricePercent>
                <PriceAmounts>
                  <OriginalPrice>{app?.price}$</OriginalPrice>
                  <FinalPrice>{app?.newPrice}$</FinalPrice>
                </PriceAmounts>
              </PriceContainer>
            ) : (
              <AppPrice className="appstore-prices">
                {app?.price}
                {app?.price === "Free to Play" ? "" : "$"}
              </AppPrice>
            )}
            <PurchaseButton onClick={handleAddToLibrary}>Add to Cart</PurchaseButton>
          </ButtonWrapper>
        </PurchaseMenu>
      </PageContainer>
    </Background>
  );
}