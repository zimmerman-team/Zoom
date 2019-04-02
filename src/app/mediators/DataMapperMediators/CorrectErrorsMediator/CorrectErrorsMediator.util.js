import findIndex from 'lodash/findIndex';

// so here we need to form the errorCell array for the current cells/data
// that is shown in the table, we'll use the actual data
// get the row indexes that are shown in the UI
export function formatErrorCells(
  errorData,
  columnHeaders,
  data,
  replacedColumn = null
) {
  const errorCells = [];

  if (errorData) {
    errorData.forEach(errorItem => {
      Object.keys(errorItem).forEach(key => {
        let row = parseInt(key.substring(0, key.indexOf('|')), 10);

        const columnName = key.substring(key.indexOf('|') + 1);

        row = findIndex(data, ['line no.', row]) + 1;

        // so we also skip generating error cell data for replaced values
        // as they are already replaced, but we get the error data from
        // before they were replaced
        if (row !== 0 && replacedColumn !== columnName) {
          errorCells.push({
            row,
            col: columnName,
            message: errorItem[key]
          });
        }
      });
    });
  }

  return errorCells;
}

export function checkIfErrors(errorMessages, ignoredErrors) {
  // so we form this errorsExists variable according
  // to the errors message that we get from duct
  // and according to the ignored error array
  let errorsExists = false;

  if (errorMessages) {
    // now we need to do this in an even weirder way
    // cause the data retrieved was made even weirder than before...
    for (let i = 0; i < errorMessages.length; i++) {
      const errorMessage = errorMessages[i];

      for (let key in errorMessage) {
        if (errorMessage.hasOwnProperty(key)) {
          // so here we get the column name
          // from the key in a weird way
          // cause the data we retrieve is super
          // weird
          const colName = key.substring(key.indexOf('|') + 1);

          // so if we find a key with a column name
          // that isn't in the ignoredErrors array,
          // we set errorsExists to true and break out of loop
          if (ignoredErrors.indexOf(colName) === -1) {
            errorsExists = true;
          }
        }
      }
      if (errorsExists) break;
    }
  }
  return errorsExists;
}
