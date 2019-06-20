export const COUNTRY_ACTIVITIES_INITIAL = 'COUNTRY_ACTIVITIES_INITIAL';
export const COUNTRY_ACTIVITIES_REQUEST = 'COUNTRY_ACTIVITIES_REQUEST';
export const COUNTRY_ACTIVITIES_SUCCESS = 'COUNTRY_ACTIVITIES_SUCCESS';
export const COUNTRY_ACTIVITIES_FAILED = 'COUNTRY_ACTIVITIES_FAILED';

export function activitiesInitial() {
  return {
    type: COUNTRY_ACTIVITIES_INITIAL
  };
}

export function countryActivitiesRequest(values) {
  return {
    type: COUNTRY_ACTIVITIES_REQUEST,
    values: values
  };
}

export function countryActivitiesSuccess(data) {
  return {
    type: COUNTRY_ACTIVITIES_SUCCESS,
    data: data
  };
}

export function countryActivitiesFailed(error) {
  return {
    type: COUNTRY_ACTIVITIES_FAILED,
    error: error
  };
}

export const ACTIVITY_DATA_INITIAL = 'ACTIVITY_DATA_INITIAL';
export const ACTIVITY_DATA_REQUEST = 'ACTIVITY_DATA_REQUEST';
export const ACTIVITY_DATA_SUCCESS = 'ACTIVITY_DATA_SUCCESS';
export const ACTIVITY_DATA_FAILED = 'ACTIVITY_DATA_FAILED';

export function activityDataInitial() {
  return {
    type: ACTIVITY_DATA_INITIAL
  };
}

export function activityDataRequest(values) {
  return {
    type: ACTIVITY_DATA_REQUEST,
    values: values
  };
}

export function activityDataSuccess(data) {
  return {
    type: ACTIVITY_DATA_SUCCESS,
    data: data
  };
}

export function activityDataFailed(error) {
  return {
    type: ACTIVITY_DATA_FAILED,
    error: error
  };
}

export const COUNTRY_ORGANISATIONS_INITIAL = 'COUNTRY_ORGANISATIONS_INITIAL';
export const COUNTRY_ORGANISATIONS_REQUEST = 'COUNTRY_ORGANISATIONS_REQUEST';
export const COUNTRY_ORGANISATIONS_SUCCESS = 'COUNTRY_ORGANISATIONS_SUCCESS';
export const COUNTRY_ORGANISATIONS_FAILED = 'COUNTRY_ORGANISATIONS_FAILED';

export function countryOrganisationsInitial() {
  return {
    type: COUNTRY_ORGANISATIONS_INITIAL
  };
}

export function countryOrganisationsRequest(values) {
  return {
    type: COUNTRY_ORGANISATIONS_REQUEST,
    values: values
  };
}

export function countryOrganisationsSuccess(data) {
  return {
    type: COUNTRY_ORGANISATIONS_SUCCESS,
    data: data
  };
}

export function countryOrganisationsFailed(error) {
  return {
    type: COUNTRY_ORGANISATIONS_FAILED,
    error: error
  };
}

export const ACTIVITY_STATUS_IND_INITIAL = 'ACTIVITY_STATUS_IND_INITIAL';
export const ACTIVITY_STATUS_IND_REQUEST = 'ACTIVITY_STATUS_IND_REQUEST';
export const ACTIVITY_STATUS_IND_SUCCESS = 'ACTIVITY_STATUS_IND_SUCCESS';
export const ACTIVITY_STATUS_IND_FAILED = 'ACTIVITY_STATUS_IND_FAILED';

export function activityStatusIndInitial() {
  return {
    type: ACTIVITY_STATUS_IND_INITIAL
  };
}

export function activityStatusIndRequest(values) {
  return {
    type: ACTIVITY_STATUS_IND_REQUEST,
    values: values
  };
}

export function activityStatusIndSuccess(data) {
  return {
    type: ACTIVITY_STATUS_IND_SUCCESS,
    data: data
  };
}

export function activityStatusIndFailed(error) {
  return {
    type: ACTIVITY_STATUS_IND_FAILED,
    error: error
  };
}
