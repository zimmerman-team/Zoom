export function formatErrorColumns(typesString, ignoredErrors = []) {
  const errorColumns = [];

  const types = JSON.parse(JSON.parse(typesString));

  console.log('types', types);

  // weird data formatting commencing
  Object.keys(types).forEach(key => {
    // so the element at index 1
    // indicates how many types are in a column
    // and if there are more than one type
    // the cells in this column will be treated as errors
    // also if its in the ignoredErrors, we don't add it to the error column
    if (
      types[key][1].length > 1 &&
      ignoredErrors.indexOf(types[key][0]) === -1
    ) {
      // and at index 0 we have the columns name, so we push it in
      errorColumns.push(types[key][0]);
    }
  });

  console.log('errorColumns', errorColumns);

  return errorColumns;
}
