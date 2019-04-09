import update from 'immutability-helper';
import * as actions from 'services/actions/index';
import * as oipaActions from 'services/actions/oipa';
import * as nodeActions from 'services/actions/nodeBackend';
import { CREATE_DUPLICATE_CHART_INITIAL } from 'services/actions/nodeBackend';
import { CREATE_DUPLICATE_CHART_REQUEST } from 'services/actions/nodeBackend';
import { CREATE_DUPLICATE_CHART_SUCCESS } from 'services/actions/nodeBackend';
import { CREATE_DUPLICATE_CHART_FAILED } from 'services/actions/nodeBackend';

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

function user(state = initial, action) {
  switch (action.type) {
    case nodeActions.GET_USER_INITIAL:
      return updateInitial(state);
    case nodeActions.GET_USER_REQUEST:
      return updateRequest(state, action);
    case nodeActions.GET_USER_SUCCESS:
      return updateSuccess(state, action);
    case nodeActions.GET_USER_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function userAdded(state = initial, action) {
  switch (action.type) {
    case nodeActions.ADD_USER_INITIAL:
      return updateInitial(state);
    case nodeActions.ADD_USER_REQUEST:
      return updateRequest(state, action);
    case nodeActions.ADD_USER_SUCCESS:
      return updateSuccess(state, action);
    case nodeActions.ADD_USER_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function userUpdated(state = initial, action) {
  switch (action.type) {
    case nodeActions.UPDATE_USER_INITIAL:
      return updateInitial(state);
    case nodeActions.UPDATE_USER_REQUEST:
      return updateRequest(state, action);
    case nodeActions.UPDATE_USER_SUCCESS:
      return updateSuccess(state, action);
    case nodeActions.UPDATE_USER_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function usersTeam(state = initial, action) {
  switch (action.type) {
    case nodeActions.UPDATE_USERS_TEAM_INITIAL:
      return updateInitial(state);
    case nodeActions.UPDATE_USERS_TEAM__REQUEST:
      return updateRequest(state, action);
    case nodeActions.UPDATE_USERS_TEAM_SUCCESS:
      return updateSuccess(state, action);
    case nodeActions.UPDATE_USERS_TEAM_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function datasetAdded(state = initial, action) {
  switch (action.type) {
    case nodeActions.ADD_NEW_DATASET_INITIAL:
      return updateInitial(state);
    case nodeActions.ADD_NEW_DATASET_REQUEST:
      return updateRequest(state, action);
    case nodeActions.ADD_NEW_DATASET_SUCCESS:
      return updateSuccess(state, action);
    case nodeActions.ADD_NEW_DATASET_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function chartCreated(state = initial, action) {
  switch (action.type) {
    case nodeActions.CREATE_UPDATE_CHART_INITIAL:
      return updateInitial(state);
    case nodeActions.CREATE_UPDATE_CHART_REQUEST:
      return updateRequest(state, action);
    case nodeActions.CREATE_UPDATE_CHART_SUCCESS:
      return updateSuccess(state, action);
    case nodeActions.CREATE_UPDATE_CHART_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function chartResults(state = initial, action) {
  switch (action.type) {
    case nodeActions.GET_CHART_INITIAL:
      return updateInitial(state);
    case nodeActions.GET_CHART_REQUEST:
      return updateRequest(state, action);
    case nodeActions.GET_CHART_SUCCESS:
      return updateSuccess(state, action);
    case nodeActions.GET_CHART_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function userCharts(state = initial, action) {
  switch (action.type) {
    case nodeActions.GET_USER_CHARTS_INITIAL:
      return updateInitial(state);
    case nodeActions.GET_USER_CHARTS_REQUEST:
      return updateRequest(state, action);
    case nodeActions.GET_USER_CHARTS_SUCCESS:
      return updateSuccess(state, action);
    case nodeActions.GET_USER_CHARTS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function chartDeleted(state = initial, action) {
  switch (action.type) {
    case nodeActions.DELETE_CHART_INITIAL:
      return updateInitial(state);
    case nodeActions.DELETE_CHART_REQUEST:
      return updateRequest(state, action);
    case nodeActions.DELETE_CHART_SUCCESS:
      return updateSuccess(state, action);
    case nodeActions.DELETE_CHART_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function userDatasets(state = initial, action) {
  switch (action.type) {
    case nodeActions.GET_USER_DATASETS_INITIAL:
      return updateInitial(state);
    case nodeActions.GET_USER_DATASETS_REQUEST:
      return updateRequest(state, action);
    case nodeActions.GET_USER_DATASETS_SUCCESS:
      return updateSuccess(state, action);
    case nodeActions.GET_USER_DATASETS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function publicCharts(state = initial, action) {
  switch (action.type) {
    case nodeActions.GET_PUBLIC_CHARTS_INITIAL:
      return updateInitial(state);
    case nodeActions.GET_PUBLIC_CHARTS_REQUEST:
      return updateRequest(state, action);
    case nodeActions.GET_PUBLIC_CHARTS_SUCCESS:
      return updateSuccess(state, action);
    case nodeActions.GET_PUBLIC_CHARTS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function userDeleted(state = initial, action) {
  switch (action.type) {
    case nodeActions.DELETE_USER_INITIAL:
      return updateInitial(state);
    case nodeActions.DELETE_USER_REQUEST:
      return updateRequest(state, action);
    case nodeActions.DELETE_USER_SUCCESS:
      return updateSuccess(state, action);
    case nodeActions.DELETE_USER_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}
function datasetUpdated(state = initial, action) {
  switch (action.type) {
    case nodeActions.UPDATE_DATASET_INITIAL:
      return updateInitial(state);
    case nodeActions.UPDATE_DATASET_REQUEST:
      return updateRequest(state, action);
    case nodeActions.UPDATE_DATASET_SUCCESS:
      return updateSuccess(state, action);
    case nodeActions.UPDATE_DATASET_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}
function dupChartCreated(state = initial, action) {
  switch (action.type) {
    case nodeActions.CREATE_DUPLICATE_CHART_INITIAL:
      return updateInitial(state);
    case nodeActions.CREATE_DUPLICATE_CHART_REQUEST:
      return updateRequest(state, action);
    case nodeActions.CREATE_DUPLICATE_CHART_SUCCESS:
      return updateSuccess(state, action);
    case nodeActions.CREATE_DUPLICATE_CHART_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

const reducers = {
  dupChartCreated,
  datasetUpdated,
  publicCharts,
  userDatasets,
  chartDeleted,
  userCharts,
  chartResults,
  chartCreated,
  datasetAdded,
  usersTeam,
  userUpdated,
  userAdded,
  user,
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
  activityData,
  userDeleted
};

export default reducers;
