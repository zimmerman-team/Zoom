/* eslint-disable no-alert */
/* base */
import React from 'react';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
/* actions */
import {
  getGroupRequest,
  editGroupInitial,
  editGroupRequest,
  getGroupsRequest,
  getAllUsersRequest
} from 'services/actions/authNodeBackend';
/* components */
import CreateTeamModule from 'modules/UserManagement/CreateTeam/CreateTeamModule';
import { formatUsersData } from 'mediators/ModuleMediators/CreateTeamMediator/CreateTeamMediator.utils';
/* utils */
import get from 'lodash/get';
import find from 'lodash/find';
import some from 'lodash/some';
import filter from 'lodash/filter';
import isEqual from 'lodash/isEqual';

class EditTeamMediator extends React.Component {
  state = {
    secondaryInfoMessage: null,
    name: '',
    description: '',
    oldTeamName: '',
    searchKeyword: '',
    users: [],
    allUsers: [],
    sort: 'name',
    page: 0,
    totalPages: 0,
    isSortByOpen: false,
    initialGroupUsers: [],
    paginatedUsers: [],
    addedOrRemovedSelf: false
  };

  componentDidMount = () => {
    this.getGroupInfo();
    this.getAllUsers(true);
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  componentDidUpdate = prevProps => {
    // Get all users from back-end through auth0
    if (!isEqual(this.props.allUsers, prevProps.allUsers)) {
      this.setUsers(this.props.allUsers.data || []);
    }

    // Get all group info and existing users from back-end through auth0
    if (!isEqual(this.props.group, prevProps.group) && this.props.group.data) {
      this.setState({
        name: this.props.group.data.name,
        oldTeamName: this.props.group.data.name,
        description: this.props.group.data.description,
        initialGroupUsers: [...this.props.group.data.users],
        users: [...this.props.group.data.users]
      });
    }

    if (
      this.props.editGroup.success !== prevProps.editGroup.success &&
      this.props.editGroup.success
    ) {
      if (this.state.addedOrRemovedSelf) {
        window.location.replace(
          `${process.env.REACT_APP_PROJECT_URL}/dashboard`
        );
      }
    }
  };

  componentWillUnmount = () => {
    this.props.dispatch(editGroupInitial());
    document.removeEventListener('mousedown', this.handleClickOutside);
  };

  getGroupInfo = () => {
    this.props.dispatch(
      getGroupRequest(
        {
          groupId: this.props.match.params.teamId
        },
        { Authorization: `Bearer ${this.props.user.idToken}` }
      )
    );
  };

  getAllTeams = () => {
    this.props.dispatch(
      getGroupsRequest(
        {
          userId: this.props.user.authId
        },
        { Authorization: `Bearer ${this.props.user.idToken}` }
      )
    );
  };

  getAllUsers = initialLoad => {
    if (initialLoad) {
      this.props.dispatch(
        getAllUsersRequest(
          {
            userId: this.props.user.authId
          },
          { Authorization: `Bearer ${this.props.user.idToken}` }
        )
      );
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
        ? Math.ceil(data.length / 10)
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

    const usersToAdd =
      this.state.initialGroupUsers.length === 0
        ? this.state.users
        : filter(this.state.users, user => {
            return !some(this.state.initialGroupUsers, igu => igu === user);
          });
    const usersToDelete = filter(this.state.initialGroupUsers, igu => {
      return !find(this.state.users, user => user === igu);
    });

    if (some(usersToDelete, u => u === this.props.user.authId)) {
      if (
        window.confirm(
          'You are about to remove yourself from the team! Are you sure?'
        )
      ) {
        this.setState({ addedOrRemovedSelf: true });
        this.props.dispatch(
          editGroupRequest(
            {
              groupId: this.props.match.params.teamId,
              name: this.state.name,
              description: this.state.description,
              usersToRemove: usersToDelete,
              usersToAdd: usersToAdd,
              user: {
                authId: this.props.user.authId
              },
              team: {
                oldName: this.state.oldTeamName,
                newName: this.state.name
              }
            },
            { Authorization: `Bearer ${this.props.user.idToken}` }
          )
        );
      }
    } else {
      this.props.dispatch(
        editGroupRequest(
          {
            groupId: this.props.match.params.teamId,
            name: this.state.name,
            description: this.state.description,
            usersToRemove: usersToDelete,
            usersToAdd: usersToAdd,
            user: {
              authId: this.props.user.authId
            },
            team: {
              oldName: this.state.oldTeamName,
              newName: this.state.name
            }
          },
          { Authorization: `Bearer ${this.props.user.idToken}` }
        )
      );
      if (some(usersToAdd, u => u === this.props.user.authId)) {
        this.setState({ addedOrRemovedSelf: true });
      }
    }
  };

  render = () => {
    return (
      <CreateTeamModule
        pageTitle={this.props.viewOnly ? 'View team' : 'Edit team'}
        buttonTxt="submit"
        users={this.state.users}
        name={this.state.name}
        userOptions={this.state.paginatedUsers}
        changeName={this.changeName}
        totalPages={this.state.totalPages}
        changeSearchKeyword={this.changeSearchKeyword}
        success={this.props.editGroup.success}
        errorMessage={
          get(this.props.editGroup.error, 'result', false)
            ? this.props.editGroup.error.result
            : ''
        }
        loading={
          this.props.allUsers.request ||
          this.props.group.request ||
          this.props.editGroup.request
        }
        secondaryInfoMessage={this.state.secondaryInfoMessage}
        addRemoveUser={this.addRemoveUser}
        addRemoveAllUsers={this.addRemoveAllUsers}
        changePage={this.changePage}
        submitForm={this.submitForm}
        isSortByOpen={this.state.isSortByOpen}
        changeIsSortByOpen={this.changeIsSortByOpen}
        setWrapperRef={this.setWrapperRef}
        changeSortBy={this.changeSortBy}
        selectedSortBy={this.state.sort}
        successMessage="Team edited successfully"
        viewOnly={this.props.viewOnly}
        disableSubmit={
          this.state.oldTeamName === this.state.name &&
          isEqual(
            this.state.users,
            this.state.initialGroupUsers.map(igu => igu.user_id)
          )
        }
      />
    );
  };
}

const mapStateToProps = state => {
  return {
    group: state.loadedGroup,
    allUsers: state.allUsers,
    usersTeam: state.usersTeam,
    user: state.currentUser.data,
    editGroup: state.editGroup
  };
};

export default withRouter(connect(mapStateToProps)(EditTeamMediator));
