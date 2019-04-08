import React from 'react';
import theme from 'theme/Theme';
import styled from 'styled-components';

const ComponentBase = styled.div`
  background-color: ${theme.color.toolTipColor};
  color: ${theme.color.aidsFondsWhite};
  font-family: ${theme.font.zoomFontFamTwo};
  font-size: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  height: 17px;
  width: fit-content;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SimpleToolTip = props => <ComponentBase>{props.title}</ComponentBase>;

export default SimpleToolTip;
