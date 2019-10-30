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
