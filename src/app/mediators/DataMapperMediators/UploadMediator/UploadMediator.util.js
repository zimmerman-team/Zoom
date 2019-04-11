import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import sortBy from 'lodash/sortBy';

export const arrayOfValues = [
  'Number Value',
  'Percentage Value',
  'Mixed Value'
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

export function formatModelOptions(dataModelHeading) {
  let modelOptions = [];

  // We push in the default label none
  modelOptions.push({
    label: '-None-',
    value: '-None-'
  });

  // We push in the Longitude, for the Longitude column selection
  modelOptions.push({
    label: 'Longitude',
    value: 'Longitude'
  });

  // We push in the Latitude, for the Latitude column selection
  modelOptions.push({
    label: 'Latitude',
    value: 'Latitude'
  });

  // and because we have a bunch of different types of values
  arrayOfValues.forEach(valName => {
    modelOptions.push({
      label: valName,
      value: valName
    });
  });

  Object.keys(dataModelHeading.mapping_dict).map(key => {
    // so since we already pushed in the only available value selections
    // with types/formats we don't need the default value and value_format
    if (key !== 'value') {
      // and now we push in the rest
      modelOptions.push({
        label: key.charAt(0).toUpperCase() + key.slice(1),
        value: key
      });
    }
  });

  modelOptions = sortBy(modelOptions, ['label']);

  return modelOptions;
}

export function formatManData(typesString, modelOptions) {
  const manMapData = [];

  // so yeah the types we retrieve from the overview step contains the actual column headers
  // so we're gonna form the manual mapping data using that
  const types = JSON.parse(JSON.parse(typesString));

  // yet again this is super weird data so we form it in a weird way.
  Object.keys(types).forEach(typeKey => {
    const modelOption = find(modelOptions, ['value', types[typeKey][0]]);

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
