import React from 'react';
import {
  LayerLegendItem,
  LegendLabel,
} from 'components/GeoMap/components/Legends/LayerLegend/LayerLegend.styles';
import { colorStops } from 'components/GeoMap/components/map-style';

const layerLegend = (legendName, index) =>
  legendName && (
    <LayerLegendItem key={`legend-${index}`}>
      <LegendLabel>{legendName}</LegendLabel>
      <svg height={35} width="100%">
        <defs>
          <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colorStops[0][1]} />
            <stop
              offset="100%"
              stopColor={colorStops[colorStops.length - 1][1]}
            />
          </linearGradient>
        </defs>
        <rect x="10" y="10" width="95%" height="20" fill="url(#linear)" />
      </svg>
    </LayerLegendItem>
  );

export default layerLegend;
