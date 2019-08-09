/* base */
import React from 'react';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
/* components */
import EditUserModule from 'modules/UserManagement/EditUser/EditUserModule';
/* actions */
import {
  getAuthUserRequest,
  editAuthUserRequest,
  getRolesRequest
} from 'services/actions/authNodeBackend';
/* utils */
import isEqual from 'lodash/isEqual';
import find from 'lodash/find';

/* consts */
import userRoles from '__consts__/UserRoleConst';

class EditUserMediator extends React.Component {
  state = {
    success: false,
    errorMessage: null,
    secondaryInfoMessage: null,
    initialData: {
      firstName: '',
      lastName: '',
      email: '',
      role: { label: '', value: '' }
    },
    email: '',
    lastName: '',
    firstName: '',
    role: { label: '', value: '' },
    userRoles: [],
    prevRoleId: ''
  };

  componentDidMount = () => {
    this.props.dispatch(
      getAuthUserRequest({
        userId: this.props.match.params.userId
      })
    );

    this.props.dispatch(
      getRolesRequest({
        userId: this.props.user.authId
      })
    );
  };

  componentDidUpdate = prevProps => {
    // Get user from back-end through auth0
    if (
      !isEqual(this.props.loadedUser, prevProps.loadedUser) &&
      this.props.loadedUser.data
    ) {
      let prevRoleId = null;

      if (this.props.roles.data) {
        prevRoleId = find(this.props.roles.data, [
          'name',
          this.props.loadedUser.data.role
        ]);
      }

      prevRoleId = prevRoleId ? prevRoleId._id : this.state.prevRoleId;

      this.setState({
        email: this.props.loadedUser.data.email,
        firstName: this.props.loadedUser.data.firstName,
        lastName: this.props.loadedUser.data.lastName,
        role: {
          label: this.props.loadedUser.data.role,
          value: this.props.loadedUser.data.role
        },
        prevRoleId,
        initialData: {
          email: this.props.loadedUser.data.email,
          firstName: this.props.loadedUser.data.firstName,
          lastName: this.props.loadedUser.data.lastName,
          role: {
            label: this.props.loadedUser.data.role,
            value: this.props.loadedUser.data.role
          }
        }
      });
    }

    if (!isEqual(this.props.roles, prevProps.roles) && this.props.roles.data) {
      let prevRoleId = null;

      if (this.props.loadedUser.data) {
        prevRoleId = find(this.props.roles.data, [
          'name',
          this.props.loadedUser.data.role
        ]);
      }

      prevRoleId = prevRoleId ? prevRoleId._id : this.state.prevRoleId;

      this.setState({
        userRoles: this.props.roles.data.map(roleItem => {
          return { label: roleItem.label, value: roleItem._id };
        }),
        prevRoleId
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

  changeRole = value => {
    this.setState({ role: value });
  };

  submitForm = e => {
    e.preventDefault();
    this.props.dispatch(
      editAuthUserRequest({
        adminId: this.props.user.authId,
        userId: this.props.match.params.userId,
        email: this.state.email,
        name: this.state.firstName,
        prevRoleId: this.state.prevRoleId,
        roleId: this.state.role.value,
        roleLabel: this.state.role.label,
        surname: this.state.lastName
      })
    );
  };

  checkIfDataHasChanged = () => {
    return !isEqual(
      {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        role: this.state.role
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
        changeUserRole={this.changeRole}
        submitForm={this.submitForm}
        dataIsChanged={this.checkIfDataHasChanged()}
        roleOptions={this.state.userRoles}
        isAdmin={
          this.props.user.role === userRoles.superAdm ||
          this.props.user.role === userRoles.admin
        }
        roleSelected={this.state.role.label}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    roles: state.authRoles,
    user: state.currentUser.data,
    loadedUser: state.loadedUser,
    editUser: state.editUser
  };
};

export default withRouter(connect(mapStateToProps)(EditUserMediator));
