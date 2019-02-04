import { fromJS } from 'immutable';
import MAP_STYLE from 'components/GeoMap/data/map-style-basic-v8.json';

const mapStyle = {
  ...MAP_STYLE,
  sources: { ...MAP_STYLE.sources },
  layers: MAP_STYLE.layers.slice(),
};

export const colorStops = [
  [0, '#E3E2FF'],
  [1, '#C7C5FF'],
  [2, '#ACA9FF'],
  [3, '#918DFF'],
  [4, '#7671FF'],
  [5, '#5A54FF'],
  [6, '#3F38FF'],
  [6, '#241CFF'],
  [7, '#2119FF'],
  [8, '#0900FF'],
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
    'fill-opacity': 0.68,
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
