import {
  LegendLabel,
  LegendItem,
} from 'components/GeoMap/components/Legends/Legend.styles';
import React from 'react';
import LocationMarkerIcon from 'components/GeoMap/components/Markers/LocationMarker/LocationMarker.icon';

const locationLegend = (legendName, index) =>
  legendName && (
    <LegendItem key={`legend-${index}`}>
      <LegendLabel>{legendName}</LegendLabel>
      <div>
        <LocationMarkerIcon
          size={20}
          extraStyle={{ position: 'relative', top: '25px', left: '15px' }}
        />
      </div>
    </LegendItem>
  );

export default locationLegend;
