import { put, call, takeLatest } from 'redux-saga/effects';
import * as actions from 'services/actions/index';
import * as mutationActions from 'services/actions/mutation';
import * as api from 'services/index';
import * as oipaActions from 'services/actions/oipa';
import * as generalActions from 'services/actions/general';
import * as nodeActions from 'services/actions/nodeBackend';
import * as authNodeActions from 'services/actions/authNodeBackend';

export function* uploadRequest(action) {
  try {
    const response = yield call(
      api.uploadRequest,
      action.values,
      action.idToken
    );
    yield put(actions.uploadSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(actions.uploadFailed(error));
  }
}

export function* validateRequest(action) {
  try {
    const response = yield call(api.validateRequest, action.values);
    yield put(actions.validateSuccess(response));
  } catch (error) {
    yield put(actions.validateFailed(error));
  }
}

export function* getColumnsRequest(action) {
  try {
    const response = yield call(api.errorCorrectionRequest, action.values);
    yield put(actions.getColumnsSuccess(response));
  } catch (error) {
    yield put(actions.getColumnsFailed(error));
  }
}

export function* getFileErrorsRequest(action) {
  try {
    const response = yield call(api.errorCorrectionRequest, action.values);
    yield put(actions.getFileErrorsSuccess(response));
  } catch (error) {
    yield put(actions.getFileErrorsFailed(error));
  }
}

export function* errorCorrectionSaveRequest(action) {
  try {
    const response = yield call(api.errorCorrectionRequest, action.values);
    yield put(actions.errorCorrectionSaveSuccess(response));
  } catch (error) {
    yield put(actions.errorCorrectionSaveFailed(error));
  }
}

export function* errorCorrectionDeleteRowRequest(action) {
  try {
    const response = yield call(api.errorCorrectionRequest, action.values);
    yield put(actions.errorCorrectionDeleteRowSuccess(response));
  } catch (error) {
    yield put(actions.errorCorrectionDeleteRowFailed(error));
  }
}

export function* manualMapDataRequest(action) {
  try {
    const response = yield call(api.manualMapDataRequest, action.values);
    yield put(actions.manualMapDataSuccess(response));
  } catch (error) {
    yield put(actions.manualMapDataFailed(error));
  }
}

export function* geoLocationRequest(action) {
  yield put(mutationActions.geoLocationDone(action.data));
}

export function* fileSourceRequest(action) {
  yield put(mutationActions.fileSourceDone(action.data));
}

export function* fileRequest(action) {
  yield put(mutationActions.fileDone(action.data));
}

export function* countryActivitiesRequest(action) {
  try {
    const response = yield call(api.activitiesRequest, action.values);
    yield put(oipaActions.countryActivitiesSuccess(response));
  } catch (error) {
    yield put(oipaActions.countryActivitiesFailed(error));
  }
}

export function* activityDataRequest(action) {
  try {
    const response = yield call(api.activityRequest, action.values);
    yield put(oipaActions.activityDataSuccess(response));
  } catch (error) {
    yield put(oipaActions.activityDataFailed(error));
  }
}

export function* countryExcerptRequest(action) {
  try {
    const response = yield call(api.wikipediaExcerptRequest, action.values);
    yield put(actions.countryExcerptSuccess(response));
  } catch (error) {
    yield put(actions.countryExcerptFailed(error));
  }
}

export function* dataPaneToggleRequest(action) {
  yield put(generalActions.dataPaneToggleDone(action.open));
}

export function* countryOrganisationsRequest(action) {
  try {
    const response = yield call(
      api.transactionsAggregationsRequest,
      action.values
    );
    yield put(oipaActions.countryOrganisationsSuccess(response));
  } catch (error) {
    yield put(oipaActions.countryOrganisationsFailed(error));
  }
}

export function* saveStepDataRequest(action) {
  yield put(generalActions.saveStepDataDone(action.data));
}

export function* storeChartDataRequest(action) {
  yield put(generalActions.storeChartDataDone(action.data));
}

export function* storePaneDataRequest(action) {
  yield put(generalActions.storePaneDataDone(action.data));
}

export function* allUserChartsRequest(action) {
  try {
    const response = yield call(api.nodeBackendGetRequest, {
      endpoint: 'getAllCharts',
      values: action.values
    });
    yield put(nodeActions.allUserChartsSuccess(response.data));
  } catch (error) {
    yield put(
      nodeActions.allUserChartsFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* getUserRequest(action) {
  try {
    const response = yield call(api.nodeBackendGetRequest, {
      endpoint: 'getUser',
      values: action.values
    });
    yield put(nodeActions.getUserSuccess(response.data));
  } catch (error) {
    yield put(
      nodeActions.getUserFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* deleteUserRequest(action) {
  try {
    const response = yield call(api.nodeBackendPostRequest, {
      endpoint: 'deleteUser',
      values: { delId: action.values.userId }
    });
    yield put(nodeActions.deleteUserSuccess(response.data));
  } catch (error) {
    yield put(
      nodeActions.deleteUserFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* addUserRequest(action) {
  try {
    const response = yield call(api.nodeBackendPostRequest, {
      endpoint: 'addNewUser',
      values: action.values
    });
    yield put(nodeActions.addUserSuccess(response.data));
  } catch (error) {
    yield put(
      nodeActions.addUserFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* updateUserRequest(action) {
  try {
    const response = yield call(api.nodeBackendPostRequest, {
      endpoint: 'updateUser',
      values: action.values
    });
    yield put(nodeActions.updateUserSuccess(response.data));
  } catch (error) {
    yield put(
      nodeActions.updateUserFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* updateUsersTeamRequest(action) {
  try {
    const response = yield call(api.nodeBackendPostRequest, {
      endpoint: 'updateUsersTeam',
      values: action.values
    });
    yield put(nodeActions.updateUsersTeamSuccess(response.data));
  } catch (error) {
    yield put(
      nodeActions.updateUsersTeamFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* addNewDatasetRequest(action) {
  try {
    const response = yield call(api.nodeBackendPostRequest, {
      endpoint: 'addNewDataset',
      values: action.values
    });
    yield put(nodeActions.addNewDatasetSuccess(response.data));
  } catch (error) {
    yield put(
      nodeActions.addNewDatasetFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* createUpdateChartRequest(action) {
  try {
    const response = yield call(api.nodeBackendPostRequest, {
      endpoint: 'updateCreateChart',
      values: action.values
    });
    yield put(nodeActions.createUpdateChartSuccess(response.data));
  } catch (error) {
    yield put(
      nodeActions.createUpdateChartFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* getChartRequest(action) {
  try {
    const response = yield call(api.nodeBackendGetRequest, {
      endpoint: 'getChart',
      values: action.values
    });
    yield put(nodeActions.getChartSuccess(response.data));
  } catch (error) {
    yield put(
      nodeActions.getChartFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* getUserChartsRequest(action) {
  try {
    const response = yield call(api.nodeBackendGetRequest, {
      endpoint: 'getAllCharts',
      values: action.values
    });
    yield put(nodeActions.getUserChartsSuccess(response.data));
  } catch (error) {
    yield put(
      nodeActions.getUserChartsFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* deleteChartRequest(action) {
  try {
    const response = yield call(api.nodeBackendPostRequest, {
      endpoint: 'deleteChart',
      values: action.values
    });
    yield put(nodeActions.deleteChartSuccess(response.data));
  } catch (error) {
    yield put(
      nodeActions.deleteChartFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* getUserDatasetsRequest(action) {
  try {
    const response = yield call(api.nodeBackendGetRequest, {
      endpoint: 'getOwnerDatasets',
      values: action.values
    });
    yield put(nodeActions.getUserDatasetsSuccess(response.data));
  } catch (error) {
    yield put(
      nodeActions.getUserDatasetsFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* getPublicChartsRequest(action) {
  try {
    const response = yield call(api.nodeBackendGetRequest, {
      endpoint: 'getPublicCharts',
      values: action.values
    });
    yield put(nodeActions.getPublicChartsSuccess(response.data));
  } catch (error) {
    yield put(
      nodeActions.getPublicChartsFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* updateDatasetRequest(action) {
  try {
    const response = yield call(api.nodeBackendPostRequest, {
      endpoint: 'updateDataset',
      values: action.values
    });
    yield put(nodeActions.updateDatasetSuccess(response.data));
  } catch (error) {
    yield put(
      nodeActions.updateDatasetFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* createDuplicateChartRequest(action) {
  try {
    const response = yield call(api.nodeBackendPostRequest, {
      endpoint: 'updateCreateChart',
      values: action.values
    });
    yield put(nodeActions.createDuplicateChartSuccess(response.data));
  } catch (error) {
    yield put(
      nodeActions.createDuplicateChartFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* duplicateChartRequest(action) {
  try {
    const response = yield call(api.nodeBackendPostRequest, {
      endpoint: 'duplicateChart',
      values: action.values
    });
    yield put(nodeActions.duplicateChartSuccess(response.data));
  } catch (error) {
    yield put(
      nodeActions.duplicateChartFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* updateTeamAndUsersOfItRequest(action) {
  try {
    const response = yield call(api.nodeBackendPostRequest, {
      endpoint: 'updateTeamAndUsersOfIt',
      values: action.values
    });
    yield put(nodeActions.updateTeamAndUsersOfItSuccess(response.data));
  } catch (error) {
    yield put(
      nodeActions.updateTeamAndUsersOfItFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* deleteTeamRequest(action) {
  try {
    const response = yield call(api.nodeBackendPostRequest, {
      endpoint: 'deleteTeam',
      values: action.values
    });
    yield put(nodeActions.deleteGroupSuccess(response.data));
  } catch (error) {
    yield put(
      nodeActions.deleteGroupFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* deleteDatasetRequest(action) {
  try {
    const response = yield call(api.nodeBackendDeleteRequest, {
      endpoint: 'deleteDataset',
      values: action.values
    });
    yield put(nodeActions.deleteDatasetSuccess(response.data));
  } catch (error) {
    yield put(
      nodeActions.deleteDatasetFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* getPublicChartRequest(action) {
  try {
    const response = yield call(api.nodeBackendGetRequest, {
      endpoint: 'getOnePublicChart',
      values: action.values
    });
    yield put(nodeActions.getChartSuccess(response.data));
  } catch (error) {
    yield put(
      nodeActions.getChartFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* allArchivedChartsRequest(action) {
  try {
    const response = yield call(api.nodeBackendGetRequest, {
      endpoint: 'getAllCharts',
      values: action.values
    });
    yield put(nodeActions.allArchivedChartsSuccess(response.data));
  } catch (error) {
    yield put(
      nodeActions.allArchivedChartsFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* emptyChartTrashRequest(action) {
  try {
    const response = yield call(api.nodeBackendDeleteRequest, {
      endpoint: 'emptyChartTrash',
      values: action.values
    });
    yield put(nodeActions.emptyChartTrashSuccess(response.data));
  } catch (error) {
    yield put(
      nodeActions.emptyChartTrashFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* getCurrentUserRequest(action) {
  try {
    const response = yield call(api.nodeBackendGetRequest, {
      endpoint: 'getUserFromAuth',
      values: action.values,
      headers: action.headers
    });
    yield put(authNodeActions.getCurrentUserSuccess(response.data));
  } catch (error) {
    yield put(
      authNodeActions.getCurrentUserFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* getAllUsersRequest(action) {
  try {
    const response = yield call(api.nodeBackendGetRequest, {
      endpoint: 'getAllUsers',
      values: action.values,
      headers: action.headers
    });
    yield put(authNodeActions.getAllUsersSuccess(response.data));
  } catch (error) {
    yield put(
      authNodeActions.getAllUsersFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* getRolesRequest(action) {
  try {
    const response = yield call(api.nodeBackendGetRequest, {
      endpoint: 'getUserRoles',
      values: action.values,
      headers: action.headers
    });
    yield put(authNodeActions.getRolesSuccess(response.data));
  } catch (error) {
    yield put(
      authNodeActions.getRolesFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* getGroupsRequest(action) {
  try {
    const response = yield call(api.nodeBackendGetRequest, {
      endpoint: 'getUserGroups',
      values: action.values,
      headers: action.headers
    });
    yield put(authNodeActions.getGroupsSuccess(response.data));
  } catch (error) {
    yield put(
      authNodeActions.getGroupsFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* getGroupRequest(action) {
  try {
    const response = yield call(api.nodeBackendGetRequest, {
      endpoint: 'getGroup',
      values: action.values,
      headers: action.headers
    });
    yield put(authNodeActions.getGroupSuccess(response.data));
  } catch (error) {
    yield put(
      authNodeActions.getGroupFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* editGroupRequest(action) {
  try {
    const response = yield call(api.nodeBackendPostRequest, {
      endpoint: 'editGroup',
      values: action.values,
      headers: action.headers
    });
    yield put(authNodeActions.editGroupSuccess(response.data));
  } catch (error) {
    yield put(
      authNodeActions.editGroupFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* getAuthUserRequest(action) {
  try {
    const response = yield call(api.nodeBackendGetRequest, {
      endpoint: 'getUserFromAuth',
      values: action.values,
      headers: action.headers
    });
    yield put(authNodeActions.getAuthUserSuccess(response.data));
  } catch (error) {
    yield put(
      authNodeActions.getAuthUserFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* addAuthUserRequest(action) {
  try {
    const response = yield call(api.nodeBackendPostRequest, {
      endpoint: 'addUser',
      values: action.values,
      headers: action.headers
    });
    yield put(authNodeActions.addAuthUserSuccess(response.data));
  } catch (error) {
    yield put(
      authNodeActions.addAuthUserFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* deleteAuthUserRequest(action) {
  try {
    const response = yield call(api.nodeBackendDeleteRequest, {
      endpoint: 'deleteUser',
      values: action.values,
      headers: action.headers
    });
    yield put(authNodeActions.deleteAuthUserSuccess(response.data));
  } catch (error) {
    yield put(
      authNodeActions.deleteAuthUserFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* editAuthUserRequest(action) {
  try {
    const response = yield call(api.nodeBackendPostRequest, {
      endpoint: 'editUser',
      values: action.values,
      headers: action.headers
    });
    yield put(authNodeActions.editAuthUserSuccess(response.data));
  } catch (error) {
    yield put(
      authNodeActions.editAuthUserFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* addAuthGroupRequest(action) {
  try {
    const response = yield call(api.nodeBackendPostRequest, {
      endpoint: 'addGroup',
      values: action.values,
      headers: action.headers
    });
    yield put(authNodeActions.addAuthGroupSuccess(response.data));
  } catch (error) {
    yield put(
      authNodeActions.addAuthGroupFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* deleteAuthGroupRequest(action) {
  try {
    const response = yield call(api.nodeBackendDeleteRequest, {
      endpoint: 'deleteGroup',
      values: action.values,
      headers: action.headers
    });
    yield put(authNodeActions.deleteAuthGroupSuccess(response.data));
  } catch (error) {
    yield put(
      authNodeActions.deleteAuthGroupFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* getDatasetIdsRequest(action) {
  try {
    const response = yield call(api.nodeBackendGetRequest, {
      endpoint: 'getDatasetIds',
      values: action.values
    });
    yield put(nodeActions.getDatasetIdsSuccess(response.data));
  } catch (error) {
    yield put(
      nodeActions.getDatasetIdsFailed({
        ...error.response,
        result: error.response.data
      })
    );
  }
}

export function* activityStatusIndRequest(action) {
  try {
    const response = yield call(
      api.transactionsAggregationsRequest,
      action.values
    );
    yield put(oipaActions.activityStatusIndSuccess(response));
  } catch (error) {
    yield put(oipaActions.activityStatusIndFailed(error));
  }
}

export function* transactionIndRequest(action) {
  try {
    const response = yield call(
      api.transactionsAggregationsRequest,
      action.values
    );
    yield put(oipaActions.transactionIndSuccess(response));
  } catch (error) {
    yield put(oipaActions.transactionIndFailed(error));
  }
}

export function* sectorIndRequest(action) {
  try {
    const response = yield call(
      api.transactionsAggregationsRequest,
      action.values
    );
    yield put(oipaActions.sectorIndSuccess(response));
  } catch (error) {
    yield put(oipaActions.sectorIndFailed(error));
  }
}

export function* iatiIndYearRequest(action) {
  try {
    const response = yield call(
      api.transactionsAggregationsRequest,
      action.values
    );
    yield put(oipaActions.iatiIndYearSuccess(response));
  } catch (error) {
    yield put(oipaActions.iatiIndYearFailed(error));
  }
}

function* sagas() {
  yield [
    takeLatest('GET_DATASET_IDS_REQUEST', getDatasetIdsRequest),
    takeLatest('EMPTY_CHART_TRASH_REQUEST', emptyChartTrashRequest),
    takeLatest('ALL_ARCHIVED_CHARTS_REQUEST', allArchivedChartsRequest),
    takeLatest('GET_PUBLIC_CHART_REQUEST', getPublicChartRequest),
    takeLatest('DELETE_DATASET_REQUEST', deleteDatasetRequest),
    takeLatest('DUPLICATE_CHART_REQUEST', duplicateChartRequest),
    takeLatest('CREATE_DUPLICATE_CHART_REQUEST', createDuplicateChartRequest),
    takeLatest('UPDATE_DATASET_REQUEST', updateDatasetRequest),
    takeLatest('GET_PUBLIC_CHARTS_REQUEST', getPublicChartsRequest),
    takeLatest('GET_USER_DATASETS_REQUEST', getUserDatasetsRequest),
    takeLatest('DELETE_CHART_REQUEST', deleteChartRequest),
    takeLatest('GET_USER_CHARTS_REQUEST', getUserChartsRequest),
    takeLatest('GET_CHART_REQUEST', getChartRequest),
    takeLatest('CREATE_UPDATE_CHART_REQUEST', createUpdateChartRequest),
    takeLatest('STORE_PANE_DATA_REQUEST', storePaneDataRequest),
    takeLatest('STORE_CHART_DATA_REQUEST', storeChartDataRequest),
    takeLatest('ADD_NEW_DATASET_REQUEST', addNewDatasetRequest),
    takeLatest('UPDATE_USERS_TEAM__REQUEST', updateUsersTeamRequest),
    takeLatest('UPDATE_USER_REQUEST', updateUserRequest),
    takeLatest('ADD_USER_REQUEST', addUserRequest),
    takeLatest('GET_USER_REQUEST', getUserRequest),
    takeLatest('ALL_USER_CHARTS_REQUEST', allUserChartsRequest),
    takeLatest('SAVE_STEP_DATA_REQUEST', saveStepDataRequest),
    takeLatest('DATA_PANE_TOGGLE_REQUEST', dataPaneToggleRequest),
    takeLatest('COUNTRY_ACTIVITIES_REQUEST', countryActivitiesRequest),
    takeLatest('UPLOAD_REQUEST', uploadRequest),
    takeLatest('VALIDATE_REQUEST', validateRequest),
    takeLatest('GET_COLUMNS_REQUEST', getColumnsRequest),
    takeLatest('ERROR_CORRECTION_SAVE_REQUEST', errorCorrectionSaveRequest),
    takeLatest(
      'ERROR_CORRECTION_DELETE_ROW_REQUEST',
      errorCorrectionDeleteRowRequest
    ),
    takeLatest('GET_FILE_ERRORS', getFileErrorsRequest),
    takeLatest('MANUAL_MAP_DATA_REQUEST', manualMapDataRequest),
    takeLatest('GEOLOCATION_REQUEST', geoLocationRequest),
    takeLatest('FILE_SOURCE_REQUEST', fileSourceRequest),
    takeLatest('FILE_REQUEST', fileRequest),
    takeLatest('ACTIVITY_DATA_REQUEST', activityDataRequest),
    takeLatest('COUNTRY_EXCERPT_REQUEST', countryExcerptRequest),
    takeLatest('COUNTRY_ORGANISATIONS_REQUEST', countryOrganisationsRequest),
    takeLatest('DELETE_USER_REQUEST', deleteUserRequest),
    takeLatest(
      'UPDATE_TEAM_AND_USERS_OF_IT__REQUEST',
      updateTeamAndUsersOfItRequest
    ),
    takeLatest('DELETE_GROUP_REQUEST', deleteTeamRequest),
    takeLatest('GET_CURRENT_USER_REQUEST', getCurrentUserRequest),
    takeLatest('GET_ALL_USERS_REQUEST', getAllUsersRequest),
    takeLatest('GET_ROLES_REQUEST', getRolesRequest),
    takeLatest('GET_GROUPS_REQUEST', getGroupsRequest),
    takeLatest('GET_GROUP_REQUEST', getGroupRequest),
    takeLatest('EDIT_GROUP_REQUEST', editGroupRequest),
    takeLatest('GET_AUTH_USER_REQUEST', getAuthUserRequest),
    takeLatest('ADD_AUTH_USER_REQUEST', addAuthUserRequest),
    takeLatest('DELETE_AUTH_USER_REQUEST', deleteAuthUserRequest),
    takeLatest('EDIT_AUTH_USER_REQUEST', editAuthUserRequest),
    takeLatest('ADD_AUTH_GROUP_REQUEST', addAuthGroupRequest),
    takeLatest('DELETE_AUTH_GROUP_REQUEST', deleteAuthGroupRequest),
    takeLatest('ACTIVITY_STATUS_IND_REQUEST', activityStatusIndRequest),
    takeLatest('TRANSACTION_IND_REQUEST', transactionIndRequest),
    takeLatest('SECTOR_IND_REQUEST', sectorIndRequest),
    takeLatest('IATI_IND_YEAR_REQUEST', iatiIndYearRequest)
  ];
}

export default sagas;
