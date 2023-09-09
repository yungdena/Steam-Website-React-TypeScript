export function formatDate(inputDate: string | undefined): string | undefined {
  if (inputDate) {
    const [year, month, day] = inputDate.split("-").map(Number);
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const formattedDate = `${day} ${months[month - 1]}, ${year}`;
    return formattedDate;
  }
}
