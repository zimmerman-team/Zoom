import styled from 'styled-components';

import theme from 'theme/Theme';
/* todo: needs further tweaking from a design perspective and speccing from a business perspective */
export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  &:hover {
    opacity: 0.5;
  }
`;

export const NodeLabel = styled.span`
  user-select: none;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: ${theme.font.zoomFontFamOne};
  line-height: 1;
`;
export const NodeValue = styled.span`
  user-select: none;
  font-family: ${theme.font.zoomFontFamOne};
  line-height: 1;
`;

export const WidthDefiner = styled.div`
  width: 80%;
`;

export const TreeNodeBase = styled.div`
  box-sizing: border-box;
  position: absolute;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-style: solid;
`;
