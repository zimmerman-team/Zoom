/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveTreeMapHtml } from '@nivo/treemap';
import TreeMapHtmlNode from 'components/charts/treemap/TreeMapHtmlNode/TreeMapHtmlNode';
import { ComponentBase } from './TreeMap.styles';
import Theme from 'theme/Theme';

const propTypes = {
  data: PropTypes.shape({
    children: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        loc: PropTypes.number,
        name: PropTypes.string
      })
    ),
    color: PropTypes.string,
    name: PropTypes.string
  })
};
const defaultProps = {
  data: {}
};

const TreeMap = props => {
  return (
    <ComponentBase>
      <ResponsiveTreeMapHtml
        root={props.data}
        identity="name"
        value="loc"
        innerPadding={1}
        colors={[Theme.color.treemapNode]}
        outerPadding={1}
        tile="binary"
        nodeComponent={nodeProps => <TreeMapHtmlNode {...nodeProps} />}
        margin={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }}
        colorBy={e => {
          return e.color;
        }}
        borderColor="inherit:darker(0.3)"
        animate={false}
        leavesOnly
      />
    </ComponentBase>
  );
};

TreeMap.propTypes = propTypes;
TreeMap.defaultProps = defaultProps;

export default TreeMap;
