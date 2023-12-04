import { AnyObject, AnyObjectSchema } from "yup";
import { APP_KEYS } from "../../../common/consts";
import { IReview } from "../../../common/types/app.interface";
import { IUser } from "../../../common/types/User";
import { handleNavigate } from "../../../common/utils/handleNavigate";

export const getUserDataById = async (userId: string, getUserByIdMutation: any) => {
  try {
    const userData = await getUserByIdMutation.mutateAsync(userId);
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const handleTextAreaChange = (e: any, setReviewData: any) => {
  const description = e.target.value;
  setReviewData((prevReviewData: any) => ({
    ...prevReviewData,
    description,
  }));
};

export const handleRecommendClick = (isRecommended: boolean, setReviewData: any, setIsRecommended: any) => {
  setReviewData((prevReviewData: AnyObject) => ({
    ...prevReviewData,
    rate: isRecommended,
  }));
  setIsRecommended(isRecommended);
};

export const handlePostReview = (
  UserDataContext: any,
  reviewData: any,
  setDescriptionError: any,
  postReviewMutation: any,
  app: any,
  setUserReviewed: any,
  setApp: any
) => {
  if (!reviewData?.description?.trim()) {
    setDescriptionError("Please enter a review description.");
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
    };
    postReviewMutation.mutateAsync(data);
    setUserReviewed(true);
    const newReview = {
      ...reviewData,
      user: UserDataContext?.userData._id,
    };
    const updatedApp = {
      ...app,
      reviews: [...app.reviews, newReview],
    };
    setApp(updatedApp)
  }
};

export const handleUpdateReview = (
  UserDataContext: any,
  reviewData: any,
  setDescriptionError: any,
  updateReviewMutation: any,
  app: any,
  setUserReviewed: any,
  setApp: any
) => {
  if (!reviewData?.description?.trim()) {
    setDescriptionError("Please enter a review description.");
    return;
  }

  const userReviewExists = app?.reviews.some(
    (review: IReview) => review.user === UserDataContext.userData._id
  );

  if (!userReviewExists) {
    setDescriptionError("You haven't posted a review yet.");
    return;
  }

  if (app && UserDataContext && UserDataContext.userData) {
    try {
      const userReviewIndex = app.reviews.findIndex(
        (review: IReview) => review.user === UserDataContext.userData._id
      );

      const updatedApp = { ...app };

      updatedApp.reviews = [
        ...updatedApp.reviews.slice(0, userReviewIndex),
        {
          ...app.reviews[userReviewIndex],
          ...reviewData,
          user: UserDataContext.userData._id,
        },
        ...updatedApp.reviews.slice(userReviewIndex + 1),
      ];

      updateReviewMutation.mutateAsync({
        appId: app._id,
        userId: UserDataContext.userData._id,
        reviewId: app.reviews[userReviewIndex]._id,
        updatedReviewData: reviewData,
      });

      setApp(updatedApp);

      setUserReviewed(true);
  } catch (error) {
      console.error("Error updating review:", error);
    }
}
}

export const handleDeleteReview = (
  UserDataContext: any,
  reviewData: any,
  setDescriptionError: any,
  deleteReviewMutation: any,
  app: any,
  setApp: any
) => {
  const userReviewExists = app?.reviews.some(
    (review: IReview) => review.user === UserDataContext.userData._id
  );

  if (!userReviewExists) {
    setDescriptionError("You haven't posted a review yet.");
    return;
  }

  if (app && UserDataContext && UserDataContext.userData && reviewData._id) {
    const data = {
      appId: app._id,
      userId: UserDataContext?.userData._id,
      reviewId: reviewData._id,
    };

    deleteReviewMutation.mutateAsync(data);
    const updatedReviews = app.reviews.filter(
      (review: IReview) => review._id !== reviewData._id
    );

    const updatedApp = {
      ...app,
      reviews: updatedReviews,
    };

    setApp(updatedApp);
  }
};

export const handleAddToWishlist = async (
  UserDataContext: any,
  addToWishlistMutation: any,
  setAddedToWishlist: any,
  id: string,
  history: any
) => {
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
    history.push(APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.SIGNIN);
  }
};
export const handleAddToLibrary = async (UserDataContext: any, addToLibraryMutation: any, setAddedToLibrary: any, id: string, history: any) => {
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
