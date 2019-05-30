import styled from 'styled-components';
import theme from 'theme/Theme';

export const InfoIcon = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: darkgrey;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: ${theme.color.aidsFondsRed};
  }

  &:after {
    content: 'i';
    font-size: 13px;
    text-align: center;
    color: ${theme.color.aidsFondsWhite};
    font-family: ${theme.color.zoomFontFamOne};
    user-select: none;
  }
`;

export const ToolTipContainer = styled.div`
  border-radius: 5px;
  background-color: ${theme.color.zoomBlack};
  color: ${theme.color.aidsFondsWhite};
  padding: 6px;
  font-size: ${theme.fontSize.caption};
  font-family: ${theme.font.zoomFontFamTwo};
`;

export const InvContainer = styled.div`
  padding-bottom: 5px;
`;
