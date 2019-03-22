export const ALL_USER_CHARTS_INITIAL = 'ALL_USER_CHARTS_INITIAL';
export const ALL_USER_CHARTS_REQUEST = 'ALL_USER_CHARTS_REQUEST';
export const ALL_USER_CHARTS_SUCCESS = 'ALL_USER_CHARTS_SUCCESS';
export const ALL_USER_CHARTS_FAILED = 'ALL_USER_CHARTS_FAILED';

export function allUserChartsInitial() {
  return {
    type: ALL_USER_CHARTS_INITIAL
  };
}

export function allUserChartsRequest(values) {
  return {
    type: ALL_USER_CHARTS_REQUEST,
    values
  };
}

export function allUserChartsSuccess(data) {
  return {
    type: ALL_USER_CHARTS_SUCCESS,
    data
  };
}

export function allUserChartsFailed(error) {
  return {
    type: ALL_USER_CHARTS_FAILED,
    error
  };
}

export const GET_USER_INITIAL = 'GET_USER_INITIAL';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export function getUserInitial() {
  return {
    type: GET_USER_INITIAL
  };
}

export function getUserRequest(values) {
  return {
    type: GET_USER_REQUEST,
    values
  };
}

export function getUserSuccess(data) {
  return {
    type: GET_USER_SUCCESS,
    data
  };
}

export function getUserFailed(error) {
  return {
    type: GET_USER_FAILED,
    error
  };
}

export const ADD_USER_INITIAL = 'ADD_USER_INITIAL';
export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILED = 'ADD_USER_FAILED';

export function addUserInitial() {
  return {
    type: ADD_USER_INITIAL
  };
}

export function addUserRequest(values) {
  return {
    type: ADD_USER_REQUEST,
    values
  };
}

export function addUserSuccess(data) {
  return {
    type: ADD_USER_SUCCESS,
    data
  };
}

export function addUserFailed(error) {
  return {
    type: ADD_USER_FAILED,
    error
  };
}

export const UPDATE_USER_INITIAL = 'UPDATE_USER_INITIAL';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export function updateUserInitial() {
  return {
    type: UPDATE_USER_INITIAL
  };
}

export function updateUserRequest(values) {
  return {
    type: UPDATE_USER_REQUEST,
    values
  };
}

export function updateUserSuccess(data) {
  return {
    type: UPDATE_USER_SUCCESS,
    data
  };
}

export function updateUserFailed(error) {
  return {
    type: UPDATE_USER_FAILED,
    error
  };
}

// should be used with updating an array of users
export const UPDATE_USERS_TEAM_INITIAL = 'UPDATE_USERS_TEAM_INITIAL';
export const UPDATE_USERS_TEAM__REQUEST = 'UPDATE_USERS_TEAM__REQUEST';
export const UPDATE_USERS_TEAM_SUCCESS = 'UPDATE_USERS_TEAM_SUCCESS';
export const UPDATE_USERS_TEAM_FAILED = 'UPDATE_USERS_TEAM_FAILED';

export function updateUsersTeamInitial() {
  return {
    type: UPDATE_USERS_TEAM_INITIAL
  };
}

export function updateUsersTeamRequest(values) {
  return {
    type: UPDATE_USERS_TEAM__REQUEST,
    values
  };
}

export function updateUsersTeamSuccess(data) {
  return {
    type: UPDATE_USERS_TEAM_SUCCESS,
    data
  };
}

export function updateUsersTeamFailed(error) {
  return {
    type: UPDATE_USERS_TEAM_FAILED,
    error
  };
}

export const ADD_NEW_DATASET_INITIAL = 'ADD_NEW_DATASET_INITIAL';
export const ADD_NEW_DATASET_REQUEST = 'ADD_NEW_DATASET_REQUEST';
export const ADD_NEW_DATASET_SUCCESS = 'ADD_NEW_DATASET_SUCCESS';
export const ADD_NEW_DATASET_FAILED = 'ADD_NEW_DATASET_FAILED';

export function addNewDatasetInitial() {
  return {
    type: ADD_NEW_DATASET_INITIAL
  };
}

export function addNewDatasetRequest(values) {
  return {
    type: ADD_NEW_DATASET_REQUEST,
    values
  };
}

export function addNewDatasetSuccess(data) {
  return {
    type: ADD_NEW_DATASET_SUCCESS,
    data
  };
}

export function addNewDatasetFailed(error) {
  return {
    type: ADD_NEW_DATASET_FAILED,
    error
  };
}
