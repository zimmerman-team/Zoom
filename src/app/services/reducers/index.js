import update from 'immutability-helper';
import * as actions from 'services/actions/index';
import * as oipaActions from 'services/actions/oipa';
import * as nodeActions from 'services/actions/nodeBackend';
import { ALL_USER_CHARTS_INITIAL } from 'services/actions/nodeBackend';
import { ALL_USER_CHARTS_REQUEST } from 'services/actions/nodeBackend';
import { ALL_USER_CHARTS_SUCCESS } from 'services/actions/nodeBackend';
import { ALL_USER_CHARTS_FAILED } from 'services/actions/nodeBackend';

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

function validate(state = initial, action) {
  switch (action.type) {
    case actions.VALIDATE_INITIAL:
      return updateInitial(state);
    case actions.VALIDATE_REQUEST:
      return updateRequest(state, action);
    case actions.VALIDATE_SUCCESS:
      return updateSuccess(state, action);
    case actions.VALIDATE_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function columns(state = initial, action) {
  switch (action.type) {
    case actions.GET_COLUMNS_INITIAL:
      return updateInitial(state);
    case actions.GET_COLUMNS_REQUEST:
      return updateRequest(state, action);
    case actions.GET_COLUMNS_SUCCESS:
      return updateSuccess(state, action);
    case actions.GET_COLUMNS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function fileErrors(state = initial, action) {
  switch (action.type) {
    case actions.GET_FILE_ERRORS_INITIAL:
      return updateInitial(state);
    case actions.GET_FILE_ERRORS_REQUEST:
      return updateRequest(state, action);
    case actions.GET_FILE_ERRORS_SUCCESS:
      return updateSuccess(state, action);
    case actions.GET_FILE_ERRORS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function errorCorrectionSave(state = initial, action) {
  switch (action.type) {
    case actions.ERROR_CORRECTION_SAVE_INITIAL:
      return updateInitial(state);
    case actions.ERROR_CORRECTION_SAVE_REQUEST:
      return updateRequest(state, action);
    case actions.ERROR_CORRECTION_SAVE_SUCCESS:
      return updateSuccess(state, action);
    case actions.ERROR_CORRECTION_SAVE_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function errorCorrectionDeleteRow(state = initial, action) {
  switch (action.type) {
    case actions.ERROR_CORRECTION_DELETE_ROW_INITIAL:
      return updateInitial(state);
    case actions.ERROR_CORRECTION_DELETE_ROW_REQUEST:
      return updateRequest(state, action);
    case actions.ERROR_CORRECTION_DELETE_ROW_SUCCESS:
      return updateSuccess(state, action);
    case actions.ERROR_CORRECTION_DELETE_ROW_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function manualMapData(state = initial, action) {
  switch (action.type) {
    case actions.MANUAL_MAP_DATA_INITIAL:
      return updateInitial(state);
    case actions.MANUAL_MAP_DATA_REQUEST:
      return updateRequest(state, action);
    case actions.MANUAL_MAP_DATA_SUCCESS:
      return updateSuccess(state, action);
    case actions.MANUAL_MAP_DATA_FAILED:
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

function activityData(state = initial, action) {
  switch (action.type) {
    case oipaActions.ACTIVITY_DATA_INITIAL:
      return updateInitial(state);
    case oipaActions.ACTIVITY_DATA_REQUEST:
      return updateRequest(state, action);
    case oipaActions.ACTIVITY_DATA_SUCCESS:
      return updateSuccess(state, action);
    case oipaActions.ACTIVITY_DATA_FAILED:
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

function allUserCharts(state = initial, action) {
  switch (action.type) {
    case nodeActions.ALL_USER_CHARTS_INITIAL:
      return updateInitial(state);
    case nodeActions.ALL_USER_CHARTS_REQUEST:
      return updateRequest(state, action);
    case nodeActions.ALL_USER_CHARTS_SUCCESS:
      return updateSuccess(state, action);
    case nodeActions.ALL_USER_CHARTS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

const reducers = {
  allUserCharts,
  upload,
  validate,
  columns,
  errorCorrectionSave,
  errorCorrectionDeleteRow,
  fileErrors,
  manualMapData,
  countryExcerpt,
  countryActivities,
  activityData
};

export default reducers;
