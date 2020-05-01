export const colorStops = [[0, "#b7d0dd"], [8, "#034b65"]];

// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer = {
  id: "layer",
  source: "vector-layers",
  type: "fill",
  interactive: true,
  paint: {
    "fill-color": {
      property: "percentile",
      stops: colorStops,
    },
    "fill-opacity": 0.68,
  },
};

// This is used for borders
export const borderStyle = {
  id: "outline",
  source: "vector-layers",
  type: "line",
  paint: {
    "line-width": 1,
    "line-color": "#ffffff",
  },
};
