/* base */
import React from 'react';

/* components */
import AddUserModule from 'modules/UserManagement/AddUser/AddUserModule';

class AddUserMediator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      errorMessage: null,
      email: '',
      lastName: '',
      firstName: '',
      userRole: { label: '', value: '' },
      organisation: { label: '', value: '' },
    };

    this.submitForm = this.submitForm.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeLastName = this.changeLastName.bind(this);
    this.changeUserRole = this.changeUserRole.bind(this);
    this.changeFirstName = this.changeFirstName.bind(this);
    this.changeOrganisation = this.changeOrganisation.bind(this);
  }

  changeFirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  changeLastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  changeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  changeUserRole(e) {
    this.setState({
      userRole: e.option,
    });
  }

  changeOrganisation(e) {
    this.setState({
      organisation: e.option,
    });
  }

  submitForm(e) {
    e.preventDefault();
    this.props.auth0Client.addUser(
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this,
    );
  }

  render() {
    return (
      <AddUserModule
        email={this.state.email}
        success={this.state.success}
        errorMessage={this.state.errorMessage}
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
      />
    );
  }
}

export default AddUserMediator;
