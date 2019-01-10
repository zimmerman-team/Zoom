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
