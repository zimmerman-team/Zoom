/* base */
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { fetchQuery } from 'relay-runtime';
import DataExplorePane from 'components/Panes/DataExplorePane/DataExplorePanel';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

/* actions */
import * as actions from 'services/actions/general';

/* helpers */
import sortBy from 'lodash/sortBy';
import isEqual from 'lodash/isEqual';
import { yearStrToArray } from 'utils/genericUtils';

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

    this.selectInd1 = this.selectInd1.bind(this);
    this.selectInd2 = this.selectInd2.bind(this);
    this.selectSubInd1 = this.selectSubInd1.bind(this);
    this.selectSubInd2 = this.selectSubInd2.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.selectRegion = this.selectRegion.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.refetch = this.refetch.bind(this);
    this.selectDataSource = this.selectDataSource.bind(this);
    this.resetIndicators = this.resetIndicators.bind(this);
    this.selectYearRange = this.selectYearRange.bind(this);
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

    this.setState(
      {
        allFileSources,
        allCountries,
        allRegions
      },
      this.refetch
    );
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
        if (sourceIndex === -1)
          // so if it doesn't exist we add it
          selectedSources.push(item.value);
        // if it does exist we remove it
        else selectedSources.splice(sourceIndex, 1);
      }
    }

    this.setState({ selectedSources }, this.refetch);

    // and ofcourse we reset the selected indicators
    this.resetIndicators();

    // and we store this so it would be accessible to the visualizer mediator
    this.props.dispatch(
      actions.storePaneDataRequest({
        selectedSources
      })
    );

    if (!this.props.chartData.chartMounted)
      this.props.dispatch(
        actions.storeChartDataRequest({
          chartMounted: true
        })
      );
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
        let allIndNames = data.allIndicators.edges.map(indicator => {
          return {
            label: indicator.node.name,
            value: indicator.node.name,
            dataSource: indicator.node.fileSource.name
          };
        });

        allIndNames = sortBy(allIndNames, ['label']);

        this.setState({ allIndNames });
      }
    );
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
        dataSource1: val.dataSource,
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
        dataSource2: val.dataSource,
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
        selectedSubInd1 = [...this.props.chartData.selectedSubInd1];
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
        // okay so we use this variable to change the
        // to disable the geolocation dropdowns being defaultly selected
        locationSelected={!this.props.chartData.chartMounted}
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
        selectYearRange={this.selectYearRange}
        yearRange={yearStrToArray(this.state.yearRange)}
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
            country {
              iso2
            }
          }
        }
      }
    }
  `
);
