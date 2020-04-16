import React from 'react';
import { connect } from 'react-redux';
import PublicChartLibraryModule from 'app/modules/PublicChartLibrary/PublicChartLibraryModule';
/* utils */
import isEqual from 'lodash/isEqual';
import { formatChartData } from 'app/utils/dashboardUtils';
/* actions */
import * as actions from 'app/services/actions/nodeBackend';

class PublicDashMediator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: '-last_updated',
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
    // we format the charts
    if (
      !isEqual(this.props.publicCharts, prevProps.publicCharts) &&
      this.props.publicCharts.data
    ) {
      this.setState(prevState => {
        return {
          charts: formatChartData(this.props.publicCharts.data),
          pageCount: this.props.publicCharts.data.count / prevState.pageSize
        };
      });
    }
  }

  reloadData() {
    const { sortBy, page, pageSize, searchKeyword } = this.state;

    this.props.dispatch(
      actions.getPublicChartsRequest({
        searchTitle: searchKeyword,
        sortBy,
        page,
        pageSize
      })
    );
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
        page={this.state.page}
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
    publicCharts: state.publicCharts
  };
};

// this is the correct syntax for routing to NOT mess up when using both
// withRouter and connect
export default connect(mapStateToProps)(PublicDashMediator);
