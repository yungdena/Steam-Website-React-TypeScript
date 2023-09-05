export function formatDate(inputDate: string | undefined): string | undefined {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  if (inputDate) {
    const [year, month, day] = inputDate?.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString(undefined, options);
  }
}
