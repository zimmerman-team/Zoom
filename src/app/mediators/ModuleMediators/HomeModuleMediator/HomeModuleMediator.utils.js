import findIndex from 'lodash/findIndex';
import { scaleQuantile } from 'd3-scale';
import { range } from 'd3-array';

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
          // we round it to two decimals
          value: Math.ceil(indicator.value),
          percentile: 0
        }
      });
    } else {
      const changeFeat = countryLayers.features[existLayerIndex];
      changeFeat.properties.value += indicator.value;
    }
  });

  // And we add min and max values to be used for legends and what not
  countryLayers.minValue = Math.min.apply(
    Math,
    countryLayers.features.map(feature => {
      return feature.properties.value;
    })
  );

  countryLayers.maxValue = Math.max.apply(
    Math,
    countryLayers.features.map(feature => {
      return feature.properties.value;
    })
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
          value: Math.ceil(indicator.value),
          geolocationIso2: indicator.geolocationIso2,
          maxValue,
          minValue,
          longitude: coord[0],
          latitude: coord[1],
          name: indicator.geolocationTag
        });
      } else
        countryCenteredData[existCountryIndex].value =
          countryCenteredData[existCountryIndex].value + indicator.value;
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
    indicator.maxValue = maxValue;
    indicator.minValue = minValue;
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

// Basically takes in a start year and an
// end year as an array and makes a string array of year between them
// including them both as well
export function formatYearParam(val) {
  // So here we will need to make an array of each year between the first
  // and last year received
  const yearArray = [];
  let currentYear = val[0];
  while (currentYear < val[1] + 1) {
    yearArray.push(currentYear.toString());
    currentYear += 1;
  }
  return yearArray;
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
          value: Math.ceil(indicator.value)
        });
      } else {
        longLatData[existPointIndex].value += indicator.value;
      }
    }
  });

  return longLatData;
}
