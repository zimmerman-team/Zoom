/* base */
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { fetchQuery } from 'relay-runtime';
import DataExplorePane from 'components/Panes/DataExplorePane/DataExplorePane';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* acitons */
import * as actions from 'services/actions/general';
/* consts */
import initialState, { initIndItem } from '__consts__/InitialChartDataConst';
/* helpers */
import sortBy from 'lodash/sortBy';

import { yearStrToArray } from 'utils/genericUtils';
// import findIndex from 'lodash/findIndex';

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
  query ExplorePanelMediatorQuery(
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
          lastDataYear
        }
      }
    }
  }
`;

class ExplorePanelMediator extends React.Component {
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
      selectedSources: [],
      yearRange,
      allRegions: []
    };

    this.refetch = this.refetch.bind(this);
    this.selectDataSource = this.selectDataSource.bind(this);
    this.resetIndicators = this.resetIndicators.bind(this);
    this.selectYearRange = this.selectYearRange.bind(this);
  }

  componentDidMount() {
    if (this.props.dropDownData) {
      let allCountries = this.props.dropDownData.allCountries.edges.map(
        country => {
          return { label: country.node.name, value: country.node.iso2 };
        }
      );

      allCountries = sortBy(allCountries, ['label']);

      let allRegions = this.props.dropDownData.allRegions.edges.map(region => {
        return {
          label: region.node.name,
          value: region.node.country,
          codeVal: region.node.code
        };
      });

      allRegions = sortBy(allRegions, ['label']);

      // and we also push in a variable for undefined
      allRegions.push({ label: 'undefined', value: [{ iso2: 'undefined' }] });

      let allFileSources = this.props.dropDownData.allFileSources.edges.map(
        source => {
          return {
            label: source.node.name,
            value: source.node.name
          };
        }
      );

      allFileSources = sortBy(allFileSources, ['label']);

      this.props.dispatch(
        actions.storePaneDataRequest({
          allCountries
        })
      );

      this.setState({
        allFileSources,
        allCountries,
        allRegions
      });
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

    this.setState({ selectedSources });
    this.refetch(selectedSources);
  }

  selectYearRange(value) {
    const yearRange = ''
      .concat(value[0])
      .concat(',')
      .concat(value[1]);
    this.setState({ yearRange }, this.refetch);
  }

  addIndicator() {
    const selectedInd = [...this.props.chartData.selectedInd];

    selectedInd.push(initIndItem);

    this.props.dispatch(
      actions.storeChartDataRequest({
        selectedInd
      })
    );
  }

  removeIndicator(index) {
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

    const dontReset =
      process.env.NODE_ENV === 'development' &&
      this.state.selectedSources !== selectedSources &&
      this.state.selectedSources.length === 0;

    fetchQuery(this.props.relay.environment, indicatorQuery, refetchVars).then(
      data => {
        let allIndNames = data.allIndicators.edges.map(indicator => {
          return {
            label: indicator.node.name,
            value: indicator.node.name,
            lastYear: indicator.node.lastDataYear
          };
        });

        allIndNames = sortBy(allIndNames, ['label']);

        this.setState({ allIndNames }, () => this.resetIndicators(dontReset));
      }
    );
  }

  resetIndicators(dontReset = false) {
    if (!dontReset) {
      // and we also deselect the indicators
      this.props.selectInd('resetAll');
    }
  }

  render() {
    const { dropDownData, ...otherProps } = this.props;

    return (
      <DataExplorePane
        indNames={this.state.allIndNames}
        countries={this.state.allCountries}
        regions={this.state.allRegions}
        allFileSources={this.state.allFileSources}
        selectDataSource={this.selectDataSource}
        selectedSources={this.state.selectedSources}
        selectYearRange={this.selectYearRange}
        yearRange={yearStrToArray(this.state.yearRange)}
        {...otherProps}
      />
    );
  }
}

ExplorePanelMediator.propTypes = propTypes;
ExplorePanelMediator.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    chartData: state.chartData.chartData,
    paneData: state.paneData.paneData
  };
};

export default createFragmentContainer(
  connect(mapStateToProps)(ExplorePanelMediator),
  graphql`
    fragment ExplorePanelMediator_dropDownData on Query {
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
