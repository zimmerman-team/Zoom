import React, { Component } from 'react';
import { createRefetchContainer, graphql } from 'react-relay';
import { json as requestJson } from 'd3-request';
import isEqual from 'lodash/isEqual';
import {
  formatCountryCenterData,
  formatCountryLayerData,
  formatCountryParam,
} from 'mediators/ModuleMediators/HomeModuleMediator/HomeModuleMediator.utils';
import { updatePercentiles } from 'components/geo/GeoMap/components/utils';
import HomeModule from 'modules/home/HomeModule';
import PropTypes from 'prop-types';

const propTypes = {
  indicatorAggregations: PropTypes.shape({
    indicators1: PropTypes.arrayOf(
      PropTypes.shape({
        indicatorName: PropTypes.string,
        geolocationIso2: PropTypes.string,
        geolocationTag: PropTypes.string,
        date: PropTypes.string,
        value: PropTypes.number,
      }),
    ),
    indicators2: PropTypes.arrayOf(
      PropTypes.shape({
        indicatorName: PropTypes.string,
        geolocationIso2: PropTypes.string,
        geolocationTag: PropTypes.string,
        date: PropTypes.string,
        value: PropTypes.number,
      }),
    ),
    subIndicators1: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            name: PropTypes.string,
          }),
        }),
      ),
    }),
    subIndicators2: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            name: PropTypes.string,
          }),
        }),
      ),
    }),
  }),
  dropDownData: PropTypes.shape({
    allIndicators: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            name: PropTypes.string,
          }),
        }),
      ),
    }),
    allCountries: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            name: PropTypes.string,
            iso2: PropTypes.string,
          }),
        }),
      ),
    }),
  }),
};

const defaultProps = {
  dropDownData: {},
  indicatorAggregations: {},
};

class HomeModuleMediator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryCenters: [],
      worldMap: [],
      indicators: [],
      selectedInd1: undefined,
      selectedInd2: undefined,
      yearPeriod: [],
      subIndicators1: [],
      subIndicators2: [],
      selectedCountryVal: [],
      selectedSubInd1: undefined,
      selectedSubInd2: undefined,
      selectedRegionVal: [],
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

  componentDidMount() {
    requestJson(`static/country_center.json`, (error, countryCenters) => {
      if (!error) {
        requestJson(`static/world.json`, (error2, worldMap) => {
          if (!error2) {
            this.setState(
              {
                countryCenters,
                worldMap,
              },
              this.updateIndicators,
            );
          }
        });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !isEqual(
        this.props.indicatorAggregations,
        prevProps.indicatorAggregations,
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
      },
    );

    const subIndicators2 = this.props.indicatorAggregations.subIndicators2.edges.map(
      indicator => {
        return { label: indicator.node.name, value: indicator.node.name };
      },
    );

    const countryLayerData = formatCountryLayerData(
      this.props.indicatorAggregations.indicators1,
      this.state.worldMap,
    );
    const countryCircleData = formatCountryCenterData(
      this.props.indicatorAggregations.indicators2,
      this.state.countryCenters,
    );

    updatePercentiles(countryLayerData, f => f.properties.indicator.value);

    const indicators = [];

    if (countryLayerData.features.length > 0) {
      indicators.push({
        type: 'layer',
        data: countryLayerData,
        legendName: `${this.state.selectedInd1} ${this.state.selectedSubInd1} ${
          this.state.yearPeriod[0]
        } -  ${this.state.yearPeriod[1]}`,
      });
    }

    if (countryCircleData.length > 0) {
      indicators.push({
        type: 'circle',
        data: countryCircleData,
        legendName: `${this.state.selectedInd2} ${this.state.selectedSubInd2} ${
          this.state.selectedStartYear
        } -  ${this.state.selectedEndYear}`,
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
    regionCountriesCodes = this.state.selectedRegionVal,
  ) {
    // We forming the param for countries from the selected countries of a region
    // and single selected countries
    const countriesISO2 = formatCountryParam(
      countriesCodes,
      regionCountriesCodes,
    );

    const refetchVars = {
      indicator1: [ind1],
      indicator2: [ind2],
      countriesISO2,
      singleInd1: ind1 ? ind1 : 'null',
      singleInd2: ind2 ? ind2 : 'null',
      datePeriod,
      subInd1: [subInd1],
      subInd2: [subInd2],
    };

    this.props.relay.refetch(refetchVars);
  }

  selectInd1(val) {
    // So if a new batch of subindicators is retrieved
    // we reset the selected subindicator
    this.setState(
      {
        selectedInd1: val.value.value,
        selectedSubInd1: 'Select sub indicator',
      },
      this.refetch,
    );
  }

  selectInd2(val) {
    // So if a new batch of subindicators is retrieved
    // we reset the selected subindicator
    this.setState(
      {
        selectedInd2: val.value.value,
        selectedSubInd2: 'Select sub indicator',
      },
      this.refetch,
    );
  }

  selectSubInd1(val) {
    this.setState({ selectedSubInd1: val.value.value }, this.refetch);
  }

  selectSubInd2(val) {
    this.setState({ selectedSubInd2: val.value.value }, this.refetch);
  }

  selectYear(val) {
    this.setState(
      { yearPeriod: [val[0].toString(), val[1].toString()] },
      this.refetch,
    );
  }

  selectCountry(item) {
    let selectedCountryVal = [];

    if (item !== 'reset') {
      selectedCountryVal = [...this.state.selectedCountryVal];

      const countryIndex = selectedCountryVal.indexOf(item.value);

      if (countryIndex === -1)
        // so if it doesn't exist we add it
        selectedCountryVal.push(item.value);
      // if it does exist we remove it
      else selectedCountryVal.splice(countryIndex, 1);
    }

    this.setState({ selectedCountryVal }, this.refetch);
  }

  selectRegion(item) {
    let selectedRegionVal = [];

    if (item !== 'reset') {
      selectedRegionVal = [...this.state.selectedRegionVal];

      const regionIndex = selectedRegionVal.indexOf(item.value);

      if (regionIndex === -1)
        // so if it doesn't exist we add it
        selectedRegionVal.push(item.value);
      // if it does exist we remove it
      else selectedRegionVal.splice(regionIndex, 1);
    }

    this.setState({ selectedRegionVal }, this.refetch);
  }

  resetAll() {
    this.setState(
      {
        indicators: [],
        selectedInd1: undefined,
        selectedInd2: undefined,
        yearPeriod: [],
        subIndicators1: [],
        subIndicators2: [],
        selectedCountryVal: [],
        selectedSubInd1: undefined,
        selectedSubInd2: undefined,
        selectedRegionVal: [],
      },
      this.refetch,
    );
  }

  render() {
    return (
      <HomeModule
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
      />
    );
  }
}

HomeModuleMediator.propTypes = propTypes;
HomeModuleMediator.defaultProps = defaultProps;

export default createRefetchContainer(
  HomeModuleMediator,
  graphql`
    fragment HomeModuleMediator_indicatorAggregations on Query
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
        groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"]
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
        date
        value
      }
      indicators2: datapointsAggregation(
        groupBy: ["indicatorName", "geolocationTag", "date", "geolocationIso2"]
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
    query HomeModuleMediatorRefetchQuery(
      $datePeriod: [String]!
      $indicator1: [String]!
      $indicator2: [String]!
      $subInd1: [String]!
      $subInd2: [String]!
      $countriesISO2: [String]!
      $singleInd1: String!
      $singleInd2: String!
    ) {
      ...HomeModuleMediator_indicatorAggregations
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
  `,
);
