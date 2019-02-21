import filter from 'lodash/filter';

// so this will basically format the json for mapping
// according to the retrieved mapping json
// and the mapping data
export function formatMapJson(mappingJson, mapData, fileId) {
  const mapJson = { ...mappingJson };

  mapData.forEach(item => {
    if (item.emptyFieldRow) {
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
      // okay so here we'll skip the data models for value
      // as they need to be processed seperatly as there
      // might be two values and the zoomModel selections
      // for these values are not actual zoomModel types
      if (item.zoomModel.toLowerCase().indexOf('value') === -1)
        // and here we do the simple mapping
        // and we will be pushing an array
        // of selections into these mapping dicts
        // for there can be several columns
        // with the same zoomModel
        mapJson.mapping_dict[item.zoomModel].push(item.fileType);
    }
  });

  // so here we'll process the value selections
  // first we'll find the amount of values selected(max can be two)
  const zoomValues = filter(mapData, item => {
    return item.zoomModel.toLowerCase().indexOf('value') !== -1;
  });

  zoomValues.forEach(item => {
    // so ye here we push in the selected values column
    mapJson.mapping_dict.value.push(item.fileType);

    // and here we indicate what type of format it is
    mapJson.extra_information.empty_entries.empty_value_format[
      zoomValues[0].fileType
    ] =
      zoomValues[0].zoomModel.toLowerCase().indexOf('number') !== -1
        ? 'Number'
        : 'Percentage';

    // and now there's some extra logic if there's more than one value selected
    if (zoomValues.length > 1) {
      // yeah and this is done according to the mapping instructions in DUCT wiki
      mapJson.extra_information.multi_mapped.column_heading[item.fileType] =
        'filters';
      mapJson.extra_information.multi_mapped.column_heading[item.fileType] =
        'value';
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
