import update from 'immutability-helper';
import * as actions from 'services/actions/general';

const initial = {
  open: false
};

function dataPaneOpen(state = initial, action) {
  switch (action.type) {
    case actions.DATA_PANE_TOGGLE_REQUEST:
      return update(state, { open: { $set: false } });
    case actions.DATA_PANE_TOGGLE_DONE:
      return update(state, { open: { $set: action.open } });
    default:
      return state;
  }
}

const reducers = {
  dataPaneOpen
};

export default reducers;
