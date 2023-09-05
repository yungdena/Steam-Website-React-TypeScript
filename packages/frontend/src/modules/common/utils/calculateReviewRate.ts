import { IReview } from "../types/app.interface";

export function calculateReviewTitle(reviews: IReview[]): string {
  if (reviews.length === 0) {
    return "No Reviews";
  }

  const trueReviewsCount = reviews.filter(
    (review) => review.rate === true
  ).length;
  const percentage = (trueReviewsCount / reviews.length) * 100;

  switch (true) {
    case percentage >= 90:
      return "Overwhelmingly Positive";
    case percentage >= 80:
      return "Very Positive";
    case percentage >= 70:
      return "Mostly Positive";
    case percentage >= 40:
      return "Mixed";
    case percentage >= 20:
      return "Mostly Negative";
    case percentage >= 5:
      return "Overwhelmingly Negative";
    default:
      return "Very Negative";
  }
}

export function getReviewImageURL(reviewTitle: string): string {
  switch (reviewTitle) {
    case "Overwhelmingly Positive":
    case "Very Positive":
    case "Mostly Positive":
      return "https://res.cloudinary.com/didkbrlcz/image/upload/v1693885323/System/user_reviews_positive_nql1ar.png";
    case "Mixed":
      return "https://res.cloudinary.com/didkbrlcz/image/upload/v1693885323/System/user_reviews_mixed_lntzax.png";
    case "Overwhelmingly Negative":
    case "Very Negative":
    case "Mostly Negative":
      return "https://res.cloudinary.com/didkbrlcz/image/upload/v1693885323/System/user_reviews_negative_su0ppc.png";
    default:
      return "";
  }
}
