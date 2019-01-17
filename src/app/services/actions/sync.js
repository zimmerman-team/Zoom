export const SET_LOGIN_STATUS_MESSAGE = 'SET_LOGIN_STATUS_MESSAGE';

export function setLoginStatusMessage(value) {
  return {
    type: SET_LOGIN_STATUS_MESSAGE,
    data: value,
  };
}
