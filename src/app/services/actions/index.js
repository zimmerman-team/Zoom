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
