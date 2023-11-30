import { useState, useEffect, useReducer } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";

import { ImageSlider } from "./swiper";
import { APP_KEYS } from "../../common/consts";
import { useUserData } from "../../common/context/user-context";
import { LoaderBig } from "../../common/loader/loader";
import { useGetAppById } from "../../common/services/apps.service";
import { useAddToLibrary, useAddToWishlist, useGetLibrary, useGetUserById, useGetWishlist } from "../../common/services/user.service";
import { IApp, IReview } from "../../common/types/app.interface";
import { calculateReviewTitle } from "../../common/utils/calculateReviewRate";
import { calculatePercentageDecrease } from "../../common/utils/countPercentage";
import { formatDate } from "../../common/utils/formatDate";
import { handleNavigate } from "../../common/utils/handleNavigate";
import { Header } from "../header";
import { FinalPrice, OriginalPrice, PriceAmounts, PriceContainer, PricePercent } from "../home/offers/index.styled";
import { AppPrice } from "../store/app-list/index.styled";
import { IUser } from "../../common/types/User";
import { AdditionalInfoContainer, Tag, AdditionalInfoDescription, AdditionalInfoDescriptionColumn, AdditionalInfoTitle, AdditionalInfoTitleColumn, AppTitle, BigInfoContainer, ImageContainer, InfoContainer, InfoWrapper, PageContainer, SmallInfoContainer, SmallInfoTextContainer, TagsContainer, TitleImage, Tags, PurchaseMenu, PurchaseTitle, ButtonWrapper, PurchaseButton, Background, QueueContainer, QueueButton, ReviewsContainer, Review, ReviewsTitle, ReviewLeftBlock, ReviewRightBlock, ReviewDescription, RecommendationContainer, RecommendationRate, RecommendationRateText, UserAvatar, UserName, OwnReviewContainer, AlreadyInLibrary, OwnReviewTitle, OwnReviewDescription, FormWrapper, StyledTextArea, RecommendButton, IconThumbsUp, IconThumbsDown, RecommendButtonsContainer, PostReviewButton, RecommendButtonWrapper, ButtonWithIcon, EditIcon } from "./index.styled";
import { Footer } from "../home/footer";
import { defaultAvatar } from "../../common/consts/avatar";
import { COLORS } from "../../common/theme";
import { useDeleteReview, usePostReview, useUpdateReview } from "../../common/services/reviews.service";
import { getUserDataById, handleAddToLibrary, handleAddToWishlist, handleDeleteReview, handlePostReview, handleRecommendClick, handleTextAreaChange, handleUpdateReview } from "./utils/functions";

interface AppRouteParams {
  id: string;
}

export const AppPage = () => {
  const [app, setApp] = useState<IApp | null>(null)
  const [isLoading, setIsLoading] = useState(true);
  const [addedToLibrary, setAddedToLibrary] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [userReviewed, setUserReviewed] = useState(true);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [isRecommended, setIsRecommended] = useState<boolean>(true);
  const [reviewDataIdChanged, setReviewDataIdChanged] = useState(false);
  const [usersData, setUsersData] = useState<Record<string, IUser | null>>(
    {}
  );
  const [userLibraryData, setUserLibraryData] = useState<IApp[] | null>(null);
  const [userWishlistData, setUserWishlistData] = useState<IApp[] | null>(null);

  const UserDataContext = useUserData();
  const initialReviewData =
    UserDataContext && UserDataContext.userData
      ? {
          rate: true,
          description: "",
          user: UserDataContext.userData._id,
          _id: ""
        }
      : {
          rate: true,
          description: "",
          user: "",
          _id: ""
        };

  const [reviewData, setReviewData] =
    useState<Partial<IReview>>(initialReviewData);

  const postReviewMutation = usePostReview();
  const updateReviewMutation = useUpdateReview();
  const deleteReviewMutation = useDeleteReview();
  const getAppByIdMutation = useGetAppById();
  const addToWishlistMutation = useAddToWishlist();
  const addToLibraryMutation = useAddToLibrary();
  const getUserByIdMutation = useGetUserById();
  const getLibraryMutation = useGetLibrary();
  const getWishlistMutation = useGetWishlist();
  const history = useHistory();
  const { id } = useParams<AppRouteParams>()

  const thumbUp = 'https://store.akamai.steamstatic.com/public/shared/images/userreviews/icon_thumbsUp_v6.png'
  const thumbDown = 'https://store.akamai.steamstatic.com/public/shared/images/userreviews/icon_thumbsDown_v6.png'

  useEffect(() => {
    if (app) {
      const hasUserReviewed = app.reviews.some(
        (review) => review.user === UserDataContext?.userData?._id
      );

      setUserReviewed(hasUserReviewed);
    }
  }, [app]);

  useEffect(() => {
    async function fetchReviewsData() {
      const reviewsData = app?.reviews || [];
      const usersDataPromises = reviewsData.map((review) =>
        getUserDataById(review.user, getUserByIdMutation)
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
      try {
        const data = await getAppByIdMutation.mutateAsync(id);
        setApp(data);
      } catch (error) {
        console.error("Error fetching app data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchById();
  }, []);

  useEffect(() => {
    const fetchLibraryData = async () => {
      if (UserDataContext?.userData) {
        const userId = UserDataContext.userData._id;
        try {
          const libraryData = await getLibraryMutation.mutateAsync(userId);
          const wishlistData = await getWishlistMutation.mutateAsync(userId);
          if (libraryData && libraryData.library) {
            setUserLibraryData(libraryData.library);
          }

          if (wishlistData && wishlistData.wishlist) {
            setUserWishlistData(wishlistData.wishlist);
          }
        } catch (error) {
          console.error("Error fetching user's library/wishlist:", error);
        }
      }
    };

    fetchLibraryData();
    
  }, [UserDataContext?.userData]);

  useEffect(() => {
    const isAppInLibrary = userLibraryData?.some((app) => app._id === id);
    const isAppInWishlist = userWishlistData?.some((app) => app._id === id);
    if (isAppInLibrary) {
      setAddedToLibrary(true);
    }

    if (isAppInWishlist) {
      setAddedToWishlist(true);
    }
    
  }, [userLibraryData, userWishlistData, id]);

  useEffect(() => {
    if (reviewDataIdChanged) {
      handleDeleteReview(UserDataContext, reviewData, setDescriptionError, deleteReviewMutation, app, setApp);
      setReviewDataIdChanged(false);
    }
    
  }, [reviewDataIdChanged]);

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
                              <Tag
                                onClick={() =>
                                  history.push(
                                    "/" +
                                      APP_KEYS.ROUTER_KEYS.STORE +
                                      "/" +
                                      `?tags=${tag}`
                                  )
                                }
                                key={tag}
                              >
                                {tag}
                              </Tag>
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
              <QueueButton
                onClick={() =>
                  handleAddToWishlist(
                    UserDataContext,
                    addToWishlistMutation,
                    setAddedToWishlist,
                    app?._id
                  )
                }
              >
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
                    src={UserDataContext?.userData?.avatar || defaultAvatar}
                  />
                  <StyledTextArea
                    maxLength={2000}
                    onChange={(event) =>
                      handleTextAreaChange(event, setReviewData)
                    }
                  />
                </FormWrapper>
                <RecommendButtonsContainer>
                  Do you recommend this game?
                  <RecommendButtonWrapper>
                    <div>
                      <ButtonWithIcon
                        onClick={() =>
                          handleRecommendClick(
                            true,
                            setReviewData,
                            setIsRecommended
                          )
                        }
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
                        onClick={() =>
                          handleRecommendClick(
                            false,
                            setReviewData,
                            setIsRecommended
                          )
                        }
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
                    {descriptionError && <div>{descriptionError}</div>}
                    {UserDataContext?.userData?._id &&
                    Object.keys(usersData).includes(
                      UserDataContext?.userData?._id
                    ) ? (
                      <PostReviewButton
                        style={{ padding: "1px" }}
                        onClick={() =>
                          handleUpdateReview(
                            UserDataContext,
                            reviewData,
                            setDescriptionError,
                            updateReviewMutation,
                            app,
                            setUserReviewed,
                            setApp
                          )
                        }
                      >
                        Update Review
                      </PostReviewButton>
                    ) : (
                      <PostReviewButton
                        onClick={() =>
                          handlePostReview(
                            UserDataContext,
                            reviewData,
                            setDescriptionError,
                            postReviewMutation,
                            app,
                            setUserReviewed,
                            setApp
                          )
                        }
                      >
                        Post Review
                      </PostReviewButton>
                    )}
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
                <PurchaseButton
                  onClick={() =>
                    handleAddToLibrary(
                      UserDataContext,
                      addToLibraryMutation,
                      setAddedToLibrary,
                      app?._id
                    )
                  }
                >
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
                  {review.user === UserDataContext?.userData?._id && (
                    <RecommendButtonWrapper>
                      <EditIcon
                        onClick={() => {
                          setReviewData({ ...reviewData, _id: review._id });
                          setReviewDataIdChanged(true);
                        }}
                        style={{ border: "2px solid #ba1717", right: "4rem" }}
                        src="https://res.cloudinary.com/didkbrlcz/image/upload/v1699083179/trashcan-svgrepo-com_1_r7kydk.svg"
                      />
                      <EditIcon
                        onClick={() => {
                          setReviewData({ ...reviewData, _id: review._id });
                          setUserReviewed(false);
                        }}
                        src="https://res.cloudinary.com/didkbrlcz/image/upload/v1699078605/pencil-svgrepo-com_1_okyevu.svg"
                      />
                    </RecommendButtonWrapper>
                  )}
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