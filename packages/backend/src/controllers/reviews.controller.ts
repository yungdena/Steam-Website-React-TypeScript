import { Request, Response } from "express";
import { IReview } from "../types/app.type";
import { ReviewsService } from "../services/reviews.service";

export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  async createReview(req: Request, res: Response) {
    const { appId, userId, reviewData } = req.body;

    try {
      const updatedReviews = await this.reviewService.createReview(
        appId,
        userId,
        reviewData
      );
      res.status(200).json(updatedReviews);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateReview(req: Request, res: Response) {
    const { appId, userId, reviewId } = req.body;
    const updatedReviewData: Partial<IReview> = req.body;

    try {
      const updatedReviews = await this.reviewService.updateReview(
        appId,
        userId,
        reviewId,
        updatedReviewData
      );
      res.status(200).json(updatedReviews);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteReview(req: Request, res: Response) {
    const { appId, userId, reviewId } = req.body;

    try {
      const updatedReviews = await this.reviewService.deleteReview(
        appId,
        userId,
        reviewId
      );
      res.status(200).json(updatedReviews);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

const reviewsController = new ReviewsController(new ReviewsService());
export default reviewsController;
