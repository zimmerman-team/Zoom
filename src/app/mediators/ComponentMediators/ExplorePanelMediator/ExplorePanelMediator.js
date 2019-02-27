/* base */
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import DataExplorePane from 'components/DataExplorePane/DataExplorePanel';
import PropTypes from 'prop-types';

/* helpers */
import sortBy from 'lodash/sortBy';
import findIndex from 'lodash/findIndex';

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

class ExplorePanelMediator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allIndNames: [],
      allCountries: [],
      allRegions: []
    };
  }

  onlyUnique(value, index, self) {
    return findIndex(self, ['label', value.label]) === index;
  }

  componentDidMount() {
    let allIndNames = this.props.dropDownData.allIndicators.edges.map(
      indicator => {
        return { label: indicator.node.name, value: indicator.node.name };
      }
    );

    // We make the array only from unique indicators
    // cause we receive several indicators with the same names
    // most likely because of data points stuff
    allIndNames = allIndNames.filter(this.onlyUnique);

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

  render() {
    const { dropDownData, ...otherProps } = this.props;

    return (
      <DataExplorePane
        indNames={this.state.allIndNames}
        countries={this.state.allCountries}
        regions={this.state.allRegions}
        {...otherProps}
      />
    );
  }
}

ExplorePanelMediator.propTypes = propTypes;
ExplorePanelMediator.defaultProps = defaultProps;

export default createFragmentContainer(
  ExplorePanelMediator,
  graphql`
    fragment ExplorePanelMediator_dropDownData on Query {
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
