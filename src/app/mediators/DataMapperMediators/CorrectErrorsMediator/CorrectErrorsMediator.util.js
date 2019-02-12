export function formatErrorCells(errorData) {
  const errorCells = [];

  Object.keys(errorData).forEach(key => {
    const row = parseInt(key.substring(0, key.indexOf('|')), 10);
    const columnName = key.substring(key.indexOf('|') + 1);

    errorCells.push({
      row,
      columnName,
      message: errorData[key]
    });
  });

  return errorCells;
}
