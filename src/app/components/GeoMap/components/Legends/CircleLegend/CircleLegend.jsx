import React from 'react';
/* icon */
import CircleMarkerIcon from 'app/assets/icons/CircleMarkerIcon';
/* styles */
import { LegendItem } from 'app/components/GeoMap/components/Legends/Legend.styles';
import {
  CircleLegendItem,
  CircleLegendLabel,
  CircleLegendNum,
  CircleNumber
} from 'app/components/GeoMap/components/Legends/CircleLegend/CircleLegend.styles';
/* utils */
import { formatNumber } from 'app/utils/genericUtils';
/* components */
import Dotdotdot from 'react-dotdotdot';

const circleLegend = (legendName, index, min, max) => {
  const third = Math.round((max - min) / 3);

  const firstThird = min + third;
  const secondThird = firstThird + third;

  return (
    legendName && (
      <LegendItem key={`legend-${index}`}>
        <CircleLegendLabel data-cy="legendCircle-label">
          <Dotdotdot clamp={4}>{legendName}</Dotdotdot>
        </CircleLegendLabel>
        <CircleLegendItem>
          <CircleNumber>
            <CircleMarkerIcon
              height={19}
              width={19}
              margin="auto auto 3px auto"
            />
            <CircleLegendNum>{formatNumber(min)}</CircleLegendNum>
          </CircleNumber>
          <CircleNumber>
            <CircleMarkerIcon
              height={24}
              width={24}
              margin="auto auto 2px auto"
            />
            <CircleLegendNum>{formatNumber(firstThird)}</CircleLegendNum>
          </CircleNumber>
          <CircleNumber>
            <CircleMarkerIcon
              height={31}
              width={31}
              margin="auto auto 1px auto"
            />
            <CircleLegendNum>{formatNumber(secondThird)}</CircleLegendNum>
          </CircleNumber>
          <CircleNumber>
            <CircleMarkerIcon
              height={37}
              width={37}
              margin="auto auto 0 auto"
            />
            <CircleLegendNum>{formatNumber(max)}</CircleLegendNum>
          </CircleNumber>
        </CircleLegendItem>
      </LegendItem>
    )
  );
};

export default circleLegend;
