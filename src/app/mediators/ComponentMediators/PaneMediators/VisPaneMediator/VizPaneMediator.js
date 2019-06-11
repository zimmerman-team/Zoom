/* base */
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { fetchQuery } from 'relay-runtime';
import DataExplorePane from 'components/Panes/DataExplorePane/DataExplorePane';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
/* actions */
import * as actions from 'services/actions/general';
/* helpers */
import sortBy from 'lodash/sortBy';
import isEqual from 'lodash/isEqual';
import { formatYearParam, yearStrToArray } from 'utils/genericUtils';
/* consts */
import initialState, { initIndItem } from '__consts__/InitialChartDataConst';
import chartTypes from '__consts__/ChartConst';
import graphKeys from '__consts__/GraphStructKeyConst';
import { maxYear } from '__consts__/TimeLineConst';
import { aggrOptions } from '__consts__/GraphStructOptionConsts';
import pubIndicators from '__consts__/PublicIndicatorsConst';

const propTypes = {
  display: PropTypes.string,
  dropDownData: PropTypes.shape({
    exploreIndicators: PropTypes.shape({
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
  display: 'block',
  dropDownData: {}
};

const indicatorQuery = graphql`
  query VizPaneMediatorQuery(
    $year_Range: String!
    $fileSource_Name_In: String!
  ) {
    allIndicators(
      year_Range: $year_Range
      fileSource_Name_In: $fileSource_Name_In
    ) {
      edges {
        node {
          name
          firstDataYear
          fileSource {
            name
          }
        }
      }
    }
  }
`;

class VizPaneMediator extends React.Component {
  constructor(props) {
    super(props);

    const yearRange = ''
      .concat(initialState.yearPeriod[0])
      .concat(',')
      .concat(initialState.yearPeriod[initialState.yearPeriod.length - 1]);

    this.state = {
      allIndNames: [],
      allCountries: [],
      allFileSources: [],
      selectedSources: props.paneData.selectedSources
        ? props.paneData.selectedSources
        : [],
      yearRange: props.paneData.yearRange
        ? props.paneData.yearRange
        : yearRange,
      allRegions: []
    };

    this.selectInd = this.selectInd.bind(this);
    this.selectSubInd = this.selectSubInd.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.selectRegion = this.selectRegion.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.refetch = this.refetch.bind(this);
    this.selectDataSource = this.selectDataSource.bind(this);
    this.resetIndicators = this.resetIndicators.bind(this);
    this.selectYearRange = this.selectYearRange.bind(this);
    this.changesMade = this.changesMade.bind(this);
    this.getCountriesByRegion = this.getCountriesByRegion.bind(this);
    this.handleAxisSwitch = this.handleAxisSwitch.bind(this);
    this.subIndAggrToggle = this.subIndAggrToggle.bind(this);
    this.saveGraphOption = this.saveGraphOption.bind(this);
    this.addIndicator = this.addIndicator.bind(this);
    this.removeIndicator = this.removeIndicator.bind(this);
  }

  componentDidMount() {
    let allCountries = this.props.dropDownData.allCountries.edges.map(
      indicator => {
        return { label: indicator.node.name, value: indicator.node.iso2 };
      }
    );

    allCountries = sortBy(allCountries, ['label']);

    let allRegions = this.props.dropDownData.allRegions.edges.map(indicator => {
      return {
        label: indicator.node.name,
        value: indicator.node.country,
        codeVal: indicator.node.code
      };
    });

    allRegions = sortBy(allRegions, ['label']);

    // and we also push in a variable for undefined
    allRegions.push({ label: 'undefined', value: [{ iso2: 'undefined' }] });

    let allFileSources = this.props.dropDownData.allFileSources.edges.map(
      indicator => {
        return { label: indicator.node.name, value: indicator.node.name };
      }
    );

    allFileSources = sortBy(allFileSources, ['label']);

    this.setState(
      {
        allFileSources,
        allCountries,
        allRegions
      },
      this.refetch
    );
  }

  componentDidUpdate(prevProps) {
    // so basically because of silentauth it takes some time
    // for the user to load in, so to show correct indicators
    // for the signed in user we will refetch the indicators
    // once user data has changed.
    if (!isEqual(this.props.user.data, prevProps.user.data)) {
      this.refetch();
    }
  }

  selectDataSource(item, array = false) {
    let selectedSources = [];

    // so we set up this logic for select/deselect all logic
    // if all is selected all of the options will be passed in
    if (item !== 'reset') {
      if (array) {
        item.forEach(it => {
          selectedSources.push(it.value);
        });
      } else {
        selectedSources = [...this.state.selectedSources];
        const sourceIndex = selectedSources.indexOf(item.value);
        if (sourceIndex === -1) {
          // so if it doesn't exist we add it
          selectedSources.push(item.value);
        }
        // if it does exist we remove it
        else selectedSources.splice(sourceIndex, 1);
      }
    }

    this.setState({ selectedSources }, this.refetch);

    if (
      process.env.NODE_ENV === 'development' &&
      this.state.selectedSources.length > 0
    ) {
      this.resetIndicators();
    } else if (process.env.NODE_ENV !== 'development') this.resetIndicators();

    // and we store this so it would be accessible to the visualizer mediator
    this.props.dispatch(
      actions.storePaneDataRequest({
        selectedSources
      })
    );

    if (!this.props.chartData.chartMounted) {
      this.props.dispatch(
        actions.storeChartDataRequest({
          chartMounted: true
        })
      );
    }

    this.changesMade();
  }

  selectYearRange(value) {
    const yearRange = ''
      .concat(value[0])
      .concat(',')
      .concat(value[1]);
    this.setState({ yearRange }, this.refetch);

    // and ofcourse we reset the selected indicators
    this.resetIndicators();

    // and we store this so it would be accessible to the visualizer mediator
    this.props.dispatch(
      actions.storePaneDataRequest({
        yearRange
      })
    );

    this.changesMade();
  }

  refetch(
    selectedSources = this.state.selectedSources,
    year_Range = this.state.yearRange
  ) {
    let fileSource_Name_In = '';

    selectedSources.forEach(source => {
      fileSource_Name_In = fileSource_Name_In.concat(source).concat(',');
    });

    fileSource_Name_In =
      fileSource_Name_In.length === 0 ? 'null' : fileSource_Name_In;

    const refetchVars = {
      year_Range,
      fileSource_Name_In
    };

    fetchQuery(this.props.relay.environment, indicatorQuery, refetchVars).then(
      data => {
        let allIndNames = [];

        data.allIndicators.edges.forEach(indicator => {
          if (this.props.user.data) {
            allIndNames.push({
              label: indicator.node.name,
              value: indicator.node.name,
              dataSource: indicator.node.fileSource.name,
              firstYear: indicator.node.firstDataYear
            });
          } else if (
            pubIndicators.indexOf(indicator.node.name.toLowerCase()) !== -1
          ) {
            allIndNames.push({
              label: indicator.node.name,
              value: indicator.node.name,
              dataSource: indicator.node.fileSource.name,
              firstYear: indicator.node.firstDataYear
            });
          }
        });

        allIndNames = sortBy(allIndNames, ['label']);

        this.setState({ allIndNames });
      }
    );
  }

  resetIndicators() {
    // and we also deselect the indicators
    this.selectInd('resetAll');
  }

  selectInd(val, index) {
    let selectedInd = [];

    // so because javascript is stupid and in this particular
    // case even when using ... the object is still referencing to
    // this.props.chartData.selectedInd and thus is not extensible
    // we gonna clone this array object
    this.props.chartData.selectedInd.forEach(indItem => {
      selectedInd.push({
        indicator: indItem.indicator,
        subIndicators: indItem.subIndicators,
        dataSource: indItem.dataSource,
        aggregate: indItem.aggregate,
        selectedSubInd: [...indItem.selectedSubInd]
      });
    });

    if (val === 'resetAll') {
      this.props.dispatch(
        actions.storeChartDataRequest({
          refetch: true,
          selectedInd: selectedInd.map((indItem, ind) => {
            if (ind === 0 && process.env.NODE_ENV === 'development') {
              return {
                ...initIndItem,
                indicator: 'aids related deaths (unaids)'
              };
            }
            return {
              ...initIndItem
            };
          })
        })
      );
    } else {
      selectedInd[index].indicator = val.value;
      selectedInd[index].dataSource = val.dataSource;
      selectedInd[index].selectedSubInd = [];
      selectedInd[index].subIndicators = [];

      if (val === 'reset') {
        selectedInd[index].indicator = undefined;
        selectedInd[index].dataSource = undefined;
        this.props.dispatch(
          actions.storeChartDataRequest({
            selectedInd,
            refetch: true
          })
        );
      } else {
        // so we set the values for chart data
        // * AND ALSO whenever an indicator is selected
        // the year jumps to the most recent year of the
        // indicators data point, so
        this.props.dispatch(
          actions.storeChartDataRequest({
            // so the year reselection functionality only works with geolocations thats why we
            // refetch all indicators only when the aggregate option IS geolocation
            refetchAll:
              this.props.chartData.specOptions[graphKeys.aggregate] ===
                aggrOptions[0].value &&
              this.props.chartData.selectedYear !== val.firstYear,
            selectedInd,
            indicatorSelected: true,
            indSelectedIndex: index,
            refetch: true,
            selectedYear: val.firstYear
          })
        );
      }
    }

    this.changesMade();
  }

  selectSubInd(item, array = false, index) {
    const selectedInd = [];

    // so because javascript is stupid and in this particular
    // case even when using ... the object is still referencing to
    // this.props.chartData.selectedInd and thus is not extensible
    // we gonna clone this array object
    this.props.chartData.selectedInd.forEach(indItem => {
      selectedInd.push({
        indicator: indItem.indicator,
        subIndicators: indItem.subIndicators,
        aggregate: indItem.aggregate,
        dataSource: indItem.dataSource,
        selectedSubInd: [...indItem.selectedSubInd]
      });
    });

    // so we set up this logic for select/deselect all logic
    // if all is selected all of the options will be passed in
    if (item !== 'reset') {
      if (array) {
        item.forEach(it => {
          selectedInd[index].selectedSubInd.push(it.value);
        });
      } else {
        const subIndicatorIndex = selectedInd[index].selectedSubInd.indexOf(
          item.value
        );
        if (subIndicatorIndex === -1) {
          // so if it doesn't exist we add it
          selectedInd[index].selectedSubInd.push(item.value);
        }
        // if it does exist we remove it
        else selectedInd[index].selectedSubInd.splice(subIndicatorIndex, 1);
      }
    } else {
      selectedInd[index].selectedSubInd = [];
    }

    // so we set the values for chart data
    this.props.dispatch(
      actions.storeChartDataRequest({
        indSelectedIndex: index,
        refetch: true,
        selectedInd
      })
    );

    this.changesMade();
  }

  selectCountry(item, array = false) {
    let selectedCountryVal = [];
    let selectedCountryLabels = [];

    // so we set up this logic for select/deselect all logic
    // if all is selected all of the options will be passed in
    if (item !== 'reset') {
      if (array) {
        item.forEach(it => {
          selectedCountryVal.push(it.value);
          selectedCountryLabels.push(it.label);
        });
      } else {
        selectedCountryVal = [...this.props.chartData.selectedCountryVal];
        selectedCountryLabels = [...this.props.chartData.selectedCountryLabels];
        const countryIndex = selectedCountryVal.indexOf(item.value);
        if (countryIndex === -1) {
          // so if it doesn't exist we add it
          selectedCountryVal.push(item.value);
          selectedCountryLabels.push(item.label);
        }
        // if it does exist we remove it
        else {
          selectedCountryVal.splice(countryIndex, 1);
          selectedCountryLabels.splice(countryIndex, 1);
        }
      }
    }

    this.props.dispatch(
      actions.storeChartDataRequest({
        selectedCountryVal,
        selectedCountryLabels,
        refetch: true
      })
    );

    this.changesMade();
  }

  selectRegion(item, array = false) {
    let selectedRegionVal = [];
    let selectedRegionLabels = [];
    let selectedRegionCodes = [];

    // so we set up this logic for select/deselect all logic
    // if all is selected all of the options will be passed in
    if (item !== 'reset') {
      if (array) {
        item.forEach(it => {
          selectedRegionVal.push(it.value);
          selectedRegionLabels.push(it.label);
          selectedRegionCodes.push(it.codeVal);
        });
      } else {
        selectedRegionVal = [...this.props.chartData.selectedRegionVal];
        selectedRegionLabels = [...this.props.chartData.selectedRegionLabels];
        selectedRegionCodes = [...this.props.chartData.selectedRegionCodes];
        const regionIndex = selectedRegionCodes.indexOf(item.codeVal);

        if (regionIndex === -1) {
          // so if it doesn't exist we add it
          selectedRegionVal.push(item.value);
          selectedRegionLabels.push(item.label);
          selectedRegionCodes.push(item.codeVal);
        } else {
          // if it does exist we remove it
          selectedRegionVal.splice(regionIndex, 1);
          selectedRegionLabels.splice(regionIndex, 1);
          selectedRegionCodes.splice(regionIndex, 1);
        }
      }
    }

    this.props.dispatch(
      actions.storeChartDataRequest({
        selectedRegionVal,
        selectedRegionLabels,
        selectedRegionCodes,
        refetch: true
      })
    );

    this.selectCountry(this.getCountriesByRegion(selectedRegionVal), true);
    this.changesMade();
  }

  //Compares the selectedRegions with all the countries, to output only countries that are in that region.
  getCountriesByRegion(
    selectedRegionsVal,
    allCountries = this.state.allCountries
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

  addIndicator() {
    const selectedInd = [...this.props.chartData.selectedInd];

    selectedInd.push(initIndItem);

    this.props.dispatch(
      actions.storeChartDataRequest({
        selectedInd
      })
    );

    this.changesMade();
  }

  removeIndicator(index) {
    if (this.props.chartData.selectedInd.length > 1) {
      const selectedInd = [...this.props.chartData.selectedInd];

      const refetch =
        selectedInd[index].indicator &&
        selectedInd[index].selectedSubInd.length > 0;

      selectedInd.splice(index, 1);

      this.props.dispatch(
        actions.storeChartDataRequest({
          selectedInd,
          refetch
        })
      );

      this.changesMade();
    }
  }

  resetAll() {
    this.props.dispatch(
      actions.storeChartDataRequest({
        ...initialState
      })
    );

    this.changesMade();
  }

  // so this is used to indicate that some changes
  // to the current datapane selections have been made
  // thus it should control the indicator data loading
  // so if no changes have been made the data will load
  // from the zoombackend(if ofcourse a saved chart is loaded, for editing purposes)
  // otherwise all the data comes from DUCT
  changesMade() {
    if (!this.props.chartData.changesMade) {
      this.props.dispatch(
        actions.storeChartDataRequest({
          changesMade: true
        })
      );
    }
  }

  // so this mainly controls the data for the linechart
  // cause you can switch the Y-axis of the data/indicator thats being shown
  handleAxisSwitch(checked, index) {
    // so if checked is false this the left axis will be selected
    // for this indicator otherwise its the right
    const chartKeyz = [...this.props.chartData.chartKeys];

    // now because we have some new logic in our datas
    // where we can have aggregated indicators by their sub inds
    // and we can have disagregated indicators by their subinds
    // and have seperate legends for each, we need to get all chartKeys
    // which are associated with that disagregated subindicator
    // and when the axis has been switched, all of the sub-indicator
    // legends need to switch, cause they all are under the same indicator
    const chartKeys = [];

    chartKeyz.forEach(chartKey => {
      let chartKeyItem = chartKey;

      if (chartKey.indIndex === index) {
        chartKeyItem = {
          ...chartKey,
          orientation: checked ? 'right' : 'left'
        };
      }

      chartKeys.push(chartKeyItem);
    });

    this.props.dispatch(
      actions.storeChartDataRequest({
        chartKeys
      })
    );
  }

  // this function basically toggles the aggregations and disaggregations
  // of the indicator data
  subIndAggrToggle(checked, index) {
    const selectedInd = [...this.props.chartData.selectedInd];

    selectedInd[index] = {
      ...selectedInd[index],
      aggregate: checked
    };

    this.props.dispatch(
      actions.storeChartDataRequest({
        indSelectedIndex: index,
        selectedInd,
        refetch:
          selectedInd[index].indicator &&
          selectedInd[index].selectedSubInd.length > 0
      })
    );
  }

  saveGraphOption(value, key) {
    const specOptions = { ...this.props.chartData.specOptions };

    specOptions[key] = value;

    if (key === graphKeys.aggregate) {
      const startYear = parseInt(this.props.chartData.selectedYear, 10);
      const endYear = startYear + 10 > maxYear ? maxYear : startYear + 10;

      this.props.dispatch(
        actions.storeChartDataRequest({
          specOptions,
          changesMade: true,
          refetch: true,
          selectedYears: formatYearParam([startYear, endYear])
        })
      );
    } else if (key === graphKeys.aggrCountry) {
      this.props.dispatch(
        actions.storeChartDataRequest({
          changesMade: true,
          refetch: true,
          specOptions
        })
      );
    } else {
      this.props.dispatch(
        actions.storeChartDataRequest({
          specOptions
        })
      );
    }
  }

  render() {
    return (
      <DataExplorePane
        handleAxisSwitch={
          this.props.paneData.chartType === chartTypes.lineChart
            ? this.handleAxisSwitch
            : null
        }
        subIndAggrToggle={this.subIndAggrToggle}
        chartType={this.props.paneData.chartType}
        specOptions={this.props.chartData.specOptions}
        saveGraphOption={this.saveGraphOption}
        allFileSources={this.state.allFileSources}
        selectDataSource={this.selectDataSource}
        selectedSources={this.state.selectedSources}
        indNames={this.state.allIndNames}
        countries={this.state.allCountries}
        regions={this.state.allRegions}
        // okay so we use this variable to change the
        // to disable the geolocation dropdowns being defaultly selected
        locationSelected={!this.props.chartData.chartMounted}
        selectedInd={this.props.chartData.selectedInd}
        chartKeys={this.props.chartData.chartKeys}
        addIndicator={this.addIndicator}
        removeIndicator={this.removeIndicator}
        selectInd={this.selectInd}
        selectSubInd={this.selectSubInd}
        indSelectedIndex={this.props.chartData.indSelectedIndex}
        indicatorSelected={this.props.chartData.indicatorSelected}
        selectCountry={this.selectCountry}
        selectedCountryVal={this.props.chartData.selectedCountryVal}
        selectedCountryLabel={this.props.chartData.selectedCountryLabels}
        selectedRegionVal={this.props.chartData.selectedRegionVal}
        selectedRegionCodes={this.props.chartData.selectedRegionCodes}
        selectedRegionLabels={this.props.chartData.selectedRegionLabels}
        selectRegion={this.selectRegion}
        resetAll={this.resetAll}
        selectYearRange={this.selectYearRange}
        yearRange={yearStrToArray(this.state.yearRange)}
        display={this.props.display}
      />
    );
  }
}

VizPaneMediator.propTypes = propTypes;
VizPaneMediator.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    chartData: state.chartData.chartData,
    paneData: state.paneData.paneData,
    user: state.currentUser
  };
};

export default createFragmentContainer(
  connect(mapStateToProps)(VizPaneMediator),
  graphql`
    fragment VizPaneMediator_dropDownData on Query {
      allCountries {
        edges {
          node {
            name
            iso2
          }
        }
      }
      allFileSources {
        edges {
          node {
            name
          }
        }
      }
      allRegions {
        edges {
          node {
            name
            code
            country {
              iso2
            }
          }
        }
      }
    }
  `
);
