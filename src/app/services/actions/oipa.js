export const ACTIVITIES_INITIAL = 'ACTIVITIES_INITIAL';
export const ACTIVITIES_REQUEST = 'ACTIVITIES_REQUEST';
export const ACTIVITIES_SUCCESS = 'ACTIVITIES_SUCCESS';
export const ACTIVITIES_FAILED = 'ACTIVITIES_FAILED';

export function activitiesInitial() {
  return {
    type: ACTIVITIES_INITIAL,
  };
}

export function activitiesRequest(values) {
  return {
    type: ACTIVITIES_REQUEST,
    values: values,
  };
}

export function activitiesSuccess(data) {
  return {
    type: ACTIVITIES_SUCCESS,
    data: data,
  };
}

export function activitiesFailed(error) {
  return {
    type: ACTIVITIES_FAILED,
    error: error,
  };
}
