import React from 'react';
import { connect } from 'react-redux';
import PublicChartLibraryModule from 'modules/PublicChartLibrary/PublicChartLibraryModule';

/* utils */
import isEqual from 'lodash/isEqual';
import { formatChartData } from 'utils/dashboardUtils';

/* actions */
import * as actions from 'services/actions/nodeBackend';

class PublicDashMediator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'name:1',
      page: 0,
      pageSize: 18,
      pageCount: 1,
      searchKeyword: '',
      isSortByOpen: false,
      charts: []
    };

    this.reloadData = this.reloadData.bind(this);
    this.changeSortBy = this.changeSortBy.bind(this);
    this.changeSearchKeyword = this.changeSearchKeyword.bind(this);
    this.changePage = this.changePage.bind(this);
    this.setIsSortByOpen = this.setIsSortByOpen.bind(this);
    this.onEnterPressed = this.onEnterPressed.bind(this);
  }

  componentDidMount() {
    this.reloadData();
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.user, prevProps.user) && this.props.user)
      this.reloadData();

    // we format the charts
    if (
      !isEqual(this.props.publicCharts, prevProps.publicCharts) &&
      this.props.publicCharts.data
    )
      this.setState(prevState => {
        return {
          charts: formatChartData(this.props.publicCharts.data),
          pageCount: this.props.publicCharts.data.count / prevState.pageSize
        };
      });
  }

  reloadData() {
    if (this.props.user) {
      const { sortBy, page, pageSize, searchKeyword } = this.state;

      this.props.dispatch(
        actions.getPublicChartsRequest({
          authId: this.props.user.authId,
          searchTitle: searchKeyword,
          sortBy,
          page,
          pageSize
        })
      );
    }
  }

  onEnterPressed() {
    this.reloadData();
  }

  changeSortBy = e => {
    this.setState({ sortBy: e.target.id }, this.reloadData);
  };

  setIsSortByOpen = () => {
    this.setState(prevState => ({
      isSortByOpen: !prevState.isSortByOpen
    }));
  };

  changeSearchKeyword = e => {
    this.setState({ searchKeyword: e.target.value });
  };

  changePage(e) {
    this.setState({ page: e.selected }, this.reloadData);
  }

  render() {
    return (
      <PublicChartLibraryModule
        loading={this.props.publicCharts.request}
        changeSearchKeyword={this.changeSearchKeyword}
        data={this.state.charts}
        onEnterPressed={this.onEnterPressed}
        pageCount={this.state.pageCount}
        changeSortBy={this.changeSortBy}
        changePage={this.changePage}
        setIsSortByOpen={this.setIsSortByOpen}
        isSortByOpen={this.state.isSortByOpen}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    publicCharts: state.publicCharts,
    user: state.user.data
  };
};

// this is the correct syntax for routing to NOT mess up when using both
// withRouter and connect
export default connect(mapStateToProps)(PublicDashMediator);
