/* base */
import React from 'react';

/* components */
import CreateTeamModule from 'modules/UserManagement/CreateTeam/CreateTeamModule';

class CreateTeamMediator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      errorMessage: null,
      secondaryInfoMessage: null,
      name: '',
      searchKeyword: '',
      users: [],
    };

    this.submitForm = this.submitForm.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeSearchKeyword = this.changeSearchKeyword.bind(this);
  }

  changeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  changeSearchKeyword(e) {
    this.setState({
      searchKeyword: e.target.value,
    });
  }

  submitForm(e) {
    e.preventDefault();
  }

  render() {
    return (
      <CreateTeamModule
        users={this.state.users}
        name={this.state.name}
        changeName={this.changeName}
        searchKeyword={this.state.searchKeyword}
        changeSearchKeyword={this.changeSearchKeyword}
        success={this.state.success}
        secondaryInfoMessage={this.state.secondaryInfoMessage}
        errorMessage={this.state.errorMessage}
      />
    );
  }
}

export default CreateTeamMediator;
