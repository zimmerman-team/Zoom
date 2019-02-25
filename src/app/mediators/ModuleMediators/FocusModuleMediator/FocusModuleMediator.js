import React, { Component } from 'react';
import { createRefetchContainer, graphql } from 'react-relay';
import isEqual from 'lodash/isEqual';
import {
  formatCountryCenterData,
  formatCountryLayerData,
  formatCountryParam,
  formatYearParam,
  updatePercentiles
} from 'mediators/ModuleMediators/FocusModuleMediator/FocusModuleMediator.utils';

import PropTypes from 'prop-types';
import { initialState } from 'mediators/ModuleMediators/FocusModuleMediator/FocusModuleMediator.consts';
import { FocusModule } from 'modules/focus/FocusModule';

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

// As discussed with Siem default year period selected should be
// current year and 15 years before
const now = new Date();
const currentYear = now.getFullYear();
const yearBefore = currentYear - 15;

class FocusModuleMediator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yearPeriod: formatYearParam([yearBefore, currentYear]),
      ...initialState
    };

    this.selectInd1 = this.selectInd1.bind(this);
    this.selectInd2 = this.selectInd2.bind(this);
    this.selectSubInd1 = this.selectSubInd1.bind(this);
    this.selectSubInd2 = this.selectSubInd2.bind(this);
    this.selectYear = this.selectYear.bind(this);
    this.refetch = this.refetch.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.selectRegion = this.selectRegion.bind(this);
    this.resetAll = this.resetAll.bind(this);
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

    const countryLayerData = formatCountryLayerData(
      this.props.indicatorAggregations.indicators1
    );
    const countryCircleData = formatCountryCenterData(
      this.props.indicatorAggregations.indicators2
    );

    updatePercentiles(countryLayerData, f => f.properties.value);

    const indicators = [];

    if (countryLayerData.features.length > 0) {
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

  selectInd1(val) {
    // So if a new batch of subindicators is retrieved
    // we reset the selected subindicator
    this.setState(
      {
        selectedInd1: val.value,
        selectedSubInd1: []
      },
      this.refetch
    );
  }

  selectInd2(val) {
    // So if a new batch of subindicators is retrieved
    // we reset the selected subindicator
    this.setState(
      {
        selectedInd2: val.value,
        selectedSubInd2: []
      },
      this.refetch
    );
  }

  selectSubInd1(item) {
    const selectedSubInd1 = [...this.state.selectedSubInd1];
    const subIndicatorIndex = selectedSubInd1.indexOf(item.value);

    if (subIndicatorIndex === -1)
      // so if it doesn't exist we add it
      selectedSubInd1.push(item.value);
    // if it does exist we remove it
    else selectedSubInd1.splice(subIndicatorIndex, 1);

    this.setState({ selectedSubInd1 }, this.refetch);
  }

  selectSubInd2(item) {
    const selectedSubInd2 = [...this.state.selectedSubInd2];
    const subIndicatorIndex = selectedSubInd2.indexOf(item.value);

    if (subIndicatorIndex === -1)
      // so if it doesn't exist we add it
      selectedSubInd2.push(item.value);
    // if it does exist we remove it
    else selectedSubInd2.splice(subIndicatorIndex, 1);

    this.setState({ selectedSubInd2 }, this.refetch);
  }

  selectYear(val) {
    this.setState({ yearPeriod: formatYearParam(val) }, this.refetch);
  }

  selectCountry(item, array = false) {
    let selectedCountryVal = [];

    // so we set up this logic for select/deselect all logic
    // if all is selected all of the options will be passed in
    if (item !== 'reset') {
      if (array) {
        item.forEach(it => {
          selectedCountryVal.push(it.value);
        });
      } else {
        selectedCountryVal = [...this.state.selectedCountryVal];
        const countryIndex = selectedCountryVal.indexOf(item.value);
        if (countryIndex === -1)
          // so if it doesn't exist we add it
          selectedCountryVal.push(item.value);
        // if it does exist we remove it
        else selectedCountryVal.splice(countryIndex, 1);
      }
    }

    this.setState({ selectedCountryVal }, this.refetch);
  }

  selectRegion(item, array = false) {
    let selectedRegionVal = [];

    // so we set up this logic for select/deselect all logic
    // if all is selected all of the options will be passed in
    if (item !== 'reset') {
      if (array) {
        item.forEach(it => {
          selectedRegionVal.push(it.value);
        });
      } else {
        selectedRegionVal = [...this.state.selectedRegionVal];
        const regionIndex = selectedRegionVal.indexOf(item.value);

        if (regionIndex === -1)
          // so if it doesn't exist we add it
          selectedRegionVal.push(item.value);
        // if it does exist we remove it
        else selectedRegionVal.splice(regionIndex, 1);
      }
    }

    this.setState({ selectedRegionVal }, this.refetch);
  }

  resetAll() {
    this.setState(
      {
        ...initialState
      },
      this.refetch
    );
  }

  render() {
    return (
      <FocusModule
        indicators={this.state.indicators}
        dropDownData={this.props.dropDownData}
        selectInd1={this.selectInd1}
        selectInd2={this.selectInd2}
        selectYear={this.selectYear}
        selectSubInd1={this.selectSubInd1}
        selectSubInd2={this.selectSubInd2}
        selectedInd1={this.state.selectedInd1}
        selectedInd2={this.state.selectedInd2}
        selectedSubInd1={this.state.selectedSubInd1}
        selectedSubInd2={this.state.selectedSubInd2}
        subIndicators1={this.state.subIndicators1}
        subIndicators2={this.state.subIndicators2}
        selectCountry={this.selectCountry}
        selectedCountryVal={this.state.selectedCountryVal}
        selectedRegionVal={this.state.selectedRegionVal}
        selectRegion={this.selectRegion}
        resetAll={this.resetAll}
        defaultYear={this.state.defaultYear}
        yearPeriod={this.state.yearPeriod}
      />
    );
  }
}

FocusModuleMediator.propTypes = propTypes;
FocusModuleMediator.defaultProps = defaultProps;

export default createRefetchContainer(
  FocusModuleMediator,
  graphql`
    fragment FocusModuleMediator_indicatorAggregations on Query
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
    query FocusModuleMediatorRefetchQuery(
      $datePeriod: [String]!
      $indicator1: [String]!
      $indicator2: [String]!
      $subInd1: [String]!
      $subInd2: [String]!
      $countriesISO2: [String]!
      $singleInd1: String!
      $singleInd2: String!
    ) {
      ...FocusModuleMediator_indicatorAggregations
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
