import sortBy from 'lodash/sortBy';

export function formatNumber(number) {
  return number
    ? number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    : '0';
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

// function specifically made for the year selector
// cause it requires years as an array of numbers
// where graphql needs it to be a string
// so this basically reformats the string to an array
export function yearStrToArray(yearRange) {
  const startYear = parseInt(
    yearRange.substring(0, yearRange.indexOf(',')),
    10
  );
  const endYear = parseInt(yearRange.substring(yearRange.indexOf(',') + 1), 10);
  return [startYear, endYear];
}

export function paginate(
  initialListData,
  pageSize = 10,
  page,
  sort,
  reverse = false
) {
  const sortedList = reverse
    ? sortBy(initialListData, [
        item => (sort.includes('date') ? item[sort] : item[sort].toLowerCase())
      ]).reverse()
    : sortBy(initialListData, [
        item => {
          return item[sort] !== ''
            ? sort.includes('date')
              ? item[sort]
              : item[sort].toLowerCase()
            : 'zzz';
        }
      ]);

  const sliceTo =
    pageSize * (page + 1) > sortedList.length
      ? sortedList.length
      : pageSize * (page + 1);

  return sortedList.slice(pageSize * page, sliceTo);
}

// basically converts a string array to array
// NOTE: this is not for JSON strings
// this string arr would look something like
// "['element', 'element2']"
// and that ^ cannot be parsed using JSON parse
export function convertStringArrToArr(stringArr) {
  // so first we just remove the brackets arround the array
  let cleanString = stringArr.substring(
    stringArr.indexOf('[') + 1,
    stringArr.lastIndexOf(']')
  );

  // now we remove the "'" character
  cleanString = cleanString.replace(/'/g, '');

  return cleanString.split(',');
}

// so this basically will shorten the text and
// add an ellipsis at the end the javascript way
// cause a proper css aproach or library approach
// doesn't work with these tooltips of ours
// and we chose 440 cause it looks the nicest with
// max 440 characters in the text
export function truncateText(text) {
  let newText = text;

  if (newText.length > 440) {
    newText = newText.substring(0, 440).concat('...');
  }

  return newText;
}
