import { fromJS } from 'immutable';

export const colorStops = [[0, '#FFFFFF'], [8, '#0900FF']];

// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer = {
  id: 'layer',
  source: 'layer',
  type: 'fill',
  interactive: true,
  paint: {
    'fill-color': {
      property: 'percentile',
      stops: colorStops
    },
    'fill-opacity': 0.68
  }
};

// This is used for borders
export const borderStyle = {
  id: 'outline',
  source: 'outline',
  type: 'line',
  paint: {
    'line-width': 1.5,
    'line-color': '#0080ef'
  }
};
