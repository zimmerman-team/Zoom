import LocationMarkerIcon from 'components/geo/GeoMap/components/Markers/LocationMarker/LocationMarker.icon';
import { Marker } from 'react-map-gl';
import React from 'react';

// This component is specific for the react-map-gl, thus there's no story books
// or unit tests for it as a seperate component
const locationMarker = (indicator, index, setMarkerInfo) =>
  indicator && (
    <Marker
      key={`marker-${index}`}
      latitude={parseFloat(indicator['Lat location'])}
      longitude={parseFloat(indicator['Long location'])}
    >
      <LocationMarkerIcon
        size={20}
        onMouseEnter={() => setMarkerInfo(indicator)}
        onMouseLeave={() => setMarkerInfo(null)}
      />
    </Marker>
  );

export default locationMarker;
