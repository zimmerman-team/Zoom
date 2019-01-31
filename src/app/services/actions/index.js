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
    values,
  };
}

export function uploadSuccess(data) {
  return {
    type: UPLOAD_SUCCESS,
    data,
  };
}

export function uploadFailed(error) {
  return {
    type: UPLOAD_FAILED,
    error,
  };
}

export const VALIDATE_INITIAL = 'VALIDATE_INITIAL';
export const VALIDATE_REQUEST = 'VALIDATE_REQUEST';
export const VALIDATE_SUCCESS = 'VALIDATE_SUCCESS';
export const VALIDATE_FAILED = 'VALIDATE_FAILED';

export function validateInitial() {
  return {
    type: VALIDATE_INITIAL,
  };
}

export function validateRequest(values) {
  return {
    type: VALIDATE_REQUEST,
    values,
  };
}

export function validateSuccess(data) {
  return {
    type: VALIDATE_SUCCESS,
    data,
  };
}

export function validateFailed(error) {
  return {
    type: VALIDATE_FAILED,
    error,
  };
}

export const GET_COLUMNS_INITIAL = 'GET_COLUMNS_INITIAL';
export const GET_COLUMNS_REQUEST = 'GET_COLUMNS_REQUEST';
export const GET_COLUMNS_SUCCESS = 'GET_COLUMNS_SUCCESS';
export const GET_COLUMNS_FAILED = 'GET_COLUMNS_FAILED';

export function getColumnsInitial() {
  return {
    type: GET_COLUMNS_INITIAL,
  };
}

export function getColumnsRequest(values) {
  return {
    type: GET_COLUMNS_REQUEST,
    values,
  };
}

export function getColumnsSuccess(data) {
  return {
    type: GET_COLUMNS_SUCCESS,
    data,
  };
}

export function getColumnsFailed(error) {
  return {
    type: GET_COLUMNS_FAILED,
    error,
  };
}

export const GET_FILE_ERRORS_INITIAL = 'GET_FILE_ERRORS_INITIAL';
export const GET_FILE_ERRORS_REQUEST = 'GET_FILE_ERRORS_REQUEST';
export const GET_FILE_ERRORS_SUCCESS = 'GET_FILE_ERRORS_SUCCESS';
export const GET_FILE_ERRORS_FAILED = 'GET_FILE_ERRORS_FAILED';

export function getFileErrorsInitial() {
  return {
    type: GET_FILE_ERRORS_INITIAL,
  };
}

export function getFileErrorsRequest(values) {
  return {
    type: GET_FILE_ERRORS_REQUEST,
    values,
  };
}

export function getFileErrorsSuccess(data) {
  return {
    type: GET_FILE_ERRORS_SUCCESS,
    data,
  };
}

export function getFileErrorsFailed(error) {
  return {
    type: GET_FILE_ERRORS_FAILED,
    error,
  };
}

export const ERROR_CORRECTION_SAVE_INITIAL = 'ERROR_CORRECTION_SAVE_INITIAL';
export const ERROR_CORRECTION_SAVE_REQUEST = 'ERROR_CORRECTION_SAVE_REQUEST';
export const ERROR_CORRECTION_SAVE_SUCCESS = 'ERROR_CORRECTION_SAVE_SUCCESS';
export const ERROR_CORRECTION_SAVE_FAILED = 'ERROR_CORRECTION_SAVE_FAILED';

export function errorCorrectionSaveInitial() {
  return {
    type: ERROR_CORRECTION_SAVE_INITIAL,
  };
}

export function errorCorrectionSaveRequest(values) {
  return {
    type: ERROR_CORRECTION_SAVE_REQUEST,
    values,
  };
}

export function errorCorrectionSaveSuccess(data) {
  return {
    type: ERROR_CORRECTION_SAVE_SUCCESS,
    data,
  };
}

export function errorCorrectionSaveFailed(error) {
  return {
    type: ERROR_CORRECTION_SAVE_FAILED,
    error,
  };
}

export const ERROR_CORRECTION_DELETE_ROW_INITIAL =
  'ERROR_CORRECTION_DELETE_ROW_INITIAL';
export const ERROR_CORRECTION_DELETE_ROW_REQUEST =
  'ERROR_CORRECTION_DELETE_ROW_REQUEST';
export const ERROR_CORRECTION_DELETE_ROW_SUCCESS =
  'ERROR_CORRECTION_DELETE_ROW_SUCCESS';
export const ERROR_CORRECTION_DELETE_ROW_FAILED =
  'ERROR_CORRECTION_DELETE_ROW_FAILED';

export function errorCorrectionDeleteRowInitial() {
  return {
    type: ERROR_CORRECTION_DELETE_ROW_INITIAL,
  };
}

export function errorCorrectionDeleteRowRequest(values) {
  return {
    type: ERROR_CORRECTION_DELETE_ROW_REQUEST,
    values,
  };
}

export function errorCorrectionDeleteRowSuccess(data) {
  return {
    type: ERROR_CORRECTION_DELETE_ROW_SUCCESS,
    data,
  };
}

export function errorCorrectionDeleteRowFailed(error) {
  return {
    type: ERROR_CORRECTION_DELETE_ROW_FAILED,
    error,
  };
}

export const MANUAL_MAP_DATA_INITIAL = 'MANUAL_MAP_DATA_INITIAL';
export const MANUAL_MAP_DATA_REQUEST = 'MANUAL_MAP_DATA_REQUEST';
export const MANUAL_MAP_DATA_SUCCESS = 'MANUAL_MAP_DATA_SUCCESS';
export const MANUAL_MAP_DATA_FAILED = 'MANUAL_MAP_DATA_FAILED';

export function manualMapDataInitial() {
  return {
    type: MANUAL_MAP_DATA_INITIAL,
  };
}

export function manualMapDataRequest(values) {
  return {
    type: MANUAL_MAP_DATA_REQUEST,
    values,
  };
}

export function manualMapDataSuccess(data) {
  return {
    type: MANUAL_MAP_DATA_SUCCESS,
    data,
  };
}

export function manualMapDataFailed(error) {
  return {
    type: MANUAL_MAP_DATA_FAILED,
    error,
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
    values,
  };
}

export function countryExcerptSuccess(data) {
  return {
    type: COUNTRY_EXCERPT_SUCCESS,
    data,
  };
}

export function countryExcerptFailed(error) {
  return {
    type: COUNTRY_EXCERPT_FAILED,
    error,
  };
}
