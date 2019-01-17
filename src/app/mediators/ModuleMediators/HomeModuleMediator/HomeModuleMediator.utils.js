import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

export function formatCountryLayerData(indicators, geometry) {
  const countryLayers = {
    type: 'FeatureCollection',
    features: [],
  };
  const features = geometry.features;

  indicators.forEach(indicator => {
    let feature = find(features, feat => {
      return (
        feat.properties.iso_a2 &&
        indicator.geolocationIso2 &&
        feat.properties.iso_a2.toLowerCase() ===
          indicator.geolocationIso2.toLowerCase()
      );
    });

    if (feature) {
      const existLayerIndex = findIndex(countryLayers.features, feat => {
        return (
          indicator.geolocationIso2 ===
          feat.properties.indicator.geolocationIso2
        );
      });

      // so here we check if we already added a country to the countries layers
      // and if it has been added we just add the indicators value instead of pushing
      // another country
      // this needs to be done when using several data points with the same country
      // example: data points with different years, will have same countries
      if (existLayerIndex === -1) {
        feature.properties.indicator = indicator;
        countryLayers.features.push(feature);
      } else {
        const changeFeat = countryLayers.features[existLayerIndex];
        changeFeat.properties.value += indicator.value;
      }
    }
  });

  return countryLayers;
}

export function formatCountryCenterData(indicators, centerGeometry) {
  const countryCenteredData = [];

  indicators.forEach(indicator => {
    if (indicator.geolocationIso2) {
      const existCountryIndex = findIndex(countryCenteredData, [
        'geolocationIso2',
        indicator.geolocationIso2,
      ]);

      // so here we check if we already added a country to the countries layers
      // and if it has been added we just add the indicators value instead of pushing
      // another country
      // this needs to be done when using several data points with the same country
      // example: data points with different years, will have same countries
      if (existCountryIndex === -1)
        countryCenteredData.push({
          value: indicator.value,
          name: indicator.indicatorName,
          geolocationIso2: indicator.geolocationIso2,
          maxValue,
          minValue,
          longitude:
            centerGeometry[indicator.geolocationIso2.toUpperCase()].longitude,
          latitude:
            centerGeometry[indicator.geolocationIso2.toUpperCase()].latitude,
          tooltipText: `Country: ${indicator.geolocationTag}, Value: ${
            indicator.value
          }`,
        });
      else
        countryCenteredData[existCountryIndex].value =
          countryCenteredData[existCountryIndex].value + indicator.value;
    }
  });

  const maxValue = Math.max.apply(
    Math,
    countryCenteredData.map(indicator => {
      return indicator.value;
    }),
  );
  const minValue = Math.min.apply(
    Math,
    countryCenteredData.map(indicator => {
      return indicator.value;
    }),
  );

  countryCenteredData.map(indicator => {
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
    region.forEach(countryCode => {
      if (jointCountries.indexOf(countryCode.iso2) === -1)
        jointCountries.push(countryCode.iso2);
    });
  });

  return jointCountries;
}
