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
