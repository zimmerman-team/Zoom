import find from 'lodash/find';

export function formatCountryLayerData(indicators, geometry) {
  const countryLayers = {
    type: 'FeatureCollection',
    features: [],
  };
  const features = geometry.features;

  indicators.forEach(indicator => {
    const feature = find(features, feat => {
      return (
        feat.properties.iso_a2 &&
        indicator.geolocationIso2 &&
        feat.properties.iso_a2.toLowerCase() ===
          indicator.geolocationIso2.toLowerCase()
      );
    });

    if (feature) {
      feature.properties.indicator = indicator;
      countryLayers.features.push(feature);
    }
  });

  return countryLayers;
}

export function formatCountryCenterData(indicators, centerGeometry) {
  const countryCenteredData = [];

  indicators.forEach(indicator => {
    if (indicator.geolocationIso2) {
      countryCenteredData.push({
        value: indicator.value,
        name: indicator.indicatorName,
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
