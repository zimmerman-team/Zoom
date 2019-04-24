import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { connect } from 'react-redux';
import { fetchQuery } from 'relay-runtime';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import VisualizerModule from 'modules/visualizer/VisualizerModule';

/* utils */
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import {
  formatBarData,
  formatCountryParam,
  formatDate,
  formatGeoData,
  formatBarChartKeys,
  formatLineData,
  removeIds,
  formatChartLegends,
  formatTableData,
  formatDonutData,
  getChartKeys
} from 'mediators/ModuleMediators/VisualizerModuleMediator/VisualizerModuleMediator.utils';

/* consts */
import initialState from '__consts__/InitialChartDataConst';
import paneTypes from '__consts__/PaneTypesConst';
import chartTypes from '__consts__/ChartConst';
import initialPaneState from '__consts__/InitialPaneDataConst';
import { colorSet1 } from '__consts__/PaneConst';
import graphKeys from '__consts__/GraphStructKeyConst';

/* actions */
import * as nodeActions from 'services/actions/nodeBackend';
import * as actions from 'services/actions/general';

const propTypes = {
  publicChart: PropTypes.shape({}),
  chartResults: PropTypes.shape({}),
  chartData: PropTypes.shape({}),
  user: PropTypes.shape({}),
  paneData: PropTypes.shape({}),
  auth0Client: PropTypes.shape({}),
  publicPage: PropTypes.bool,
  dropDownData: PropTypes.shape({
    allIndicators: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            name: PropTypes.string
          })
        })
      )
    }),
    allCountries: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            name: PropTypes.string,
            iso2: PropTypes.string
          })
        })
      )
    })
  })
};

const defaultProps = {
  dropDownData: {},
  publicPage: false,
  chartResults: {},
  publicChart: {},
  auth0Client: {},
  chartData: {},
  user: {},
  paneData: {},
  indicatorAggregations: {}
};

// so we will start getting the indicator data with this
// fetch query to encapsulate the unlimited amounts of indicators
// functionality properly
// this will also decrease the loading times of fetching queries
// cause previously when one indicator would get selected
// all indicators data would be fetched, and now we will
// just need to make this one fetch for each separate indicator selections
const indicatorDataQuery = graphql`
  query VisualizerModuleMediatorQuery(
    $datePeriod: [String]!
    $indicator: [String]!
    $subInds: [String]!
    $countriesISO2: [String]!
    $indicatorStr: String!
    $OR_GeolocationIso2_Is_Null: Boolean!
  ) {
    indicators: datapointsAggregation(
      groupBy: [
        "indicatorName"
        "geolocationTag"
        "date"
        "geolocationType"
        "geolocationIso2"
        "comment"
        "geolocationPolygons"
        "geolocationCenterLongLat"
        "valueFormatType"
      ]
      orderBy: ["indicatorName"]
      aggregation: ["Sum(value)"]
      date_In: $datePeriod
      indicatorName_In: $indicator
      geolocationIso2_In: $countriesISO2
      filterName_In: $subInds
      OR_GeolocationIso2_Is_Null: $OR_GeolocationIso2_Is_Null
    ) {
      indicatorName
      geolocationIso2
      comment
      geolocationTag
      geolocationType
      geolocationPolygons
      geolocationCenterLongLat
      valueFormatType
      date
      value
    }
    subIndicators: allFilters(indicator_Name_In: $indicatorStr) {
      edges {
        node {
          name
        }
      }
    }
  }
`;

class VisualizerModuleMediator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedYear: this.props.chartData.selectedYear
        ? this.props.chartData.selectedYear
        : initialState.yearPeriod[0]
    };

    this.indLoadTime = 0;

    this.refetch = this.refetch.bind(this);
    this.selectYear = this.selectYear.bind(this);
    this.saveViewport = this.saveViewport.bind(this);
    this.loadChartData = this.loadChartData.bind(this);
    this.storeChartToRedux = this.storeChartToRedux.bind(this);
  }

  componentDidMount() {
    // so yeah with this we update the top bar pane with correct data
    this.props.dispatch(actions.dataPaneToggleRequest(paneTypes.visualizer));

    // we also want to reset the previously created/updated chart
    this.props.dispatch(nodeActions.createUpdateChartInitial());

    if (this.props.match.params.code !== 'vizID')
      this.setState(
        {
          loading: true
        },
        this.loadChartData
      );
    else {
      // and we store the chart type so it would be accessible to the visualizer mediator
      this.props.dispatch(
        actions.storePaneDataRequest({
          chartType: this.props.match.params.chart
        })
      );
      if (chartTypes.lineChart === this.props.match.params.chart)
        // we also store the initial values for the linecharts
        // graphstructure pane
        // so yeah yAxis should initially be numbers
        // and xAxis should initially be the categories
        // and the color pallet should be the first color
        // set from the consts
        this.props.dispatch(
          actions.storeChartDataRequest({
            specOptions: {
              [graphKeys.leftYAxis]: 'number',
              [graphKeys.rightYAxis]: 'number',
              [graphKeys.xAxis]: 'category',
              [graphKeys.colorPallet]: colorSet1
            }
          })
        );
    }
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.user, prevProps.user) && this.props.user) {
      this.loadChartData();
    }

    // we update the key data with the colors
    /* TODO: update the bar data correctly without
        initiating a change in the saved data */
    if (
      !isEqual(
        this.props.chartData.specOptions[graphKeys.colorPallet],
        prevProps.chartData.specOptions[graphKeys.colorPallet]
      )
    ) {
      const selectedIndNames = this.props.chartData.slectedInd.map(indItem => {
        return indItem.indicator;
      });

      const chartKeys = formatChartLegends(
        selectedIndNames,
        this.props.chartData.specOptions[graphKeys.colorPallet]
      );

      this.props.dispatch(
        actions.storeChartDataRequest({
          chartKeys
        })
      );
    }

    // and we load in the chart data retrieved from the node backend
    if (
      !isEqual(this.props.chartResults, prevProps.chartResults) &&
      this.props.chartResults
    )
      this.storeChartToRedux();

    // TODO redo this check properly
    const {
      name,
      desc,
      descIntro,
      _public,
      team,
      specOptions,
      chartKeys,
      ...restChart
    } = this.props.chartData;
    const {
      name: prevName,
      desc: prevDesc,
      descIntro: prevDescIntro,
      _public: prevPublc,
      team: prevTeam,
      specOptions: prevSpecOptions,
      chartKeys: prevchartKeys,
      ...prevRestChart
    } = prevProps.chartData;
    // so we refetch data when chartData changes
    // and we dont want to refetch data when only the name/description ofthe chart is changed
    /* TODO: optimize the speed of the application by NOT calling this refetch
        when the 'data' variable changes in the chartData*/
    if (!isEqual(restChart, prevRestChart) && restChart.changesMade)
      this.refetch();
  }

  componentWillUnmount() {
    // AAAND when this component unmounts we reset the chart and pane variables in redux

    this.props.dispatch(
      actions.storeChartDataRequest({
        ...initialState
      })
    );

    this.props.dispatch(
      actions.storePaneDataRequest({
        ...initialPaneState
      })
    );

    // and we close the datapane
    this.props.dispatch(actions.dataPaneToggleRequest(paneTypes.none));

    // We also reset the duplicate chart redux
    this.props.dispatch(nodeActions.createDuplicateChartInitial());
  }

  updateIndicators(indicatorData) {
    // this will be used for some extra formatting things
    // concerning chart keys and also for saving the subIndicators
    // of the appropriate indicators
    const selectedInd = [...this.props.chartData.selectedInd];

    const aggregationData = [];

    // formating indicator data commences!
    indicatorData.forEach(indItem => {
      // so we format it in this way so that the loaded in 'indAggregation'
      // data would be formated for the same selected indicator index elements
      // cause it might not have been loaded in with the same indexes
      // as the indicator selections, cause of promise stuff
      // the actual index was stored when initially this 'indicatorData' was formed
      aggregationData[indItem.index] = indItem.indAggregation;
    });

    const selectedIndNames = selectedInd.map(indItem => {
      return indItem.indicator;
    });

    let data = [];
    let chartKeys = [];

    switch (this.props.match.params.chart) {
      case chartTypes.geoMap:
        data = formatGeoData(aggregationData);
        break;
      case chartTypes.focusKE:
        data = formatGeoData(aggregationData);
        break;
      case chartTypes.focusNL:
        data = formatGeoData(aggregationData);
        break;
      case chartTypes.lineChart:
        chartKeys = formatChartLegends(
          selectedIndNames,
          this.props.chartData.specOptions[graphKeys.colorPallet]
        );
        data = formatLineData(aggregationData);
        break;
      case chartTypes.barChart:
        data = formatBarData(
          aggregationData,
          this.props.chartData.specOptions[graphKeys.colorPallet]
        );
        chartKeys = formatBarChartKeys(selectedIndNames);
        break;
      case chartTypes.tableChart:
        data = formatTableData(aggregationData);
        break;
      case chartTypes.donutChart:
        data = formatDonutData(
          aggregationData,
          this.props.chartData.specOptions[graphKeys.colorPallet]
        );
        chartKeys = formatChartLegends(
          selectedIndNames,
          this.props.chartData.specOptions[graphKeys.colorPallet]
        );
        break;
      default:
        data = [];
        break;
    }

    // and we save the chart data
    this.props.dispatch(
      actions.storeChartDataRequest({
        chartKeys,
        data
      })
    );

    // formatting the subindicator data commences!
    indicatorData.forEach(indItem => {
      let subIndicators = indItem.subIndicators.edges.map(indicator => {
        return { label: indicator.node.name, value: indicator.node.name };
      });

      // and we sort them
      subIndicators = sortBy(subIndicators, ['label']);

      // so we associate the sub-indicators with their respective indicator
      // cause the data retrieved in 'indicatorData' might not be aligned
      // in the same way as the selectedInd data is aligned
      selectedInd[indItem.index].subIndicators = subIndicators;
    });

    // and we save the subindicator selection for the datapane
    this.props.dispatch(
      actions.storePaneDataRequest({
        selectedInd
      })
    );

    this.setState({ loading: false });
  }

  refetch() {
    /* TODO: we can up the speed of this by not calling all of the indicators
        everytime one indicators data is called, though the whole flow of
        data formatting/saving would need to be changed*/

    this.setState({
      loading: true
    });

    const indicatorData = [];

    this.props.chartData.selectedInd.forEach((indItem, index) => {
      const indicator = indItem.indicator;

      const subInds = indItem.selectedSubInd;

      // We forming the param for countries from the selected countries of a region
      // and single selected countries
      const countriesISO2 = formatCountryParam(
        this.props.chartData.selectedCountryVal,
        this.props.chartData.selectedRegionVal
      );

      // so this variable basically controlls the filter param for data points
      // that don't have/do have geolocationIso2 field
      const iso2Undef = countriesISO2.indexOf('undefined') !== -1;

      const refetchVars = {
        indicator: [indicator],
        indicatorStr: indicator || 'null',
        subInds,
        datePeriod: [this.props.chartData.selectedYear],
        countriesISO2,
        OR_GeolocationIso2_Is_Null: iso2Undef
      };

      fetchQuery(
        this.props.relay.environment,
        indicatorDataQuery,
        refetchVars
      ).then(data => {
        indicatorData.push({
          index,
          indAggregation: data.indicators,
          subIndicators: data.subIndicators
        });

        // so we use this to control, when the last
        // query has been fetched and only when the last query gets fetched
        // then the indicator data would be filled
        // and then it can be formatted
        this.indLoadTime += 1;

        if (this.indLoadTime === this.props.chartData.selectedInd.length) {
          this.indLoadTime = 0;
          this.updateIndicators(indicatorData);
        }
      });
    });
  }

  selectYear(val) {
    this.setState({ selectedYear: val });
    // so we set the values for chart data
    this.props.dispatch(
      actions.storeChartDataRequest({
        selectedYear: val,
        changesMade: true
      })
    );
  }

  saveViewport(viewPort) {
    this.props.dispatch(
      actions.storeChartDataRequest({
        specOptions: viewPort
      })
    );
  }

  loadChartData() {
    if (this.props.publicPage) {
      this.props.dispatch(
        nodeActions.getPublicChartRequest({
          chartId: this.props.match.params.code
        })
      );
    } else if (this.props.match.params.code !== 'vizID' && this.props.user) {
      this.props.dispatch(
        nodeActions.getChartRequest({
          authId: this.props.user.authId,
          chartId: this.props.match.params.code
        })
      );
    }
  }

  storeChartToRedux() {
    const {
      _id,
      name,
      selectedYear,
      indicatorItems,
      selectedCountryVal,
      description,
      selectedRegionVal,
      type,
      selectedSources,
      author,
      dataSources,
      _public,
      team,
      descIntro,
      data,
      specOptions,
      created,
      yearRange
    } = this.props.chartResults;

    const selectedInd = indicatorItems.map((indItem, index) => {
      return {
        indicator: indItem.indicator,
        subIndicators: indItem.allSubIndicators,
        selectedSubInd: indItem.subIndicators,
        dataSource: dataSources[index]
      };
    });

    // we load up the redux chartData variable
    this.props.dispatch(
      actions.storeChartDataRequest({
        changesMade: false,
        chartMounted: true,
        name,
        _public,
        team: team.length > 0,
        data,
        chartId: _id,
        descIntro,
        selectedYear,
        selectedCountryVal,
        desc: description,
        selectedInd,
        authorName: author.username,
        createdDate: formatDate(created),
        selectedRegionVal: removeIds(selectedRegionVal),
        chartKeys: getChartKeys(
          type,
          [indicatorItems[0].indicator, indicatorItems[1].indicator],
          specOptions[graphKeys.colorPallet]
        ),
        specOptions
      })
    );

    // we load up the redux paneData variable
    this.props.dispatch(
      actions.storePaneDataRequest({
        chartType: type,
        selectedSources,
        yearRange
      })
    );

    this.setState({
      loading: false
    });
  }

  render() {
    return (
      <VisualizerModule
        saveViewport={this.saveViewport}
        chartKeys={this.props.chartData.chartKeys}
        publicPage={this.props.publicPage}
        outerHistory={this.props.history}
        chartType={this.props.paneData.chartType}
        code={this.props.match.params.code}
        loading={this.state.loading}
        auth0Client={this.props.auth0Client}
        selectYear={this.selectYear}
        selectedYear={this.props.chartData.selectedYear}
        data={this.props.chartData.data}
        dropDownData={this.props.dropDownData}
      />
    );
  }
}

VisualizerModuleMediator.propTypes = propTypes;
VisualizerModuleMediator.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    chartResults: state.chartResults.data,
    chartData: state.chartData.chartData,
    user: state.user.data,
    dupChartCreated: state.dupChartCreated,
    paneData: state.paneData.paneData
  };
};

// we'll have this random fragment container
// only cause we need the react relay environment
// for the actual fetchQuery
/* TODO: find out a proper way to fetchQuery without the need
    of this crateFragmentContainer for the relay environment */
export default createFragmentContainer(
  connect(mapStateToProps)(withRouter(VisualizerModuleMediator)),
  graphql`
    fragment VisualizerModuleMediator_indicatorAggregations on Query {
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
