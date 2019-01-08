import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ScaleText from 'react-scale-text';
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
  node: PropTypes.object,
  style: PropTypes.object,
};

export default TreeMapHtmlNode;
