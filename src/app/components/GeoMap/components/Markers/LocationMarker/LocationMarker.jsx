import SvgIconLocation from 'assets/icons/geomap/SvgIconLocation';
import { Marker } from 'react-map-gl';
import React from 'react';

// This component is specific for the react-map-gl, thus there's no story books
// or unit tests for it as a seperate component
const locationMarker = (indicator, index, setMarkerInfo, color) =>
  indicator && (
    <Marker
      key={`marker-${index}`}
      latitude={parseFloat(indicator.latitude)}
      longitude={parseFloat(indicator.longitude)}
      offsetTop={-28}
      offsetLeft={-16}
    >
      <div
        onMouseEnter={() => setMarkerInfo(indicator)}
        onMouseLeave={() => setMarkerInfo(null)}
      >
        <SvgIconLocation height={32} width={32} color={color} />
      </div>
    </Marker>
  );

export default locationMarker;
