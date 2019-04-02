/* base */
import React from 'react';
import { matchPath } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

/* actions */
import * as actions from 'services/actions/nodeBackend';

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
import tabs from '__consts__/DashboardTabsConsts';
import { data } from 'modules/dashboard/fragments/DashboardContent/DashboardContent.const';

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
      isSortByOpen: false
    };

    this.deleteChart = this.deleteChart.bind(this);
  }

  componentDidMount = () => {
    this.reloadData();
    /* todo: not sure if this is the best way to handle this, see if it can be refactored */
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.user, prevProps.user) && this.props.user)
      this.reloadData();

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
      this.setState({ datasets: formatDatasets(this.props.userDatasets.data) });
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  getAllUsers = () => {
    this.props.auth0Client.getAllUsers(
      this.setUsers,
      this.state.page,
      this.state.sort,
      this.state.searchKeyword !== ''
        ? ` AND name:${this.state.searchKeyword}*`
        : ''
    );
  };

  setUsers = data => {
    this.setState({
      users: formatUsersTabData(data)
    });
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
    this.setState(
      {
        searchKeyword: e.target.value
      },
      () => {
        this.reloadData();
      }
    );
  };

  reloadData = typeOfChange => {
    if (typeOfChange === 'sort' && this.props.match.params.tab === 'users') {
      this.getAllUsers();
    }

    if (typeOfChange !== 'sort') {
      this.getAllUsers();
      this.props.auth0Client.getUserGroups(this, 'teams');
    }

    if (this.props.user) {
      this.props.dispatch(
        actions.getUserChartsRequest({
          authId: this.props.user.authId,
          sortBy: this.state.sort
        })
      );
    }

    if (this.props.user) {
      this.props.dispatch(
        actions.getUserDatasetsRequest({
          authId: this.props.user.authId,
          sortBy: this.state.sort
        })
      );
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
        // tabs={tabs}
        sort={this.state.sort}
        users={this.state.users}
        datasets={this.state.datasets}
        charts={this.state.charts}
        changeSortBy={this.changeSortBy}
        setWrapperRef={this.setWrapperRef}
        setIsSortByOpen={this.setIsSortByOpen}
        isSortByOpen={this.state.isSortByOpen}
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
    chartDeleted: state.chartDeleted,
    // yeah so actually these are the user and team charts
    userCharts: state.userCharts,
    user: state.user.data
  };
};

// this is the correct syntax for routing to NOT mess up when using both
// withRouter and connect
export default withRouter(connect(mapStateToProps)(DashboardMediator));
