import React, { Component } from 'react';
import { createRefetchContainer, graphql } from 'react-relay';
import isEqual from 'lodash/isEqual';
import {
  formatCountryCenterData,
  formatCountryLayerData,
  formatCountryParam,
  updatePercentiles
} from 'mediators/ModuleMediators/VisualizerModuleMediator/VisualizerModuleMediator.utils';
import PropTypes from 'prop-types';
import { initialState } from 'mediators/ModuleMediators/VisualizerModuleMediator/VisualizerModuleMediator.consts';
import VisualizerModule from 'modules/visualizer/VisualizerModule';
import { formatLongLatData } from 'mediators/ModuleMediators/HomeModuleMediator/HomeModuleMediator.utils';

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
      ...initialState
    };

    this.refetch = this.refetch.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !isEqual(
        this.props.indicatorAggregations,
        prevProps.indicatorAggregations
      )
    ) {
      this.updateIndicators();
    }

    // so we refetch the subindicators, if one of the indicators has been changed
    if (
      this.state.selectedInd1 !== prevState.selectedInd1 ||
      this.state.selectedInd2 !== prevState.selectedInd2
    ) {
      this.refetch();
    }
  }

  updateIndicators() {
    const subIndicators1 = this.props.indicatorAggregations.subIndicators1.edges.map(
      indicator => {
        return { label: indicator.node.name, value: indicator.node.name };
      }
    );

    const subIndicators2 = this.props.indicatorAggregations.subIndicators2.edges.map(
      indicator => {
        return { label: indicator.node.name, value: indicator.node.name };
      }
    );

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
        this.state.selectedInd1
      );
    } else {
      countryLayerData = formatCountryLayerData(
        this.props.indicatorAggregations.indicators1,
        this.state.selectedInd1
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
        this.state.selectedInd2
      );
    } else {
      countryCircleData = formatCountryCenterData(
        this.props.indicatorAggregations.indicators2,
        this.state.selectedInd2
      );
    }

    const indicators = [];

    if (countryLayerData.features && countryLayerData.features.length > 0) {
      updatePercentiles(countryLayerData, f => f.properties.value);

      indicators.push({
        type: 'layer',
        data: countryLayerData,
        legendName: ` ${this.state.selectedInd1} `
      });
    }

    if (countryCircleData.length > 0) {
      indicators.push({
        type: 'circle',
        data: countryCircleData,
        legendName: ` ${this.state.selectedInd2} `
      });
    }

    if (longLatData.length > 0) {
      indicators.push({
        type: 'location',
        data: longLatData,
        legendName: `POI`
      });
    }

    this.setState({ indicators, subIndicators1, subIndicators2 });
  }

  refetch(
    ind1 = this.state.selectedInd1,
    ind2 = this.state.selectedInd2,
    datePeriod = this.state.yearPeriod,
    subInd1 = this.state.selectedSubInd1,
    subInd2 = this.state.selectedSubInd2,
    countriesCodes = this.state.selectedCountryVal,
    regionCountriesCodes = this.state.selectedRegionVal
  ) {
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
      datePeriod,
      subInd1: subInd1.length > 0 ? subInd1 : ['undefined'],
      subInd2: subInd2.length > 0 ? subInd2 : ['undefined']
    };

    this.props.relay.refetch(refetchVars);
  }

  render() {
    return (
      <VisualizerModule
        indicators={this.state.indicators}
        dropDownData={this.props.dropDownData}

        // selectInd1={this.selectInd1}
        // selectInd2={this.selectInd2}
        // selectYear={this.selectYear}
        // selectSubInd1={this.selectSubInd1}
        // selectSubInd2={this.selectSubInd2}
        // selectedInd1={this.state.selectedInd1}
        // selectedInd2={this.state.selectedInd2}
        // selectedSubInd1={this.state.selectedSubInd1}
        // selectedSubInd2={this.state.selectedSubInd2}

        // subIndicators1={this.state.subIndicators1}
        // subIndicators2={this.state.subIndicators2}

        // selectCountry={this.selectCountry}
        // selectedCountryVal={this.state.selectedCountryVal}
        // selectedRegionVal={this.state.selectedRegionVal}
        // selectRegion={this.selectRegion}
        // resetAll={this.resetAll}
        // yearPeriod={this.state.yearPeriod}
      />
    );
  }
}

VisualizerModuleMediator.propTypes = propTypes;
VisualizerModuleMediator.defaultProps = defaultProps;

export default createRefetchContainer(
  VisualizerModuleMediator,
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
