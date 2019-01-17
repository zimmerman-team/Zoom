import update from 'immutability-helper';
import * as syncActions from 'services/actions/sync';

const initial = {
  data: null,
};

function updateSuccess(state, action) {
  return update(state, {
    data: { $set: action.data },
  });
}

function loginStatusMessage(state = initial, action) {
  switch (action.type) {
    case syncActions.SET_LOGIN_STATUS_MESSAGE:
      return updateSuccess(state, action);
    default:
      return state;
  }
}

const reducers = {
  loginStatusMessage,
};

export default reducers;
