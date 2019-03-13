/* base */
import React from 'react';
import filter from 'lodash/filter';
import { connect } from 'react-redux';

/* actions */
import * as nodeActions from 'services/actions/nodeBackend';

/* components */
import CreateTeamModule from 'modules/UserManagement/CreateTeam/CreateTeamModule';
import { formatUsersData } from './CreateTeamMediator.utils';
import { updateUsersTeamRequest } from 'services/sagas';

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
      isSortByOpen: false
    };

    this.setUsers = this.setUsers.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.changePage = this.changePage.bind(this);
    this.changeName = this.changeName.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.changeSortBy = this.changeSortBy.bind(this);
    this.addRemoveUser = this.addRemoveUser.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.addRemoveAllUsers = this.addRemoveAllUsers.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.changeIsSortByOpen = this.changeIsSortByOpen.bind(this);
    this.changeSearchKeyword = this.changeSearchKeyword.bind(this);
  }

  componentDidMount() {
    this.getAllUsers();
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  getAllUsers() {
    this.props.auth0Client.getAllUsers(
      this.setUsers,
      this.state.page,
      this.state.sort,
      this.state.searchKeyword !== ''
        ? ` AND name:${this.state.searchKeyword}*`
        : ''
    );
  }

  setUsers(data) {
    this.setState({
      allUsers: formatUsersData(data),
      totalPages: Math.ceil(data.total / 10)
    });
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ isSortByOpen: false });
    }
  }

  changeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  changePage(e) {
    this.setState(
      {
        page: e.selected
      },
      () => {
        this.getAllUsers();
      }
    );
  }

  changeSearchKeyword(e) {
    this.setState(
      {
        searchKeyword: e.target.value
      },
      () => {
        this.getAllUsers();
      }
    );
  }

  changeSortBy(e) {
    this.setState(
      {
        sort: e.target.id
      },
      () => {
        this.getAllUsers();
      }
    );
  }

  changeIsSortByOpen() {
    this.setState(prevState => ({
      isSortByOpen: !prevState.isSortByOpen
    }));
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

  addRemoveAllUsers(e) {
    let values = [];
    if (e.target.checked) {
      values = this.state.allUsers.map(user => {
        return user.id;
      });
    }
    this.setState({ users: values });
  }

  submitForm(e) {
    const team = this.state.name;
    const users = this.state.users;

    e.preventDefault();
    this.props.auth0Client
      .addGroup(this.state.name, this.state.users, this)
      .then(() => {
        // and after everything has been succesfully done on auth0
        // we save the new user roles in zoombackend
        this.props.dispatch(
          nodeActions.updateUsersTeamRequest({
            user: {
              authId: this.props.auth0Client.getProfile().sub
            },
            team,
            updateUsers: users.map(authId => {
              return { authId };
            })
          })
        );
      });
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
        addRemoveAllUsers={this.addRemoveAllUsers}
        changePage={this.changePage}
        submitForm={this.submitForm}
        isSortByOpen={this.state.isSortByOpen}
        changeIsSortByOpen={this.changeIsSortByOpen}
        setWrapperRef={this.setWrapperRef}
        changeSortBy={this.changeSortBy}
        selectedSortBy={this.state.sort}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    usersTeam: state.usersTeam
  };
};

export default connect(mapStateToProps)(CreateTeamMediator);
