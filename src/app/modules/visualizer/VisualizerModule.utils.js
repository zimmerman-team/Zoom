import replace from 'lodash/replace';

// Forms the correct path by putting the actual code of the project, country, etc.
// into the path. Applies only for detail pages or pages that contain a code/id.
export function formPath(code, path) {
  if (path.indexOf('code') !== -1) {
    return replace(path, ':code', code);
  }
  return path;
}
