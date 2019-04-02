import replace from 'lodash/replace';
import GeoMap from 'modules/home/HomeModule';
import React from 'react';

// Forms the correct path by putting the actual code of the project, country, etc.
// into the path. Applies only for detail pages or pages that contain a code/id.
export function formPath(code, pathz, chart) {
  let path = pathz;

  if (path.indexOf(':code') !== -1) {
    path = replace(path, ':code', code);
  }

  if (path.indexOf(':chart') !== -1) {
    path = replace(path, ':chart', chart);
  }
  return path;
}

// mainly used to get long lat and zoom data for
// different types of geomap charts
// like NL and KE focus pages
export function getFocus(chartType) {
  switch (chartType) {
    case 'focusNL':
      return { latitude: 52.1326, longitude: 5.2913, zoom: 7 };
    case 'focusKE':
      return { latitude: 0.0236, longitude: 37.9062, zoom: 6 };
    default:
      return { latitude: 15, longitude: 0, zoom: 2 };
  }
}
