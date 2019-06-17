import findIndex from 'lodash/findIndex';
import find from 'lodash/find';

export const defModelOptions = [
  { label: '-None-', value: '-None-' },
  { label: 'Date', value: 'date', disable: ['date', 'Date Value Column'] },
  { label: 'Filters', value: 'filters', disable: ['Filter Value Column'] },
  {
    label: 'Geolocation',
    value: 'geolocation',
    disable: ['geolocation', 'Geolocation Value Column']
  },
  {
    label: 'Indicator',
    value: 'indicator',
    disable: ['indicator', 'Indicator Value Column']
  },
  { label: 'Latitude', value: 'Latitude', disable: ['Latitude'] },
  { label: 'Legend', value: 'comment', disable: ['comment'] },
  { label: 'Longitude', value: 'Longitude', disable: ['Longitude'] },
  {
    label: 'Mixed Value',
    value: 'Mixed Value',
    disable: [
      'Mixed Value',
      'Number Value',
      'Percentage Value',
      'Indicator Value Column',
      'Filter Value Column',
      'Date Value Column',
      'Geolocation Value Column',
      'Value_format Value Column'
    ]
  },
  {
    label: 'Number Value',
    value: 'Number Value',
    disable: [
      'Mixed Value',
      'Number Value',
      'Indicator Value Column',
      'Filter Value Column',
      'Date Value Column',
      'Geolocation Value Column',
      'Value_format Value Column',
      'value_format'
    ]
  },
  {
    label: 'Percentage Value',
    value: 'Percentage Value',
    disable: [
      'Mixed Value',
      'Percentage Value',
      'Indicator Value Column',
      'Filter Value Column',
      'Date Value Column',
      'Geolocation Value Column',
      'Value_format Value Column',
      'value_format'
    ]
  },
  {
    label: 'Value_format',
    value: 'value_format',
    assocModel: 'value_format',
    disable: ['value_format', 'Value_format Value Column']
  },
  {
    label: 'Indicator Value Column',
    value: 'Indicator Value Column',
    assocModel: 'indicator',
    disable: [
      'Mixed Value',
      'Number Value',
      'Percentage Value',
      'Filter Value Column',
      'Date Value Column',
      'Geolocation Value Column',
      'Value_format Value Column',
      'indicator',
      'value_format'
    ]
  },
  {
    label: 'Filter Value Column',
    value: 'Filter Value Column',
    assocModel: 'filters',
    disable: [
      'Mixed Value',
      'Number Value',
      'Percentage Value',
      'Indicator Value Column',
      'Date Value Column',
      'Geolocation Value Column',
      'Value_format Value Column',
      'filters',
      'value_format'
    ]
  },
  {
    label: 'Date Value Column',
    value: 'Date Value Column',
    assocModel: 'date',
    disable: [
      'Mixed Value',
      'Percentage Value',
      'Number Value',
      'Indicator Value Column',
      'Filter Value Column',
      'Geolocation Value Column',
      'Value_format Value Column',
      'date',
      'value_format'
    ]
  },
  {
    label: 'Geolocation Value Column',
    value: 'Geolocation Value Column',
    assocModel: 'geolocation',
    disable: [
      'Mixed Value',
      'Number Value',
      'Percentage Value',
      'Indicator Value Column',
      'Filter Value Column',
      'Date Value Column',
      'Value_format Value Column',
      'geolocation',
      'value_format'
    ]
  },
  {
    label: 'Value_format Value Column',
    value: 'Value_format Value Column',
    assocModel: 'value_format',
    disable: [
      'Mixed Value',
      'Number Value',
      'Percentage Value',
      'Indicator Value Column',
      'Filter Value Column',
      'Date Value Column',
      'Geolocation Value Column',
      'value_format'
    ]
  }
];

//  Note this whole types and summary data is formed in a very very weird way
// so there's lots seemingly weird stuff happening in this function
export function formatOverviewData(sumString, typesString) {
  const properNames = {
    count: 'Count of values',
    unique: 'Number of unique values',
    top: 'Most frequent value',
    // freq name will need to have the most frequent values
    // name in front
    freq: 'freq',
    mean: 'Average',
    std: 'Std',
    min: 'Min value',
    '25%': '25%',
    '50%': '50%',
    '75%': '75%',
    max: 'Max value'
  };

  const overviewData = [];

  const types = JSON.parse(JSON.parse(typesString));

  const summaries = JSON.parse(JSON.parse(sumString));

  // so basically because we don't retrieve the column headers with the summary
  // we will form everything in accordance to the types, because these do have
  // the column header names in them and each index in the summary array
  // is relative to each index in the types array(as confirmed by Taufik)
  // where each index in the types array is a different column.
  Object.keys(types).forEach(typeKey => {
    // a similar index relation as types and summaries have are
    // between summary keys and values, so we'll approach this
    // in a similar way. Keys will be leading
    const summKeys = summaries[typeKey][0];
    const summValues = summaries[typeKey][1];

    const summary = [];

    summKeys.forEach((summKey, keyIndex) => {
      summary.push({
        label: properNames[summKey],
        value: summValues[keyIndex]
      });
    });

    overviewData.push({
      // so type[0] in the types array is actually the name of a column
      fileColumn: types[typeKey][0],
      // so type[1] in the types array the actual
      // string array we'd see in the data types column
      dataTypes: types[typeKey][1],
      // so type[2] in the types array is actually the blank cell number of a column
      blankCells: types[typeKey][2],
      summary
    });
  });

  // and now that we have all the data formed, we'll add correct
  // most frequent value count label, cause currently its 'freq'
  // and it should be formed, using the most values name
  // something like 'Netherlands count'
  overviewData.map(it => {
    const item = it;
    const summFreqInd = findIndex(item.summary, ['label', 'freq']);
    if (summFreqInd !== -1) {
      const summFreqName = find(item.summary, ['label', 'Most frequent value']);
      if (summFreqName) {
        item.summary[summFreqInd].label = summFreqName.value.concat(' count');
      }
    }
    return item;
  });

  return overviewData;
}

export function formatManData(typesString) {
  const manMapData = [];

  // so yeah the types we retrieve from the overview step contains the actual column headers
  // so we're gonna form the manual mapping data using that
  const types = JSON.parse(JSON.parse(typesString));

  // yet again this is super weird data so we form it in a weird way.
  Object.keys(types).forEach(typeKey => {
    const modelOption = find(defModelOptions, ['value', types[typeKey][0]]);

    manMapData.push({
      lockedIn: false,
      fileType: types[typeKey][0],
      // so if a file type exists as a model, it should be selected by default
      zoomModel: modelOption ? types[typeKey][0] : '-None-',
      zoomModelLabel: modelOption ? modelOption.label : '-None-',
      label: undefined,
      emptyFieldRow: false
    });
  });

  return manMapData;
}
