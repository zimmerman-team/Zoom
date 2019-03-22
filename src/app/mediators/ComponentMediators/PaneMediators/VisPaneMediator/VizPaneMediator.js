/* base */
import React from 'react';
import { createRefetchContainer, graphql } from 'react-relay';
import DataExplorePane from 'components/Panes/DataExplorePane/DataExplorePanel';
import PropTypes from 'prop-types';

/* actions */
import * as actions from 'services/actions/general';

/* helpers */
import sortBy from 'lodash/sortBy';
import { formatYearParam } from 'utils/genericUtils';
import connect from 'react-redux/es/connect/connect';
import isEqual from 'lodash/isEqual';

/* consts */
import initialState from '__consts__/InitialChartDataConst';

const propTypes = {
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
  dropDownData: {}
};

class VizPaneMediator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allIndNames: [],
      allCountries: [],
      allFileSources: [],
      selectedSources: [],
      allRegions: []
    };

    this.selectInd1 = this.selectInd1.bind(this);
    this.selectInd2 = this.selectInd2.bind(this);
    this.selectSubInd1 = this.selectSubInd1.bind(this);
    this.selectSubInd2 = this.selectSubInd2.bind(this);
    this.selectYear = this.selectYear.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.selectRegion = this.selectRegion.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.refetch = this.refetch.bind(this);
    this.selectDataSource = this.selectDataSource.bind(this);
    this.resetIndicators = this.resetIndicators.bind(this);
  }

  componentDidMount() {
    let allCountries = this.props.dropDownData.allCountries.edges.map(
      indicator => {
        return { label: indicator.node.name, value: indicator.node.iso2 };
      }
    );

    allCountries = sortBy(allCountries, ['label']);

    let allRegions = this.props.dropDownData.allRegions.edges.map(indicator => {
      return { label: indicator.node.name, value: indicator.node.country };
    });

    allRegions = sortBy(allRegions, ['label']);

    // and we also push in a variable for undefined
    allRegions.push({ label: 'undefined', value: [{ iso2: '' }] });

    let allFileSources = this.props.dropDownData.allFileSources.edges.map(
      indicator => {
        return { label: indicator.node.name, value: indicator.node.name };
      }
    );

    allFileSources = sortBy(allFileSources, ['label']);

    this.setState({
      allFileSources,
      allCountries,
      allRegions
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      !isEqual(
        this.props.dropDownData.exploreIndicators.edges,
        prevProps.dropDownData.exploreIndicators.edges
      )
    ) {
      if (
        !(
          this.state.selectedSources.length > 0 &&
          this.props.dropDownData.exploreIndicators.edges.length === 0
        )
      ) {
        let allIndNames = this.props.dropDownData.exploreIndicators.edges.map(
          indicator => {
            return { label: indicator.node.name, value: indicator.node.name };
          }
        );

        // We make the array only from unique indicators
        // cause we receive several indicators with the same names
        // most likely because of data points stuff
        // allIndNames = allIndNames.filter(this.onlyUnique);

        allIndNames = sortBy(allIndNames, ['label']);

        this.setState({ allIndNames });
      }
    }
  }

  selectDataSource(item, array = false) {
    let selectedSources = [];
    let allIndNames = [...this.state.allIndNames];

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
        if (sourceIndex === -1)
          // so if it doesn't exist we add it
          selectedSources.push(item.value);
        // if it does exist we remove it
        else selectedSources.splice(sourceIndex, 1);
      }
    }

    if (
      this.props.dropDownData.exploreIndicators.edges.length === 0 &&
      selectedSources.length === 0
    )
      allIndNames = [];

    this.setState({ selectedSources, allIndNames }, this.refetch);
  }

  refetch(selectedSources = this.state.selectedSources) {
    let fileSource_Name_In = '';

    selectedSources.forEach(source => {
      fileSource_Name_In = fileSource_Name_In.concat(source).concat(',');
    });

    fileSource_Name_In =
      fileSource_Name_In.length === 0 ? 'null' : fileSource_Name_In;

    const refetchVars = {
      fileSource_Name_In
    };

    this.props.relay.refetch(refetchVars, null, () => this.resetIndicators(), {
      force: true
    });
  }

  resetIndicators() {
    // and we also deselect the indicators
    this.selectInd1({ value: undefined });
    this.selectInd2({ value: undefined });
  }

  selectInd1(val) {
    // so we set the values for chart data
    this.props.dispatch(
      actions.storeChartDataRequest({
        selectedInd1: val.value,
        selectedSubInd1: []
      })
    );

    // and we also reset some values for the sub-indicator
    // dropdown as sub-indicators should change
    // whenever an indicator is changed
    this.props.dispatch(
      actions.storePaneDataRequest({
        subIndicators1: []
      })
    );
  }

  selectInd2(val) {
    // so we set the values for chart data
    this.props.dispatch(
      actions.storeChartDataRequest({
        selectedInd2: val.value,
        subIndicators2: []
      })
    );

    // and we also reset some values for the sub-indicator
    // dropdown as sub-indicators should change
    // whenever an indicator is changed
    this.props.dispatch(
      actions.storePaneDataRequest({
        selectedSubInd2: []
      })
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

    // so we set the values for chart data
    this.props.dispatch(
      actions.storeChartDataRequest({
        selectedSubInd1
      })
    );
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
        selectedSubInd2 = [...this.props.chartData.selectedSubInd2];
        const subIndicatorIndex = selectedSubInd2.indexOf(item.value);
        if (subIndicatorIndex === -1)
          // so if it doesn't exist we add it
          selectedSubInd2.push(item.value);
        // if it does exist we remove it
        else selectedSubInd2.splice(subIndicatorIndex, 1);
      }
    }

    // so we set the values for chart data
    this.props.dispatch(
      actions.storeChartDataRequest({
        selectedSubInd2
      })
    );
  }

  selectYear(val) {
    // so we set the values for chart data
    this.props.dispatch(
      actions.storeChartDataRequest({
        yearPeriod: formatYearParam(val)
      })
    );
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
        selectedCountryVal = [...this.props.chartData.selectedCountryVal];
        const countryIndex = selectedCountryVal.indexOf(item.value);
        if (countryIndex === -1)
          // so if it doesn't exist we add it
          selectedCountryVal.push(item.value);
        // if it does exist we remove it
        else selectedCountryVal.splice(countryIndex, 1);
      }
    }

    this.props.dispatch(
      actions.storeChartDataRequest({
        selectedCountryVal
      })
    );
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
        selectedRegionVal = [...this.props.chartData.selectedRegionVal];
        const regionIndex = selectedRegionVal.indexOf(item.value);

        if (regionIndex === -1)
          // so if it doesn't exist we add it
          selectedRegionVal.push(item.value);
        // if it does exist we remove it
        else selectedRegionVal.splice(regionIndex, 1);
      }
    }

    this.props.dispatch(
      actions.storeChartDataRequest({
        selectedRegionVal
      })
    );
  }

  resetAll() {
    this.props.dispatch(
      actions.storeChartDataRequest({
        ...initialState
      })
    );

    // and we also reset some values for the sub-indicator
    // dropdown as sub-indicators should change
    // whenever an indicator is changed
    this.props.dispatch(
      actions.storePaneDataRequest({
        subIndicators1: [],
        subIndicators2: []
      })
    );
  }

  render() {
    return (
      <DataExplorePane
        allFileSources={this.state.allFileSources}
        selectDataSource={this.selectDataSource}
        selectedSources={this.state.selectedSources}
        indNames={this.state.allIndNames}
        countries={this.state.allCountries}
        regions={this.state.allRegions}
        yearPeriod={this.props.chartData.yearPeriod}
        // okay so we use this variable to change the
        // to disable the geolocation dropdowns being defaultly selected
        locationSelected={isEqual(this.props.chartData, initialState)}
        subInd1AllSelected={isEqual(
          this.props.chartData.selectedSubInd1,
          initialState.selectedSubInd1
        )}
        subInd2AllSelected={isEqual(
          this.props.chartData.selectedSubInd2,
          initialState.selectedSubInd2
        )}
        selectInd1={this.selectInd1}
        selectInd2={this.selectInd2}
        selectYear={this.selectYear}
        selectSubInd1={this.selectSubInd1}
        selectSubInd2={this.selectSubInd2}
        selectedInd1={this.props.chartData.selectedInd1}
        selectedInd2={this.props.chartData.selectedInd2}
        selectedSubInd1={this.props.chartData.selectedSubInd1}
        selectedSubInd2={this.props.chartData.selectedSubInd2}
        subIndicators1={this.props.paneData.subIndicators1}
        subIndicators2={this.props.paneData.subIndicators2}
        selectCountry={this.selectCountry}
        selectedCountryVal={this.props.chartData.selectedCountryVal}
        selectedRegionVal={this.props.chartData.selectedRegionVal}
        selectRegion={this.selectRegion}
        resetAll={this.resetAll}
      />
    );
  }
}

VizPaneMediator.propTypes = propTypes;
VizPaneMediator.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    chartData: state.chartData.chartData,
    paneData: state.paneData.paneData
  };
};

export default createRefetchContainer(
  connect(mapStateToProps)(VizPaneMediator),
  graphql`
    fragment VizPaneMediator_dropDownData on Query
      @argumentDefinitions(
        fileSource_Name_In: { type: "String", defaultValue: "null" }
      ) {
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
      exploreIndicators: allIndicators(
        fileSource_Name_In: $fileSource_Name_In
      ) {
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
            country {
              iso2
            }
          }
        }
      }
    }
  `,
  graphql`
    query VizPaneMediatorQuery($fileSource_Name_In: String!) {
      exploreIndicators: allIndicators(
        fileSource_Name_In: $fileSource_Name_In
      ) {
        edges {
          node {
            name
          }
        }
      }
    }
  `
);
