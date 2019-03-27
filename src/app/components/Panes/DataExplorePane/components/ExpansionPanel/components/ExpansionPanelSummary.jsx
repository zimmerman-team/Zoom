/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import _ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ExpansionPanelSummaryContainer = styled(_ExpansionPanelSummary)`
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 14px;
  line-height: 40px;

  & > div {
    margin: 0;
  }
`;

const IconContainer = styled.div`
  display: flex;
  height: 40px;
  width: 40px;
  &&& {
    padding-right: 0;
  }
  && svg {
    fill: ${props => props.styles.color};
  }
`;

const propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string,
  expanded: PropTypes.bool
};
const defaultProps = {
  icon: undefined,
  label: 'empty',
  expanded: true
};

const ExpansionPanelSummary = props => {
  const headerStyle = props.expanded
    ? {
        backgroundColor: theme.color.zoomGreyZero,
        color: theme.color.aidsFondsBlue,
        borderBottom: `1px solid ${theme.color.zoomGreyFour}`
      }
    : {
        backgroundColor: theme.color.aidsFondsWhite,
        color: theme.color.aidsFondsRed
      };

  return (
    <ExpansionPanelSummaryContainer
      style={headerStyle}
      expandIcon={<ExpandMoreIcon />}
    >
      <IconContainer styles={headerStyle}>{props.icon}</IconContainer>
      {props.label}
    </ExpansionPanelSummaryContainer>
  );
};
ExpansionPanelSummary.propTypes = propTypes;
ExpansionPanelSummary.defaultProps = defaultProps;
export default ExpansionPanelSummary;
