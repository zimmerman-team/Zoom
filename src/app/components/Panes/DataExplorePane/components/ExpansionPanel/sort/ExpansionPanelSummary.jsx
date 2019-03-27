/* base */
import React from 'react';
import styled from 'styled-components';
import BaseComponent from '@material-ui/core/ExpansionPanelSummary';
import theme from 'theme/Theme';

const ExpansionPanelSummary = styled(BaseComponent)`
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 14px;
  line-height: 40px;

  & > div {
    margin: 0;
  }
`;

export default ExpansionPanelSummary;
