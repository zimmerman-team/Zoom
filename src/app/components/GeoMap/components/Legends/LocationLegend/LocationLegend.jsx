import React from 'react';
import LocationMarkerIcon from 'components/GeoMap/components/Markers/LocationMarker/LocationMarker.icon';
import { LegendLabel } from 'components/GeoMap/components/Legends/Legend.styles';
import { LocationLegendItem } from './LocationLegend.style';

const locationLegend = (legendName, index) =>
  legendName && (
    <LocationLegendItem key={`legend-${index}`}>
      <LegendLabel>{legendName}</LegendLabel>
      <div>
        <LocationMarkerIcon
          size={20}
          extraStyle={{ position: 'relative', top: '25px', left: '15px' }}
        />
      </div>
    </LocationLegendItem>
  );

export default locationLegend;
