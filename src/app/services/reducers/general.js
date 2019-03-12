import update from 'immutability-helper';
import * as actions from 'services/actions/general';

/* consts */
import paneTypes from '__consts__/PaneTypesConst';

const initial = {
  open: paneTypes.none,
  stepzData: {}
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

function stepData(state = initial, action) {
  switch (action.type) {
    case actions.SAVE_STEP_DATA_REQUEST:
      return update(state, { stepzData: { $set: {} } });
    case actions.SAVE_STEP_DATA_DONE:
      return update(state, { stepzData: { $set: action.data } });
    default:
      return state;
  }
}

const reducers = {
  stepData,
  dataPaneOpen
};

export default reducers;
