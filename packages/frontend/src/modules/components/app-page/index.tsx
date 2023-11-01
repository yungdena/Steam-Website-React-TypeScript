import { useState, useEffect, useReducer } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";

import { ImageSlider } from "./swiper";
import { APP_KEYS } from "../../common/consts";
import { useUserData } from "../../common/context/user-context";
import { LoaderBig } from "../../common/loader/loader";
import { useGetAppById } from "../../common/services/apps.service";
import { useAddToLibrary, useAddToWishlist, useGetUserById } from "../../common/services/user.service";
import { IApp, IReview } from "../../common/types/app.interface";
import { calculateReviewTitle } from "../../common/utils/calculateReviewRate";
import { calculatePercentageDecrease } from "../../common/utils/countPercentage";
import { formatDate } from "../../common/utils/formatDate";
import { handleNavigate } from "../../common/utils/handleNavigate";
import { Header } from "../header";
import { FinalPrice, OriginalPrice, PriceAmounts, PriceContainer, PricePercent } from "../home/offers/index.styled";
import { AppPrice } from "../store/app-list/index.styled";
import { IUser } from "../../common/types/User";
import { AdditionalInfoContainer, Tag, AdditionalInfoDescription, AdditionalInfoDescriptionColumn, AdditionalInfoTitle, AdditionalInfoTitleColumn, AppTitle, BigInfoContainer, ImageContainer, InfoContainer, InfoWrapper, PageContainer, SmallInfoContainer, SmallInfoTextContainer, TagsContainer, TitleImage, Tags, PurchaseMenu, PurchaseTitle, ButtonWrapper, PurchaseButton, Background, QueueContainer, QueueButton, ReviewsContainer, Review, ReviewsTitle, ReviewLeftBlock, ReviewRightBlock, ReviewDescription, RecommendationContainer, RecommendationRate, RecommendationRateText, UserAvatar, UserName, OwnReviewContainer, AlreadyInLibrary, OwnReviewTitle, OwnReviewDescription, FormWrapper, StyledTextArea, RecommendButton, IconThumbsUp, IconThumbsDown, RecommendButtonsContainer, PostReviewButton, RecommendButtonWrapper, ButtonWithIcon } from "./index.styled";
import { Footer } from "../home/footer";
import { defaultAvatar } from "../../common/consts/avatar";
import { COLORS } from "../../common/theme";
import { usePostReview } from "../../common/services/reviews.service";

interface AppRouteParams {
  id: string;
}

export const AppPage = () => {
  const [app, setApp] = useState<IApp | null>(null)
  const [isLoading, setIsLoading] = useState(true);
  const [addedToLibrary, setAddedToLibrary] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [libraryIds, setLibraryIds] = useState<string[]>([]);
  const [userReviewed, setUserReviewed] = useState(true);
  const [descriptionError, setDescriptionError] = useState(null);
  const [isRecommended, setIsRecommended] = useState<boolean | null>(null);
  const [usersData, setUsersData] = useState<Record<string, IUser | null>>(
    {}
  );
  const UserDataContext = useUserData();
  const initialReviewData =
    UserDataContext && UserDataContext.userData
      ? {
          rate: true,
          description: "",
          user: UserDataContext.userData._id,
        }
      : {
          rate: true,
          description: "",
          user: "",
        };

  const [reviewData, setReviewData] =
    useState<Partial<IReview>>(initialReviewData);

  const postReviewMutation = usePostReview()
  const getAppByIdMutation = useGetAppById();
  const addToWishlistMutation = useAddToWishlist();
  const addToLibraryMutation = useAddToLibrary();
  const getUserByIdMutation = useGetUserById()
  const history = useHistory();
  const { id } = useParams<AppRouteParams>()

  const thumbUp = 'https://store.akamai.steamstatic.com/public/shared/images/userreviews/icon_thumbsUp_v6.png'
  const thumbDown = 'https://store.akamai.steamstatic.com/public/shared/images/userreviews/icon_thumbsDown_v6.png'

  const getUserDataById = async (userId: string) => {
    try {
      const userData = await getUserByIdMutation.mutateAsync(userId);
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const handleTextAreaChange = (e: any) => {
    const description = e.target.value;
    setReviewData((prevReviewData) => ({
      ...prevReviewData,
      description,
    }));
  };

  const handleRecommendClick = (isRecommended: boolean) => {
    setReviewData((prevReviewData) => ({
      ...prevReviewData,
      rate: isRecommended,
    }));
    setIsRecommended(isRecommended);
  };

  const handlePostReview = () => {
    if (!reviewData?.description?.trim()) {
      alert("Please enter a review description.");
      return;
    }

    const userReviewExists = app?.reviews.some(
      (review: IReview) => review.user === reviewData.user
    );

    if (userReviewExists) {
      alert("You have already posted a review.");
      return;
    }
    if (app && UserDataContext && UserDataContext.userData) {
        const data = {
          appId: app._id,
          userId: UserDataContext?.userData._id,
          reviewData: reviewData,
        }
        postReviewMutation.mutateAsync(data);
        setUserReviewed(true);
        alert("Review posted successfully");
    }
  };

  useEffect(() => {
    if (app?.reviews.some((review: IReview) => review.user === reviewData.user)) {
      setUserReviewed(true);
    } else {
      setUserReviewed(false);
    }
  }, [app])

  useEffect(() => {
    async function fetchReviewsData() {
      const reviewsData = app?.reviews || [];
      const usersDataPromises = reviewsData.map((review) =>
        getUserDataById(review.user)
      );

      try {
        const usersData = await Promise.all(usersDataPromises);
        const userDataMap: Record<string, IUser | null> = {};

        usersData.forEach((userData, index) => {
          userDataMap[reviewsData[index].user] = userData;
        });

        setUsersData(userDataMap);
      } catch (error) {
        console.error("Error fetching user data for reviews:", error);
      }
    }

    fetchReviewsData();
  }, [app]);

  useEffect(() => {
    async function fetchById() {
      const data = await getAppByIdMutation.mutateAsync(id);

      setApp(data);
      setIsLoading(false);

      if(!app) {
        return <Redirect to="/not-found" />;
      }
    }

    fetchById();
  }, []);

  useEffect(() => {
    async function getUsersLibrary() {
      if (UserDataContext?.userData?.apps.includes(id)) {
        setAddedToLibrary(true);
      }
    }

    getUsersLibrary();
  }, [libraryIds])

  useEffect(() => {
    async function getUsersWishlist() {
      if (UserDataContext?.userData?.wishlist.includes(id)) {
        setAddedToWishlist(true);
      }
    }

    getUsersWishlist();
  }, [wishlistIds]);

  const handleAddToWishlist = async () => {
    if (UserDataContext?.userData) {
      const appId = id;
      const userId = UserDataContext.userData._id;
      await addToWishlistMutation.mutateAsync({ userId, appId });
      setAddedToWishlist(true);

      if (UserDataContext?.userData) {
        const updatedUserData = { ...UserDataContext.userData } as IUser;
        updatedUserData.wishlist.push(appId);
        UserDataContext.setUser(updatedUserData);
      }
    } else {
      handleNavigate(
        history,
        APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.SIGNIN
      );
    }
  };

  const handleAddToLibrary = async () => {
    if (UserDataContext?.userData) {
      const appId = id;
      const userId = UserDataContext.userData._id;
      await addToLibraryMutation.mutateAsync({ userId, appId });
      setAddedToLibrary(true);

      if (UserDataContext?.userData) {
        const updatedUserData = { ...UserDataContext.userData } as IUser;
        updatedUserData.apps.push(appId);
        UserDataContext.setUser(updatedUserData);
      }
    } else {
      handleNavigate(
        history,
        APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.SIGNIN
      );
    }
  };

  return (
    <>
      <Background>
        <Header />
        <PageContainer>
          <InfoContainer>
            {isLoading ? (
              <LoaderBig marginTop="10rem" marginBottom="10rem" />
            ) : (
              <>
                {app && (
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
                            <AdditionalInfoTitle>
                              ALL REVIEWS
                            </AdditionalInfoTitle>
                            <AdditionalInfoTitle>
                              RELEASE DATE
                            </AdditionalInfoTitle>
                            <AdditionalInfoTitle>DEVELOPER</AdditionalInfoTitle>
                            <AdditionalInfoTitle>PUBLISHER</AdditionalInfoTitle>
                          </AdditionalInfoTitleColumn>
                          <AdditionalInfoDescriptionColumn>
                            <AdditionalInfoDescription
                              style={{
                                color: calculateReviewTitle(app?.reviews).color,
                              }}
                            >
                              {app?.reviews &&
                                calculateReviewTitle(app?.reviews).title}
                              ({app?.reviews.length})
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
                              <Tag key={tag}>{tag}</Tag>
                            ))}
                          </Tags>
                        </TagsContainer>
                      </SmallInfoContainer>
                    </InfoWrapper>
                  </>
                )}
              </>
            )}
          </InfoContainer>
          <QueueContainer>
            {addedToWishlist ? (
              <QueueButton
                onClick={handleNavigate(
                  history,
                  APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.WISHLIST
                )}
              >
                ✔ In Wishlist
              </QueueButton>
            ) : (
              <QueueButton onClick={handleAddToWishlist}>
                Add to your wishlist
              </QueueButton>
            )}
            <QueueButton
              onClick={handleNavigate(
                history,
                APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.STORE
              )}
            >
              Back to Store
            </QueueButton>
          </QueueContainer>
          {addedToLibrary && !userReviewed && (
            <>
              <AlreadyInLibrary>
                {app?.title} is already in your library
              </AlreadyInLibrary>
              <OwnReviewContainer>
                <OwnReviewTitle>Write a review for {app?.title}</OwnReviewTitle>
                <OwnReviewDescription>
                  Please describe what you liked or disliked about this game and
                  whether you recommend it to others.
                </OwnReviewDescription>
                <OwnReviewDescription>
                  Please remember to be polite and follow the Rules and
                  Guidelines.
                </OwnReviewDescription>
                <FormWrapper>
                  <UserAvatar
                    style={{
                      width: "92px",
                      height: "92px",
                      border: `1px solid ${COLORS.tagBlue}`,
                    }}
                    src={UserDataContext?.userData?.avatar}
                  />
                  <StyledTextArea
                    maxLength={2000}
                    onChange={handleTextAreaChange}
                  />
                </FormWrapper>
                <RecommendButtonsContainer>
                  Do you recommend this game?
                  <RecommendButtonWrapper>
                    <div>
                      <ButtonWithIcon
                        onClick={() => handleRecommendClick(true)}
                      >
                        <RecommendButton
                          style={
                            isRecommended ? { border: "1px solid #67c1f5" } : {}
                          }
                        >
                          <IconThumbsUp />
                          Yes
                        </RecommendButton>
                      </ButtonWithIcon>
                      <ButtonWithIcon
                        onClick={() => handleRecommendClick(false)}
                      >
                        <RecommendButton
                          style={
                            isRecommended ? {} : { border: "1px solid #67c1f5" }
                          }
                        >
                          <IconThumbsDown />
                          No
                        </RecommendButton>
                      </ButtonWithIcon>
                    </div>
                    <PostReviewButton onClick={handlePostReview}>
                      Post Review
                    </PostReviewButton>
                  </RecommendButtonWrapper>
                </RecommendButtonsContainer>
              </OwnReviewContainer>
            </>
          )}
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
                    -
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
              {addedToLibrary ? (
                <PurchaseButton
                  onClick={handleNavigate(
                    history,
                    APP_KEYS.ROUTER_KEYS.ROOT +
                      APP_KEYS.ROUTER_KEYS.LIBRARY +
                      "/" +
                      UserDataContext?.userData?._id
                  )}
                >
                  ✔ In Library
                </PurchaseButton>
              ) : (
                <PurchaseButton onClick={handleAddToLibrary}>
                  Add to Library
                </PurchaseButton>
              )}
            </ButtonWrapper>
          </PurchaseMenu>
          <ReviewsContainer>
            <ReviewsTitle>REVIEWS</ReviewsTitle>
            {app?.reviews.map((review) => (
              <Review key={review._id}>
                <ReviewLeftBlock>
                  {usersData[review.user] && usersData[review.user]?.avatar ? (
                    <UserAvatar src={usersData[review.user]?.avatar} />
                  ) : (
                    <UserAvatar src={defaultAvatar} />
                  )}
                  <UserName>{usersData[review.user]?.name}</UserName>
                </ReviewLeftBlock>
                <ReviewRightBlock>
                  <RecommendationContainer>
                    {review.rate === true ? (
                      <>
                        <RecommendationRate src={thumbUp} />
                        <RecommendationRateText>
                          Recommended
                        </RecommendationRateText>
                      </>
                    ) : (
                      <>
                        <RecommendationRate src={thumbDown} />
                        <RecommendationRateText>
                          Not Recommended
                        </RecommendationRateText>
                      </>
                    )}
                  </RecommendationContainer>
                  <ReviewDescription>{review.description}</ReviewDescription>
                </ReviewRightBlock>
              </Review>
            ))}
          </ReviewsContainer>
        </PageContainer>
      </Background>
      <Footer />
    </>
  );
}