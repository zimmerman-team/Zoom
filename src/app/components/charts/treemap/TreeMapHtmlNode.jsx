import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { zoomFontFamOne } from 'components/theme/ThemeSheet';

/* todo: needs further tweaking from a design perspective and speccing from a business perspective*/
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //align-content: space-between;
  justify-content: space-around;
  //justify-items: center;
  //padding: 10%;
  //padding-top: 20px;
  height: 100%;
  &:hover {
    opacity: 0.5;
  }
`;

const NodeLabel = styled.span`
  user-select: none;
  width: 80%;
  overflow: hidden;
  //white-space: nowrap;
  text-overflow: ellipsis;
  font-family: ${zoomFontFamOne};
  line-height: 1;
`;
const NodeValue = styled.span`
  user-select: none;
  font-family: ${zoomFontFamOne};
  //font-size: 25px;
  line-height: 1;
  //color: cornflowerblue;
`;

const WidthDefiner = styled.div`
  width: 80%;
`;

const TreeNodeBase = styled.div`
  box-sizing: border-box;
  position: absolute;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-style: solid;
`;

const TreeMapHtmlNode = ({ node, style }) => {
  if (style.width <= 0 || style.height <= 0) return null;

  const hideText = style.width <= 180;

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
        borderColor: style.borderColor,
      }}
    >
      {/*{!hideText && (*/}
      {node.label && (
        <TextContainer>
          <NodeLabel style={{ fontSize: style.width / 12 }}>
            {node.label}
          </NodeLabel>

          <NodeValue style={{ fontSize: style.width / 9 }}>
            {node.value}
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
    y1: PropTypes.number,
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
    y: PropTypes.number,
  }),
};
TreeMapHtmlNode.defaultProps = {
  node: {},
  style: {},
};

export default TreeMapHtmlNode;
