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
  getFields,
  aggrKeys,
  formatBarChartKeys,
  formatBarData,
  formatChartLegends,
  formatCountryParam,
  formatDate,
  formatDonutData,
  formatDonutKeys,
  formatGeoData,
  formatLineData,
  formatTableData,
  getChartKeys,
  removeIds,
  getGroupBy
} from 'mediators/ModuleMediators/VisualizerModuleMediator/VisualizerModuleMediator.utils';
/* consts */
import initialState from '__consts__/InitialChartDataConst';
import paneTypes from '__consts__/PaneTypesConst';
import chartTypes from '__consts__/ChartConst';
import initialPaneState from '__consts__/InitialPaneDataConst';
import { colorSet } from '__consts__/PaneConst';
import graphKeys from '__consts__/GraphStructKeyConst';
import { aggrOptions, rankOptions } from '__consts__/GraphStructOptionConsts';
/* actions */
import * as nodeActions from 'services/actions/nodeBackend';
import * as actions from 'services/actions/general';
import cryptoJs from 'crypto-js';
import axios from 'axios';

const propTypes = {
  publicChart: PropTypes.shape({}),
  indicatorAggregations: PropTypes.shape({}),
  chartResults: PropTypes.shape({}),
  chartData: PropTypes.shape({}),
  user: PropTypes.shape({}),
  paneData: PropTypes.shape({}),
  auth0Client: PropTypes.shape({}),
  home: PropTypes.bool,
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
  home: false,
  chartData: {},
  user: {},
  paneData: {},
  indicatorAggregations: null
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
    $indicator: [Int]!
    $subInds: [String]!
    $countriesISO3: [String]!
    $indicatorId: Float!
    $OR_GeolocationIso3_Is_Null: Boolean!
    $orderBy: [String]!
    $groupBy: [String]!
    $fields: [String]!
    $tileUrl: Boolean!
    $currentTiles: String
  ) {
    indicators: datapointsAggregation(
      groupBy: $groupBy
      fields: $fields
      aggregation: ["Sum(value)"]
      orderBy: $orderBy
      date_In: $datePeriod
      indicatorId_In: $indicator
      geolocationIso3_In: $countriesISO3
      filterName_In: $subInds
      OR_GeolocationIso3_Is_Null: $OR_GeolocationIso3_Is_Null
      tileUrl: $tileUrl
      currentTiles: $currentTiles
    ) {
      indicatorName
      geolocationIso2
      comment
      geolocationTag
      geolocationType
      geolocationCenterLongLat
      geolocationPolygons
      valueFormatType
      filterName
      date
      value
      tileUrl
      zoom
      uniqCount
      minValue
      maxValue
    }
    subIndicators: allFilters(indicatorId: $indicatorId) {
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

    this._isMounted = false;

    this.state = {
      loading: false,
      selectedYear: this.props.chartData.selectedYear
        ? this.props.chartData.selectedYear
        : initialState.yearPeriod[0]
    };

    this.refetch = this.refetch.bind(this);
    this.selectYear = this.selectYear.bind(this);
    this.saveViewport = this.saveViewport.bind(this);
    this.loadChartData = this.loadChartData.bind(this);
    this.storeChartToRedux = this.storeChartToRedux.bind(this);
    this.selectYearRange = this.selectYearRange.bind(this);
    this.updateChartColor = this.updateChartColor.bind(this);
    this.updateRankBy = this.updateRankBy.bind(this);
    this.storeInitialChartOptions = this.storeInitialChartOptions.bind(this);
    this.refetchDone = this.refetchDone.bind(this);
    this.deleteGeoFiles = this.deleteGeoFiles.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    // so yeah with this we update the top bar pane with correct data
    if (!this.props.home) {
      this.props.dispatch(actions.dataPaneToggleRequest(paneTypes.visualizer));
    }

    // we also want to reset the previously created/updated chart
    this.props.dispatch(nodeActions.createUpdateChartInitial());

    // we also want reinitialize chartResults reset the previously created/updated chart
    this.props.dispatch(nodeActions.getPublicChartInitial());
    this.props.dispatch(nodeActions.getChartInitial());

    if (this.props.home) {
      // and we store the chart type so it would be accessible to the visualizer mediator
      // and whenever the visualizer mounts we want to reset the previous values
      this.props.dispatch(
        actions.storePaneDataRequest({
          ...initialPaneState,
          chartType: chartTypes.geoMap
        })
      );
    } else if (this.props.match.params.code !== 'vizID') {
      this.setState(
        {
          loading: true
        },
        this.loadChartData
      );
    } else {
      // and we store the chart type so it would be accessible to the visualizer mediator
      this.props.dispatch(
        actions.storePaneDataRequest({
          ...initialPaneState,
          chartType: this.props.match.params.chart
        })
      );
      if (chartTypes.tableChart !== this.props.match.params.chart) {
        this.storeInitialChartOptions();
      }
    }
  }

  componentDidUpdate(prevProps) {
    // so here we will update the chartId in the chart data, with the newly loaded in
    // duplicate chart, so yeah this if condition should only happen when a chart has been duplicated
    // and then has been selected to be edited
    if (this.props.match.params.code !== prevProps.match.params.code) {
      this.loadChartData();
    }

    if (!isEqual(this.props.user, prevProps.user) && this.props.user) {
      this.loadChartData();
    }

    if (
      !isEqual(
        this.props.chartData.specOptions[graphKeys.colorPallet],
        prevProps.chartData.specOptions[graphKeys.colorPallet]
      )
    ) {
      this.updateChartColor();
    }

    // and we load in the chart data retrieved from the node backend
    if (
      !isEqual(this.props.chartResults, prevProps.chartResults) &&
      this.props.chartResults
    ) {
      this.storeChartToRedux();
    }

    if (
      this.props.chartData.refetch !== prevProps.chartData.refetch &&
      this.props.chartData.refetch
    ) {
      this.refetch();
    }

    // so if the rankBy changes we only change the sorting of the chart
    // cause we don't need to refetch anything cause its all on the frontend
    if (
      (this.props.chartData.specOptions[graphKeys.rankBy] !==
        prevProps.chartData.specOptions[graphKeys.rankBy] &&
        prevProps.chartData.specOptions[graphKeys.rankBy]) ||
      this.props.chartData.specOptions[graphKeys.horizont] !==
        prevProps.chartData.specOptions[graphKeys.horizont]
    ) {
      this.updateRankBy(this.props.chartData.specOptions);
    }

    if (
      this.props.chartData.currTileFile &&
      this.props.paneData.chartType !== prevProps.paneData.chartType &&
      (this.props.paneData.chartType !== chartTypes.geoMap &&
        this.props.paneData.chartType !== chartTypes.focusKE &&
        this.props.paneData.chartType !== chartTypes.focusNL) &&
      (prevProps.paneData.chartType === chartTypes.geoMap ||
        prevProps.paneData.chartType === chartTypes.focusKE ||
        prevProps.paneData.chartType === chartTypes.focusNL)
    ) {
      // and here if the chartType changes, from a geochart to a non geochart
      // and if the previous geochart had tile file loaded
      // we delete the tile files from backends
      this.deleteGeoFiles();
    }
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

    this._isMounted = false;

    if (
      this.props.chartData.currTileFile &&
      (this.props.paneData.chartType === chartTypes.geoMap ||
        this.props.paneData.chartType === chartTypes.focusKE ||
        this.props.paneData.chartType === chartTypes.focusNL)
    ) {
      // And if one of the geo charts have been unloaded
      // and if it did use some geoJson file
      // we delete the geoJson files from the backend
      this.deleteGeoFiles();
    }
  }

  storeInitialChartOptions() {
    // we also store the initial values for the linecharts
    // graphstructure pane
    // so yeah yAxis should initially be numbers
    // and xAxis should initially be the categories
    // and the color pallet should be the first color
    // set from the consts

    let selectedInd = [...initialState.selectedInd];

    const specOptions = {
      [graphKeys.colorPallet]: colorSet[1].colors,
      [graphKeys.aggregate]: aggrOptions[0].value
    };

    if (chartTypes.lineChart === this.props.match.params.chart) {
      specOptions[graphKeys.aggregate] = aggrOptions[1].value;
    }

    if (chartTypes.barChart === this.props.match.params.chart) {
      specOptions[graphKeys.grouped] = false;
      specOptions[graphKeys.rankBy] = rankOptions[0].value;
      specOptions[graphKeys.horizont] = true;

      //  and we also remove the second indicator for the barchart
      selectedInd.pop();
    }

    if (chartTypes.donutChart === this.props.match.params.chart) {
      specOptions[graphKeys.aggrCountry] = false;
    }

    this.props.dispatch(
      actions.storeChartDataRequest({
        ...initialState,
        specOptions,
        selectedInd,
        // so we refetch data for development environment
        // cause we want that default indicator to be selected
        // always
        refetch: process.env.NODE_ENV === 'development'
      })
    );
  }

  updateRankBy(specOptions) {
    let barChartData = [];

    if (
      (specOptions[graphKeys.rankBy] === 'high' &&
        specOptions[graphKeys.horizont]) ||
      (specOptions[graphKeys.rankBy] === 'low' &&
        !specOptions[graphKeys.horizont])
    ) {
      barChartData = sortBy(this.props.chartData.data, ['allValSum']);
    } else if (
      (specOptions[graphKeys.rankBy] === 'high' &&
        !specOptions[graphKeys.horizont]) ||
      (specOptions[graphKeys.rankBy] === 'low' &&
        specOptions[graphKeys.horizont])
    ) {
      barChartData = sortBy(this.props.chartData.data, ['allValSum']).reverse();
    }

    this.props.dispatch(
      actions.storeChartDataRequest({
        data: barChartData
      })
    );
  }

  updateChartColor() {
    const selectedInds = this.props.chartData.selectedInd.map(indItem => {
      return {
        indName: indItem.indLabel,
        subIndAggr: indItem.aggregate,
        subInd: indItem.selectedSubInd,
        dataSource: indItem.dataSource
      };
    });

    const chartKeys = getChartKeys(
      this.props.match.params.chart,
      selectedInds,
      this.props.chartData.specOptions[graphKeys.colorPallet],
      this.props.chartData.chartKeys
    );

    this.props.dispatch(
      actions.storeChartDataRequest({
        chartKeys
      })
    );
  }

  updateIndicators(
    indicatorData,
    indSelectedIndex = this.props.chartData.indSelectedIndex
  ) {
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
      aggregationData[indItem.index] = {
        data: indItem.indAggregation,
        selectedSubInd: selectedInd[indItem.index].selectedSubInd,
        subIndAggr: selectedInd[indItem.index].aggregate
      };
    });

    // we just reparse it here, cause we want to
    // load in less data
    const selectedInds = selectedInd.map(indItem => {
      return {
        indName: indItem.indLabel,
        dataSource: indItem.dataSource,
        subIndAggr: indItem.aggregate,
        subInd: indItem.selectedSubInd
      };
    });

    let data = [];
    let chartKeys = [];
    // this is a variable that will be used
    // to add/update/remove data from/to the chart data
    let indKeys = [];

    if (this.props.home) {
      data = formatGeoData(
        indSelectedIndex,
        this.props.chartData.data,
        aggregationData,
        selectedInds
      );
    } else {
      switch (this.props.match.params.chart) {
        case chartTypes.geoMap:
          data = formatGeoData(
            indSelectedIndex,
            this.props.chartData.data,
            aggregationData,
            selectedInds
          );
          break;
        case chartTypes.focusKE:
          data = formatGeoData(
            indSelectedIndex,
            this.props.chartData.data,
            aggregationData,
            selectedInds
          );
          break;
        case chartTypes.focusNL:
          data = formatGeoData(
            indSelectedIndex,
            this.props.chartData.data,
            aggregationData,
            selectedInds
          );
          break;
        case chartTypes.lineChart: {
          const lineData = formatLineData(
            indSelectedIndex,
            this.props.chartData.chartKeys,
            this.props.chartData.indKeys,
            this.props.chartData.data,
            aggregationData,
            this.props.chartData.specOptions[graphKeys.aggregate]
          );

          data = lineData.data;
          indKeys = lineData.indKeys;

          chartKeys = formatChartLegends(
            selectedInds,
            this.props.chartData.specOptions[graphKeys.colorPallet],
            this.props.chartData.chartKeys
          );

          break;
        }
        case chartTypes.barChart: {
          const barData = formatBarData(
            indSelectedIndex,
            this.props.chartData.chartKeys,
            this.props.chartData.indKeys,
            this.props.chartData.data,
            aggregationData,
            this.props.chartData.specOptions[graphKeys.aggregate],
            this.props.chartData.specOptions[graphKeys.rankBy],
            this.props.chartData.specOptions[graphKeys.horizont],
            this.props.chartData.specOptions[graphKeys.colorPallet]
          );

          data = barData.data;
          indKeys = barData.indKeys;

          chartKeys = formatBarChartKeys(
            selectedInds,
            this.props.chartData.specOptions[graphKeys.colorPallet]
          );
          break;
        }
        case chartTypes.tableChart:
          data = formatTableData(aggregationData);
          break;
        case chartTypes.donutChart: {
          const donutData = formatDonutData(
            this.props.chartData.indicatorSelected,
            indSelectedIndex,
            this.props.chartData.chartKeys,
            this.props.chartData.indKeys,
            this.props.chartData.data,
            aggregationData,
            this.props.chartData.specOptions[graphKeys.aggrCountry]
          );

          data = donutData.data;
          indKeys = donutData.indKeys;

          chartKeys = formatDonutKeys(
            selectedInds,
            this.props.chartData.specOptions[graphKeys.colorPallet]
          );
          break;
        }
        default:
          data = [];
          break;
      }
    }

    // so we will use this variable to control when we want to refetch data
    // cause we only want to refetch data when a subindicator is selected
    // by our code below.
    let refetch = false;

    // and we want to reformat the subindicators ONLY
    // when an indicator is selected, like reformat as in
    // load in the subindicators as selectable options
    if (this.props.chartData.indicatorSelected) {
      // formatting the subindicator data commences!
      indicatorData.forEach(indItem => {
        let subIndicators = indItem.subIndicators.edges.map(indicator => {
          return { label: indicator.node.name, value: indicator.node.name };
        });

        // and we sort them
        subIndicators = sortBy(subIndicators, ['label']);
        let selectedSubInd = selectedInd[indItem.index].selectedSubInd;

        if (indSelectedIndex === indItem.index && subIndicators[0]) {
          // so if its a new indicator that gets selected
          // the selectedSubInds will be empty
          selectedSubInd = [];
          // and we just push in the first sub-indicator from the ones retrieved
          selectedSubInd.push(subIndicators[0].value);
          // and ofcourse we refetch the data
          refetch = true;
        }

        // so we associate the sub-indicators with their respective indicator
        // cause the data retrieved in 'indicatorData' might not be aligned
        // in the same way as the selectedInd data is aligned
        selectedInd[indItem.index] = {
          ...selectedInd[indItem.index],
          selectedSubInd,
          subIndicators
        };
      });
    }

    // and we save the subindicator selection for the datapane
    this.props.dispatch(
      actions.storeChartDataRequest({
        // so basically indSelectedIndex gets reset here
        // because we've updated the indicator
        indSelectedIndex: -1,
        // so basically indicatorSelected gets reset here
        // because we only need it to catch the first time its selected
        // and when new subindicators are retrieved, so we do it up there ^
        // and we can reset it here
        indicatorSelected: false,
        // so because we already do our own created refetch below
        // we don't want to do a refetch cause of this change to the
        // chart data
        selectedInd,
        chartKeys,
        indKeys,
        data
      })
    );

    if (refetch) {
      const refetchAll = this.props.chartData.refetchAll;
      // and we also pass in the currently formed selcted inds
      // with the updated subindicators in them,
      // just in case our redux is saving of selectedInd
      // is slower than the execution of this refetch
      this.refetch(indSelectedIndex, selectedInd, refetchAll);
    }
  }

  refetch(
    index = this.props.chartData.indSelectedIndex,
    selectedInd = this.props.chartData.selectedInd,
    refetchAll = false
  ) {
    const indicatorData = [];

    let datePeriod = [
      this.props.chartData.selectedYear,
      `${this.props.chartData.selectedYear}.0`
    ];
    let orderBy = ['date'];

    // so if an indicators data is selected we will receive an
    // index of the indicator, and if indicators index is -1
    // that means that some other data has been changed which should apply
    // for all of the indicators
    const refetchOne =
      index !== -1 &&
      !refetchAll &&
      this.props.paneData.chartType !== chartTypes.tableChart;

    const selectedInds = refetchOne ? [selectedInd[index]] : selectedInd;

    if (selectedInds.length > 0) {
      this.setState({
        loading: true
      });

      if (
        this.props.paneData.chartType === chartTypes.lineChart ||
        this.props.paneData.chartType === chartTypes.barChart
      ) {
        orderBy = [
          aggrKeys[this.props.chartData.specOptions[graphKeys.aggregate]]
        ];

        // so the first option in the axis options is 'geo' so if aggregated by geolocation
        // the user can only select one year and the order is by 'geolocationTag'
        // and if aggregated by year, which is the other option, the user can select
        // a range of years by which to aggregate and the orderBy is by 'date'
        if (
          this.props.chartData.specOptions[graphKeys.aggregate] ===
          aggrOptions[1].value
        ) {
          datePeriod = this.props.chartData.selectedYears.concat(
            this.props.chartData.selectedYears.map(sy => `${sy}.0`)
          );
        }
      }

      selectedInds.forEach((indItem, indIndex) => {
        // TODO: adjust this later with the refetchOne logic
        const isGeoChart =
          this.props.paneData.chartType === chartTypes.geoMap ||
          this.props.paneData.chartType === chartTypes.focusKE ||
          this.props.paneData.chartType === chartTypes.focusNL;

        const isLayer = refetchOne
          ? isGeoChart && index === 0
          : isGeoChart && indIndex === 0;

        const currIndex = refetchOne ? index : indIndex;

        const indicator = indItem.indicator;

        const subInds =
          indItem.selectedSubInd.length > 0 ? indItem.selectedSubInd : ['null'];

        // We forming the param for countries from the selected countries of a region
        // and single selected countries
        const countriesISO3 = formatCountryParam(
          this.props.chartData.selectedCountryVal,
          this.props.chartData.selectedRegionVal,
          this.props.chartData.selectedRegionCodes
        );

        if (
          (this.props.paneData.chartType === chartTypes.focusNL ||
            this.props.paneData.chartType === chartTypes.focusKE) &&
          countriesISO3.length > 0 &&
          countriesISO3.indexOf('undefined') === -1
        ) {
          countriesISO3.push('undefined');
        }

        // so this variable basically controlls the filter param for data points
        // that don't have/do have geolocationIso2 field
        const iso3Undef = countriesISO3.indexOf('undefined') !== -1;

        const refetchVars = {
          indicator: [indicator],
          indicatorId: indicator || -1,
          subInds,
          datePeriod,
          countriesISO3: countriesISO3.length > 0 ? countriesISO3 : [null],
          OR_GeolocationIso3_Is_Null: iso3Undef,
          orderBy,
          groupBy: getGroupBy(
            this.props.paneData.chartType,
            indItem.aggregate,
            isLayer,
            this.props.chartData.specOptions[graphKeys.aggregate],
            this.props.chartData.specOptions[graphKeys.aggrCountry]
          ),
          fields: getFields(this.props.paneData.chartType, isLayer),
          tileUrl: isLayer,
          currentTiles: this.props.chartData.currTileFile
        };

        fetchQuery(
          this.props.relay.environment,
          indicatorDataQuery,
          refetchVars
        ).then(data => {
          // so we do this CORS work
          if (isLayer && data.indicators && data.indicators.length > 0) {
            const url = process.env.REACT_APP_BACKEND_HOST.concat('/').concat(
              data.indicators[0].tileUrl
            );

            // and BECAUSE there's no CORS solution when running backend locally
            // and trying to serve these geojsons we apply this geojson download functionality

            // We also need to encrypt them values for our middleware to work
            const encValues = cryptoJs.AES.encrypt(
              JSON.stringify({
                tileUrl: url,
                prevTiles: this.props.chartData.currTileFile
              }),
              process.env.REACT_APP_ENCRYPTION_SECRET
            ).toString();

            axios
              .get(`/api/loadTiles`, {
                params: {
                  payload: encValues
                }
              })
              .then(response => {
                const currTileFile = response.data.substring(
                  response.data.lastIndexOf('/') + 1
                );

                this.props.dispatch(
                  actions.storeChartDataRequest({ currTileFile })
                );

                const indAggregation = [
                  {
                    ...data.indicators[0],
                    tileUrl: response.data
                  }
                ];

                indicatorData.push({
                  index: currIndex,
                  indAggregation,
                  subIndicators: data.subIndicators
                });

                this.refetchDone(
                  indicatorData,
                  selectedInds,
                  refetchOne,
                  index
                );
              })
              .catch(error => {
                console.log('Error downloading file: ', error);
              });
          } else {
            indicatorData.push({
              index: currIndex,
              indAggregation: data.indicators,
              subIndicators: data.subIndicators
            });
          }

          this.refetchDone(indicatorData, selectedInds, refetchOne, index);
        });
      });
    }
  }

  // this basically calls the update indicators when refetch is done
  // and the refetch is done depending on the indicatorData retrieved
  // and the selectedInd amounts
  refetchDone(indicatorData, selectedInds, refetchOne, index) {
    // so we only update the indicators when we've retrieved the same
    // amount of indicator data as we have indicators selected
    if (indicatorData.length === selectedInds.length && this._isMounted) {
      this.setState({ loading: false }, () =>
        // and ofcourse after refetching the data
        // we reset the refetch variable back to false
        // as the data has already been fetched
        this.props.dispatch(
          actions.storeChartDataRequest({
            refetch: false
          })
        )
      );

      const updateIndIndex =
        refetchOne || this.props.paneData.chartType === chartTypes.tableChart
          ? index
          : -1;
      this.updateIndicators(indicatorData, updateIndIndex);
    }
  }

  selectYear(val) {
    this.setState({ selectedYear: val });
    // so we set the values for chart data
    this.props.dispatch(
      actions.storeChartDataRequest({
        indSelectedIndex: -1,
        selectedYear: val,
        refetch: true,
        changesMade: true
      })
    );
  }

  selectYearRange(array) {
    this.props.dispatch(
      actions.storeChartDataRequest({
        selectedYears: array,
        refetch: true,
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
    if (!this.props.home) {
      if (this.props.publicPage) {
        this.props.dispatch(
          nodeActions.getPublicChartRequest({
            chartId: this.props.match.params.code,
            type: this.props.match.params.chart
          })
        );
      } else if (this.props.match.params.code !== 'vizID' && this.props.user) {
        this.props.dispatch(
          nodeActions.getChartRequest({
            authId: this.props.user.authId,
            chartId: this.props.match.params.code,
            type: this.props.match.params.chart
          })
        );
      }
    }
  }

  storeChartToRedux() {
    const {
      _id,
      name,
      selectedYear,
      selectedYears,
      chartKeys,
      indicatorItems,
      selectedCountryVal,
      description,
      selectedRegionVal,
      type,
      selectedSources,
      author,
      _public,
      teams,
      indKeys,
      descIntro,
      specOptions,
      selectedRegionCodes,
      created,
      yearRange
    } = this.props.chartResults.chart;

    const selectedInds = [];

    const selectedInd = indicatorItems.map(indItem => {
      selectedInds.push({
        indName: indItem.indLabel,
        subIndAggr: indItem.aggregate,
        subInds: indItem.selectedSubInd,
        dataSource: indItem.dataSource
      });
      return {
        indicator: indItem.indicator,
        indLabel: indItem.indLabel,
        subIndicators: indItem.allSubIndicators,
        selectedSubInd: indItem.subIndicators,
        aggregate: indItem.aggregate,
        dataSource: indItem.dataSource
      };
    });

    // we load up the redux chartData variable
    this.props.dispatch(
      actions.storeChartDataRequest({
        changesMade: this.props.chartResults.data === undefined,
        chartMounted: true,
        // for development purposes this needs to be reset
        // to -1 for the flow of chart data loading to work
        // properly
        indSelectedIndex: -1,
        name,
        _public,
        teams,
        data: this.props.chartResults.data || [],
        chartId: _id,
        descIntro,
        selectedYear,
        selectedYears,
        selectedCountryVal,
        desc: description,
        selectedInd,
        indicatorSelected: false,
        authorName: author ? author.username : 'User Not Found',
        createdDate: formatDate(created),
        selectedRegionVal: removeIds(selectedRegionVal),
        selectedRegionCodes,
        chartKeys:
          chartKeys ||
          getChartKeys(
            type,
            selectedInds,
            specOptions[graphKeys.colorPallet],
            []
          ),
        indKeys,
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

  deleteGeoFiles() {
    // so we delete the file from DUCT
    axios.delete(
      `${process.env.REACT_APP_BACKEND_HOST}/api/generic/removeTiles/`,
      {
        params: {
          fileName: this.props.chartData.currTileFile
        }
      }
    );

    // and then if DUCT is run locally
    // we delete the file from zoomBackend
    // We also need to encrypt them values for our middleware to work
    const encValues = cryptoJs.AES.encrypt(
      JSON.stringify({
        prevTiles: this.props.chartData.currTileFile
      }),
      process.env.REACT_APP_ENCRYPTION_SECRET
    ).toString();

    axios
      .get(`/api/loadTiles`, {
        params: {
          payload: encValues
        }
      })
      .then(() => {
        this.props.dispatch(
          // and just in case we set the currTileFile to null, cause this guy
          // has already been deleted
          actions.storeChartDataRequest({ currTileFile: null })
        );
      });
  }

  render() {
    console.log('this.props.chartData.data', this.props.chartData.data);

    return (
      <div style={{ height: '100%' }}>
        <VisualizerModule
          chartData={this.props.chartData}
          home={this.props.home}
          saveViewport={this.saveViewport}
          chartKeys={this.props.chartData.chartKeys}
          publicPage={this.props.publicPage}
          outerHistory={this.props.history}
          chartType={this.props.paneData.chartType}
          code={this.props.chartData.chartId}
          loading={
            this.state.loading ||
            this.props.chartCreated.request ||
            this.props.dupChartCreated.request
          }
          auth0Client={this.props.auth0Client}
          selectYearRange={this.selectYearRange}
          selectYear={this.selectYear}
          selectedYear={this.props.chartData.selectedYear}
          data={this.props.chartData.data}
          dropDownData={this.props.dropDownData}
          chartTitle={this.props.chartData.name}
        />
      </div>
    );
  }
}

VisualizerModuleMediator.propTypes = propTypes;
VisualizerModuleMediator.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    chartResults: state.chartResults.data,
    chartData: state.chartData.chartData,
    user: state.currentUser.data,
    dupChartCreated: state.dupChartCreated,
    chartCreated: state.chartCreated,
    paneData: state.paneData.paneData,
    dataPaneOpen: state.dataPaneOpen.open
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
