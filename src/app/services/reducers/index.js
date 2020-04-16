import update from 'immutability-helper';
import * as actions from 'app/services/actions/index';
import * as oipaActions from 'app/services/actions/oipa';
import * as syncActions from 'app/services/actions/sync';
import * as nodeActions from 'app/services/actions/nodeBackend';

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

function countryOrganisations(state = initial, action) {
  switch (action.type) {
    case oipaActions.COUNTRY_ORGANISATIONS_INITIAL:
      return updateInitial(state);
    case oipaActions.COUNTRY_ORGANISATIONS_REQUEST:
      return updateRequest(state, action);
    case oipaActions.COUNTRY_ORGANISATIONS_SUCCESS:
      return updateSuccess(state, action);
    case oipaActions.COUNTRY_ORGANISATIONS_FAILED:
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

function userPersist(state = initial, action) {
  switch (action.type) {
    case nodeActions.GET_USER_INITIAL:
      if (!state.userPersist) return updateInitial(state);
      return state;
    case nodeActions.GET_USER_SUCCESS:
      if (!state.userPersist) return updateSuccess(state, action);
      return state;
    case syncActions.CLEAR_USER_DATA:
      return initial;
    default:
      return state;
  }
}

function user(state = initial, action) {
  switch (action.type) {
    case nodeActions.GET_USER_INITIAL:
      return updateInitial(state);
    // case nodeActions.GET_USER_REQUEST:
    //   return updateRequest(state, action);
    case nodeActions.GET_USER_SUCCESS:
      return updateSuccess(state, action);
    case nodeActions.GET_USER_FAILED:
      return updateFailed(state, action);
    case syncActions.CLEAR_USER_DATA:
      return initial;
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

function chartDuplicated(state = initial, action) {
  switch (action.type) {
    case nodeActions.DUPLICATE_CHART_INITIAL:
      return updateInitial(state);
    case nodeActions.DUPLICATE_CHART_REQUEST:
      return updateRequest(state, action);
    case nodeActions.DUPLICATE_CHART_SUCCESS:
      return updateSuccess(state, action);
    case nodeActions.DUPLICATE_CHART_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function datasetDeleted(state = initial, action) {
  switch (action.type) {
    case nodeActions.DELETE_DATASET_INITIAL:
      return updateInitial(state);
    case nodeActions.DELETE_DATASET_REQUEST:
      return updateRequest(state, action);
    case nodeActions.DELETE_DATASET_SUCCESS:
      return updateSuccess(state, action);
    case nodeActions.DELETE_DATASET_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function archivedCharts(state = initial, action) {
  switch (action.type) {
    case nodeActions.ALL_ARCHIVED_CHARTS_INITIAL:
      return updateInitial(state);
    case nodeActions.ALL_ARCHIVED_CHARTS_REQUEST:
      return updateRequest(state, action);
    case nodeActions.ALL_ARCHIVED_CHARTS_SUCCESS:
      return updateSuccess(state, action);
    case nodeActions.ALL_ARCHIVED_CHARTS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function chartTrashEmpty(state = initial, action) {
  switch (action.type) {
    case nodeActions.EMPTY_CHART_TRASH_INITIAL:
      return updateInitial(state);
    case nodeActions.EMPTY_CHART_TRASH_REQUEST:
      return updateRequest(state, action);
    case nodeActions.EMPTY_CHART_TRASH_SUCCESS:
      return updateSuccess(state, action);
    case nodeActions.EMPTY_CHART_TRASH_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function datasetIds(state = initial, action) {
  switch (action.type) {
    case nodeActions.GET_DATASET_IDS_INITIAL:
      return updateInitial(state);
    case nodeActions.GET_DATASET_IDS_REQUEST:
      return updateRequest(state, action);
    case nodeActions.GET_DATASET_IDS_SUCCESS:
      return updateSuccess(state, action);
    case nodeActions.GET_DATASET_IDS_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

function dataset(state = initial, action) {
  switch (action.type) {
    case nodeActions.GET_DATASET_INITIAL:
      return updateInitial(state);
    case nodeActions.GET_DATASET_REQUEST:
      return updateRequest(state, action);
    case nodeActions.GET_DATASET_SUCCESS:
      return updateSuccess(state, action);
    case nodeActions.GET_DATASET_FAILED:
      return updateFailed(state, action);
    default:
      return state;
  }
}

const reducers = {
  dataset,
  datasetIds,
  chartTrashEmpty,
  archivedCharts,
  datasetDeleted,
  chartDuplicated,
  dupChartCreated,
  datasetUpdated,
  publicCharts,
  userDatasets,
  chartDeleted,
  userCharts,
  chartResults,
  chartCreated,
  datasetAdded,
  user,
  allUserCharts,
  upload,
  countryExcerpt,
  countryActivities,
  activityData,
  countryOrganisations,
  userPersist
};

export default reducers;
