export function formatYearLabels(number, min, max) {
  if (number == min || number == max) {
    return number;
  }
  return String(number).slice(-2);
}
