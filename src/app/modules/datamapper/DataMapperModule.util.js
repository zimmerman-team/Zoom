import find from 'lodash/find';

export function checkEmptyFields(manMapData, mapReqFields) {
  const emptyFields = [];

  mapReqFields.forEach(field => {
    //  so yeah if a required field is not found
    //  as in zoom data model of the data
    //  then we push it in as an empty field

    // we need some extra checking logic cause there can be three value selections
    // but at least one is required
    // and we'll check if one of these fields have been selected
    if (field === 'value') {
      if (
        !find(manMapData, ['zoomModel', 'Number Value']) &&
        !find(manMapData, ['zoomModel', 'Percentage Value']) &&
        !find(manMapData, ['zoomModel', 'Mixed Value'])
      ) {
        emptyFields.push(field);
      }
    } else if (!find(manMapData, ['zoomModel', field])) {
      emptyFields.push(field);
    }
  });

  return emptyFields;
}

// basically used to add in extra rows for the manual
// mapping step so that the user would be able
// to populate missing fields in their csv file
export function addInEmptyFieldRows(emptyFields, manMapData) {
  const data = manMapData;

  emptyFields.forEach(field => {
    // and ofcourse the value should already be
    // in the csv file and it should be selected in the mapping
    // if it wasn't selected the user will get in info message about it
    // and if it isn't even in the csv file then the user should add it
    // cause we don't have a way to populate these values, at least
    // with the api/graphql(maybe some implementation would be needed)
    // but still it doesn't make sense for a user to upload a file
    // without actual numeric/percentile data in it
    if (field !== 'value') {
      data.push({
        lockedIn: false,
        fileType: field,
        zoomModel: field,
        label: undefined,
        // NOTE: this row will look and be treated differently then other rows
        // thats why we set this emptyFieldRow value to true
        emptyFieldRow: true
      });
    }
  });

  return data;
}
