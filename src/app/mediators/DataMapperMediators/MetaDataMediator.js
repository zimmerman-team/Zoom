/* DATAMAPPER STEP 1 */

/* base */
import React from 'react';
import MetaData from 'modules/datamapper/fragments/MetaData/MetaData';
import { createFragmentContainer, graphql } from 'react-relay';

const propTypes = {};

const defaultProps = {};

export class MetaDataMediator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <MetaData />;
  }
}

MetaDataMediator.propTypes = propTypes;
MetaDataMediator.defaultProps = defaultProps;

export default createFragmentContainer(
  MetaDataMediator,
  graphql`
    fragment MetaDataMediator_dropDownData on Query {
      allFileSources {
        edges {
          node {
            name
          }
        }
      }
    }
  `,
);
