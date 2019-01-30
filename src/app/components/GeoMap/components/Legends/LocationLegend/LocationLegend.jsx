import {
  LegendLabel,
  MarkerLegendItem,
} from 'components/GeoMap/components/Legends/MarkerLegend.styles';
import React from 'react';
import LocationMarkerIcon from 'components/GeoMap/components/Markers/LocationMarker/LocationMarker.icon';

const locationLegend = (legendName, index) =>
  legendName && (
    <MarkerLegendItem key={`legend-${index}`}>
      <LegendLabel>{legendName}</LegendLabel>
      <div>
        <LocationMarkerIcon
          size={20}
          extraStyle={{ position: 'relative', top: '25px', left: '15px' }}
        />
      </div>
    </MarkerLegendItem>
  );

export default locationLegend;
