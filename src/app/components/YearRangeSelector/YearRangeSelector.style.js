import styled from 'styled-components';

import theme from 'app/theme/Theme';

export const ComponentBase = styled.div`
  display: flex;
  background-color: inherit;
`;

export const YearLabel = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  max-width: 32px;
  font-size: 10px;
  font-family: ${theme.font.zoomFontFamOne};
  color: ${theme.color.smallTextBlack};

  padding: 10px 0;
  line-height: 12px;

  &:hover {
    cursor: pointer;
  }
  &:first-child {
    padding-left: 24px;
  }

  &:last-child {
    padding-right: 24px;
  }

  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  -o-user-select: none;
  -moz-user-select: none;
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
  padding-left: 1%;
  margin-right: 0.5%;

  &:before {
    border-left: 0.5vw solid ${theme.color.aidsFondsRed};
    border-top: 16px solid ${theme.color.aidsFondsBlue};
    border-bottom: 16px solid ${theme.color.aidsFondsBlue};
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

  padding-right: 1%;
  margin-left: 0.5%;

  &:before {
    border-right: 0.5vw solid ${theme.color.aidsFondsRed};
    border-top: 16px solid ${theme.color.aidsFondsBlue};
    border-bottom: 16px solid ${theme.color.aidsFondsBlue};
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
