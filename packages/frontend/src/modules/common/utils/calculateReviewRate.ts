import { IReview } from "../types/app.interface";

const reviewTitleColors = {
  "Overwhelmingly Positive": "#66C0F4",
  "Very Positive": "#66C0F4",
  "Mostly Positive": "#66C0F4",
  "Mixed": "#B9A074",
  "Mostly Negative": "#A34C25",
  "Overwhelmingly Negative": "#A34C25",
  "Very Negative": "#A34C25",
  "No Reviews": "gray",
};

export function calculateReviewTitle(reviews: IReview[]): {title: string, color: string} {
  if (reviews.length === 0) {
    return {
      title: "No reviews",
      color: reviewTitleColors["Overwhelmingly Positive"],
    };
  }

  const trueReviewsCount = reviews.filter(
    (review) => review.rate === true
  ).length;
  const percentage = (trueReviewsCount / reviews.length) * 100;

  switch (true) {
    case percentage >= 90:
      return {
        title: "Overwhelmingly Positive",
        color: reviewTitleColors["Overwhelmingly Positive"],
      };
    case percentage >= 80:
      return {
        title: "Very Positive",
        color: reviewTitleColors["Very Positive"],
      };
    case percentage >= 70:
      return {
        title: "Mostly Positive",
        color: reviewTitleColors["Mostly Positive"],
      };
    case percentage >= 40:
      return { title: "Mixed", color: reviewTitleColors["Mixed"] };
    case percentage >= 20:
      return {
        title: "Mostly Negative",
        color: reviewTitleColors["Mostly Negative"],
      };
    case percentage >= 5:
      return {
        title: "Overwhelmingly Negative",
        color: reviewTitleColors["Overwhelmingly Negative"],
      };
    default:
      return {
        title: "Very Negative",
        color: reviewTitleColors["Very Negative"],
      };
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
