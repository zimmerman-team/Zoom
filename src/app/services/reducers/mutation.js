import update from 'immutability-helper';

import * as actions from 'app/services/actions/mutation';

const initial = {
  data: null,
};

function geoLocation(state = initial, action) {
  switch (action.type) {
    case actions.GEOLOCATION_REQUEST:
      return update(state, { data: { $set: null } });
    case actions.GEOLOCATION_DONE:
      return update(state, { data: { $set: action.data } });
    default:
      return state;
  }
}

function fileSource(state = initial, action) {
  switch (action.type) {
    case actions.FILE_SOURCE_REQUEST:
      return update(state, { data: { $set: null } });
    case actions.FILE_SOURCE_DONE:
      return update(state, { data: { $set: action.data } });
    default:
      return state;
  }
}

function file(state = initial, action) {
  switch (action.type) {
    case actions.FILE_REQUEST:
      return update(state, { data: { $set: null } });
    case actions.FILE_DONE:
      return update(state, { data: { $set: action.data } });
    default:
      return state;
  }
}

const reducers = {
  geoLocation,
  fileSource,
  file,
};

export default reducers;
