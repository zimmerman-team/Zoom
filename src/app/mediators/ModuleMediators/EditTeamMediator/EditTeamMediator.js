/* base */
import React from 'react';
import filter from 'lodash/filter';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

/* actions */
import * as nodeActions from 'services/actions/nodeBackend';

/* components */
import CreateTeamModule from 'modules/UserManagement/CreateTeam/CreateTeamModule';
import { formatUsersData } from '../CreateTeamMediator/CreateTeamMediator.utils';

class EditTeamMediator extends React.Component {
  state = {
    success: false,
    errorMessage: null,
    secondaryInfoMessage: null,
    name: '',
    searchKeyword: '',
    users: [],
    allUsers: [],
    sort: 'name',
    page: 0,
    totalPages: 0,
    isSortByOpen: false,
    initialGroupUsers: [],
    paginatedUsers: []
  };

  componentDidMount = () => {
    this.props.auth0Client.getGroup(this.props.match.params.teamId, this);
    this.props.auth0Client.getGroupMembers(
      this.props.match.params.teamId,
      this
    );
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
        ? Math.ceil(data.total / 10)
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
    const team = this.state.name;
    const usersToAdd = filter(this.state.users, user => {
      return filter(this.state.initialGroupUsers, igu => igu !== user);
    });
    const usersToDelete = filter(this.state.initialGroupUsers, igu => {
      return filter(this.state.users, user => user === igu);
    });

    e.preventDefault();
    this.props.auth0Client
      .editGroup(
        this.props.match.params.tab,
        this.state.name,
        usersToDelete,
        usersToAdd,
        this
      )
      .then(() => {
        // and after everything has been succesfully done on auth0
        // we save the new user roles in zoombackend
        // this.props.dispatch(
        //   nodeActions.updateUsersTeamRequest({
        //     user: {
        //       authId: this.props.auth0Client.getProfile().sub
        //     },
        //     team,
        //     updateUsers: users.map(authId => {
        //       return { authId };
        //     })
        //   })
        // );
      });
  };

  render() {
    return (
      <CreateTeamModule
        pageTitle="Edit team"
        buttonTxt="submit"
        users={this.state.users}
        name={this.state.name}
        userOptions={this.state.paginatedUsers}
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

export default withRouter(connect(mapStateToProps)(EditTeamMediator));
