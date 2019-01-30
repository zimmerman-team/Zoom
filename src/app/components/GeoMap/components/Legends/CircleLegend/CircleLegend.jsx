import React from 'react';
import CircleMarkerIcon from 'components/GeoMap/components/Markers/CircleMarker/CircleMarker.icon';
import {
  LegendIcon,
  LegendLabel,
  MarkerLegendItem,
} from 'components/GeoMap/components/Legends/MarkerLegend.styles';

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
