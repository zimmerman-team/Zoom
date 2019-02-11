import React from 'react';
import theme from 'theme/Theme';
import styled from 'styled-components';

const ComponentBase = styled.div`
  background-color: ${theme.color.toolTipColor};
  color: ${theme.color.aidsFondsWhite}
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  padding: 5px;
`;

const SimpleToolTip = props => <ComponentBase>{props.title}</ComponentBase>;

export default SimpleToolTip;
