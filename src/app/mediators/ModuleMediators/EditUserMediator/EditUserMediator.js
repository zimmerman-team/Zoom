/* base */
import React from 'react';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

/* components */
import EditUserModule from 'modules/UserManagement/EditUser/EditUserModule';

/* actions */
import { updateUserRequest } from 'services/actions/nodeBackend';

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
    // userRole: { label: '', value: '', _id: '' },
    // organisation: { label: '', value: '', _id: '' },
    // userGroups: [],
    // userRoles: []
  };

  componentDidMount = () => {
    this.props.auth0Client.getUser(this.props.match.params.userId, this);
    // this.props.auth0Client.getUserGroups(this);
    // this.props.auth0Client.getUserRoles(this);
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

  // changeUserRole = e => {
  //   this.setState({ userRole: e });
  // };

  // changeOrganisation = e => {
  //   this.setState({ organisation: e });
  // };

  submitForm = e => {
    e.preventDefault();
    this.props.auth0Client.editUser(
      this.props.match.params.userId,
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this,
      () =>
        this.props.dispatch(
          updateUserRequest({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
          })
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
        email={this.state.email}
        success={this.state.success}
        secondaryInfoMessage={this.state.secondaryInfoMessage}
        errorMessage={this.state.errorMessage}
        lastName={this.state.lastName}
        firstName={this.state.firstName}
        // userRole={this.state.userRole}
        // organisation={this.state.organisation}
        changeEmail={this.changeEmail}
        changeLastName={this.changeLastName}
        changeFirstName={this.changeFirstName}
        submitForm={this.submitForm}
        // roleSelected={this.state.userRole}
        // changeUserRole={this.changeUserRole}
        // orgSelected={this.state.organisation}
        // changeOrganisation={this.changeOrganisation}
        // orgOptions={this.state.userGroups}
        // roleOptions={this.state.userRoles}
        dataIsChanged={this.checkIfDataHasChanged()}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    userToEdit: state.userToEdit
  };
};

export default withRouter(connect(mapStateToProps)(EditUserMediator));
