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
  };

  componentDidMount = () => {
    this.props.auth0Client.getUser(this.props.match.params.userId, this);
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
        viewOnly={this.props.viewOnly}
        email={this.state.email}
        success={this.state.success}
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
    userToEdit: state.userToEdit
  };
};

export default withRouter(connect(mapStateToProps)(EditUserMediator));
