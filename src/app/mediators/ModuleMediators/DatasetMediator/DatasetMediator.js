import React from 'react';
import DatasetModule from 'modules/dataset/DatasetModule';
import { withRouter } from 'react-router';
import { createRefetchContainer, graphql } from 'react-relay';

class DatasetMediator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allIndNames: []
    };

    this.refetch = this.refetch.bind(this);
  }

  componentDidMount() {
    this.refetch();
  }

  refetch() {
    const refetchVars = {
      entryId: this.props.match.params.id
    };

    console.log('refetchVars', refetchVars);

    this.props.relay.refetch(refetchVars);
  }

  render() {
    console.log('this.props.metaData', this.props.metaData);
    return <DatasetModule dropDownData={this.props.dropDownData} />;
  }
}

export default createRefetchContainer(
  withRouter(DatasetMediator),
  graphql`
    fragment DatasetMediator_metaData on Query
      @argumentDefinitions(entryId: { type: "Float", defaultValue: -1 }) {
      allFiles(entryId: $entryId) {
        edges {
          node {
            entryId
            title
          }
        }
      }
    }
  `,
  graphql`
    query DatasetMediator_metaDataRefetchQuery($entryId: Float!) {
      ...DatasetMediator_metaData @arguments(entryId: $entryId)
    }
  `
);
