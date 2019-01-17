/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import auth0Client from 'Auth';

/* actions */
import * as syncActions from 'services/actions/sync';

/* components */
import { aidsFondsRed, ZoomButton } from 'components/theme/ThemeSheet';
import IconSignIn from 'assets/icons/icon_sign_in.svg';
import {
  ComponentBase,
  LoginHeader,
  TextField,
  SignInButton,
  LoginHeaderLabel,
  ForgotPassLink,
  InfoText,
  Link,
  ErrorMessage,
  ErrorText,
} from './LoginForm.styles';

const propTypes = {
  loginStatusMessage: PropTypes.shape({
    original: PropTypes.shape({
      error: PropTypes.string,
      error_description: PropTypes.string,
    }),
    code: PropTypes.string,
    description: PropTypes.string,
    error: PropTypes.string,
    error_description: PropTypes.string,
  }),
};
const defaultProps = {
  loginStatusMessage: null,
};

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: null,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.setStatusMessage = this.setStatusMessage.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.loginStatusMessage, prevProps.loginStatusMessage)) {
      this.setState({ error: this.props.loginStatusMessage });
    }
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    auth0Client.signIn(
      this.state.username,
      this.state.password,
      this.setStatusMessage,
    );
  }

  setStatusMessage(message) {
    this.props.dispatch(syncActions.setLoginStatusMessage(message));
  }

  render() {
    const textFieldTheme = {
      borderStyle: this.state.error ? 'solid' : 'none',
      borderColor: this.state.error ? aidsFondsRed : 'none',
    };
    return (
      <ComponentBase onSubmit={this.onSubmit}>
        <LoginHeader>
          <IconSignIn />
          <LoginHeaderLabel size="small">
            {auth0Client.isAuthenticated()
              ? `Welcome ${auth0Client.getProfile().nickname}`
              : 'Sign in registered users'}
          </LoginHeaderLabel>
        </LoginHeader>

        {auth0Client.isAuthenticated() ? (
          <ZoomButton onClick={auth0Client.signOut}>Sign out</ZoomButton>
        ) : (
          <React.Fragment>
            <TextField
              placeholder="Email or Username"
              onChange={this.onUsernameChange}
              theme={textFieldTheme}
            />
            <TextField
              placeholder="Password"
              type="password"
              onChange={this.onPasswordChange}
              theme={textFieldTheme}
            />

            <SignInButton
              type="submit"
              disabled={
                this.state.username === '' || this.state.password === ''
              }
            >
              Sign in
            </SignInButton>

            <ForgotPassLink href="#">Forgot password?</ForgotPassLink>

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
          </React.Fragment>
        )}
      </ComponentBase>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginStatusMessage: state.loginStatusMessage.data,
  };
};

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default connect(mapStateToProps)(LoginForm);
