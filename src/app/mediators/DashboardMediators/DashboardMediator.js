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
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      teams: [],
      sort: 'name:1',
      searchKeyword: '',
      charts: [],
      datasets: [],
      loadUsers: false,
      isSortByOpen: false
    };

    this.deleteChart = this.deleteChart.bind(this);
    this.onEnterPressed = this.onEnterPressed.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  componentDidMount = () => {
    // also when this component loads we want to reset the pane
    // to its default state for this component
    this.props.dispatch(generalActions.dataPaneToggleRequest(paneTypes.none));

    this.reloadData('all');
    /* todo: not sure if this is the best way to handle this, see if it can be refactored */
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  componentDidUpdate(prevProps) {
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
          this.deleteChart
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

    // we re-load the users
    if (!isEqual(this.props.userDeleted, prevProps.userDeleted))
      this.reloadData();
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  getAllUsers = () => {
    this.setState({ loadUsers: true });
    this.props.auth0Client
      .getAllUsers(
        this.setUsers,
        this.state.page,
        this.state.sort,
        this.state.searchKeyword !== ''
          ? ` AND name:${this.state.searchKeyword}*`
          : ''
      )
      .then(() => this.setState({ loadUsers: false }));
  };

  setUsers = data => {
    this.setState({
      users: formatUsersTabData(data, this.editUser, this.deleteUser)
    });
  };

  editUser = userId => {
    this.props.history.push(`/edit-user/${userId}`);
  };

  deleteUser = userId => {
    this.props.auth0Client.deleteUser(userId, this, () =>
      this.props.dispatch(actions.deleteUserRequest({ userId }))
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
        this.reloadData('sort');
      }
    );
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ isSortByOpen: false });
    }
  };

  changeSearchKeyword = e => {
    this.setState({ searchKeyword: e.target.value });
  };

  onEnterPressed() {
    this.reloadData();
  }

  reloadData = type => {
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
        this.getAllUsers();
        this.props.auth0Client.getUserGroups(this, 'teams');
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
          this.getAllUsers();
          break;
        case 'teams':
          this.props.auth0Client.getUserGroups(this, 'teams');
          break;
      }
    }
  };

  deleteChart(chartId) {
    this.props.dispatch(
      actions.deleteChartRequest({
        authId: this.props.user.authId,
        chartId
      })
    );
  }

  render() {
    return (
      <DashboardModule
        loading={
          this.props.userDatasets.request ||
          this.props.userCharts.request ||
          this.state.loadUsers
        }
        // tabs={tabs}
        sort={this.state.sort}
        users={this.state.users}
        datasets={this.state.datasets}
        charts={this.state.charts}
        changeSortBy={this.changeSortBy}
        setWrapperRef={this.setWrapperRef}
        setIsSortByOpen={this.setIsSortByOpen}
        isSortByOpen={this.state.isSortByOpen}
        onEnterPressed={this.onEnterPressed}
        // activeTab={this.props.match.params.tab}
        searchKeyword={this.state.searchKeyword}
        changeSearchKeyword={this.changeSearchKeyword}
        teams={formatTeamsTabData(
          this.state.teams,
          this.state.sort,
          this.state.searchKeyword
        )}
        navItems={data(
          this.state.users,
          this.state.teams,
          this.state.charts,
          this.state.datasets
        )}
        greetingName={get(this.props.auth0Client.getProfile(), 'nickname', '')}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    userDatasets: state.userDatasets,
    chartDeleted: state.userDeleted,
    userDeleted: state.userDeleted,
    // yeah so actually these are the user and team charts
    userCharts: state.userCharts,
    user: state.user.data
  };
};

// this is the correct syntax for routing to NOT mess up when using both
// withRouter and connect
export default withRouter(connect(mapStateToProps)(DashboardMediator));
