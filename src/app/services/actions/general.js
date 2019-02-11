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
