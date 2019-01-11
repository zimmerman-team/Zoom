export const UPLOAD_INITIAL = 'UPLOAD_INITIAL';
export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILED = 'UPLOAD_FAILED';

export function uploadInitial() {
  return {
    type: UPLOAD_INITIAL,
  };
}

export function uploadRequest(values) {
  return {
    type: UPLOAD_REQUEST,
    values: values,
  };
}

export function uploadSuccess(data) {
  return {
    type: UPLOAD_SUCCESS,
    data: data,
  };
}

export function uploadFailed(error) {
  return {
    type: UPLOAD_FAILED,
    error: error,
  };
}

export const COUNTRY_EXCERPT_INITIAL = 'COUNTRY_EXCERPT_INITIAL';
export const COUNTRY_EXCERPT_REQUEST = 'COUNTRY_EXCERPT_REQUEST';
export const COUNTRY_EXCERPT_SUCCESS = 'COUNTRY_EXCERPT_SUCCESS';
export const COUNTRY_EXCERPT_FAILED = 'COUNTRY_EXCERPT_FAILED';

export function countryExcerptInitial() {
  return {
    type: COUNTRY_EXCERPT_INITIAL,
  };
}

export function countryExcerptRequest(values) {
  return {
    type: COUNTRY_EXCERPT_REQUEST,
    values: values,
  };
}

export function countryExcerptSuccess(data) {
  return {
    type: COUNTRY_EXCERPT_SUCCESS,
    data: data,
  };
}

export function countryExcerptFailed(error) {
  return {
    type: COUNTRY_EXCERPT_FAILED,
    error: error,
  };
}
