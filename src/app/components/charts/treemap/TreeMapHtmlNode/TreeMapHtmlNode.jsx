import React from 'react';
import PropTypes from 'prop-types';

import {
  NodeLabel,
  NodeValue,
  TextContainer,
  TreeNodeBase
} from './TreeMapHtmlNode.styles';
import Theme from 'theme/Theme';

const TreeMapHtmlNode = ({ node, style }) => {
  if (style.width <= 0 || style.height <= 0) return null;

  // const hideText = style.width <= 180;

  return (
    <TreeNodeBase
      id={(node.data && node.data.id
        ? node.data.id
        : // replace special characters with "-"
          node.id
      ).replace(/[^\w]/gi, '-')}
      style={{
        top: style.y,
        left: style.x,
        width: style.width,
        height: style.height,
        background: style.color,
        borderWidth: style.borderWidth,
        borderColor: style.borderColor
      }}
    >
      {/* {!hideText && ( */}
      {node.label && (
        <TextContainer>
          <NodeLabel style={{ fontSize: style.width / 12 }}>
            {node.label}
          </NodeLabel>

          <NodeValue style={{ fontSize: style.width / 9 }}>
            {node.value}%
          </NodeValue>
        </TextContainer>
      )}
    </TreeNodeBase>
  );
};

TreeMapHtmlNode.propTypes = {
  node: PropTypes.shape({
    color: PropTypes.string,
    data: PropTypes.object,
    depth: PropTypes.number,
    height: PropTypes.number,
    id: PropTypes.string,
    label: PropTypes.string,
    nodeHeight: PropTypes.number,
    parent: PropTypes.object,
    path: PropTypes.string,
    width: PropTypes.number,
    value: PropTypes.number,
    x: PropTypes.number,
    x0: PropTypes.number,
    x1: PropTypes.number,
    y: PropTypes.number,
    y0: PropTypes.number,
    y1: PropTypes.number
  }),
  style: PropTypes.shape({
    borderColor: PropTypes.string,
    borderWidth: PropTypes.number,
    color: PropTypes.string,
    height: PropTypes.number,
    labelTextColor: PropTypes.string,
    orientLabel: PropTypes.bool,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number
  })
};
TreeMapHtmlNode.defaultProps = {
  node: {},
  style: {}
};

export default TreeMapHtmlNode;
