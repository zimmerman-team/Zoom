export const DATA_PANE_TOGGLE_REQUEST = 'DATA_PANE_TOGGLE_REQUEST';
export const DATA_PANE_TOGGLE_DONE = 'DATA_PANE_TOGGLE_DONE';

export function dataPaneToggleRequest(open) {
  return {
    type: DATA_PANE_TOGGLE_REQUEST,
    open
  };
}

export function dataPaneToggleDone(open) {
  return {
    type: DATA_PANE_TOGGLE_DONE,
    open
  };
}

export const SAVE_STEP_DATA_REQUEST = 'SAVE_STEP_DATA_REQUEST';
export const SAVE_STEP_DATA_DONE = 'SAVE_STEP_DATA_DONE';

export function saveStepDataRequest(data) {
  return {
    type: SAVE_STEP_DATA_REQUEST,
    data
  };
}

export function saveStepDataDone(data) {
  return {
    type: SAVE_STEP_DATA_DONE,
    data
  };
}

// basically used to store the currently editable chart in redux
export const STORE_CHART_DATA_REQUEST = 'STORE_CHART_DATA_REQUEST';
export const STORE_CHART_DATA_DONE = 'STORE_CHART_DATA_DONE';

export function storeChartDataRequest(data) {
  return {
    type: STORE_CHART_DATA_REQUEST,
    data
  };
}

export function storeChartDataDone(data) {
  return {
    type: STORE_CHART_DATA_DONE,
    data
  };
}
