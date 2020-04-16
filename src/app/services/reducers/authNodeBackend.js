import update from 'immutability-helper';
import * as authNodeActions from 'app/services/actions/authNodeBackend';
import * as syncActions from 'app/services/actions/sync';

const initial = {
  values: null,
  request: false,
  success: false,
  data: null,
  error: {
    status: null,
    statusText: null,
    result: null
  }
};

function updateInitial(state) {
  return update(state, {
    values: { $set: null },
    request: { $set: false },
    success: { $set: false },
    data: { $set: null },
    error: {
      status: { $set: null },
      statusText: { $set: null },
      result: { $set: null }
    }
  });
}

function updateRequest(state, action) {
  return update(state, {
    values: { $set: action.values },
    request: { $set: true },
    success: { $set: false },
    data: { $set: null },
    error: {
      status: { $set: null },
      statusText: { $set: null },
      result: { $set: null }
    }
  });
}

function updateSuccess(state, action) {
  return update(state, {
    values: { $set: null },
    request: { $set: false },
    success: { $set: true },
    data: { $set: action.data },
    error: {
      status: { $set: null },
      statusText: { $set: null },
      result: { $set: {} }
    }
  });
}

function updateFailed(state, action) {
  return update(state, {
    values: { $set: null },
    request: { $set: false },
    success: { $set: false },
    data: { $set: null },
    error: {
      status: { $set: action.error.status },
      statusText: { $set: action.error.statusText },
      result: { $set: action.error.result }
    }
  });
}

function currentUser(state = initial, action) {
  switch (action.type) {
    case authNodeActions.GET_CURRENT_USER_INITIAL:
      return updateInitial(state);
    // case authNodeActions.GET_CURRENT_USER_REQUEST:
    //   return updateRequest(state, action);
    case authNodeActions.GET_CURRENT_USER_SUCCESS:
      return updateSuccess(state, {
        data: { ...state.data, ...action.data }
      });
    case authNodeActions.GET_CURRENT_USER_FAILED:
      return updateFailed(state, action);
    case syncActions.CLEAR_USER_DATA:
      return initial;
    case syncActions.SET_USER_ID_TOKEN:
      return updateSuccess(state, {
        data: { ...state.data, idToken: action.data }
      });
    default:
      return state;
  }
}

function allUsers(state = initial, action) {
  switch (action.type) {
    case authNodeActions.GET_ALL_USERS_INITIAL:
      return updateInitial(state);
    case authNodeActions.GET_ALL_USERS_REQUEST:
      return updateRequest(state, action);
    case authNodeActions.GET_ALL_USERS_SUCCESS:
      return updateSuccess(state, action);
    case authNodeActions.GET_ALL_USERS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function authRoles(state = initial, action) {
  switch (action.type) {
    case authNodeActions.GET_ROLES_INITIAL:
      return updateInitial(state);
    case authNodeActions.GET_ROLES_REQUEST:
      return updateRequest(state, action);
    case authNodeActions.GET_ROLES_SUCCESS:
      return updateSuccess(state, action);
    case authNodeActions.GET_ROLES_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function authGroups(state = initial, action) {
  switch (action.type) {
    case authNodeActions.GET_GROUPS_INITIAL:
      return updateInitial(state);
    case authNodeActions.GET_GROUPS_REQUEST:
      return updateRequest(state, action);
    case authNodeActions.GET_GROUPS_SUCCESS:
      return updateSuccess(state, action);
    case authNodeActions.GET_GROUPS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function loadedGroup(state = initial, action) {
  switch (action.type) {
    case authNodeActions.GET_GROUP_INITIAL:
      return updateInitial(state);
    case authNodeActions.GET_GROUP_REQUEST:
      return updateRequest(state, action);
    case authNodeActions.GET_GROUP_SUCCESS:
      return updateSuccess(state, action);
    case authNodeActions.GET_GROUP_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function editGroup(state = initial, action) {
  switch (action.type) {
    case authNodeActions.EDIT_GROUP_INITIAL:
      return updateInitial(state);
    case authNodeActions.EDIT_GROUP_REQUEST:
      return updateRequest(state, action);
    case authNodeActions.EDIT_GROUP_SUCCESS:
      return updateSuccess(state, action);
    case authNodeActions.EDIT_GROUP_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function loadedUser(state = initial, action) {
  switch (action.type) {
    case authNodeActions.GET_AUTH_USER_INITIAL:
      return updateInitial(state);
    case authNodeActions.GET_AUTH_USER_REQUEST:
      return updateRequest(state, action);
    case authNodeActions.GET_AUTH_USER_SUCCESS:
      return updateSuccess(state, action);
    case authNodeActions.GET_AUTH_USER_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function addUser(state = initial, action) {
  switch (action.type) {
    case authNodeActions.ADD_AUTH_USER_INITIAL:
      return updateInitial(state);
    case authNodeActions.ADD_AUTH_USER_REQUEST:
      return updateRequest(state, action);
    case authNodeActions.ADD_AUTH_USER_SUCCESS:
      return updateSuccess(state, action);
    case authNodeActions.ADD_AUTH_USER_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function deleteUser(state = initial, action) {
  switch (action.type) {
    case authNodeActions.DELETE_AUTH_USER_INITIAL:
      return updateInitial(state);
    case authNodeActions.DELETE_AUTH_USER_REQUEST:
      return updateRequest(state, action);
    case authNodeActions.DELETE_AUTH_USER_SUCCESS:
      return updateSuccess(state, action);
    case authNodeActions.DELETE_AUTH_USER_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function editUser(state = initial, action) {
  switch (action.type) {
    case authNodeActions.EDIT_AUTH_USER_INITIAL:
      return updateInitial(state);
    case authNodeActions.EDIT_AUTH_USER_REQUEST:
      return updateRequest(state, action);
    case authNodeActions.EDIT_AUTH_USER_SUCCESS:
      return updateSuccess(state, action);
    case authNodeActions.EDIT_AUTH_USER_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function addGroup(state = initial, action) {
  switch (action.type) {
    case authNodeActions.ADD_AUTH_GROUP_INITIAL:
      return updateInitial(state);
    case authNodeActions.ADD_AUTH_GROUP_REQUEST:
      return updateRequest(state, action);
    case authNodeActions.ADD_AUTH_GROUP_SUCCESS:
      return updateSuccess(state, action);
    case authNodeActions.ADD_AUTH_GROUP_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function deleteGroup(state = initial, action) {
  switch (action.type) {
    case authNodeActions.DELETE_AUTH_GROUP_INITIAL:
      return updateInitial(state);
    case authNodeActions.DELETE_AUTH_GROUP_REQUEST:
      return updateRequest(state, action);
    case authNodeActions.DELETE_AUTH_GROUP_SUCCESS:
      return updateSuccess(state, action);
    case authNodeActions.DELETE_AUTH_GROUP_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

const reducers = {
  currentUser,
  allUsers,
  authRoles,
  authGroups,
  loadedGroup,
  editGroup,
  loadedUser,
  addUser,
  deleteUser,
  editUser,
  addGroup,
  deleteGroup
};

export default reducers;
