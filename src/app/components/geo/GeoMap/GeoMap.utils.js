import React from 'react';
import locationMarker from 'components/geo/GeoMap/components/Markers/LocationMarker/LocationMarker';
import layerLegend from 'components/geo/GeoMap/components/Legends/LayerLegend/LayerLegend';
import locationLegend from 'components/geo/GeoMap/components/Legends/LocationLegend/LocationLegend';
import circleMarker from 'components/geo/GeoMap/components/Markers/CircleMarker/CircleMarker';
import circleLegend from 'components/geo/GeoMap/components/Legends/CircleLegend/CircleLegend';

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
          locationMarker(indicator, index, setMarkerInfo),
        );
        markerArray.push(locationMarkers);
        break;
      case 'circle':
        const circleMarkers = item.data.map((indicator, index) =>
          circleMarker(indicator, index, setMarkerInfo),
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
  indicatorData.forEach((item, index) => {
    switch (item.type) {
      case 'layer':
        legendArray.push(layerLegend(item.legendName, index));
        break;
      case 'location':
        legendArray.push(locationLegend(item.legendName, index));
        break;
      case 'circle':
        legendArray.push(circleLegend(item.legendName, index));
        break;
      default:
        break;
    }
  });
  return legendArray;
}
