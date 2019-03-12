export const ALL_USER_CHARTS_INITIAL = 'ALL_USER_CHARTS_INITIAL';
export const ALL_USER_CHARTS_REQUEST = 'ALL_USER_CHARTS_REQUEST';
export const ALL_USER_CHARTS_SUCCESS = 'ALL_USER_CHARTS_SUCCESS';
export const ALL_USER_CHARTS_FAILED = 'ALL_USER_CHARTS_FAILED';

export function allUserChartsInitial() {
  return {
    type: ALL_USER_CHARTS_INITIAL
  };
}

export function allUserChartsRequest(values) {
  return {
    type: ALL_USER_CHARTS_REQUEST,
    values
  };
}

export function allUserChartsSuccess(data) {
  return {
    type: ALL_USER_CHARTS_SUCCESS,
    data
  };
}

export function allUserChartsFailed(error) {
  return {
    type: ALL_USER_CHARTS_FAILED,
    error
  };
}
