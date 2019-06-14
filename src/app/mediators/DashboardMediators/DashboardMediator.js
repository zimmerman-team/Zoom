/* base */
import React from 'react';
// import { matchPath } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createFragmentContainer, graphql } from 'react-relay';
/* mutations */
import DeleteFileMutation from 'mediators/DashboardMediators/mutations/DeleteFile';
/* actions */
import * as syncActions from 'services/actions/sync';
import * as actions from 'services/actions/nodeBackend';
import * as generalActions from 'services/actions/general';
import {
  getGroupsRequest,
  getAllUsersRequest,
  deleteAuthUserRequest,
  deleteAuthGroupRequest
} from 'services/actions/authNodeBackend';
/* utils */
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import {
  formatChartData,
  formatDatasets,
  formatTeamsTabData,
  formatUsersTabData
} from 'utils/dashboardUtils';
/* components */
import DashboardModule from 'modules/dashboard/DashboardModule';
/* consts */
import { data } from 'modules/dashboard/fragments/DashboardContent/DashboardContent.const';
import paneTypes from '__consts__/PaneTypesConst';
import userRoles from '__consts__/UserRoleConst';

class DashboardMediator extends React.Component {
  state = {
    page: 0,
    users: [],
    teams: [],
    sort: '-last_updated',
    searchKeyword: '',
    charts: [],
    trashCharts: [],
    datasets: [],
    loadUsers: false,
    isSortByOpen: false,
    allUsers: [],
    allTeams: [],
    deletedSelf: false
  };

  componentDidMount = () => {
    if (
      (this.props.match.params.tab === 'teams' ||
        this.props.match.params.tab === 'data-sets') &&
      this.props.user.role !== userRoles.admin
    ) {
      this.props.history.replace('/dashboard/charts');
    }
    // also when this component loads we want to reset the pane
    // to its default state for this component
    this.props.dispatch(generalActions.dataPaneToggleRequest(paneTypes.none));

    this.reloadData('all');
    /* todo: not sure if this is the best way to handle this, see if it can be refactored */
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  componentDidUpdate = prevProps => {
    if (!isEqual(this.props.user, prevProps.user) && this.props.user) {
      this.reloadData('all');
    }

    if (!isEqual(this.props.chartDeleted, prevProps.chartDeleted)) {
      this.reloadData();

      // we also want to load in the deleted charts
      // though maybe would be enough to just get there count in the future
      // TODO implement retrieving only the count of the archived charts
      this.props.dispatch(
        actions.allArchivedChartsRequest({
          authId: this.props.user.authId,
          sortBy: this.state.sort,
          archived: true
        })
      );
    }

    // we format the charts
    if (
      !isEqual(this.props.userCharts, prevProps.userCharts) &&
      this.props.userCharts.data &&
      this.props.user
    ) {
      this.setState({
        charts: formatChartData(
          this.props.userCharts.data,
          this.props.user.authId,
          this.props.history,
          this.deleteChart,
          this.duplicateChart.bind(this)
        )
      });
    }

    // we format the charts
    if (
      !isEqual(this.props.archivedCharts, prevProps.archivedCharts) &&
      this.props.archivedCharts.data
    ) {
      this.setState({
        trashCharts: formatChartData(this.props.archivedCharts.data)
      });
    }

    // we format the datasets
    if (
      !isEqual(this.props.userDatasets, prevProps.userDatasets) &&
      this.props.userDatasets.data
    ) {
      this.setState({
        datasets: formatDatasets(
          this.props.userDatasets.data,
          this.props.history,
          this.deleteDataset
        )
      });
    }

    // so we want to reaload all charts when a chart is duplicated so it would
    // show up in the dashboard
    if (!isEqual(this.props.chartDuplicated, prevProps.chartDuplicated)) {
      this.reloadData();
    }

    // we re-load the users
    if (
      !isEqual(this.props.deleteUser, prevProps.deleteUser) &&
      this.props.deleteUser.success
    ) {
      // and we delete the users datasets from DUCT according to the
      // setData returned from the zoomBackend

      this.props.deleteUser.data.setData.forEach(dataset => {
        DeleteFileMutation.commit(
          this.props.relay.environment,
          dataset.datasetId,
          this.handleFileDeleteCompleted,
          this.handleFileDeleteError
        );
      });

      if (this.state.deletedSelf) {
        this.props.auth0Client.signOut().then(() => {
          this.props.dispatch(syncActions.clearUserData());
        });
      } else {
        this.reloadData();
      }
    }

    // we re-load the teams
    if (
      !isEqual(this.props.deleteGroup, prevProps.deleteGroup) &&
      this.props.deleteGroup.success
    ) {
      this.reloadData();
    }

    // we re-load the datasets
    if (!isEqual(this.props.datasetDeleted, prevProps.datasetDeleted)) {
      this.reloadData();
    }

    // set page to 0 when changing tab
    if (this.props.match.params.tab !== prevProps.match.params.tab) {
      this.setState({ page: 0 });
    }

    // so here we don't actually need make a new call for trash, cause after emptying
    // it should be empty, and when a data.message is returned, it means that
    // emptying was succesfull
    if (
      !isEqual(this.props.chartTrashEmpty, prevProps.chartTrashEmpty) &&
      get(this.props.chartTrashEmpty, 'data.message', '').length > 0
    ) {
      this.setState({ trashCharts: [] });
    }

    // Get all users from back-end through auth0 API
    if (!isEqual(this.props.allUsers, prevProps.allUsers)) {
      this.setUsers(this.props.allUsers.data || []);
    }

    // Get all groups from back-end through auth0 API
    if (!isEqual(this.props.groups, prevProps.groups)) {
      this.setTeams(this.props.groups.data || []);
    }
  };

  componentWillUnmount = () => {
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

  setUsers = (rawData, initialLoad = true) => {
    const result = formatUsersTabData(
      rawData,
      initialLoad,
      this.state.page,
      this.state.sort,
      this.state.searchKeyword,
      this.editUser,
      this.deleteUser,
      this.viewUser
    );
    this.setState({
      users: result.users,
      allUsers: result.allUsers
    });
  };

  editUser = userId => {
    this.props.history.push(`/edit-user/${userId}`);
  };

  viewUser = userId => {
    this.props.history.push(`/view-user/${userId}`);
  };

  deleteUser = delId => {
    if (delId === this.props.user.authId) {
      // eslint-disable-next-line no-alert
      if (window.confirm('You are about to delete yourself! Are you sure?')) {
        this.setState({ deletedSelf: true });
        this.props.dispatch(
          deleteAuthUserRequest(
            {
              delId: delId,
              userId: this.props.user.authId
            },
            { Authorization: `Bearer ${this.props.user.idToken}` }
          )
        );
      }
    } else {
      this.props.dispatch(
        deleteAuthUserRequest(
          {
            delId: delId,
            userId: this.props.user.authId
          },
          { Authorization: `Bearer ${this.props.user.idToken}` }
        )
      );
    }
  };

  getAllTeams = initialLoad => {
    if (initialLoad) {
      this.props.dispatch(
        getGroupsRequest(
          {
            userId: this.props.user.authId
          },
          { Authorization: `Bearer ${this.props.user.idToken}` }
        )
      );
    } else {
      this.setTeams(this.state.allTeams, false);
    }
  };

  setTeams = (rawData, initialLoad = true) => {
    /* disable specific eslint rule cause state variables that are used are not updated in the setState */
    /* eslint-disable react/no-access-state-in-setstate */
    const result = formatTeamsTabData(
      rawData,
      initialLoad,
      this.state.page,
      this.state.sort,
      this.state.searchKeyword,
      this.editTeam,
      this.deleteTeam,
      this.viewTeam
    );
    this.setState({
      teams: result.teams,
      allTeams: result.allTeams
    });
  };

  viewTeam = id => {
    this.props.history.push(`/view-team/${id}`);
  };

  editTeam = id => {
    this.props.history.push(`/edit-team/${id}`);
  };

  deleteTeam = (id, name) => {
    this.props.dispatch(
      deleteAuthGroupRequest(
        {
          adminId: this.props.user.authId,
          delId: id,
          name: name
        },
        { Authorization: `Bearer ${this.props.user.idToken}` }
      )
    );
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  setIsSortByOpen = () => {
    this.setState(prevState => ({
      isSortByOpen: !prevState.isSortByOpen
    }));
  };

  changeSortBy = e => {
    this.setState(
      {
        sort: e.target.id
      },
      () => {
        const initialLoad =
          this.props.match.params.tab !== 'users' &&
          this.props.match.params.tab !== 'teams';
        this.reloadData('sort', initialLoad);
      }
    );
  };

  changePage = e => {
    this.setState(
      {
        page: e.selected
      },
      () => {
        this.reloadData('', false);
      }
    );
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ isSortByOpen: false });
    }
  };

  changeSearchKeyword = e => {
    this.setState({ searchKeyword: e.target.value }, () => {
      if (this.state.searchKeyword === '') {
        this.onEnterPressed();
      }
    });
  };

  onEnterPressed = () => {
    const initialLoad =
      this.props.match.params.tab !== 'users' &&
      this.props.match.params.tab !== 'teams';
    this.reloadData('search', initialLoad);
  };

  getViewPagesNumber = () => {
    switch (this.props.match.params.tab) {
      case 'charts':
        return this.state.charts.length / 12;
      case 'datasets':
        return this.state.datasets.length / 12;
      case 'users':
        return this.state.allUsers.length / 12;
      case 'teams':
        return this.state.allTeams.length / 12;
      default:
        return 0;
    }
  };

  reloadData = (type, initialLoad = true) => {
    if (type === 'all') {
      if (this.props.user) {
        this.props.dispatch(
          actions.getUserChartsRequest({
            authId: this.props.user.authId,
            sortBy: this.state.sort,
            searchTitle: this.state.searchKeyword
          })
        );
        this.props.dispatch(
          actions.getUserDatasetsRequest({
            authId: this.props.user.authId,
            sortBy: this.state.sort,
            searchTitle: this.state.searchKeyword
          })
        );
        this.getAllUsers(initialLoad);
        this.getAllTeams(initialLoad);
        this.props.dispatch(
          actions.allArchivedChartsRequest({
            authId: this.props.user.authId,
            sortBy: this.state.sort,
            archived: true
          })
        );
      }
    } else {
      switch (this.props.match.params.tab) {
        case 'charts':
          if (this.props.user) {
            this.props.dispatch(
              actions.getUserChartsRequest({
                authId: this.props.user.authId,
                sortBy: this.state.sort,
                searchTitle: this.state.searchKeyword
              })
            );
          }
          break;
        case 'data-sets':
          if (this.props.user) {
            this.props.dispatch(
              actions.getUserDatasetsRequest({
                authId: this.props.user.authId,
                sortBy: this.state.sort,
                searchTitle: this.state.searchKeyword
              })
            );
          }
          break;
        case 'users':
          this.getAllUsers(initialLoad);
          break;
        case 'teams':
          this.getAllTeams(initialLoad);
          break;
        case 'trash':
          this.props.dispatch(
            actions.allArchivedChartsRequest({
              authId: this.props.user.authId,
              sortBy: this.state.sort,
              archived: true
            })
          );
          break;
      }
    }
  };

  deleteChart = chartId => {
    this.props.dispatch(
      actions.deleteChartRequest({
        authId: this.props.user.authId,
        chartId
      })
    );
  };

  deleteDataset = datasetId => {
    this.props.dispatch(
      actions.deleteDatasetRequest({
        authId: this.props.user.authId,
        datasetId
      })
    );

    DeleteFileMutation.commit(
      this.props.relay.environment,
      datasetId,
      this.handleFileDeleteCompleted,
      this.handleFileDeleteError
    );
  };

  handleFileDeleteCompleted(response, error) {
    if (error) console.log('Error deleting file', error);
  }

  handleFileDeleteError(error) {
    if (error) console.log('Error deleting file', error);
  }

  duplicateChart(chartId) {
    this.props.dispatch(
      actions.duplicateChartRequest({
        authId: this.props.user.authId,
        chartId
      })
    );
  }

  emptyTrashChart() {
    this.props.dispatch(
      actions.emptyChartTrashRequest({
        authId: this.props.user.authId
      })
    );
  }

  render = () => {
    const greetingName =
      get(this.props.user, 'firstName', '') !== ''
        ? `${get(this.props.user, 'firstName', '')} ${get(
            this.props.user,
            'lastName',
            ''
          )}`
        : get(this.props.user, 'email', '');
    return (
      <DashboardModule
        loading={
          this.props.userDatasets.request ||
          this.props.userCharts.request ||
          this.props.allUsers.request ||
          this.props.deleteGroup.request
        }
        // tabs={tabs}
        page={this.state.page}
        removeAll={this.emptyTrashChart.bind(this)}
        trashCharts={this.state.trashCharts}
        sort={this.state.sort}
        users={this.state.users}
        datasets={this.state.datasets}
        charts={this.state.charts}
        changeSortBy={this.changeSortBy}
        setWrapperRef={this.setWrapperRef}
        setIsSortByOpen={this.setIsSortByOpen}
        isSortByOpen={this.state.isSortByOpen}
        onEnterPressed={this.onEnterPressed}
        activeTab={this.props.match.params.tab}
        searchKeyword={this.state.searchKeyword}
        changeSearchKeyword={this.changeSearchKeyword}
        teams={this.state.teams}
        navItems={data(
          get(this.props.user, 'role', '') === 'Administrator',
          get(this.props.user, 'role', '') === 'Super admin',
          this.state.allUsers,
          this.state.allTeams,
          this.state.charts,
          this.state.datasets
        )}
        totalPages={this.getViewPagesNumber()}
        changePage={this.changePage}
        greetingName={greetingName}
        isAdministrator={get(this.props.user, 'role', '') === 'Administrator'}
        isSuperAdmin={get(this.props.user, 'role', '') === 'Super admin'}
        auth0Client={this.props.auth0Client}
      />
    );
  };
}

const mapStateToProps = state => {
  return {
    chartTrashEmpty: state.chartTrashEmpty,
    archivedCharts: state.archivedCharts,
    datasetDeleted: state.datasetDeleted,
    userDatasets: state.userDatasets,
    chartDeleted: state.chartDeleted,
    chartDuplicated: state.chartDuplicated,
    userDeleted: state.userDeleted,
    // yeah so actually these are the user and team charts
    userCharts: state.userCharts,
    user: state.currentUser.data,
    teamDeleted: state.groupDeleted,
    allUsers: state.allUsers,
    groups: state.authGroups,
    deleteUser: state.deleteUser,
    deleteGroup: state.deleteGroup
  };
};

// this is the correct syntax for routing to NOT mess up when using both
// withRouter and connect
// note this graphql is set up here only because we need that graphql
// environment for the mutation TODO: find a proper solution
export default createFragmentContainer(
  withRouter(connect(mapStateToProps)(DashboardMediator)),
  graphql`
    fragment DashboardMediator_Indicator on Query {
      allIndicators(first: 1) {
        edges {
          node {
            name
          }
        }
      }
    }
  `
);
