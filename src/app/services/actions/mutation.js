export const FILE_SOURCE_REQUEST = 'FILE_SOURCE_REQUEST';
export const FILE_SOURCE_DONE = 'FILE_SOURCE_DONE';

export function fileSourceRequest(data) {
  return {
    type: FILE_SOURCE_REQUEST,
    data,
  };
}

export function fileSourceDone(data) {
  return {
    type: FILE_SOURCE_DONE,
    data,
  };
}

export const FILE_REQUEST = 'FILE_REQUEST';
export const FILE_DONE = 'FILE_DONE';

export function fileRequest(data) {
  return {
    type: FILE_REQUEST,
    data,
  };
}

export function fileDone(data) {
  return {
    type: FILE_DONE,
    data,
  };
}

export const GEOLOCATION_REQUEST = 'GEOLOCATION_REQUEST';
export const GEOLOCATION_DONE = 'GEOLOCATION_DONE';

export function geoLocationRequest(data) {
  return {
    type: GEOLOCATION_REQUEST,
    data,
  };
}

export function geoLocationDone(data) {
  return {
    type: GEOLOCATION_DONE,
    data,
  };
}
