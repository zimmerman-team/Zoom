import React from 'react';
import CircleMarkerIcon from 'components/geo/GeoMap/components/Markers/CircleMarker/CircleMarker.icon';
import {
  MarkerLegendItem,
  LegendLabel,
  LegendIcon,
} from 'components/geo/GeoMap/components/Legends/MarkerLegend.styles';

const circleLegend = (legendName, index) =>
  legendName && (
    <MarkerLegendItem key={`legend-${index}`}>
      <LegendLabel>{legendName}</LegendLabel>
      <LegendIcon>
        <CircleMarkerIcon height={35} width={35} />
      </LegendIcon>
    </MarkerLegendItem>
  );

export default circleLegend;
