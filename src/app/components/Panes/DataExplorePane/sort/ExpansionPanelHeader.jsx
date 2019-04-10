/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import theme from 'theme/Theme';

const propTypes = {};
const defaultProps = {};

const ExpansionPanelHeader = styled(ExpansionPanelSummary)`
  && {
    font-family: ${theme.font.zoomFontFamOne};
    font-size: 14px;
    line-height: 40px;

    & > div {
      margin: 0;
    }
  }
`;

ExpansionPanelHeader.propTypes = propTypes;
ExpansionPanelHeader.defaultProps = defaultProps;

export default ExpansionPanelHeader;
