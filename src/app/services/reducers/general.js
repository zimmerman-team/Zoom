import update from 'immutability-helper';
import * as actions from 'services/actions/general';

/* consts */
import paneTypes from '__consts__/PaneTypesConst';
import initialState from '__consts__/InitialChartDataConst';

const initial = {
  open: paneTypes.none,
  chartData: { ...initialState },
  paneData: {
    chartType: '',
    selectedSources: [],
    yearRange: '1992,2018',
    subIndicators1: [],
    subIndicators2: []
  },
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
      return update(state, { chartData: { $set: { ...state.chartData } } });
    case actions.STORE_CHART_DATA_DONE:
      return update(state, {
        chartData: { $set: { ...state.chartData, ...action.data } }
      });
    default:
      return state;
  }
}

function paneData(state = initial, action) {
  switch (action.type) {
    case actions.STORE_PANE_DATA_REQUEST:
      return update(state, { paneData: { $set: { ...state.paneData } } });
    case actions.STORE_PANE_DATA_DONE:
      return update(state, {
        paneData: { $set: { ...state.paneData, ...action.data } }
      });
    default:
      return state;
  }
}

const reducers = {
  paneData,
  chartData,
  stepData,
  dataPaneOpen
};

export default reducers;
