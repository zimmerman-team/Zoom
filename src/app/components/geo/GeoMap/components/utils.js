import { range } from 'd3-array';
import { scaleQuantile } from 'd3-scale';
import find from 'lodash/find';

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

//Combines county geometry and county indicator data
export function coupleData(indicators, geometry, POIdata) {
  const coupledData = {
    type: 'FeatureCollection',
    features: [],
  };
  const features = geometry.features;

  indicators.map(indicator => {
    const feature = find(features, feat => {
      return (
        feat.properties.COUNTY_NAM &&
        //Here we check with indexes to see if the indicator name contains the geometry name
        //or vice versa, cause there might be such subtle differences in names
        (feat.properties.COUNTY_NAM.toLowerCase().indexOf(
          indicator.County.toLowerCase(),
        ) !== -1 ||
          indicator.County.toLowerCase().indexOf(
            feat.properties.COUNTY_NAM.toLowerCase(),
          ) !== -1)
      );
    });

    if (feature) {
      feature.properties.indicator = indicator;

      //Here we check with indexes to see if the indicator name contains the poi county name
      //or vice versa, cause there might be such subtle differences in names
      const POI = find(POIdata, poi => {
        return (
          poi.County.toLowerCase().indexOf(indicator.County.toLowerCase()) !==
            -1 ||
          indicator.County.toLowerCase().indexOf(poi.County.toLowerCase()) !==
            -1
        );
      });
      coupledData.features.push(feature);
    } else {
      // console.log('Border geometry not found for indicator - ', indicator.County);
    }
  });

  return coupledData;
}

export function loadSubIndicators(indicatorData) {
  const subInd = [];
  if (indicatorData[0].Indicator_category) {
    subInd.push({
      name: 'All',
      id: 'All',
    });

    indicatorData.forEach(indicator => {
      if (!find(subInd, ['name', indicator.Indicator_category]))
        subInd.push({
          name: indicator.Indicator_category,
          value: indicator.Indicator_category,
          id: indicator.Indicator_category,
        });
    });
  } else {
    subInd.push({
      name: 'None',
      id: 'None',
    });
  }
  return subInd;
}
