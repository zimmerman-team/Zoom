/* base */
import React from 'react';
import filter from 'lodash/filter';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

/* actions */
import { updateTeamAndUsersOfItRequest } from 'services/actions/nodeBackend';

/* components */
import CreateTeamModule from 'modules/UserManagement/CreateTeam/CreateTeamModule';
import { formatUsersData } from 'mediators/ModuleMediators/CreateTeamMediator/CreateTeamMediator.utils';

/* utils */
import find from 'lodash/find';
import some from 'lodash/some';
import isEqual from 'lodash/isEqual';

class EditTeamMediator extends React.Component {
  state = {
    loading: false,
    success: false,
    errorMessage: null,
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

    const usersToAdd =
      this.state.initialGroupUsers.length === 0
        ? this.state.users
        : filter(this.state.users, user => {
            return !some(this.state.initialGroupUsers, { user_id: user });
          });
    const usersToDelete = filter(this.state.initialGroupUsers, igu => {
      return !find(this.state.users, user => user === igu.user_id);
    });

    this.props.auth0Client
      .editGroup(
        this.props.match.params.teamId,
        this.state.name,
        this.state.description,
        usersToDelete.map(user => user.user_id),
        usersToAdd,
        this
      )
      .then(() => {
        // and after everything has been succesfully done on auth0
        // we make the changes in the zoom node
        this.props.dispatch(
          updateTeamAndUsersOfItRequest({
            user: {
              authId: this.props.user.authId
            },
            team: {
              oldName: this.state.oldTeamName,
              newName: this.state.name
            },
            usersToAdd: usersToAdd.map(authId => {
              return { authId };
            }),
            usersToDelete: usersToDelete.map(user => {
              return { authId: user.user_id };
            })
          })
        );
        this.props.auth0Client.getGroupMembers(
          this.props.match.params.teamId,
          this
        );
        this.setState(prevState => ({
          loading: false,
          oldTeamName: prevState.name
        }));

        setTimeout(() => this.setState({ success: false }), 3000);
      });
  };

  render() {
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
  }
}

const mapStateToProps = state => {
  return {
    usersTeam: state.usersTeam,
    user: state.user.data
  };
};

export default withRouter(connect(mapStateToProps)(EditTeamMediator));
