import React from 'react';
import CircleMarkerIcon from 'assets/icons/CircleMarkerIcon';
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
