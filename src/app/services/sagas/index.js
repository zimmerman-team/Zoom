import { put, call, takeLatest } from 'redux-saga/effects';
import * as actions from 'services/actions/index';
import * as mutationActions from 'services/actions/mutation';
import * as api from 'services/index';

export function* uploadRequest(action) {
  try {
    const response = yield call(api.uploadRequest, action.values);
    yield put(actions.uploadSuccess(response));
  } catch (error) {
    yield put(actions.uploadFailed(error));
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

function* sagas() {
  yield [
    takeLatest('UPLOAD_REQUEST', uploadRequest),
    takeLatest('GEOLOCATION_REQUEST', geoLocationRequest),
    takeLatest('FILE_SOURCE_REQUEST', fileSourceRequest),
    takeLatest('FILE_REQUEST', fileRequest),
  ];
}

export default sagas;
