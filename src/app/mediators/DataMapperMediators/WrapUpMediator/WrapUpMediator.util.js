import find from 'lodash/find';

// so this will basically format the json for mapping
// according to the retrieved mapping json
// and the mapping data
export function formatMapJson(mappingJson, mapData, fileId) {
  const mapJson = { ...mappingJson };

  mapData.forEach(item => {
    if (item.emptyFieldRow) {
      // so first we check if the item is an empty field
      // that needs to be populated with a value
      // and populate it ofcourse
      if (item.zoomModel === 'value_format') {
        // and ofcourse we need to save value_format differently
        // then others, because people cant make the data consistent

        // so we need to use the selected values column name as the
        // dictionary key for the value format...
        const valueCol = find(mapData, ['zoomModel', 'value']).fileType;

        mapJson.extra_information.empty_entries.empty_value_format[valueCol] =
          item.label;
      } else
        mapJson.extra_information.empty_entries[`empty_${item.zoomModel}`] =
          item.label;
    } else if (item.zoomModel === 'Longitude') {
      // we check if there's longitude or
      // latitude selected and we save, we need to check for this
      // differently because its saved differently from the other mappings
      mapJson.point_based_info.coord.lon = item.fileType;
      mapJson.mapping_dict.geolocation.push(item.fileType);
    } else if (item.zoomModel === 'Latitude') {
      mapJson.point_based_info.coord.lat = item.fileType;
      mapJson.mapping_dict.geolocation.push(item.fileType);
    } else if (item.zoomModel !== '-None-') {
      // and here we do the simple mapping
      // and we will be pushing an array
      // of selections into these mapping dicts
      // for there can be several columns
      // with the same zoomModel
      mapJson.mapping_dict[item.zoomModel].push(item.fileType);
    }
  });

  // now filters and geolocation is also a required field
  // but the user does not need to have it in their file
  // if its not selected in the mapping we can just pass
  // some default values
  if (mapJson.mapping_dict.filters.length === 0) {
    mapJson.extra_information.empty_entries.empty_filter = 'all';
    mapJson.filter_headings.filters = 'Category';
  } else {
    // we add the appropriate filter headings for each filter
    mapJson.mapping_dict.filters.forEach(filterCol => {
      mapJson.filter_headings[filterCol] = filterCol;
    });
  }

  if (mapJson.mapping_dict.geolocation.length === 0) {
    mapJson.extra_information.empty_entries.empty_geolocation.value = 'Global';
    mapJson.extra_information.empty_entries.empty_geolocation.type = 'country';
  }

  // and we add the meta_data id here
  mapJson.metadata_id = fileId;

  return mapJson;
}
