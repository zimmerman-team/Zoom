import styled from 'styled-components';

import theme from 'theme/Theme';

export const ComponentBase = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.78);
`;

export const YearLabel = styled.div`
  font-size: 10px;
  font-family: ${theme.font.zoomFontFamOne};
  color: ${theme.color.smallTextBlack};
  padding: 14px 0;
  line-height: 12px;
  flex-grow: 1;
  text-align: center;
`;

export const SelectedYearLabel = styled(YearLabel)`
  background-color: ${theme.color.aidsFondsBlue};
  color: ${theme.color.aidsFondsWhite};
  &:first-child {
    background-color: #000;4
  }
`;

export const StartControl = styled(YearLabel)`
  background-color: ${theme.color.aidsFondsRed};
  color: ${theme.color.aidsFondsWhite};
  flex-grow: 0;

  position: relative;
  padding-left: 0.5%;
  margin-right: 0.5%;

  &:before {
    border-left: 12px solid ${theme.color.aidsFondsRed};
    border-top: 20px solid ${theme.color.aidsFondsBlue};
    border-bottom: 20px solid ${theme.color.aidsFondsBlue};
    content: '';
    height: 0;
    left: 100%;
    position: absolute;
    top: 0;
    width: 0;
  }

  &:hover {
    cursor: pointer;
  }

  &:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }

  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  -o-user-select: none;
  -moz-user-select: none;
`;

export const EndControl = styled(YearLabel)`
  background-color: ${theme.color.aidsFondsRed};
  color: ${theme.color.aidsFondsWhite};
  flex-grow: 0;

  position: relative;

  padding-right: 0.5%;
  margin-left: 0.5%;

  &:before {
    border-right: 12px solid ${theme.color.aidsFondsRed};
    border-top: 20px solid ${theme.color.aidsFondsBlue};
    border-bottom: 20px solid ${theme.color.aidsFondsBlue};
    content: '';
    height: 0;
    right: 100%;
    position: absolute;
    top: 0;
    width: 0;
  }

  &:hover {
    cursor: pointer;
  }

  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  -o-user-select: none;
  -moz-user-select: none;

  &:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }
`;
