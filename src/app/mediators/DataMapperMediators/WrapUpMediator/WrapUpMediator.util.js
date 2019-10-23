/* consts */
import { normalValues, columnValues } from './WrapUpMediator.const';
import { defModelOptions } from 'mediators/DataMapperMediators/UploadMediator/UploadMediator.util';

/* utils */
import filter from 'lodash/filter';
import find from 'lodash/find';

// so this will basically format the json for mapping
// according to the retrieved mapping json
// and the mapping data
export function formatMapJson(mappingJson, mapData, fileId) {
  const mapJson = {
    metadata_id: '',
    filter_headings: {},
    extra_information: {
      empty_entries: {
        empty_indicator: '',
        empty_geolocation: { value: '', type: '' },
        empty_filter: '',
        empty_value_format: {},
        empty_date: ''
      },
      multi_mapped: {
        column_heading: {},
        column_values: {}
      },
      point_based_info: {
        coord: { lat: '', lon: '' },
        subnational: '',
        country: '',
        type: ''
      }
    },
    mapping_dict: {
      indicator: [],
      filters: [],
      geolocation: [],
      date: [],
      value_format: [],
      value: [],
      comment: []
    }
  };

  mapData.forEach(item => {
    if (item.emptyFieldRow) {
      if (item.zoomModel === 'geolocation') {
        mapJson.extra_information.empty_entries[
          `empty_${item.zoomModel}`
        ].value = item.label;

        mapJson.extra_information.empty_entries[
          `empty_${item.zoomModel}`
        ].type = 'country';
      } else {
        mapJson.extra_information.empty_entries[`empty_${item.zoomModel}`] =
          item.label;
      }
    } else if (item.zoomModel === 'Longitude') {
      // we check if there's longitude or
      // latitude selected and we save, we need to check for this
      // differently because its saved differently from the other mappings
      mapJson.extra_information.point_based_info.coord.lon = item.fileType;
      mapJson.mapping_dict.geolocation.push(item.fileType);
    } else if (item.zoomModel === 'Latitude') {
      mapJson.extra_information.point_based_info.coord.lat = item.fileType;
      mapJson.mapping_dict.geolocation.push(item.fileType);
    } else if (item.zoomModel !== '-None-') {
      // okay so here we'll skip the data models for value
      // as they need to be processed seperatly as there
      // might be two values and the zoomModel selections
      // for these values are not actual zoomModel types
      if (
        item.zoomModel.toLowerCase().indexOf('value') === -1 ||
        item.zoomModel === 'value_format'
      ) {
        // and here we do the simple mapping
        // and we will be pushing an array
        // of selections into these mapping dicts
        // for there can be several columns
        // with the same zoomModel
        mapJson.mapping_dict[item.zoomModel].push(item.fileType);
      }
    }
  });

  //  TODO: redo this whole value buisness in a simpler
  //    way, seems a bit over complicated right now
  // so here we'll process the value selections
  // first we'll find the amount of values selected(max can be two)
  const zoomValues = filter(mapData, item => {
    return (
      normalValues.indexOf(item.zoomModel) !== -1 ||
      columnValues.indexOf(item.zoomModel) !== -1
    );
  });

  // NOTE: This might mess up other type column values
  // if we ever have any, currently it works with
  // filterColumnValues as in, the filter name
  // is in the column header, and their values
  // are listed in that column
  let isColumnValues = false;

  zoomValues.forEach(item => {
    if (item.zoomModel === 'Mixed Value') {
      mapJson.mapping_dict.value.push(item.fileType);
    } else if (
      item.zoomModel === 'Number Value' ||
      item.zoomModel === 'Percentage Value'
    ) {
      // so ye here we push in the selected values column
      mapJson.mapping_dict.value.push(item.fileType);

      mapJson.mapping_dict.value_format = [];

      // and here we indicate what type of format it is
      mapJson.extra_information.empty_entries.empty_value_format[
        item.fileType
      ] =
        item.zoomModel.toLowerCase().indexOf('number') !== -1
          ? 'Number'
          : 'Percentage';

      // and now there's some extra logic if there's more than one value selected
      if (zoomValues.length > 1) {
        // yeah and this is done according to the mapping instructions in DUCT wiki
        mapJson.extra_information.multi_mapped.column_heading[item.fileType] =
          'filters';
        mapJson.extra_information.multi_mapped.column_values[item.fileType] =
          'value';

        // and also theses columns need to be added to filters as well
        // according to the instructions
        mapJson.mapping_dict.filters.push(item.fileType);

        // Note filter headings for these values will be added below with all other
        //  filters
      }
    } else {
      isColumnValues = true;
      // so if its not one of the normal values, its gonna be one of the column values
      const assocItem = find(defModelOptions, ['value', item.zoomModel]);

      mapJson.mapping_dict.value.push(item.fileType);

      mapJson.mapping_dict.value_format = [];

      mapJson.extra_information.empty_entries.empty_value_format[
        item.fileType
      ] = item.label;

      mapJson.extra_information.multi_mapped.column_heading[item.fileType] =
        assocItem.assocModel;
      mapJson.extra_information.multi_mapped.column_values[item.fileType] =
        'value';

      mapJson.mapping_dict[assocItem.assocModel].push(item.fileType);

      mapJson.filter_headings[item.fileType] = item.fileType;
    }
  });

  console.log('mapJson', mapJson);

  // There's also some functionality needed for when
  // a value has not been selected
  // so yeah that happens here
  if (mapJson.mapping_dict.value.length === 0) {
    mapJson.extra_information.empty_entries.empty_value_format.value_format =
      'Numeric';
    mapJson.extra_information.empty_entries.empty_value = 0;
  }

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

  if (zoomValues.length > 1) {
    // and we also need to add this for everything to work
    mapJson.filter_headings.filters = 'Type';
  }

  // and we add the meta_data id here
  mapJson.metadata_id = fileId;

  return mapJson;
}
