/* base */
import React from 'react';
import connect from 'react-redux/es/connect/connect';
/* actions */
import {
  getRolesRequest,
  getGroupsRequest,
  addAuthUserInitial,
  addAuthUserRequest
} from 'services/actions/authNodeBackend';
/* utils */
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import isEqual from 'lodash/isEqual';
/* components */
import AddUserModule from 'modules/UserManagement/AddUser/AddUserModule';

class AddUserMediator extends React.Component {
  state = {
    success: false,
    errorMessage: null,
    secondaryInfoMessage: null,
    email: '',
    lastName: '',
    firstName: '',
    userRole: { label: '', value: '', _id: '' },
    organisation: { label: '', value: '', _id: '' },
    userGroups: [],
    userRoles: []
  };

  componentDidMount = () => {
    this.props.dispatch(
      getRolesRequest(
        {
          userId: this.props.user.authId
        },
        { Authorization: `Bearer ${this.props.user.idToken}` }
      )
    );
    this.props.dispatch(
      getGroupsRequest(
        {
          userId: this.props.user.authId
        },
        { Authorization: `Bearer ${this.props.user.idToken}` }
      )
    );
  };

  componentDidUpdate = prevProps => {
    if (!isEqual(this.props.roles, prevProps.roles)) {
      this.setState({ userRoles: this.props.roles.data });
    }
    if (!isEqual(this.props.groups, prevProps.groups)) {
      this.setState({ userGroups: sortBy(this.props.groups.data, ['label']) });
    }
  };

  componentWillUnmount = () => {
    this.props.dispatch(addAuthUserInitial());
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

  changeUserRole = e => {
    this.setState({ userRole: e });
  };

  changeOrganisation = e => {
    this.setState({ organisation: e });
  };

  submitForm = e => {
    e.preventDefault();
    this.props.dispatch(
      addAuthUserRequest(
        {
          email: this.state.email,
          name: this.state.firstName,
          surname: this.state.lastName,
          groupId: this.state.organisation._id,
          roleId: this.state.userRole._id
        },
        { Authorization: `Bearer ${this.props.user.idToken}` }
      )
    );
  };

  render = () => {
    return (
      <AddUserModule
        email={this.state.email}
        success={this.props.addUser.success}
        secondaryInfoMessage={this.state.secondaryInfoMessage}
        errorMessage={
          get(this.props.addUser.error, 'result', false)
            ? this.props.addUser.error.result
            : ''
        }
        lastName={this.state.lastName}
        firstName={this.state.firstName}
        userRole={this.state.userRole}
        organisation={this.state.organisation}
        changeEmail={this.changeEmail}
        changeLastName={this.changeLastName}
        changeFirstName={this.changeFirstName}
        submitForm={this.submitForm}
        roleSelected={this.state.userRole}
        changeUserRole={this.changeUserRole}
        orgSelected={this.state.organisation}
        changeOrganisation={this.changeOrganisation}
        orgOptions={this.state.userGroups}
        roleOptions={this.state.userRoles}
      />
    );
  };
}

const mapStateToProps = state => {
  return {
    roles: state.authRoles,
    groups: state.authGroups,
    user: state.currentUser.data,
    addUser: state.addUser
  };
};

export default connect(mapStateToProps)(AddUserMediator);
