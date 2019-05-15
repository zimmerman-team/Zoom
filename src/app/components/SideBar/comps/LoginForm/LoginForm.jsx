/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* actions */
import * as syncActions from 'services/actions/sync';
/* components */
import theme from 'theme/Theme';
import IconSignIn from 'assets/icons/IconSignIn';
import {
  ComponentBase,
  ErrorMessage,
  ErrorText,
  FormButton,
  InfoText,
  Link,
  LoginHeader,
  LoginHeaderLabel,
  TextField
} from 'components/SideBar/comps/LoginForm/LoginForm.styles';
import ForgetPassword from 'components/SideBar/comps/ForgetPassword/ForgetPassword';
/* utils */
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

const propTypes = {
  loginStatusMessage: PropTypes.shape({
    original: PropTypes.shape({
      error: PropTypes.string,
      error_description: PropTypes.string
    }),
    code: PropTypes.string,
    description: PropTypes.string,
    error: PropTypes.string,
    error_description: PropTypes.string
  })
};
const defaultProps = {
  loginStatusMessage: null
};

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: null,
      view: 'login'
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.changeView = this.changeView.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.setStatusMessage = this.setStatusMessage.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.loginStatusMessage, prevProps.loginStatusMessage)) {
      this.setState({ error: this.props.loginStatusMessage });
    }
  }

  componentWillUnmount() {
    this.props.dispatch(
      syncActions.setForgotPasswordEmailSent({
        value: false,
        email: ''
      })
    );
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.auth0Client.signIn(
      this.state.username,
      this.state.password,
      this.setStatusMessage
    );
  }

  setStatusMessage(message) {
    this.props.dispatch(syncActions.setLoginStatusMessage(message));
  }

  changeView() {
    this.setState(prevState => ({
      error: null,
      view: prevState.view === 'login' ? 'forget_password' : 'login'
    }));
  }

  render() {
    const greetingName =
      get(this.props.user, 'firstName', '') !== ''
        ? `${get(this.props.user, 'firstName', '')} ${get(
            this.props.user,
            'lastName',
            ''
          )}`
        : get(this.props.user, 'email', '');
    const textFieldTheme = {
      borderStyle: this.state.error ? 'solid' : 'none',
      borderColor: this.state.error ? theme.color.aidsFondsRed : 'none'
    };
    let headerText = this.props.user
      ? `Welcome ${greetingName}`
      : 'Sign in registered users';
    if (!this.props.user) {
      headerText =
        this.state.view === 'login'
          ? 'Sign in registered users'
          : 'Forgot password';
    }
    return (
      <ComponentBase onSubmit={this.onSubmit}>
        <LoginHeader>
          <IconSignIn />
          <LoginHeaderLabel size="small">{headerText}</LoginHeaderLabel>
        </LoginHeader>

        {this.props.user ? (
          <FormButton
            onClick={() => {
              this.props.auth0Client.signOut().then(() => {
                this.props.dispatch(syncActions.clearUserData());
              });
            }}
            data-cy="sidebar-logout-button"
          >
            Sign out
          </FormButton>
        ) : (
          <React.Fragment>
            {this.state.view === 'login' && (
              <React.Fragment>
                <TextField
                  placeholder="Email or Username"
                  onChange={this.onUsernameChange}
                  theme={textFieldTheme}
                  data-cy="sidebar-login-email-input"
                />
                <TextField
                  placeholder="Password"
                  type="password"
                  onChange={this.onPasswordChange}
                  theme={textFieldTheme}
                  data-cy="sidebar-pass-email-input"
                />

                <FormButton
                  type="submit"
                  onClick={this.onSubmit}
                  disabled={
                    this.state.username === '' || this.state.password === ''
                  }
                  data-cy="sidebar-login-button"
                >
                  Sign in
                </FormButton>
              </React.Fragment>
            )}

            <ForgetPassword
              view={this.state.view}
              changeView={this.changeView}
              auth0Client={this.props.auth0Client}
            />

            <InfoText size="small">
              Would you like to have access to Zoom? Please contact Jane Doe,{' '}
              <Link href="mailto:janedoe@aidsfonds.nl">
                janedoe@aidsfonds.nl
              </Link>
            </InfoText>

            {this.state.error && (
              <ErrorMessage>
                <ErrorText size="small">
                  {this.state.error.description}
                </ErrorText>
                <ErrorText size="small">
                  Do need help <Link href="#">logging in</Link>?
                </ErrorText>
              </ErrorMessage>
            )}

            {get(this.props.forgotPasswordEmailSent, 'value', false) && (
              <ErrorMessage>
                <ErrorText size="small">
                  Email sent to {this.props.forgotPasswordEmailSent.email} (if
                  user with this email exists)
                </ErrorText>
              </ErrorMessage>
            )}
          </React.Fragment>
        )}
      </ComponentBase>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data,
    loginStatusMessage: state.loginStatusMessage.data,
    forgotPasswordEmailSent: state.forgotPasswordEmailSent.data
  };
};

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default connect(mapStateToProps)(LoginForm);
