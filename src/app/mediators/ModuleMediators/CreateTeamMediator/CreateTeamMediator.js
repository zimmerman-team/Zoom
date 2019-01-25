/* base */
import React from 'react';
import filter from 'lodash/filter';

/* components */
import CreateTeamModule from 'modules/UserManagement/CreateTeam/CreateTeamModule';
import { formatUsersData } from './CreateTeamMediator.utils';

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
      allUsers: [],
      sort: 'name:1',
      page: 0,
      totalPages: 0,
    };

    this.setUsers = this.setUsers.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.changePage = this.changePage.bind(this);
    this.changeName = this.changeName.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.addRemoveUser = this.addRemoveUser.bind(this);
    this.changeSearchKeyword = this.changeSearchKeyword.bind(this);
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.props.auth0Client.getAllUsers(
      this.setUsers,
      this.state.page,
      this.state.sort,
      this.state.searchKeyword !== ''
        ? ` AND name:${this.state.searchKeyword}*`
        : '',
    );
  }

  setUsers(data) {
    this.setState({
      allUsers: formatUsersData(data),
      totalPages: Math.ceil(data.total / 10),
    });
  }

  changeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  changePage(e) {
    this.setState(
      {
        page: e.selected,
      },
      () => {
        this.getAllUsers();
      },
    );
  }

  changeSearchKeyword(e) {
    this.setState(
      {
        searchKeyword: e.target.value,
      },
      () => {
        this.getAllUsers();
      },
    );
  }

  addRemoveUser(e) {
    let values = this.state.users;
    if (!e.target.checked) {
      values = filter(values, v => v !== e.target.id);
    } else {
      values.push(e.target.id);
    }
    this.setState({ users: values });
  }

  submitForm(e) {
    e.preventDefault();
    this.props.auth0Client.addGroup(this.state.name, this.state.users, this);
  }

  render() {
    return (
      <CreateTeamModule
        users={this.state.users}
        name={this.state.name}
        userOptions={this.state.allUsers}
        changeName={this.changeName}
        totalPages={this.state.totalPages}
        changeSearchKeyword={this.changeSearchKeyword}
        success={this.state.success}
        secondaryInfoMessage={this.state.secondaryInfoMessage}
        errorMessage={this.state.errorMessage}
        addRemoveUser={this.addRemoveUser}
        changePage={this.changePage}
        submitForm={this.submitForm}
      />
    );
  }
}

export default CreateTeamMediator;
