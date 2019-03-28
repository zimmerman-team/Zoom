import replace from 'lodash/replace';

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
