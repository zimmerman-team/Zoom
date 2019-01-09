import update from 'immutability-helper';
import * as actions from 'services/actions/index';
import * as oipaActions from 'services/actions/oipa';

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

function countryActivities(state = initial, action) {
  switch (action.type) {
    case oipaActions.COUNTRY_ACTIVITIES_INITIAL:
      return updateInitial(state);
    case oipaActions.COUNTRY_ACTIVITIES_REQUEST:
      return updateRequest(state, action);
    case oipaActions.COUNTRY_ACTIVITIES_SUCCESS:
      return updateSuccess(state, action);
    case oipaActions.COUNTRY_ACTIVITIES_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function countryExcerpt(state = initial, action) {
  switch (action.type) {
    case actions.COUNTRY_EXCERPT_INITIAL:
      return updateInitial(state);
    case actions.COUNTRY_EXCERPT_REQUEST:
      return updateRequest(state, action);
    case actions.COUNTRY_EXCERPT_SUCCESS:
      return updateSuccess(state, action);
    case actions.COUNTRY_EXCERPT_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

const reducers = {
  upload,
  countryExcerpt,
  countryActivities,
};

export default reducers;
