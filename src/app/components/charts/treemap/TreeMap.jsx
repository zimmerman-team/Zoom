/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveTreeMapHtml } from '@nivo/treemap';
// import { generateCountriesData } from '@nivo/generators';
import TreeMapHtmlNode from 'components/charts/treemap/TreeMapHtmlNode/TreeMapHtmlNode';
import { ComponentBase } from './TreeMap.styles';

const propTypes = {
  data: PropTypes.shape({
    children: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        loc: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
    color: PropTypes.string,
    name: PropTypes.string,
  }),
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
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        colorBy={e => {
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
