import { IApp, IReview } from "../types/app.type";
import { AppModel } from "../models/App";

export class ReviewsService {
  async createReview(appId: string, userId: string, reviewData: IReview) {
    const app = await AppModel.findById(appId);

    if (!app) {
      throw new Error("App not found");
    }

    const existingReview = app.reviews.find(
      (review) => review.user && review.user.toString() === userId
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
    updatedReviewData: any
  ) {
    const app = await AppModel.findById(appId);

    if (!app) {
      throw new Error("App not found");
    }

    const reviewIndex = app.reviews.findIndex(
      (review: IReview & { _id?: string }) => {
        if (
          review.user &&
          review.user.toString() === userId &&
          review._id &&
          review._id.toString() === reviewId
        ) {
          return true;
        }
        return false;
      }
    );

    if (reviewIndex === -1) {
      throw new Error(
        "Review not found or you are not authorized to update it"
      );
    }

    const updatedReview = app.reviews[reviewIndex];
    if (updatedReviewData.reviewData.rate !== undefined) {
      updatedReview.rate = updatedReviewData.reviewData.rate;
    }
    if (updatedReviewData.reviewData.description !== undefined) {
      updatedReview.description = updatedReviewData.reviewData.description;
    }

    app.reviews[reviewIndex] = updatedReview;
    console.log(updatedReviewData);
    console.log(app.reviews[reviewIndex]);
    await app.save();

    return updatedReview;
  }

  async deleteReview(appId: string, userId: string, reviewId: string) {
    const app = await AppModel.findById(appId);

    if (!app) {
      throw new Error("App not found");
    }

    const reviewIndex = app.reviews.findIndex(
      (review: IReview & { _id?: string }) =>
        review._id &&
        review._id.toString() === reviewId &&
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

