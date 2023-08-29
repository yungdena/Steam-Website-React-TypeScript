export function calculatePercentageDecrease(
  oldPrice: number,
  newPrice: number,
  decimalPlaces: number
): number {
  if (oldPrice === 0) {
    throw new Error("Old price cannot be zero.");
  }

  const decrease = ((oldPrice - newPrice) / oldPrice) * 100;
  const roundedDecrease =
    Math.round(decrease * Math.pow(10, decimalPlaces)) /
    Math.pow(10, decimalPlaces);
  return roundedDecrease;
}
