/* base */
import React from 'react';
// import { matchPath } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

/* actions */
import * as actions from 'services/actions/nodeBackend';
import * as generalActions from 'services/actions/general';

/* utils */
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import {
  formatUsersTabData,
  formatTeamsTabData,
  formatChartData,
  formatDatasets
} from 'utils/dashboardUtils';

/* components */
import DashboardModule from 'modules/dashboard/DashboardModule';

/* consts */
import { data } from 'modules/dashboard/fragments/DashboardContent/DashboardContent.const';
import paneTypes from '__consts__/PaneTypesConst';

class DashboardMediator extends React.Component {
  state = {
    page: 0,
    users: [],
    teams: [],
    sort: 'title',
    searchKeyword: '',
    charts: [],
    datasets: [],
    loadUsers: false,
    isSortByOpen: false,
    allUsers: [],
    allTeams: []
  };

  componentDidMount = () => {
    // also when this component loads we want to reset the pane
    // to its default state for this component
    this.props.dispatch(generalActions.dataPaneToggleRequest(paneTypes.none));

    this.reloadData('all');
    /* todo: not sure if this is the best way to handle this, see if it can be refactored */
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  componentDidUpdate = prevProps => {
    if (!isEqual(this.props.user, prevProps.user) && this.props.user)
      this.reloadData('all');

    if (!isEqual(this.props.chartDeleted, prevProps.chartDeleted))
      this.reloadData();

    // we format the charts
    if (
      !isEqual(this.props.userCharts, prevProps.userCharts) &&
      this.props.userCharts.data
    )
      this.setState({
        charts: formatChartData(
          this.props.userCharts.data,
          this.props.user.authId,
          this.props.history,
          this.deleteChart,
          this.duplicateChart
        )
      });

    // we format the datasets
    if (
      !isEqual(this.props.userDatasets, prevProps.userDatasets) &&
      this.props.userDatasets.data
    )
      this.setState({
        datasets: formatDatasets(
          this.props.userDatasets.data,
          this.props.history
        )
      });

    // so we want to reaload all charts when a chart is duplicated so it would
    // show up in the dashboard
    if (!isEqual(this.props.chartDuplicated, prevProps.chartDuplicated))
      this.reloadData();

    // we re-load the users
    if (!isEqual(this.props.userDeleted, prevProps.userDeleted))
      this.reloadData();

    // we re-load the teams
    if (!isEqual(this.props.teamDeleted, prevProps.teamDeleted))
      this.reloadData();

    // set page to 0 when changing tab
    if (this.props.match.params.tab !== prevProps.match.params.tab) {
      this.setState({ page: 0 });
    }
  };

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside);
  };

  getAllUsers = initialLoad => {
    if (initialLoad) {
      this.setState({ loadUsers: true });
      this.props.auth0Client
        .getAllUsers(this.setUsers)
        .then(() => this.setState({ loadUsers: false }));
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

  deleteUser = userId => {
    this.props.auth0Client.deleteUser(userId, this, () =>
      this.props.dispatch(actions.deleteUserRequest({ userId }))
    );
  };

  getAllTeams = initialLoad => {
    if (initialLoad) {
      this.setState({ loadUsers: true });
      this.props.auth0Client.getUserGroups().then(res => {
        this.setTeams(res, true);
        this.setState({ loadUsers: false });
      });
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
      this.state.allUsers,
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
    this.props.auth0Client.deleteGroup(id, this, () =>
      this.props.dispatch(actions.deleteGroupRequest({ name }))
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
        case 'datasets':
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

  duplicateChart(chartId) {
    this.props.dispatch(
      actions.duplicateChartRequest({
        authId: this.props.user.authId,
        chartId
      })
    );
  }

  render() {
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
          this.state.loadUsers
        }
        // tabs={tabs}
        page={this.state.page}
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
          this.state.allUsers,
          this.state.allTeams,
          this.state.charts,
          this.state.datasets
        )}
        totalPages={this.getViewPagesNumber()}
        changePage={this.changePage}
        greetingName={greetingName}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    userDatasets: state.userDatasets,
    chartDeleted: state.userDeleted,
    chartDuplicated: state.chartDuplicated,
    userDeleted: state.userDeleted,
    // yeah so actually these are the user and team charts
    userCharts: state.userCharts,
    user: state.user.data,
    teamDeleted: state.groupDeleted
  };
};

// this is the correct syntax for routing to NOT mess up when using both
// withRouter and connect
export default withRouter(connect(mapStateToProps)(DashboardMediator));
