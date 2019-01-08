import update from 'immutability-helper';
import * as actions from 'services/actions/index';

const initial = {
  values: null,
  request: false,
  success: false,
  data: null,
  error: {
    status: null,
    statusText: null,
    result: null,
  },
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
      result: { $set: null },
    },
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
      result: { $set: null },
    },
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
      result: { $set: {} },
    },
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
      result: { $set: action.error.result },
    },
  });
}

function upload(state = initial, action) {
  switch (action.type) {
    case actions.UPLOAD_INITIAL:
      return updateInitial(state);
    case actions.UPLOAD_REQUEST:
      return updateRequest(state, action);
    case actions.UPLOAD_SUCCESS:
      return updateSuccess(state, action);
    case actions.UPLOAD_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

const reducers = {
  upload,
};

export default reducers;
