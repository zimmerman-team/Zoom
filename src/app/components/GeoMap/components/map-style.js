import { fromJS } from 'immutable';
import MAP_STYLE from 'components/GeoMap/data/map-style-basic-v8.json';

const mapStyle = {
  ...MAP_STYLE,
  sources: { ...MAP_STYLE.sources },
  layers: MAP_STYLE.layers.slice(),
};

export const colorStops = [
  [0, '#e4f4fb'],
  [1, '#c7e9f6'],
  [2, '#a5dcf1'],
  [3, '#7fcdec'],
  [4, '#51bae5'],
  [5, '#14a3dc'],
  [6, '#1293c6'],
  [7, '#0f81ae'],
  [8, '#0d6a90'],
];

// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer = fromJS({
  id: 'layer',
  source: 'layer',
  type: 'fill',
  interactive: true,
  paint: {
    'fill-color': {
      property: 'percentile',
      stops: colorStops,
    },
    'fill-opacity': 0.8,
  },
});

// This is used for borders
export const borderStyle = {
  id: 'outline',
  source: 'outline',
  type: 'line',
  paint: {
    'line-width': 1.5,
    'line-color': '#0080ef',
  },
};

export const defaultMapStyle = mapStyle;