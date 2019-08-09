export const GET_CURRENT_USER_INITIAL = 'GET_CURRENT_USER_INITIAL';
export const GET_CURRENT_USER_REQUEST = 'GET_CURRENT_USER_REQUEST';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_FAILED = 'GET_CURRENT_USER_FAILED';

export function getCurrentUserInitial() {
  return {
    type: GET_CURRENT_USER_INITIAL
  };
}

export function getCurrentUserRequest(values) {
  return {
    type: GET_CURRENT_USER_REQUEST,
    values
  };
}

export function getCurrentUserSuccess(data) {
  return {
    type: GET_CURRENT_USER_SUCCESS,
    data
  };
}

export function getCurrentUserFailed(error) {
  return {
    type: GET_CURRENT_USER_FAILED,
    error
  };
}

export const GET_ALL_USERS_INITIAL = 'GET_ALL_USERS_INITIAL';
export const GET_ALL_USERS_REQUEST = 'GET_ALL_USERS_REQUEST';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_FAILED = 'GET_ALL_USERS_FAILED';

export function getAllUsersInitial() {
  return {
    type: GET_ALL_USERS_INITIAL
  };
}

export function getAllUsersRequest(values) {
  return {
    type: GET_ALL_USERS_REQUEST,
    values
  };
}

export function getAllUsersSuccess(data) {
  return {
    type: GET_ALL_USERS_SUCCESS,
    data
  };
}

export function getAllUsersFailed(error) {
  return {
    type: GET_ALL_USERS_FAILED,
    error
  };
}

export const GET_ROLES_INITIAL = 'GET_ROLES_INITIAL';
export const GET_ROLES_REQUEST = 'GET_ROLES_REQUEST';
export const GET_ROLES_SUCCESS = 'GET_ROLES_SUCCESS';
export const GET_ROLES_FAILED = 'GET_ROLES_FAILED';

export function getRolesInitial() {
  return {
    type: GET_ROLES_INITIAL
  };
}

export function getRolesRequest(values) {
  return {
    type: GET_ROLES_REQUEST,
    values
  };
}

export function getRolesSuccess(data) {
  return {
    type: GET_ROLES_SUCCESS,
    data
  };
}

export function getRolesFailed(error) {
  return {
    type: GET_ROLES_FAILED,
    error
  };
}

export const GET_GROUPS_INITIAL = 'GET_GROUPS_INITIAL';
export const GET_GROUPS_REQUEST = 'GET_GROUPS_REQUEST';
export const GET_GROUPS_SUCCESS = 'GET_GROUPS_SUCCESS';
export const GET_GROUPS_FAILED = 'GET_GROUPS_FAILED';

export function getGroupsInitial() {
  return {
    type: GET_GROUPS_INITIAL
  };
}

export function getGroupsRequest(values) {
  return {
    type: GET_GROUPS_REQUEST,
    values
  };
}

export function getGroupsSuccess(data) {
  return {
    type: GET_GROUPS_SUCCESS,
    data
  };
}

export function getGroupsFailed(error) {
  return {
    type: GET_GROUPS_FAILED,
    error
  };
}

export const GET_GROUP_INITIAL = 'GET_GROUP_INITIAL';
export const GET_GROUP_REQUEST = 'GET_GROUP_REQUEST';
export const GET_GROUP_SUCCESS = 'GET_GROUP_SUCCESS';
export const GET_GROUP_FAILED = 'GET_GROUP_FAILED';

export function getGroupInitial() {
  return {
    type: GET_GROUP_INITIAL
  };
}

export function getGroupRequest(values) {
  return {
    type: GET_GROUP_REQUEST,
    values
  };
}

export function getGroupSuccess(data) {
  return {
    type: GET_GROUP_SUCCESS,
    data
  };
}

export function getGroupFailed(error) {
  return {
    type: GET_GROUP_FAILED,
    error
  };
}

export const EDIT_GROUP_INITIAL = 'EDIT_GROUP_INITIAL';
export const EDIT_GROUP_REQUEST = 'EDIT_GROUP_REQUEST';
export const EDIT_GROUP_SUCCESS = 'EDIT_GROUP_SUCCESS';
export const EDIT_GROUP_FAILED = 'EDIT_GROUP_FAILED';

export function editGroupInitial() {
  return {
    type: EDIT_GROUP_INITIAL
  };
}

export function editGroupRequest(values) {
  return {
    type: EDIT_GROUP_REQUEST,
    values
  };
}

export function editGroupSuccess(data) {
  return {
    type: EDIT_GROUP_SUCCESS,
    data
  };
}

export function editGroupFailed(error) {
  return {
    type: EDIT_GROUP_FAILED,
    error
  };
}

export const GET_AUTH_USER_INITIAL = 'GET_AUTH_USER_INITIAL';
export const GET_AUTH_USER_REQUEST = 'GET_AUTH_USER_REQUEST';
export const GET_AUTH_USER_SUCCESS = 'GET_AUTH_USER_SUCCESS';
export const GET_AUTH_USER_FAILED = 'GET_AUTH_USER_FAILED';

export function getAuthUserInitial() {
  return {
    type: GET_AUTH_USER_INITIAL
  };
}

export function getAuthUserRequest(values) {
  return {
    type: GET_AUTH_USER_REQUEST,
    values
  };
}

export function getAuthUserSuccess(data) {
  return {
    type: GET_AUTH_USER_SUCCESS,
    data
  };
}

export function getAuthUserFailed(error) {
  return {
    type: GET_AUTH_USER_FAILED,
    error
  };
}

export const ADD_AUTH_USER_INITIAL = 'ADD_AUTH_USER_INITIAL';
export const ADD_AUTH_USER_REQUEST = 'ADD_AUTH_USER_REQUEST';
export const ADD_AUTH_USER_SUCCESS = 'ADD_AUTH_USER_SUCCESS';
export const ADD_AUTH_USER_FAILED = 'ADD_AUTH_USER_FAILED';

export function addAuthUserInitial() {
  return {
    type: ADD_AUTH_USER_INITIAL
  };
}

export function addAuthUserRequest(values) {
  return {
    type: ADD_AUTH_USER_REQUEST,
    values
  };
}

export function addAuthUserSuccess(data) {
  return {
    type: ADD_AUTH_USER_SUCCESS,
    data
  };
}

export function addAuthUserFailed(error) {
  return {
    type: ADD_AUTH_USER_FAILED,
    error
  };
}

export const DELETE_AUTH_USER_INITIAL = 'DELETE_AUTH_USER_INITIAL';
export const DELETE_AUTH_USER_REQUEST = 'DELETE_AUTH_USER_REQUEST';
export const DELETE_AUTH_USER_SUCCESS = 'DELETE_AUTH_USER_SUCCESS';
export const DELETE_AUTH_USER_FAILED = 'DELETE_AUTH_USER_FAILED';

export function deleteAuthUserInitial() {
  return {
    type: DELETE_AUTH_USER_INITIAL
  };
}

export function deleteAuthUserRequest(values) {
  return {
    type: DELETE_AUTH_USER_REQUEST,
    values
  };
}

export function deleteAuthUserSuccess(data) {
  return {
    type: DELETE_AUTH_USER_SUCCESS,
    data
  };
}

export function deleteAuthUserFailed(error) {
  return {
    type: DELETE_AUTH_USER_FAILED,
    error
  };
}

export const EDIT_AUTH_USER_INITIAL = 'EDIT_AUTH_USER_INITIAL';
export const EDIT_AUTH_USER_REQUEST = 'EDIT_AUTH_USER_REQUEST';
export const EDIT_AUTH_USER_SUCCESS = 'EDIT_AUTH_USER_SUCCESS';
export const EDIT_AUTH_USER_FAILED = 'EDIT_AUTH_USER_FAILED';

export function editAuthUserInitial() {
  return {
    type: EDIT_AUTH_USER_INITIAL
  };
}

export function editAuthUserRequest(values) {
  return {
    type: EDIT_AUTH_USER_REQUEST,
    values
  };
}

export function editAuthUserSuccess(data) {
  return {
    type: EDIT_AUTH_USER_SUCCESS,
    data
  };
}

export function editAuthUserFailed(error) {
  return {
    type: EDIT_AUTH_USER_FAILED,
    error
  };
}

export const ADD_AUTH_GROUP_INITIAL = 'ADD_AUTH_GROUP_INITIAL';
export const ADD_AUTH_GROUP_REQUEST = 'ADD_AUTH_GROUP_REQUEST';
export const ADD_AUTH_GROUP_SUCCESS = 'ADD_AUTH_GROUP_SUCCESS';
export const ADD_AUTH_GROUP_FAILED = 'ADD_AUTH_GROUP_FAILED';

export function addAuthGroupInitial() {
  return {
    type: ADD_AUTH_GROUP_INITIAL
  };
}

export function addAuthGroupRequest(values) {
  return {
    type: ADD_AUTH_GROUP_REQUEST,
    values
  };
}

export function addAuthGroupSuccess(data) {
  return {
    type: ADD_AUTH_GROUP_SUCCESS,
    data
  };
}

export function addAuthGroupFailed(error) {
  return {
    type: ADD_AUTH_GROUP_FAILED,
    error
  };
}

export const DELETE_AUTH_GROUP_INITIAL = 'DELETE_AUTH_GROUP_INITIAL';
export const DELETE_AUTH_GROUP_REQUEST = 'DELETE_AUTH_GROUP_REQUEST';
export const DELETE_AUTH_GROUP_SUCCESS = 'DELETE_AUTH_GROUP_SUCCESS';
export const DELETE_AUTH_GROUP_FAILED = 'DELETE_AUTH_GROUP_FAILED';

export function deleteAuthGroupInitial() {
  return {
    type: DELETE_AUTH_GROUP_INITIAL
  };
}

export function deleteAuthGroupRequest(values) {
  return {
    type: DELETE_AUTH_GROUP_REQUEST,
    values
  };
}

export function deleteAuthGroupSuccess(data) {
  return {
    type: DELETE_AUTH_GROUP_SUCCESS,
    data
  };
}

export function deleteAuthGroupFailed(error) {
  return {
    type: DELETE_AUTH_GROUP_FAILED,
    error
  };
}
