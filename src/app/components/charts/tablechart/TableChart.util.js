import findIndex from 'lodash/findIndex';

export function formatCsvData(data) {
  const diffFormatData = [];

  data.forEach(item => {
    // cause geolocation is the first element in the array
    const geoIndex = findIndex(diffFormatData, ['Geolocation', item[0]]);

    // so basically this main column name is gonna be formed
    // from indicator and sub indicator, and will be used
    // to form the value column based on this name
    // and the value format column
    // and ofcourse the indicator is 4th element in the array
    // and the sub ind is the 5th
    const mainColName = `${item[3]}_${item[4]}`;

    if (geoIndex === -1) {
      diffFormatData.push({
        // cause geolocation is the first element in the array
        Geolocation: item[0],
        // cause ISO2 code is the 7th element in the array
        ISO2: item[6],
        // cause date is the second element in the array
        Date: item[1],
        // and this is gonna be the value column formed from
        // indicator and subindicator name
        // and the value is the third element in the array
        [`${mainColName}_value`]: item[2],
        // and same with the value format, its the 6th element
        // in the array
        [`${mainColName}_format`]: item[5]
      });
    } else {
      // and if we do find an existing geolocation we just add in
      // the new indicator and subindicator value and format
      // NOTE: currently this formatting is not based on dates
      // Cause currently you can only have one year selected for your
      // tablechart, so its always gonna be the same year
      // NOTE: ALSO if there's duplicate data in this table chart
      // the last value will be printed out,
      // as in if you would map out two indicators with the same values
      // only the last ones values will be here, cause makes 0
      // sense to have two indicators with the same data in your
      // table chart/csv
      diffFormatData[geoIndex][`${mainColName}_value`] = item[2];
      diffFormatData[geoIndex][`${mainColName}_format`] = item[5];
    }
  });

  return diffFormatData;
}
