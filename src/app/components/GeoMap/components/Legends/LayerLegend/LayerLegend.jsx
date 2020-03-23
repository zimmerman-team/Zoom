import React from 'react';
import Dotdotdot from 'react-dotdotdot';
/* styles */
import {
  LegendItem,
  LegendLabel,
  LegendNumber,
  LegendNumberContainer
} from 'components/GeoMap/components/Legends/Legend.styles';
import { ColorGradient } from 'components/GeoMap/components/Legends/LayerLegend/LayerLegend.styles';
/* utils */
import { formatNumber } from 'utils/genericUtils';

const layerLegend = (legendName, index, min, max) => {
  const third = Math.round((max - min) / 3);

  const firstThird = min + third;
  const secondThird = firstThird + third;

  return (
    legendName && (
      <LegendItem key={`legend-${index}`}>
        <Dotdotdot clamp={4}>
          <LegendLabel data-cy="legendLayer-label">{legendName}</LegendLabel>
        </Dotdotdot>
        <ColorGradient />
        <LegendNumberContainer>
          <LegendNumber>{formatNumber(min)}</LegendNumber>
          <LegendNumber>{formatNumber(firstThird)}</LegendNumber>
          <LegendNumber>{formatNumber(secondThird)}</LegendNumber>
          <LegendNumber>{formatNumber(max)}</LegendNumber>
        </LegendNumberContainer>
      </LegendItem>
    )
  );
};

export default layerLegend;
