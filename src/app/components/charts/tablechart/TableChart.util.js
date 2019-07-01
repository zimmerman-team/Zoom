export function formatCsvData(data, columns) {
  const diffFormatData = [];

  data.forEach(item => {
    columns.forEach(column => {
      if (column.indName) {
        const diffFormItem = {};

        for (const key in item) {
          if (
            item.hasOwnProperty(key) &&
            key.indexOf(column.indName) !== -1 &&
            key.indexOf(column.subIndName) !== -1
          ) {
            if (
              key.substring(key.length - 5, key.length).indexOf('value') !== -1
            ) {
              diffFormItem.value = item[key];
            } else if (
              key.substring(key.length - 6, key.length).indexOf('format') !== -1
            ) {
              diffFormItem.format = item[key];
            }

            if (
              diffFormItem.value !== undefined &&
              diffFormItem.format !== undefined
            ) {
              diffFormatData.push({
                Indicator: column.indName,
                'Sub-Indicator': column.subIndName,
                Value: diffFormItem.value,
                'Value Format': diffFormItem.format,

                // cause geolocation is the first element in the array
                Geolocation: item.geolocationTag,
                // cause ISO2 code is the 7th element in the array
                ISO2: item.geolocationIso2,
                // cause date is the second element in the array
                Date: item.date
              });

              // aaand finally after getting the indicators and sub indicators
              // value and format and pusshing it in we break out of this key loop
              break;
            }
          }
        }
      }
    });
  });

  return diffFormatData;
}
