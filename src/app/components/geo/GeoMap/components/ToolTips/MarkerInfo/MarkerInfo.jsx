import { Popup } from 'react-map-gl';
import React from 'react';
import 'components/geo/GeoMap/components/ToolTips/MarkerInfo/MarkerInfo.css';
import { getMeasure } from 'components/geo/GeoMap/components/Markers/CircleMarker/CircleMarker';

// So if the marker changes in size depending on its value we use
// this function to get the offset top of the popup
// for now mainly used for the circle marker
function getOffsetTop(hoverMarkerInfo) {
  let offset = -20;
  if (
    hoverMarkerInfo.maxValue !== undefined &&
    hoverMarkerInfo.minValue !== undefined
  ) {
    const percentage = getMeasure(
      hoverMarkerInfo.value,
      hoverMarkerInfo.maxValue,
      hoverMarkerInfo.minValue,
    );
    offset = -percentage / 2;
  }
  return offset;
}

// This component is specific for the react-map-gl, thus there's no story books
// or unit tests for it as a seperate component
const markerInfo = hoverMarkerInfo =>
  hoverMarkerInfo && (
    <Popup
      tipSize={5}
      longitude={parseFloat(hoverMarkerInfo.longitude)}
      latitude={parseFloat(hoverMarkerInfo.latitude)}
      closeButton={false}
      className="info-marker-tooltip"
      offsetTop={getOffsetTop(hoverMarkerInfo)}
    >
      {hoverMarkerInfo.tooltipText}
    </Popup>
  );

export default markerInfo;
