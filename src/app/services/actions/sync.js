export const SET_LOGIN_STATUS_MESSAGE = 'SET_LOGIN_STATUS_MESSAGE';

export function setLoginStatusMessage(value) {
  return {
    type: SET_LOGIN_STATUS_MESSAGE,
    data: value
  };
}

export const SET_FORGOT_PASSWORD_EMAIL_SENT = 'SET_FORGOT_PASSWORD_EMAIL_SENT';

export function setForgotPasswordEmailSent(value) {
  return {
    type: SET_FORGOT_PASSWORD_EMAIL_SENT,
    data: value
  };
}

export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';

export function clearUserData() {
  return {
    type: CLEAR_USER_DATA
  };
}

export const SET_USER_ID_TOKEN = 'SET_USER_ID_TOKEN';

export function setUserIdToken(idToken) {
  return {
    type: SET_USER_ID_TOKEN,
    data: idToken
  };
}
