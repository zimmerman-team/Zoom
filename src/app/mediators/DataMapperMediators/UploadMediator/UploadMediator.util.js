import findIndex from 'lodash/findIndex';
import find from 'lodash/find';

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

  console.log('types', types);
  console.log('summaries', summaries);

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

// So for the errors correction step to actually make pagination
// work with this weird way that data is retrieved, we will need to
// get the count of all the rows, and the overview data is the only thing that
// is closest to giving us a count of rows ...
export function getRowCount(overviewData) {
  // so by default we will make the count of rows be 100
  // just in case, the count here cannot be found
  let countOfRows = '100';

  // so the overview data that doesn't state blank values
  // will actually have all of the rows mentioned as count of values
  let valueWithoutBlanks = null;

  for (let i = 0; i < overviewData.length; i += 1) {
    let notBlank = false;
    overviewData[i].dataTypes.forEach(type => {
      notBlank = type.indexOf('blank') === -1;
    });
    if (notBlank) {
      valueWithoutBlanks = overviewData[i];
      break;
    }
  }

  if (valueWithoutBlanks)
    countOfRows = find(valueWithoutBlanks.summary, ['label', 'Count of values'])
      .value;

  return parseInt(countOfRows, 10);
}

export function formatModelOptions(dataModelHeading) {
  const modelOptions = [];

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

  Object.keys(dataModelHeading.mapping_dict).map(key => {
    // and now we push in the rest
    modelOptions.push({
      label: key,
      value: key
    });
  });

  return modelOptions;
}

export function formatManData(typesString) {
  const manMapData = [];

  // so yeah the types we retrieve from the overview step contains the actual column headers
  // so we're gonna form the manual mapping data using that
  const types = JSON.parse(JSON.parse(typesString));

  // yet again this is super weird data so we form it in a weird way.
  Object.keys(types).forEach(typeKey => {
    manMapData.push({
      lockedIn: false,
      fileType: types[typeKey][0],
      zoomModel: '-None-',
      label: undefined,
      emptyFieldRow: false
    });
  });

  return manMapData;
}
