/* base */
import React from 'react';
import DuplicatorTab from 'modules/visualizer/sort/sidebar/tabs/TabContent/sort/DuplicatorTab';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/* actions */
import * as nodeActions from 'services/actions/nodeBackend';
/* utils */
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
/* consts */
/* components */
import Snackbar from 'components/Snackbar/Snackbar';

const propTypes = {
  chartData: PropTypes.shape({}),
  outerHistory: PropTypes.shape({}),
  paneData: PropTypes.shape({}),
  dupChartCreated: PropTypes.shape({})
};
const defaultProps = {
  chartData: {},
  outerHistory: {},
  paneData: {},
  dupChartCreated: {}
};

class DuplicatorMediator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      duplId: undefined,
      errorMessage: 'Error',
      openSnackbar: false
    };

    this.saveChart = this.saveChart.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqual(this.props.dupChartCreated.data, prevProps.dupChartCreated.data)
    ) {
      if (this.props.dupChartCreated.data && this.state.duplId) {
        const link = `/visualizer/${get(
          this.props.dupChartCreated,
          'data.chartType'
        )}/${this.state.duplId}/edit`;

        // and we reinitialize the dupChart redux variable before
        // pushing the duplicate chart into our visualizer routes
        nodeActions.createDuplicateChartInitial();

        // So this guy pushes the link to the data panes
        // navigator history, so that the datapane would change accordingly
        this.props.history.push(link);

        // And this guy pushes the link to the visualizer module history
        // so that everything in there would change accordingly.
        this.props.outerHistory.push(link);
      } else if (
        this.props.dupChartCreated.error &&
        this.props.dupChartCreated.error.status &&
        this.props.dupChartCreated.error.result
      ) {
        this.setState({
          openSnackbar: true,
          errorMessage: JSON.stringify(this.props.dupChartCreated.error.result)
        });
      }
    }
  }

  // TODO somehow make this funciton reusable cause the same one is used in AppBar.jsx
  saveChart(chartId = 'vizID') {
    if (this.props.user) {
      const chartData = {
        authId: this.props.user.authId,
        _public: this.props.chartData._public,
        teams: this.props.chartData.teams,
        chartId,
        name: this.props.chartData.name,
        description: this.props.chartData.desc,
        descIntro: this.props.chartData.descIntro,
        type: this.props.paneData.chartType,
        data: this.props.chartData.data,
        chartKeys: this.props.chartData.chartKeys,
        indKeys: this.props.chartData.indKeys,
        indicatorItems: this.props.chartData.selectedInd.map(indData => {
          return {
            indicator: indData.indicator,
            indLabel: indData.indLabel,
            subIndicators: indData.selectedSubInd,
            aggregate: indData.aggregate,
            // we also need to save the all sub indicators
            // for the datapanes default selections
            // because usually subindicators are refetched
            // when an indicator is selected
            // and because we want to initially load in just the
            // data from zoombackend, we don't want to be refetching
            // anything
            allSubIndicators: indData.subIndicators,
            dataSource: indData.dataSource
          };
        }),
        selectedSources: this.props.paneData.selectedSources,
        yearRange: this.props.paneData.yearRange,
        selectedYear: this.props.chartData.selectedYear,
        selectedYears: this.props.chartData.selectedYears,
        selectedCountryVal: this.props.chartData.selectedCountryVal,
        selectedRegionVal: this.props.chartData.selectedRegionVal,
        selectedRegionCodes: this.props.chartData.selectedRegionCodes,
        specOptions: this.props.chartData.specOptions
      };

      this.props.dispatch(nodeActions.createDuplicateChartRequest(chartData));
    } else {
      this.setState({ openSnackbar: true, errorMessage: 'Unauthorized' });
    }
  }

  saveEdit() {
    this.setState(
      {
        duplId: get(this.props.dupChartCreated, 'data.id')
      },
      () => this.saveChart(this.props.chartData.chartId)
    );
  }

  render() {
    return (
      <React.Fragment>
        <Snackbar
          message={this.state.errorMessage}
          open={this.state.openSnackbar}
          onClose={() => this.setState({ openSnackbar: false })}
        />
        <DuplicatorTab
          handleSaveEdit={this.saveEdit}
          handleDuplicate={this.saveChart}
          duplName={get(this.props.dupChartCreated, 'data.name')}
          duplID={get(this.props.dupChartCreated, 'data.id')}
        />
      </React.Fragment>
    );
  }
}

DuplicatorMediator.propTypes = propTypes;
DuplicatorMediator.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    chartData: state.chartData.chartData,
    paneData: state.paneData.paneData,
    dupChartCreated: state.dupChartCreated,
    user: state.currentUser.data
  };
};

export default connect(mapStateToProps)(DuplicatorMediator);
