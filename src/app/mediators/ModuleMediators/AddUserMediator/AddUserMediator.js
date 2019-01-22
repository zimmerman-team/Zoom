/* base */
import React from 'react';

/* components */
import AddUserModule from 'modules/UserManagement/AddUser/AddUserModule';

class AddUserMediator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      lastName: '',
      firstName: '',
    };

    this.changeEmail = this.changeEmail.bind(this);
    this.changeLastName = this.changeLastName.bind(this);
    this.changeFirstName = this.changeFirstName.bind(this);
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

  render() {
    return (
      <AddUserModule
        email={this.state.email}
        lastName={this.state.lastName}
        firstName={this.state.firstName}
        changeEmail={this.changeEmail}
        changeLastName={this.changeLastName}
        changeFirstName={this.changeFirstName}
      />
    );
  }
}

export default AddUserMediator;
