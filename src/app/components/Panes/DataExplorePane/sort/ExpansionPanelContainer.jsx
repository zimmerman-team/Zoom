/* base */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from 'theme/Theme';

/* components */
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelContent from 'components/Panes/DataExplorePane/sort/ExpansionPanelContent';
import ExpansionPanelHeader from 'components/Panes/DataExplorePane/sort/ExpansionPanelHeader';
import ExpansionPanel from 'components/Panes/DataExplorePane/sort/ExpansionPanel';
import IconContainer from 'components/Panes/DataExplorePane/sort/IconContainer';

const ComponentBase = styled.div`
  border-bottom: 1px solid ${theme.color.zoomGreyEleven};
  && [role='button'] {
    min-height: 40px;
    max-height: 40px;
  }
`;

const propTypes = {};
const defaultProps = {};

function ExpansionPanelContainer(props) {
  const [expanded, setExpanded] = React.useState(true);

  //TODO: Styles related, this should be in ExpansionPanelSummary
  const headerStyle = expanded
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
    <ComponentBase>
      <ExpansionPanel defaultExpanded onChange={() => setExpanded(!expanded)}>
        {/* PANEL HEADER */}
        <ExpansionPanelHeader
          style={headerStyle}
          expandIcon={<ExpandMoreIcon />}
        >
          <IconContainer styles={headerStyle}>{props.icon}</IconContainer>
          {props.label}
        </ExpansionPanelHeader>
        {/* //////////////////////////////////////////////////////////////// */}

        {/* PANEL CONTENT */}
        <ExpansionPanelContent>{props.children}</ExpansionPanelContent>
        {/* //////////////////////////////////////////////////////////////// */}
      </ExpansionPanel>
    </ComponentBase>
  );
}
ExpansionPanelContainer.propTypes = propTypes;
ExpansionPanelContainer.defaultProps = defaultProps;
export default ExpansionPanelContainer;
