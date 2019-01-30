import { Popup } from 'react-map-gl';
import React from 'react';

// This component is specific for the react-map-gl, thus there's no story books
// or unit tests for it as a seperate component
const layerInfo = hoverLayerInfo =>
  hoverLayerInfo && (
    <Popup
      anchor="bottom"
      longitude={hoverLayerInfo.lngLat[0]}
      latitude={hoverLayerInfo.lngLat[1]}
      closeButton={false}
      className="info-marker-tooltip"
    >
      <p>{hoverLayerInfo.properties.name}</p>
      {hoverLayerInfo.properties.percentile && (
        <p>Percentile: {hoverLayerInfo.properties.percentile}</p>
      )}
      {hoverLayerInfo.properties.value && (
        <p>Value: {hoverLayerInfo.properties.value}</p>
      )}
    </Popup>
  );

export default layerInfo;
