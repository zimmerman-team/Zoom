import update from 'immutability-helper';
import * as actions from 'services/actions/general';

/* consts */
import paneTypes from '__consts__/PaneTypesConst';

const initial = {
  open: paneTypes.none
};

function dataPaneOpen(state = initial, action) {
  switch (action.type) {
    case actions.DATA_PANE_TOGGLE_REQUEST:
      return update(state, { open: { $set: paneTypes.none } });
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
