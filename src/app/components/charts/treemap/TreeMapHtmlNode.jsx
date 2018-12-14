import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  aidsFondsBlue,
  zoomFontFamOne,
  zoomFontFamTwo,
  zoomGreyOne,
  zoomGreyZero,
  PageHeading,
  FragmentHeader,
  FragmentVisualisation,
} from 'components/theme/ThemeSheet';

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;

const NodeLabel = styled.span`
  user-select: none;
  width: 80%;
  overflow: hidden;
  //white-space: nowrap;
  text-overflow: ellipsis;
  font-family: ${zoomFontFamTwo};
  font-size: 18x;
`;
const NodeValue = styled.span`
  user-select: none;
  font-family: ${zoomFontFamOne};
  font-size: 25px;
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
      {!hideText && (
        <TextContainer>
          <NodeLabel>{node.label}</NodeLabel>
          <NodeValue>{node.value}</NodeValue>
        </TextContainer>
      )}
    </TreeNodeBase>
  );
};

TreeMapHtmlNode.propTypes = {
  node: PropTypes.object,
  style: PropTypes.object,
};

export default TreeMapHtmlNode;
