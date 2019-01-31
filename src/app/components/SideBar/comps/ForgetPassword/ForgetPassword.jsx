/* base */
import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';

/* actions */
import * as syncActions from 'services/actions/sync';

/* components */
import {
  ForgotPassLink,
  TextField,
  FormButton,
} from '../LoginForm/LoginForm.styles';

const propTypes = {
  view: PropTypes.oneOf(['login', 'forget_password']),
  changeView: PropTypes.func,
};
const defaultProps = {
  view: 'login',
  changeView: null,
};

const validateEmail = mail => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
};

export class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      isEmailValid: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.setForgotPasswordStatusMessage = this.setForgotPasswordStatusMessage.bind(
      this,
    );
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqual(
        this.props.forgotPasswordEmailSent,
        prevProps.forgotPasswordEmailSent,
      )
    ) {
      this.setState({ email: '', isEmailValid: false });
      this.props.changeView();
    }
  }

  onEmailChange(e) {
    this.setState({
      email: e.target.value,
      isEmailValid: validateEmail(e.target.value),
    });
  }

  onSubmit() {
    this.props.auth0Client.forgetPassword(
      this.state.email,
      this.setForgotPasswordStatusMessage,
    );
  }

  setForgotPasswordStatusMessage(value = true) {
    this.props.dispatch(
      syncActions.setForgotPasswordEmailSent({
        value,
        email: this.state.email,
      }),
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.props.view === 'login' && (
          <ForgotPassLink size="xsmall" onClick={this.props.changeView}>
            Forgot password?
          </ForgotPassLink>
        )}
        {this.props.view === 'forget_password' && (
          <React.Fragment>
            <TextField
              placeholder="Email"
              theme={{ borderStyle: 'none' }}
              onChange={this.onEmailChange}
            />
            <FormButton
              onClick={this.onSubmit}
              disabled={!this.state.isEmailValid}
            >
              send recovery link
            </FormButton>
            <FormButton onClick={this.props.changeView}>cancel</FormButton>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    forgotPasswordEmailSent: state.forgotPasswordEmailSent.data,
  };
};

ForgetPassword.propTypes = propTypes;
ForgetPassword.defaultProps = defaultProps;

export default connect(mapStateToProps)(ForgetPassword);
