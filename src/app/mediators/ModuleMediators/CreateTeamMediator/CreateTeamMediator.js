/* base */
import React from 'react';
import filter from 'lodash/filter';
import { connect } from 'react-redux';
/* actions */
import {
  getAllUsersRequest,
  addAuthGroupRequest,
  addAuthGroupInitial
} from 'services/actions/authNodeBackend';
/* utils */
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
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

  componentDidUpdate = prevProps => {
    if (!isEqual(this.props.allUsers, prevProps.allUsers)) {
      this.setUsers(this.props.allUsers.data || []);
    }
    if (
      this.props.addGroup.success !== prevProps.addGroup.success &&
      this.props.addGroup.success
    ) {
      this.setState({
        name: '',
        users: []
      });
    }
  };

  componentWillUnmount = () => {
    this.props.dispatch(addAuthGroupInitial());
    document.removeEventListener('mousedown', this.handleClickOutside);
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

    this.props.dispatch(
      addAuthGroupRequest(
        {
          userId: this.props.user.authId,
          name: this.state.name,
          usersToAdd: this.state.users
        },
        { Authorization: `Bearer ${this.props.user.idToken}` }
      )
    );
  };

  render = () => {
    return (
      <CreateTeamModule
        users={this.state.users}
        name={this.state.name}
        userOptions={this.state.paginatedUsers}
        changeName={this.changeName}
        totalPages={this.state.totalPages}
        changeSearchKeyword={this.changeSearchKeyword}
        success={this.props.addGroup.success}
        loading={this.props.addGroup.request || this.props.allUsers.request}
        secondaryInfoMessage={this.state.secondaryInfoMessage}
        errorMessage={
          get(this.props.addGroup.error, 'result', false)
            ? this.props.addGroup.error.result
            : ''
        }
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
  };
}

const mapStateToProps = state => {
  return {
    allUsers: state.allUsers,
    usersTeam: state.usersTeam,
    user: state.currentUser.data,
    addGroup: state.addGroup
  };
};

export default connect(mapStateToProps)(CreateTeamMediator);
