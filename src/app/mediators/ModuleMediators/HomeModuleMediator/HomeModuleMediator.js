import React, { Component } from 'react';
import { createRefetchContainer, graphql } from 'react-relay';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import {
  formatCountryCenterData,
  formatCountryLayerData,
  formatCountryParam,
  updatePercentiles,
  formatLongLatData
} from 'mediators/ModuleMediators/HomeModuleMediator/HomeModuleMediator.utils';
import { formatYearParam } from 'utils/genericUtils';
import HomeModule from 'modules/home/HomeModule';
import PropTypes from 'prop-types';

/* consts */
import { initialState } from 'mediators/ModuleMediators/HomeModuleMediator/HomeModuleMediator.consts';
import generalInitial from '__consts__/InitialChartDataConst';
import { connect } from 'react-redux';
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

// As discussed with Siem default year period selected should be
// current year and 15 years before
const now = new Date();
const currentYear = now.getFullYear();
const yearBefore = currentYear - 15;

class HomeModuleMediator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedYear: generalInitial.selectedYear,
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
    this.getCountriesByRegion = this.getCountriesByRegion.bind(this);
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

  componentWillUnmount() {
    this.props.dispatch(
      actions.storePaneDataRequest({
        allCountries: [],
        allRegions: [],
        selectedSources: [],
        yearRange: '1992,2018',
        subIndicators1: [],
        subIndicators2: []
      })
    );
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
        legendName: `POI: ${longLatData[0].indName}`
      });
    }

    this.setState({
      indicators,
      subIndicators1,
      subIndicators2
    });
  }

  refetch(
    ind1 = this.state.selectedInd1,
    ind2 = this.state.selectedInd2,
    selectedYear = this.state.selectedYear,
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

    // so this variable basically controlls the filter param for data points
    // that don't have/do have geolocationIso2 field
    const iso2Undef = countriesISO2.indexOf('undefined') !== -1;

    const refetchVars = {
      indicator1: [ind1],
      indicator2: [ind2],
      countriesISO2,
      singleInd1: ind1 ? ind1 : 'null',
      singleInd2: ind2 ? ind2 : 'null',
      datePeriod: [selectedYear],
      subInd1: subInd1.length > 0 ? subInd1 : ['undefined'],
      subInd2: subInd2.length > 0 ? subInd2 : ['undefined'],
      OR_GeolocationIso2_Is_Null: iso2Undef
    };

    this.setState({
      loading: true
    });

    this.props.relay.refetch(refetchVars, null, () =>
      this.setState({
        loading: false
      })
    );
  }

  selectInd1(val) {
    // So if a new batch of subindicators is retrieved
    // we reset the selected subindicator
    // AND ALSO whenever an indicator is selected
    // the year jumps to the most recent year of the
    // indicators data point, so
    this.setState(
      {
        selectedYear: val.firstYear,
        selectedInd1: val.value,
        subIndicators1: [],
        selectedSubInd1: []
      },
      this.refetch
    );
  }

  selectInd2(val) {
    // So if a new batch of subindicators is retrieved
    // we reset the selected subindicator
    // AND ALSO whenever an indicator is selected
    // the year jumps to the most recent year of the
    // indicators data point, so
    this.setState(
      {
        selectedYear: val.firstYear,
        selectedInd2: val.value,
        subIndicators2: [],
        selectedSubInd2: []
      },
      this.refetch
    );
  }

  selectSubInd1(item, array = false) {
    let selectedSubInd1 = [];

    // so we set up this logic for select/deselect all logic
    // if all is selected all of the options will be passed in
    if (item !== 'reset') {
      if (array) {
        item.forEach(it => {
          selectedSubInd1.push(it.value);
        });
      } else {
        selectedSubInd1 = [...this.state.selectedSubInd1];
        const subIndicatorIndex = selectedSubInd1.indexOf(item.value);
        if (subIndicatorIndex === -1)
          // so if it doesn't exist we add it
          selectedSubInd1.push(item.value);
        // if it does exist we remove it
        else selectedSubInd1.splice(subIndicatorIndex, 1);
      }
    }

    this.setState({ selectedSubInd1 }, this.refetch);
  }

  selectSubInd2(item, array = false) {
    let selectedSubInd2 = [];

    // so we set up this logic for select/deselect all logic
    // if all is selected all of the options will be passed in
    if (item !== 'reset') {
      if (array) {
        item.forEach(it => {
          selectedSubInd2.push(it.value);
        });
      } else {
        selectedSubInd2 = [...this.state.selectedSubInd2];
        const subIndicatorIndex = selectedSubInd2.indexOf(item.value);
        if (subIndicatorIndex === -1)
          // so if it doesn't exist we add it
          selectedSubInd2.push(item.value);
        // if it does exist we remove it
        else selectedSubInd2.splice(subIndicatorIndex, 1);
      }
    }

    this.setState({ selectedSubInd2 }, this.refetch);
  }

  selectYear(val) {
    this.setState({ selectedYear: val }, this.refetch);
  }

  selectCountry(item, array = false) {
    let selectedCountryVal = [];
    let selectedCountryLabel = [];
    // so we set up this logic for select/deselect all logic
    // if all is selected all of the options will be passed in

    if (item !== 'reset') {
      if (array) {
        item.forEach(it => {
          selectedCountryVal.push(it.value);
          selectedCountryLabel.push(it.label);
        });
      } else {
        selectedCountryVal = [...this.state.selectedCountryVal];
        selectedCountryLabel = [...this.state.selectedCountryLabel];

        const countryIndex = selectedCountryVal.indexOf(item.value);

        if (countryIndex === -1) {
          // so if it doesn't exist we add it
          selectedCountryVal.push(item.value);
          selectedCountryLabel.push(item.label);
        }
        // if it does exist we remove it
        else {
          selectedCountryVal.splice(countryIndex, 1);
          selectedCountryLabel.splice(countryIndex, 1);
        }
      }
    } else {
      this.setState({ selectedRegionLabels: [] });
      this.setState({ selectedRegionVal: [] });
    }

    this.setState({ selectedCountryVal, selectedCountryLabel }, this.refetch);
  }

  selectRegion(item, array = false) {
    let selectedRegionVal = [];
    // Adding labels to selectedRegionVal would break to many things,
    // therefor chose to do it in a separate var. WET solution..
    let selectedRegionLabels = [];

    // so we set up this logic for select/deselect all logic
    // if all is selected all of the options will be passed in
    if (item !== 'reset') {
      if (array) {
        item.forEach(it => {
          selectedRegionVal.push(it.value);
          selectedRegionLabels.push(it.label);
        });
      } else {
        selectedRegionVal = [...this.state.selectedRegionVal];
        selectedRegionLabels = [...this.state.selectedRegionLabels];

        const regionIndex = selectedRegionVal.indexOf(item.value);

        // so if it doesn't exist we add it
        if (regionIndex === -1) {
          selectedRegionVal.push(item.value);
          selectedRegionLabels.push(item.label);
        }

        // if it does exist we remove it
        else {
          selectedRegionVal.splice(regionIndex, 1);
          selectedRegionLabels.splice(regionIndex, 1);
        }
      }
    }

    this.selectCountry(this.getCountriesByRegion(selectedRegionVal), true);
    this.setState({ selectedRegionLabels, selectedRegionVal }, this.refetch);
  }

  //Compares the selectedRegions with all the countries, to output only countries that are in that region.
  getCountriesByRegion(
    selectedRegionsVal,
    allCountries = this.props.paneData.allCountries
  ) {
    const selectedCountryVal = [];

    if (selectedRegionsVal && allCountries) {
      selectedRegionsVal.forEach(region =>
        region.forEach(country =>
          allCountries.forEach(allCountry => {
            if (country.iso2 === allCountry.value) {
              selectedCountryVal.push(allCountry);
            }
          })
        )
      );
    }

    return selectedCountryVal;
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
      <HomeModule
        loading={this.state.loading}
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
        selectRegion={this.selectRegion}
        selectedRegionVal={this.state.selectedRegionVal}
        selectedRegionLabels={this.state.selectedRegionLabels}
        selectCountry={this.selectCountry}
        selectedCountryVal={this.state.selectedCountryVal}
        selectedCountryLabel={this.state.selectedCountryLabel}
        resetAll={this.resetAll}
        selectedYear={this.state.selectedYear}
      />
    );
  }
}

HomeModuleMediator.propTypes = propTypes;
HomeModuleMediator.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    paneData: state.paneData.paneData
  };
};

export default createRefetchContainer(
  connect(mapStateToProps)(HomeModuleMediator),
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
        OR_GeolocationIso2_Is_Null: { type: "Boolean", defaultValue: true }
      ) {
      indicators1: datapointsAggregation(
        groupBy: [
          "indicatorName"
          "geolocationTag"
          "date"
          "geolocationType"
          "geolocationIso2"
          "comment"
          "geolocationPolygons"
          "valueFormatType"
        ]
        orderBy: ["indicatorName"]
        aggregation: ["Sum(value)"]
        date_In: $datePeriod
        indicatorName_In: $indicator1
        geolocationIso2_In: $countriesISO2
        filterName_In: $subInd1
        OR_GeolocationIso2_Is_Null: $OR_GeolocationIso2_Is_Null
      ) {
        indicatorName
        geolocationIso2
        comment
        geolocationTag
        geolocationType
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
          "geolocationType"
          "geolocationIso2"
          "comment"
          "geolocationCenterLongLat"
          "valueFormatType"
        ]
        orderBy: ["indicatorName"]
        aggregation: ["Sum(value)"]
        date_In: $datePeriod
        indicatorName_In: $indicator2
        geolocationIso2_In: $countriesISO2
        filterName_In: $subInd2
        OR_GeolocationIso2_Is_Null: $OR_GeolocationIso2_Is_Null
      ) {
        indicatorName
        geolocationIso2
        comment
        geolocationTag
        geolocationType
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
    query HomeModuleMediatorRefetchQuery(
      $datePeriod: [String]!
      $indicator1: [String]!
      $indicator2: [String]!
      $subInd1: [String]!
      $subInd2: [String]!
      $countriesISO2: [String]!
      $singleInd1: String!
      $singleInd2: String!
      $OR_GeolocationIso2_Is_Null: Boolean!
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
          OR_GeolocationIso2_Is_Null: $OR_GeolocationIso2_Is_Null
        )
    }
  `
);
