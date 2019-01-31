export const COUNTRY_ACTIVITIES_INITIAL = 'COUNTRY_ACTIVITIES_INITIAL';
export const COUNTRY_ACTIVITIES_REQUEST = 'COUNTRY_ACTIVITIES_REQUEST';
export const COUNTRY_ACTIVITIES_SUCCESS = 'COUNTRY_ACTIVITIES_SUCCESS';
export const COUNTRY_ACTIVITIES_FAILED = 'COUNTRY_ACTIVITIES_FAILED';

export function activitiesInitial() {
  return {
    type: COUNTRY_ACTIVITIES_INITIAL,
  };
}

export function countryActivitiesRequest(values) {
  return {
    type: COUNTRY_ACTIVITIES_REQUEST,
    values: values,
  };
}

export function countryActivitiesSuccess(data) {
  return {
    type: COUNTRY_ACTIVITIES_SUCCESS,
    data: data,
  };
}

export function countryActivitiesFailed(error) {
  return {
    type: COUNTRY_ACTIVITIES_FAILED,
    error: error,
  };
}

export const ACTIVITY_DATA_INITIAL = 'ACTIVITY_DATA_INITIAL';
export const ACTIVITY_DATA_REQUEST = 'ACTIVITY_DATA_REQUEST';
export const ACTIVITY_DATA_SUCCESS = 'ACTIVITY_DATA_SUCCESS';
export const ACTIVITY_DATA_FAILED = 'ACTIVITY_DATA_FAILED';

export function activityDataInitial() {
  return {
    type: ACTIVITY_DATA_INITIAL,
  };
}

export function activityDataRequest(values) {
  return {
    type: ACTIVITY_DATA_REQUEST,
    values: values,
  };
}

export function activityDataSuccess(data) {
  return {
    type: ACTIVITY_DATA_SUCCESS,
    data: data,
  };
}

export function activityDataFailed(error) {
  return {
    type: ACTIVITY_DATA_FAILED,
    error: error,
  };
}
