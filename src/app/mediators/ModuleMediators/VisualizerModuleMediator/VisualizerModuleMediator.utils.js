import findIndex from 'lodash/findIndex';
import { scaleQuantile } from 'd3-scale';
import { range } from 'd3-array';

const lineChartColors = [
  'hsl(23, 70%, 50%)',
  'hsl(137, 70%, 50%)',
  'hsl(54, 70%, 50%)',
  'hsl(20, 70%, 50%)',
  'hsl(84, 70%, 50%)'
];

const barChartColors = [
  'hsl(265, 70%, 50%)',
  'hsl(323, 70%, 50%)',
  'hsl(144, 70%, 50%)',
  'hsl(91, 70%, 50%)',
  'hsl(28, 70%, 50%)',
  'hsl(275, 70%, 50%)'
];

// Updates layer percentiles depending on the value
export function updatePercentiles(featureCollection, accessor) {
  const { features } = featureCollection;
  const scale = scaleQuantile()
    .domain(features.map(accessor))
    .range(range(9));
  features.forEach(f => {
    const value = accessor(f);
    f.properties.value = value;
    f.properties.percentile = scale(value);
  });
}

export function formatCountryLayerData(indicators, indName) {
  const countryLayers = {
    type: 'FeatureCollection',
    features: []
  };

  indicators.forEach(indicator => {
    const existLayerIndex = findIndex(countryLayers.features, feat => {
      return indicator.geolocationTag === feat.properties.name;
    });

    // so here we check if we already added a country to the countries layers
    // and if it has been added we just add the indicators value instead of pushing
    // another country
    // this needs to be done when using several data points with the same country
    // example: data points with different years, will have same countries
    // JSON.parse('{ "name":"John", "age":30, "city":"New York"}')
    if (existLayerIndex === -1) {
      countryLayers.features.push({
        // we need to do a double parse here, cause we retrieve a json
        // which is i dunno a double string or sth :D
        geometry: JSON.parse(JSON.parse(indicator.geolocationPolygons)),
        properties: {
          indName,
          name: indicator.geolocationTag,
          iso2: indicator.geolocationIso2,
          geolocationType: indicator.geolocationType,
          // we round it to two decimals
          value: Math.round(indicator.value),
          format: indicator.valueFormatType,
          percentile: 0
        }
      });
    } else {
      const changeFeat = countryLayers.features[existLayerIndex];
      changeFeat.properties.value += Math.round(indicator.value);
    }
  });

  // And we add min and max values to be used for legends and what not
  countryLayers.minValue = Math.round(
    Math.min.apply(
      Math,
      countryLayers.features.map(feature => {
        return feature.properties.value;
      })
    )
  );

  countryLayers.maxValue = Math.round(
    Math.max.apply(
      Math,
      countryLayers.features.map(feature => {
        return feature.properties.value;
      })
    )
  );

  return countryLayers;
}

export function formatCountryCenterData(indicators, indName) {
  const countryCenteredData = [];

  indicators.forEach(indicator => {
    const existCountryIndex = findIndex(countryCenteredData, [
      'name',
      indicator.geolocationTag
    ]);

    if (indicator.geolocationCenterLongLat) {
      // so here we check if we already added a country to the countries layers
      // and if it has been added we just add the indicators value instead of pushing
      // another country
      // this needs to be done when using several data points with the same country
      // example: data points with different years, will have same countries
      if (existCountryIndex === -1) {
        // we need to do a double parse here, cause we retrieve a json
        // which is i dunno a double string or sth :D
        const coord = JSON.parse(JSON.parse(indicator.geolocationCenterLongLat))
          .coordinates;
        countryCenteredData.push({
          indName,
          value: Math.round(indicator.value),
          geolocationIso2: indicator.geolocationIso2,
          geolocationType: indicator.geolocationType,
          maxValue,
          minValue,
          longitude: coord[0],
          latitude: coord[1],
          format: indicator.valueFormatType,
          name: indicator.geolocationTag
        });
      } else
        countryCenteredData[existCountryIndex].value =
          countryCenteredData[existCountryIndex].value +
          Math.round(indicator.value);
    }
  });

  const maxValue = Math.max.apply(
    Math,
    countryCenteredData.map(indicator => {
      return indicator.value;
    })
  );
  const minValue = Math.min.apply(
    Math,
    countryCenteredData.map(indicator => {
      return indicator.value;
    })
  );

  countryCenteredData.forEach(indicator => {
    indicator.maxValue = Math.round(maxValue);
    indicator.minValue = Math.round(minValue);
  });

  return countryCenteredData;
}

// formats the param for the datapoints aggregations
// according to the single selected countries
// and according to the countries of selected regions
// no duplicate countries should be in this param
export function formatCountryParam(countryCodes, regionCountryCodes) {
  let jointCountries = [];
  jointCountries = jointCountries.concat(countryCodes);

  regionCountryCodes.forEach(region => {
    if (region !== 'select all')
      region.forEach(countryCode => {
        if (jointCountries.indexOf(countryCode.iso2) === -1)
          jointCountries.push(countryCode.iso2);
      });
  });

  return jointCountries;
}

export function formatLongLatData(indicators, indName) {
  const longLatData = [];

  indicators.forEach(indicator => {
    if (indicator.geolocationTag.indexOf(',') !== -1) {
      const existPointIndex = findIndex(longLatData, [
        'name',
        indicator.geolocationTag
      ]);

      if (existPointIndex === -1) {
        let long = indicator.geolocationTag.substring(
          0,
          indicator.geolocationTag.indexOf(',')
        );
        long = parseFloat(long);

        let lat = indicator.geolocationTag.substring(
          indicator.geolocationTag.indexOf(',') + 1
        );
        lat = parseFloat(lat);

        longLatData.push({
          indName,
          longitude: long,
          latitude: lat,
          name: indicator.geolocationTag,
          format: indicator.valueFormatType,
          value: Math.round(indicator.value)
        });
      } else {
        longLatData[existPointIndex].value += Math.round(indicator.value);
      }
    }
  });

  return longLatData;
}

// removes the ID variable from region array, because for some reason
// mongoose generates and returns ids for objects stored in a model...
export function removeIds(regionArray) {
  return regionArray.map(countryArray => {
    return countryArray.map(country => {
      return { iso2: country.iso2 };
    });
  });
}

function ordinal_suffix_of(i) {
  const j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + 'st';
  }
  if (j === 2 && k !== 12) {
    return i + 'nd';
  }
  if (j === 3 && k !== 13) {
    return i + 'rd';
  }
  return i + 'th';
}

// formats date according to design
export function formatDate(created) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const date = new Date(created);
  return `Published on ${monthNames[date.getMonth()]} ${ordinal_suffix_of(
    date.getDate()
  )} ${date.getFullYear()}`;
}

export function formatGeoData(
  indicators1,
  selectedInd1,
  indicators2,
  selectedInd2
) {
  let longLatData = [];
  let countryLayerData = {};

  // so we check here if the retrieved data is long lat
  // and then format it differently
  // TODO: make this work differently, this is currently i quick and dirty fix
  if (
    indicators1[0] &&
    indicators1[0].geolocationTag &&
    indicators1[0].geolocationTag.indexOf(',') !== -1 &&
    /\d/.test(indicators1[0].geolocationTag)
  ) {
    longLatData = formatLongLatData(indicators1, selectedInd1);
  } else {
    countryLayerData = formatCountryLayerData(indicators1, selectedInd1);
  }

  let countryCircleData = [];
  // so we check here if the retrieved data is long lat
  // and then format it differently
  // TODO: make this work differently, this is currently i quick and dirty fix
  if (
    indicators2[0] &&
    indicators2[0].geolocationTag &&
    indicators2[0].geolocationTag.indexOf(',') !== -1 &&
    /\d/.test(indicators2[0].geolocationTag)
  ) {
    longLatData = formatLongLatData(indicators2, selectedInd2);
  } else {
    countryCircleData = formatCountryCenterData(indicators2, selectedInd2);
  }

  const indicators = [];

  if (countryLayerData.features && countryLayerData.features.length > 0) {
    updatePercentiles(countryLayerData, f => f.properties.value);

    indicators.push({
      type: 'layer',
      data: countryLayerData,
      legendName: ` ${selectedInd1} `
    });
  }

  if (countryCircleData.length > 0) {
    indicators.push({
      type: 'circle',
      data: countryCircleData,
      legendName: ` ${selectedInd2} `
    });
  }

  if (longLatData.length > 0) {
    indicators.push({
      type: 'location',
      data: longLatData,
      legendName: `POI`
    });
  }

  return indicators;
}

export function formatLineData(indicators) {
  const indicatorData = [];

  let colorInd = 0;
  indicators.forEach((indicator, index) => {
    const indicatorItem = [];
    if (indicator.length > 0) {
      const existInd = findIndex(indicatorData, existing => {
        return indicator[0].indicatorName === existing.id;
      });

      let id = indicator[0].indicatorName;

      // so we need this logic for when a person would
      // plot two indicators with the same name
      // as the id needs to be unique, we just add
      // the index as a suffix
      if (existInd !== -1) id = id.concat(` (${index})`);

      indicatorData.push({
        id,
        color: lineChartColors[colorInd],
        data: []
      });

      indicator.forEach(indItem => {
        // yeah and cause we might receive data with the same geolocation name
        // we add in the values for that geolocation so it wouldn't be repeated over and over
        const existItemInd = findIndex(indicatorItem.data, existing => {
          return indItem.geolocationTag === existing.geoName;
        });

        if (existItemInd === -1)
          indicatorItem.push({
            geoName: indItem.geolocationTag,
            x:
              indItem.geolocationIso2.length > 0
                ? indItem.geolocationIso2
                : indItem.geolocationTag,
            y: Math.round(indItem.value)
          });
        else indicatorItem[existItemInd].y += Math.round(indItem.value);
      });

      if (colorInd + 1 < lineChartColors.length) colorInd += 1;

      indicatorData[index].data = indicatorItem;
    }
  });

  return indicatorData;
}

// so this function basically formats the
// keys for certain types of charts(like bar chart)
// according to the selected indicator
// array passed into it
export function formatKeys(selectedInd) {
  const chartKeys = [];

  selectedInd.forEach((indName, index) => {
    // this if is here so we dont push 'undefined' as a key
    if (indName) {
      let key = indName;

      if (chartKeys.indexOf(indName) !== -1)
        key = indName.concat(` (${index})`);

      chartKeys.push(key);
    }
  });

  return chartKeys;
}

export function formatBarData(indicators) {
  const barChartData = [];
  const barChartKeys = [];

  let colorInd = 0;
  indicators.map((indicator, index) => {
    if (indicator.length > 0) {
      const existInd = barChartKeys.indexOf(indicator[0].indicatorName);
      console.log('INDICATOR');
      console.log(indicator);
      let indName = indicator[0].indicatorName;

      // so we need this logic for when a person would
      // plot two indicators with the same name
      // as the id needs to be unique, we just add
      // the index as a suffix
      if (existInd !== -1) indName = indName.concat(` (${index})`);

      barChartKeys.push(indName);

      console.log('BARCHARTKEY');
      console.log(barChartKeys);

      indicator.forEach(indItem => {
        // yeah and cause we might receive data with the same geolocation name
        // we add in the values for that geolocation so it wouldn't be repeated over and over
        const existItemInd = findIndex(barChartData, existing => {
          return indItem.geolocationTag === existing.geoName;
        });

        if (existItemInd === -1)
          barChartData.push({
            geoName: indItem.geolocationTag,

            geolocation:
              indItem.geolocationIso2.length > 0
                ? indItem.geolocationIso2.toUpperCase()
                : indItem.geolocationTag,

            [indName]: Math.round(indItem.value),
            [`${indName}Color`]: barChartColors[colorInd]
          });
        else if (barChartData[existItemInd][indName] !== undefined)
          barChartData[existItemInd][indName] += Math.round(indItem.value);
        else {
          barChartData[existItemInd][indName] = Math.round(indItem.value);
          barChartData[existItemInd][`${indName}Color`] =
            barChartColors[colorInd];
        }
      });

      if (colorInd + 1 < lineChartColors.length) colorInd += 1;
    }
  });

  return barChartData;
}

export function formatTableData(indicators) {
  const data = {};
  const tableChartData = [];
  const tableChartColumns = [];
  const tableChartKeys = [];

  indicators.map((indicator, index) => {
    if (indicator.length > 0) {
      const existInd = tableChartKeys.indexOf(indicator[0].indicatorName);

      let indName = indicator[0].indicatorName;

      // so we need this logic for when a person would
      // plot two indicators with the same name
      // as the id needs to be unique, we just add
      // the index as a suffix
      if (existInd !== -1) indName = indName.concat(` (${index})`);

      tableChartKeys.push(indName);

      indicator.forEach(indItem => {
        // yeah and cause we might receive data with the same geolocation name
        // we add in the values for that geolocation so it wouldn't be repeated over and over
        const existItemInd = findIndex(tableChartData, existing => {
          return indItem.geolocationTag === existing.geoName;
        });

        if (existItemInd === -1)
          tableChartData.push([
            indItem.geolocationTag,

            indItem.geolocationIso2.length > 0
              ? indItem.geolocationIso2.toUpperCase()
              : indItem.geolocationTag,

            Math.round(indItem.value)
          ]);
        else if (tableChartData[existItemInd][indName] !== undefined)
          tableChartData[existItemInd][indName] += Math.round(indItem.value);
        else {
          tableChartData[existItemInd][indName] = Math.round(indItem.value);
        }
      });
    }
  });

  return tableChartData;
}
