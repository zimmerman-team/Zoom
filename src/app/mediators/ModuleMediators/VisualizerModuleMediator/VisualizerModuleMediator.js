import React, { Component } from 'react';
import { createRefetchContainer, graphql } from 'react-relay';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import { withRouter } from 'react-router';
import {
  formatCountryCenterData,
  formatCountryLayerData,
  formatCountryParam,
  formatDate,
  formatLongLatData,
  removeIds,
  updatePercentiles
} from 'mediators/ModuleMediators/VisualizerModuleMediator/VisualizerModuleMediator.utils';
import PropTypes from 'prop-types';
import VisualizerModule from 'modules/visualizer/VisualizerModule';
import { connect } from 'react-redux';

/* consts */
import initialState from '__consts__/InitialChartDataConst';
import paneTypes from '__consts__/PaneTypesConst';

/* actions */
import * as nodeActions from 'services/actions/nodeBackend';
import * as actions from 'services/actions/general';

const propTypes = {
  indicatorAggregations: PropTypes.shape({
    indicators1: PropTypes.arrayOf(
      PropTypes.shape({
        indicatorName: PropTypes.string,
        geolocationIso2: PropTypes.string,
        geolocationTag: PropTypes.string,
        date: PropTypes.string,
        value: PropTypes.number
      })
    ),
    indicators2: PropTypes.arrayOf(
      PropTypes.shape({
        indicatorName: PropTypes.string,
        geolocationIso2: PropTypes.string,
        geolocationTag: PropTypes.string,
        date: PropTypes.string,
        value: PropTypes.number
      })
    ),
    subIndicators1: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            name: PropTypes.string
          })
        })
      )
    }),
    subIndicators2: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            name: PropTypes.string
          })
        })
      )
    })
  }),
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
  indicatorAggregations: {}
};

class VisualizerModuleMediator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedYear: this.props.chartData.selectedYear
        ? this.props.chartData.selectedYear
        : initialState.yearPeriod[0],
      indicators: []
    };

    this.refetch = this.refetch.bind(this);
    this.selectYear = this.selectYear.bind(this);
  }

  componentDidMount() {
    // so yeah with this we update the top bar pane with correct data
    this.props.dispatch(actions.dataPaneToggleRequest(paneTypes.visualizer));

    if (this.props.match.params.code !== 'vizID') {
      if (this.props.user)
        this.props.dispatch(
          nodeActions.getChartRequest({
            authId: this.props.user.authId,
            chartId: this.props.match.params.code
          })
        );
    }
    // and we store this so it would be accessible to the visualizer mediator
    else
      this.props.dispatch(
        actions.storePaneDataRequest({
          chartType: this.props.match.params.chart
        })
      );
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.user, prevProps.user) && this.props.user) {
      if (this.props.match.params.code !== 'vizID') {
        this.props.dispatch(
          nodeActions.getChartRequest({
            authId: this.props.user.authId,
            chartId: this.props.match.params.code
          })
        );
      }
    }

    if (
      !isEqual(
        this.props.indicatorAggregations,
        prevProps.indicatorAggregations
      )
    ) {
      this.updateIndicators();
    }

    if (
      this.props.paneData.yearRange !== prevProps.paneData.yearRange &&
      this.props.paneData.yearRange
    ) {
      const currStartYear = this.props.paneData.yearRange.substring(
        0,
        this.props.paneData.yearRange.indexOf(',')
      );

      if (prevProps.paneData.yearRange) {
        const prevStartYear = prevProps.paneData.yearRange.substring(
          0,
          prevProps.paneData.yearRange.indexOf(',')
        );

        if (prevStartYear !== currStartYear) {
          // this is the year selection for the geomaps/homepage timeline
          this.selectYear(currStartYear);
          this.updateIndicators();
        }
      } else {
        // this is the year selection for the geomaps/homepage timeline
        this.selectYear(currStartYear);
        this.updateIndicators();
      }
    }

    // and we load in the chart data retrieved from the node backend
    if (
      !isEqual(this.props.chartResults, prevProps.chartResults) &&
      this.props.chartResults
    ) {
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
        created,
        yearRange
      } = this.props.chartResults;

      // we load up the redux chartData variable
      this.props.dispatch(
        actions.storeChartDataRequest({
          chartMounted: true,
          name,
          chartId: _id,
          selectedYear,
          // TODO this will need to be redone after we implement the logic for infinite amounts of indicators
          selectedInd1: indicatorItems[0].indicator,
          selectedInd2: indicatorItems[1].indicator,
          selectedCountryVal,
          desc: description,
          selectedSubInd1: indicatorItems[0].subIndicators,
          selectedSubInd2: indicatorItems[1].subIndicators,
          authorName: author.username,
          createdDate: formatDate(created),
          selectedRegionVal: removeIds(selectedRegionVal)
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
    }

    // TODO redo this check properly
    const { name, desc, ...restChart } = this.props.chartData;
    const {
      name: prevName,
      desc: prevDesc,
      ...prevRestChart
    } = prevProps.chartData;
    // so we refetch data when chartData changes
    // and we dont want to refetch data when only the name/description ofthe chart is changed
    if (!isEqual(restChart, prevRestChart)) this.refetch();
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
        chartType: '',
        selectedSources: [],
        yearRange: '2003,2016',
        subIndicators1: [],
        subIndicators2: []
      })
    );

    // and we close the datapane
    this.props.dispatch(actions.dataPaneToggleRequest(paneTypes.none));
  }

  updateIndicators() {
    let subIndicators1 = this.props.indicatorAggregations.subIndicators1.edges.map(
      indicator => {
        return { label: indicator.node.name, value: indicator.node.name };
      }
    );

    // and we sort them
    subIndicators1 = sortBy(subIndicators1, ['label']);

    let subIndicators2 = this.props.indicatorAggregations.subIndicators2.edges.map(
      indicator => {
        return { label: indicator.node.name, value: indicator.node.name };
      }
    );

    // and we sort them
    subIndicators2 = sortBy(subIndicators2, ['label']);

    let longLatData = [];
    let countryLayerData = {};

    // so we check here if the retrieved data is long lat
    // and then format it differently
    // TODO: make this work differently, this is currently i quick and dirty fix
    if (
      this.props.indicatorAggregations.indicators1[0] &&
      this.props.indicatorAggregations.indicators1[0].geolocationTag &&
      this.props.indicatorAggregations.indicators1[0].geolocationTag.indexOf(
        ','
      ) !== -1 &&
      /\d/.test(this.props.indicatorAggregations.indicators1[0].geolocationTag)
    ) {
      longLatData = formatLongLatData(
        this.props.indicatorAggregations.indicators1,
        this.props.chartData.selectedInd1
      );
    } else {
      countryLayerData = formatCountryLayerData(
        this.props.indicatorAggregations.indicators1,
        this.props.chartData.selectedInd1
      );
    }

    let countryCircleData = [];
    // so we check here if the retrieved data is long lat
    // and then format it differently
    // TODO: make this work differently, this is currently i quick and dirty fix
    if (
      this.props.indicatorAggregations.indicators2[0] &&
      this.props.indicatorAggregations.indicators2[0].geolocationTag &&
      this.props.indicatorAggregations.indicators2[0].geolocationTag.indexOf(
        ','
      ) !== -1 &&
      /\d/.test(this.props.indicatorAggregations.indicators2[0].geolocationTag)
    ) {
      longLatData = formatLongLatData(
        this.props.indicatorAggregations.indicators2,
        this.props.chartData.selectedInd2
      );
    } else {
      countryCircleData = formatCountryCenterData(
        this.props.indicatorAggregations.indicators2,
        this.props.chartData.selectedInd2
      );
    }

    const indicators = [];

    if (countryLayerData.features && countryLayerData.features.length > 0) {
      updatePercentiles(countryLayerData, f => f.properties.value);

      indicators.push({
        type: 'layer',
        data: countryLayerData,
        legendName: ` ${this.props.chartData.selectedInd1} `
      });
    }

    if (countryCircleData.length > 0) {
      indicators.push({
        type: 'circle',
        data: countryCircleData,
        legendName: ` ${this.props.chartData.selectedInd2} `
      });
    }

    if (longLatData.length > 0) {
      indicators.push({
        type: 'location',
        data: longLatData,
        legendName: `POI`
      });
    }

    // and we save the subindicator selection for the datapane
    this.props.dispatch(
      actions.storePaneDataRequest({
        subIndicators1,
        subIndicators2
      })
    );

    this.setState({ indicators });
  }

  refetch(
    ind1 = this.props.chartData.selectedInd1,
    ind2 = this.props.chartData.selectedInd2,
    selectedYear = this.state.selectedYear,
    subInd1 = this.props.chartData.selectedSubInd1,
    subInd2 = this.props.chartData.selectedSubInd2,
    countriesCodes = this.props.chartData.selectedCountryVal,
    regionCountriesCodes = this.props.chartData.selectedRegionVal
  ) {
    this.setState({
      loading: true
    });

    // We forming the param for countries from the selected countries of a region
    // and single selected countries
    const countriesISO2 = formatCountryParam(
      countriesCodes,
      regionCountriesCodes
    );

    const refetchVars = {
      indicator1: [ind1],
      indicator2: [ind2],
      countriesISO2,
      singleInd1: ind1 ? ind1 : 'null',
      singleInd2: ind2 ? ind2 : 'null',
      datePeriod: [selectedYear],
      subInd1: subInd1.length > 0 ? subInd1 : ['undefined'],
      subInd2: subInd2.length > 0 ? subInd2 : ['undefined']
    };

    this.props.relay.refetch(refetchVars, null, () =>
      this.setState({ loading: false })
    );
  }

  selectYear(val) {
    this.setState({ selectedYear: val });
    // so we set the values for chart data
    this.props.dispatch(
      actions.storeChartDataRequest({
        selectedYear: val
      })
    );
  }

  render() {
    console.log('this.props.chartResults', this.props.chartResults);
    return (
      <VisualizerModule
        chartType={this.props.paneData.chartType}
        code={this.props.match.params.code}
        loading={this.state.loading}
        selectYear={this.selectYear}
        selectedYear={this.props.chartData.selectedYear}
        indicators={this.state.indicators}
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
    paneData: state.paneData.paneData
  };
};

export default createRefetchContainer(
  connect(mapStateToProps)(withRouter(VisualizerModuleMediator)),
  graphql`
    fragment VisualizerModuleMediator_indicatorAggregations on Query
      @argumentDefinitions(
        datePeriod: { type: "[String]", defaultValue: ["null"] }
        indicator1: { type: "[String]", defaultValue: ["null"] }
        indicator2: { type: "[String]", defaultValue: ["null"] }
        subInd1: { type: "[String]", defaultValue: ["null"] }
        subInd2: { type: "[String]", defaultValue: ["null"] }
        countriesISO2: { type: "[String]", defaultValue: ["null"] }
        singleInd1: { type: "String", defaultValue: "null" }
        singleInd2: { type: "String", defaultValue: "null" }
      ) {
      indicators1: datapointsAggregation(
        groupBy: [
          "indicatorName"
          "geolocationTag"
          "date"
          "geolocationIso2"
          "geolocationPolygons"
          "valueFormatType"
        ]
        orderBy: ["indicatorName"]
        aggregation: ["Sum(value)"]
        date_In: $datePeriod
        indicatorName_In: $indicator1
        geolocationIso2_In: $countriesISO2
        filterName_In: $subInd1
      ) {
        indicatorName
        geolocationIso2
        geolocationTag
        geolocationPolygons
        valueFormatType
        date
        value
      }
      indicators2: datapointsAggregation(
        groupBy: [
          "indicatorName"
          "geolocationTag"
          "date"
          "geolocationIso2"
          "geolocationCenterLongLat"
          "valueFormatType"
        ]
        orderBy: ["indicatorName"]
        aggregation: ["Sum(value)"]
        date_In: $datePeriod
        indicatorName_In: $indicator2
        geolocationIso2_In: $countriesISO2
        filterName_In: $subInd2
      ) {
        indicatorName
        geolocationIso2
        geolocationTag
        geolocationCenterLongLat
        valueFormatType
        date
        value
      }
      subIndicators1: allFilters(indicator_Name: $singleInd1) {
        edges {
          node {
            name
          }
        }
      }
      subIndicators2: allFilters(indicator_Name: $singleInd2) {
        edges {
          node {
            name
          }
        }
      }
    }
  `,
  graphql`
    query VisualizerModuleMediatorRefetchQuery(
      $datePeriod: [String]!
      $indicator1: [String]!
      $indicator2: [String]!
      $subInd1: [String]!
      $subInd2: [String]!
      $countriesISO2: [String]!
      $singleInd1: String!
      $singleInd2: String!
    ) {
      ...VisualizerModuleMediator_indicatorAggregations
        @arguments(
          datePeriod: $datePeriod
          indicator1: $indicator1
          indicator2: $indicator2
          countriesISO2: $countriesISO2
          singleInd1: $singleInd1
          singleInd2: $singleInd2
          subInd1: $subInd1
          subInd2: $subInd2
        )
    }
  `
);
