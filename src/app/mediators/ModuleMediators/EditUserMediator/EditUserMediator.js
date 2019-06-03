/* base */
import React from 'react';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
/* components */
import EditUserModule from 'modules/UserManagement/EditUser/EditUserModule';
/* actions */
import {
  getAuthUserRequest,
  editAuthUserRequest
} from 'services/actions/authNodeBackend';
/* utils */
import isEqual from 'lodash/isEqual';

class EditUserMediator extends React.Component {
  state = {
    success: false,
    errorMessage: null,
    secondaryInfoMessage: null,
    initialData: { firstName: '', lastName: '', email: '' },
    email: '',
    lastName: '',
    firstName: ''
  };

  componentDidMount = () => {
    this.props.dispatch(
      getAuthUserRequest(
        {
          userId: this.props.match.params.userId
        },
        { Authorization: `Bearer ${this.props.user.idToken}` }
      )
    );
  };

  componentDidUpdate = prevProps => {
    // Get user from back-end through auth0
    if (
      !isEqual(this.props.loadedUser, prevProps.loadedUser) &&
      this.props.loadedUser.data
    ) {
      this.setState({
        email: this.props.loadedUser.data.email,
        firstName: this.props.loadedUser.data.firstName,
        lastName: this.props.loadedUser.data.lastName,
        initialData: {
          email: this.props.loadedUser.data.email,
          firstName: this.props.loadedUser.data.firstName,
          lastName: this.props.loadedUser.data.lastName
        }
      });
    }
  };

  changeFirstName = e => {
    this.setState({ firstName: e.target.value });
  };

  changeLastName = e => {
    this.setState({ lastName: e.target.value });
  };

  changeEmail = e => {
    this.setState({ email: e.target.value });
  };

  submitForm = e => {
    e.preventDefault();
    this.props.dispatch(
      editAuthUserRequest(
        {
          userId: this.props.match.params.userId,
          email: this.state.email,
          name: this.state.firstName,
          surname: this.state.lastName
        },
        { Authorization: `Bearer ${this.props.user.idToken}` }
      )
    );
  };

  checkIfDataHasChanged = () => {
    return !isEqual(
      {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email
      },
      this.state.initialData
    );
  };

  render() {
    return (
      <EditUserModule
        viewOnly={this.props.viewOnly}
        email={this.state.email}
        success={this.props.editUser.success}
        secondaryInfoMessage={this.state.secondaryInfoMessage}
        errorMessage={this.state.errorMessage}
        lastName={this.state.lastName}
        firstName={this.state.firstName}
        changeEmail={this.changeEmail}
        changeLastName={this.changeLastName}
        changeFirstName={this.changeFirstName}
        submitForm={this.submitForm}
        dataIsChanged={this.checkIfDataHasChanged()}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser.data,
    loadedUser: state.loadedUser,
    editUser: state.editUser
  };
};

export default withRouter(connect(mapStateToProps)(EditUserMediator));
