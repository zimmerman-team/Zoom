import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { Select } from 'grommet/es6';

const IndicatorDropMediator = props => {
  const indNames = props.allIndicatorNames.allIndicators.edges.map(edge => {
    return edge.node.name;
  });

  return (
    <Select
      placeholder="Select"
      value={props.valueSelected}
      options={indNames}
      onChange={props.selectVal}
    />
  );
};

export default createFragmentContainer(
  IndicatorDropMediator,
  graphql`
    fragment IndicatorDropMediator_allIndicatorNames on Query {
      allIndicators {
        edges {
          node {
            name
          }
        }
      }
    }
  `,
);
