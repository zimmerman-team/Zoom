export function formatNumber(number) {
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

// Basically takes in a start year and an
// end year as an array and makes a string array of year between them
// including them both as well
export function formatYearParam(val) {
  // So here we will need to make an array of each year between the first
  // and last year received
  const yearArray = [];
  let currentYear = val[0];
  while (currentYear < val[1] + 1) {
    yearArray.push(currentYear.toString());
    currentYear += 1;
  }
  return yearArray;
}
