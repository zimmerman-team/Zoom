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
      sort: 'name:1',
      charts: []
    };

    this.reloadData = this.reloadData.bind(this);
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
      this.setState({
        charts: formatChartData(this.props.publicCharts.data)
      });
  }

  reloadData() {
    if (this.props.user) {
      this.props.dispatch(
        actions.getPublicChartsRequest({
          authId: this.props.user.authId,
          sortBy: this.state.sort
        })
      );
    }
  }

  render() {
    return <PublicChartLibraryModule data={this.state.charts} />;
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
