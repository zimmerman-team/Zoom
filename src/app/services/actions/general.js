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

export const SAVE_STEP_DATA_INITIAL = 'SAVE_STEP_DATA_INITIAL';
export const SAVE_STEP_DATA_REQUEST = 'SAVE_STEP_DATA_REQUEST';
export const SAVE_STEP_DATA_DONE = 'SAVE_STEP_DATA_DONE';

export function saveStepDataInitial() {
  return {
    type: SAVE_STEP_DATA_INITIAL
  };
}

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

// basically used to store the currently used panes data in redux
// (mainly the selections for dropdowns n stuff)
export const STORE_PANE_DATA_REQUEST = 'STORE_PANE_DATA_REQUEST';
export const STORE_PANE_DATA_DONE = 'STORE_PANE_DATA_DONE';

export function storePaneDataRequest(data) {
  return {
    type: STORE_PANE_DATA_REQUEST,
    data
  };
}

export function storePaneDataDone(data) {
  return {
    type: STORE_PANE_DATA_DONE,
    data
  };
}
