import { IApp, IReview } from "../types/app.type";
import { AppModel } from "../models/App";

class ReviewService {
  async createReview(appId: string, userId: string, reviewData: IReview) {
    const app = await AppModel.findById(appId);

    if (!app) {
      throw new Error("App not found");
    }

    const existingReview = app.reviews.find(
      (review) => review.user.toString() === userId
    );

    if (existingReview) {
      throw new Error("You have already reviewed this app");
    }

    const newReview: IReview = {
      rate: reviewData.rate,
      description: reviewData.description,
      user: userId,
    };

    app.reviews.push(newReview);

    await app.save();

    return app.reviews;
  }

  async updateReview(
    appId: string,
    userId: string,
    reviewId: string,
    updatedReviewData: Partial<IReview>
  ) {
    const app = await AppModel.findById(appId);

    if (!app) {
      throw new Error("App not found");
    }

    const reviewIndex = app.reviews.findIndex(
      (review: IReview & { _id?: string }) =>
        review.user.toString() === userId &&
        review._id && review._id.toString() === reviewId
    );

    if (reviewIndex === -1) {
      throw new Error(
        "Review not found or you are not authorized to update it"
      );
    }

    const updatedReview = {
      ...app.reviews[reviewIndex],
      ...updatedReviewData,
    };

    app.reviews[reviewIndex] = updatedReview;

    await app.save();

    return app.reviews;
  }

  async deleteReview(appId: string, userId: string, reviewId: string) {
    const app = await AppModel.findById(appId);

    if (!app) {
      throw new Error("App not found");
    }

    const reviewIndex = app.reviews.findIndex(
      (review: IReview & { _id?: string }) =>
        review._id && review._id.toString() === reviewId &&
        review.user.toString() === userId
    );

    if (reviewIndex === -1) {
      throw new Error(
        "Review not found or you are not authorized to delete it"
      );
    }

    app.reviews.splice(reviewIndex, 1);

    await app.save();

    return app.reviews;
  }
}

export default new ReviewService();
