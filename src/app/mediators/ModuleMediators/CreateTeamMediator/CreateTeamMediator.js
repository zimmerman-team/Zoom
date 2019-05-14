/* base */
import React from 'react';
import filter from 'lodash/filter';
import { connect } from 'react-redux';
/* actions */
import { updateUsersTeamRequest } from 'services/actions/nodeBackend';
/* components */
import CreateTeamModule from 'modules/UserManagement/CreateTeam/CreateTeamModule';
import { formatUsersData } from './CreateTeamMediator.utils';

class CreateTeamMediator extends React.Component {
  state = {
    loading: false,
    success: false,
    errorMessage: null,
    secondaryInfoMessage: null,
    name: '',
    searchKeyword: '',
    users: [],
    allUsers: [],
    paginatedUsers: [],
    sort: 'name',
    page: 0,
    totalPages: 0,
    isSortByOpen: false
  };

  componentDidMount = () => {
    this.getAllUsers(true);
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside);
  };

  getAllUsers = initialLoad => {
    if (initialLoad) {
      this.props.auth0Client.getAllUsers(this.setUsers);
    } else {
      this.setUsers(this.state.allUsers, false);
    }
  };

  setUsers = (data, initialLoad = true) => {
    const result = formatUsersData(
      data,
      initialLoad,
      this.state.page,
      this.state.sort,
      this.state.searchKeyword
    );
    this.setState(prevState => ({
      allUsers: result.allUsers,
      paginatedUsers: result.paginatedUsers,
      totalPages: initialLoad
        ? Math.ceil(data.users.length / 10)
        : prevState.totalPages
    }));
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ isSortByOpen: false });
    }
  };

  changeName = e => {
    this.setState({
      name: e.target.value
    });
  };

  changePage = e => {
    this.setState(
      {
        page: e.selected
      },
      () => {
        this.getAllUsers(false);
      }
    );
  };

  changeSearchKeyword = e => {
    this.setState(
      {
        searchKeyword: e.target.value
      },
      () => {
        this.getAllUsers(false);
      }
    );
  };

  changeSortBy = e => {
    this.setState(
      {
        sort: e.target.id
      },
      () => {
        this.getAllUsers(false);
      }
    );
  };

  changeIsSortByOpen = () => {
    this.setState(prevState => ({
      isSortByOpen: !prevState.isSortByOpen
    }));
  };

  addRemoveUser = e => {
    let values = this.state.users;
    if (!e.target.checked) {
      values = filter(values, v => v !== e.target.id);
    } else {
      values.push(e.target.id);
    }
    this.setState({ users: values });
  };

  addRemoveAllUsers = e => {
    let values = [];
    if (e.target.checked) {
      values = this.state.allUsers.map(user => {
        return user.id;
      });
    }
    this.setState({ users: values });
  };

  submitForm = e => {
    e.preventDefault();
    this.setState({ loading: true });

    const team = this.state.name;
    const users = this.state.users;

    this.props.auth0Client
      .addGroup(this.state.name, this.state.users, this)
      .then(() => {
        // and after everything has been succesfully done on auth0
        // we save the new user roles in zoombackend
        this.props.dispatch(
          updateUsersTeamRequest({
            user: {
              authId: this.props.auth0Client.getProfile().sub
            },
            team,
            updateUsers: users.map(authId => {
              return { authId };
            })
          })
        );
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <CreateTeamModule
        users={this.state.users}
        name={this.state.name}
        userOptions={this.state.paginatedUsers}
        changeName={this.changeName}
        totalPages={this.state.totalPages}
        changeSearchKeyword={this.changeSearchKeyword}
        success={this.state.success}
        loading={this.state.loading}
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
