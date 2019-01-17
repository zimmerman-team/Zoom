/* base */
import React from 'react';
import PropTypes from 'prop-types';
import auth0Client from 'Auth';
import IconSignIn from '../icon_sign_in.svg';

/* components */
import {
  ComponentBase,
  LoginHeader,
  TextField,
  SignInButton,
  LoginHeaderLabel,
  ForgotPassLink,
  InfoText,
  EmailLink,
} from './LoginForm.styles';

const propTypes = {};
const defaultProps = {};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    auth0Client.signIn(this.state.username, this.state.password);
  }

  render() {
    return (
      <ComponentBase onSubmit={this.onSubmit}>
        <LoginHeader>
          <IconSignIn />
          <LoginHeaderLabel size="small">
            Sign in registered users
          </LoginHeaderLabel>
        </LoginHeader>
        <TextField
          placeholder="Email or Username"
          onChange={this.onUsernameChange}
        />
        <TextField
          placeholder="Password"
          type="password"
          onChange={this.onPasswordChange}
        />

        <SignInButton
          type="submit"
          disabled={this.state.username === '' || this.state.password === ''}
        >
          Sign in
        </SignInButton>

        <ForgotPassLink>Forgot password?</ForgotPassLink>

        <InfoText size="small">
          Would you like to have access to Zoom? Please contact Jane Doe,{' '}
          <EmailLink href="mailto:janedoe@aidsfonds.nl">
            janedoe@aidsfonds.nl
          </EmailLink>
        </InfoText>
      </ComponentBase>
    );
  }
}

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default LoginForm;
