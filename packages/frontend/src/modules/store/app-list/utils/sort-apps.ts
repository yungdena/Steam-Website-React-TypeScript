import { IApp } from "../../../common/types/app.interface";

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
      a.reviews.filter((review) => review.rate === true).length /
      a.reviews.length;

    const positiveReviewPercentageB =
      b.reviews.filter((review) => review.rate === false).length /
      b.reviews.length;

    return positiveReviewPercentageB - positiveReviewPercentageA;
  });
}