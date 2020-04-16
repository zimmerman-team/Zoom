/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* actions */
import * as syncActions from 'app/services/actions/sync';
/* icons */
import IconSignIn from 'app/assets/icons/IconSignIn';
/* components */
import SimpleCheckbox from 'app/components/Checkbox/CheckBox';
import ForgetPassword from 'app/components/SideBar/comps/ForgetPassword/ForgetPassword';
/* utils */
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
/* styles */
import theme from 'app/theme/Theme';
import {
  ComponentBase,
  ErrorMessage,
  ErrorText,
  FormButton,
  InfoText,
  Link,
  LoginHeader,
  LoginHeaderLabel,
  TextField,
  SignInContainer,
  PrivacyText,
  PrivacyContainer,
  CheckBoxContainer
} from 'app/components/SideBar/comps/LoginForm/LoginForm.styles';

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
      view: 'login',
      privAccepted: true
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.changeView = this.changeView.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.setStatusMessage = this.setStatusMessage.bind(this);
    this.cantSignIn = this.cantSignIn.bind(this);
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
    if (!this.cantSignIn()) {
      this.props.auth0Client.signIn(
        this.state.username,
        this.state.password,
        this.setStatusMessage
      );
    }
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

  cantSignIn() {
    return (
      this.state.username === '' ||
      this.state.password === '' ||
      !this.state.privAccepted
    );
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

                <SignInContainer>
                  <FormButton
                    type="submit"
                    onClick={this.onSubmit}
                    disabled={this.cantSignIn()}
                    data-cy="sidebar-login-button"
                  >
                    Sign in
                  </FormButton>
                  <PrivacyContainer>
                    <CheckBoxContainer>
                      <SimpleCheckbox
                        checked={this.state.privAccepted}
                        onChange={(event, checked) =>
                          this.setState({ privAccepted: checked })
                        }
                      />
                    </CheckBoxContainer>
                    <PrivacyText>
                      I agree to the{' '}
                      <a href="/cookies" target="_blank">
                        cookie policy and the privacy statement
                      </a>
                    </PrivacyText>
                  </PrivacyContainer>
                </SignInContainer>
              </React.Fragment>
            )}

            <ForgetPassword
              view={this.state.view}
              changeView={this.changeView}
              auth0Client={this.props.auth0Client}
            />

            <InfoText size="small">
              Would you like to have access to Zoom? Please contact{' '}
              <Link href="mailto:data@aidsfonds.nl">data@aidsfonds.nl</Link>
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
    user: state.currentUser.data,
    loginStatusMessage: state.loginStatusMessage.data,
    forgotPasswordEmailSent: state.forgotPasswordEmailSent.data
  };
};

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default connect(mapStateToProps)(LoginForm);
