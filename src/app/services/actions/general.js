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
