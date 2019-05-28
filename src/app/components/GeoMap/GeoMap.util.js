import React from 'react';

/* utils */
import filter from 'lodash/filter';

/* components */
import locationMarker from './components/Markers/LocationMarker/LocationMarker';
import layerLegend from './components/Legends/LayerLegend/LayerLegend';
import locationLegend from './components/Legends/LocationLegend/LocationLegend';
import circleMarker from './components/Markers/CircleMarker/CircleMarker';
import circleLegend from './components/Legends/CircleLegend/CircleLegend';

// So here we will generate all of the markers that might be displayed on the map
// location markers(like actual location markers)
// country indicator markers(bublles that are bigger depending on the data)
// and etc.
export function generateMarkers(indicatorData, setMarkerInfo) {
  const markerArray = [];

  indicatorData.forEach(item => {
    switch (item.type) {
      case 'location':
        const locationMarkers = item.data.map((indicator, index) =>
          locationMarker(indicator, index, setMarkerInfo)
        );
        markerArray.push(locationMarkers);
        break;
      case 'circle':
        const circleMarkers = item.data.map((indicator, index) =>
          circleMarker(indicator, index, setMarkerInfo)
        );
        markerArray.push(circleMarkers);
        break;
      default:
        break;
    }
  });
  return markerArray;
}

// So here we will generate all of the legends that might be displayed on the map
// for the legend container
export function generateLegends(indicatorData) {
  const legendArray = [];

  const locationItems = [];

  indicatorData.forEach((item, index) => {
    switch (item.type) {
      case 'layer':
        legendArray.push(
          layerLegend(
            item.legendName,
            index,
            item.data.minValue,
            item.data.maxValue
          )
        );
        break;
      case 'location':
        locationItems.push({
          name: item.legendName,
          color: item.color
        });
        break;
      case 'circle':
        legendArray.push(
          circleLegend(
            item.legendName,
            index,
            item.data[0].minValue,
            item.data[0].maxValue
          )
        );
        break;
      default:
        break;
    }
  });

  if (locationItems.length > 0) {
    legendArray.push(locationLegend(locationItems, 2));
  }

  return legendArray;
}
