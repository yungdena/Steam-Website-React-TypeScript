import { IApp } from "../../../common/types/app.interface";
import { calculatePercentageDecrease } from "../../../common/utils/countPercentage";

function getPriceValue(app: IApp): number {
  if (app.price === "Free to Play") {
    return 0.01;
  }

  const price = app.newPrice ? Number(app.newPrice) : Number(app.price);

  return isNaN(price) ? Number.MAX_VALUE : price;
}

export function sortAppsByLowestPrice(apps: IApp[]) {
  apps.sort((a, b) => {
    const priceA: number = getPriceValue(a);
    const priceB: number = getPriceValue(b);

    return priceA - priceB;
  });
}

export function sortAppsByHighestPrice(apps: IApp[]) {
  apps.sort((a, b) => {
    const priceA: number = getPriceValue(a);
    const priceB: number = getPriceValue(b);

    return priceB - priceA;
  });
}

export function sortAppsByReleaseDate(apps: IApp[]) {
  apps.sort((a, b) => {
    const dateA = new Date(a.releaseDate);
    const dateB = new Date(b.releaseDate);

    if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
      return dateB.getTime() - dateA.getTime();
    }

    return 0;
  });
}

export function sortAppsByName(apps: IApp[]) {
  apps.sort((a, b) => a.title.localeCompare(b.title));
}

export function sortAppsByReviews(apps: IApp[]) {
  apps.sort((a, b) => {
    const positiveReviewPercentageA =
      (a.reviews.filter((review) => review.rate === true).length /
        a.reviews.length) *
      100;

    const positiveReviewPercentageB =
      (b.reviews.filter((review) => review.rate === true).length /
        b.reviews.length) *
      100;

    return positiveReviewPercentageB - positiveReviewPercentageA;
  });
}

export function sortAppsByDiscount(apps: IApp[]) {
  apps.sort((a, b) => {
    // Parse the newPrice values as numbers
    const newPriceA = Number(a.newPrice);
    const newPriceB = Number(b.newPrice);

    // Calculate the percentage decrease
    const discountA = calculatePercentageDecrease(
      Number(a.price),
      newPriceA,
      0
    );
    const discountB = calculatePercentageDecrease(
      Number(b.price),
      newPriceB,
      0
    );

    // Sort in descending order (highest discount first)
    return discountB - discountA;
  });
}