/* base */
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import DataExplorePane from 'components/Panes/DataExplorePane/DataExplorePanel';
import PropTypes from 'prop-types';

/* actions */
import * as actions from 'services/actions/general';

/* helpers */
import sortBy from 'lodash/sortBy';
import { formatYearParam } from 'utils/genericUtils';
import connect from 'react-redux/es/connect/connect';

/* consts */
import initialState from './VizPaneMediator.const';

const propTypes = {
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
  dropDownData: {}
};

// As discussed with Siem default year period selected should be
// current year and 15 years before
const now = new Date();
const currentYear = now.getFullYear();
const yearBefore = currentYear - 15;

class VizPaneMediator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yearPeriod: formatYearParam([yearBefore, currentYear]),
      allIndNames: [],
      allCountries: [],
      allRegions: [],
      ...initialState
    };

    this.selectInd1 = this.selectInd1.bind(this);
    this.selectInd2 = this.selectInd2.bind(this);
    this.selectSubInd1 = this.selectSubInd1.bind(this);
    this.selectSubInd2 = this.selectSubInd2.bind(this);
    this.selectYear = this.selectYear.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.selectRegion = this.selectRegion.bind(this);
    this.resetAll = this.resetAll.bind(this);
  }

  componentDidMount() {
    let allIndNames = this.props.dropDownData.allIndicators.edges.map(
      indicator => {
        return { label: indicator.node.name, value: indicator.node.name };
      }
    );

    allIndNames = sortBy(allIndNames, ['label']);

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

    this.setState({
      allIndNames,
      allCountries,
      allRegions
    });
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
        selectedSubInd2 = [...this.state.selectedSubInd2];
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
        selectedCountryVal = [...this.state.selectedCountryVal];
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
        selectedRegionVal = [...this.state.selectedRegionVal];
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
  }

  render() {
    return (
      <DataExplorePane
        indNames={this.state.allIndNames}
        countries={this.state.allCountries}
        regions={this.state.allRegions}
        yearPeriod={this.state.yearPeriod}
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

export default createFragmentContainer(
  connect(mapStateToProps)(VizPaneMediator),
  graphql`
    fragment VizPaneMediator_dropDownData on Query {
      allIndicators {
        edges {
          node {
            name
          }
        }
      }
      allCountries {
        edges {
          node {
            name
            iso2
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
