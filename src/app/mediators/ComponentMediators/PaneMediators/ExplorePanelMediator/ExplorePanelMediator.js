/* base */
import React from 'react';
import { createRefetchContainer, graphql } from 'react-relay';
import DataExplorePane from 'components/Panes/DataExplorePane/DataExplorePanel';
import PropTypes from 'prop-types';

/* helpers */
import sortBy from 'lodash/sortBy';
import isEqual from 'lodash/isEqual';
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

class ExplorePanelMediator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allIndNames: [],
      allCountries: [],
      allFileSources: [],
      selectedSources: [],
      allRegions: []
    };

    this.refetch = this.refetch.bind(this);
    this.selectDataSource = this.selectDataSource.bind(this);
    this.resetIndicators = this.resetIndicators.bind(this);
  }

  // onlyUnique(value, index, self) {
  //   return findIndex(self, ['label', value.label]) === index;
  // }

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
    this.props.selectInd1({ value: undefined });
    this.props.selectInd2({ value: undefined });
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
        {...otherProps}
      />
    );
  }
}

ExplorePanelMediator.propTypes = propTypes;
ExplorePanelMediator.defaultProps = defaultProps;

export default createRefetchContainer(
  ExplorePanelMediator,
  graphql`
    fragment ExplorePanelMediator_dropDownData on Query
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
    query ExplorePanelMediatorQuery($fileSource_Name_In: String!) {
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
