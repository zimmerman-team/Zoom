import update from 'immutability-helper';
import * as actions from 'services/actions/general';

/* consts */
import paneTypes from '__consts__/PaneTypesConst';

const initial = {
  open: paneTypes.none,
  chartData: {},
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
      return update(state, { stepzData: { $set: { ...state.stepzData } } });
    case actions.SAVE_STEP_DATA_DONE:
      return update(state, {
        stepzData: { $set: { ...state.stepzData, ...action.data } }
      });
    default:
      return state;
  }
}

function chartData(state = initial, action) {
  switch (action.type) {
    case actions.STORE_CHART_DATA_REQUEST:
      return update(state, { chartData: { $set: {} } });
    case actions.STORE_CHART_DATA_DONE:
      return update(state, { chartData: { $set: action.data } });
    default:
      return state;
  }
}

const reducers = {
  chartData,
  stepData,
  dataPaneOpen
};

export default reducers;
