import styled from 'styled-components';
import { zoomFontFamOne } from 'components/theme/ThemeSheet';

/* todo: needs further tweaking from a design perspective and speccing from a business perspective */
export const TextContainer = styled.div`
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

export const NodeLabel = styled.span`
  user-select: none;
  width: 80%;
  overflow: hidden;
  //white-space: nowrap;
  text-overflow: ellipsis;
  font-family: ${zoomFontFamOne};
  line-height: 1;
`;
export const NodeValue = styled.span`
  user-select: none;
  font-family: ${zoomFontFamOne};
  //font-size: 25px;
  line-height: 1;
  //color: cornflowerblue;
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
