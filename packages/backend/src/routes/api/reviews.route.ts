import { Router } from "express";
import reviewsController from "../../controllers/reviews.controller"; 

const reviewsRouter: Router = Router();

reviewsRouter.post(
  "/",
  reviewsController.createReview.bind(reviewsController)
);

reviewsRouter.patch(
  "/",
  reviewsController.updateReview.bind(reviewsController)
);

reviewsRouter.delete(
  "/",
  reviewsController.deleteReview.bind(reviewsController)
);

export default reviewsRouter;
