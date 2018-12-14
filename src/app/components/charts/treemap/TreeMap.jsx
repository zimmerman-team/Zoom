/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';
import { ResponsiveTreeMapHtml } from '@nivo/treemap';
import { generateCountriesData } from '@nivo/generators';
import TreeMapHtmlNode from 'components/charts/treemap/TreeMapHtmlNode';

const ComponentBase = styled(Box)`
  height: 400px;
  width: 100%;
`;

const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: {},
};

const TreeMap = props => {
  // console.log(generateCountriesData(['value'], { size: 10 }));

  return (
    <ComponentBase>
      <ResponsiveTreeMapHtml
        root={props.data}
        identity="name"
        value="loc"
        innerPadding={2}
        outerPadding={2}
        tile="binary"
        nodeComponent={({ node, style }) => (
          <TreeMapHtmlNode node={node} style={style} />
        )}
        margin={{
          top: 30,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        colorBy={function(e) {
          return e.color;
        }}
        borderColor="inherit:darker(0.3)"
        animate={false}
      />
    </ComponentBase>
  );
};

TreeMap.propTypes = propTypes;
TreeMap.defaultProps = defaultProps;

export default TreeMap;
