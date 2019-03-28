/* base */
import React from 'react';
import PropTypes from 'prop-types';
import theme from 'theme/Theme';

/* components */
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  ComponentBase,
  ExpansionPanel,
  ExpansionPanelSummary,
  IconContainer
} from 'components/Panes/DataExplorePane/components/ExpansionPanel/ExpansionPanel.style';
import ExpansionPanelDetails from './components/ExpansionPanelDetails';

const propTypes = {
  isYearSelect: PropTypes.bool,
  selectYearRange: PropTypes.func,

  isDropdownSelect: PropTypes.bool,
  panelDetails: PropTypes.arrayOf(
    PropTypes.shape({
      categorise: PropTypes.bool,
      locationSelected: PropTypes.bool,
      allFileSources: PropTypes.array,
      selectedSources: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
      selectDataSource: PropTypes.func,
      multiple: PropTypes.bool,
      selectAll: PropTypes.bool,
      defaultAll: PropTypes.array,
      placeHolderNumber: PropTypes.number,
      reset: PropTypes.func,
      valueSelected: PropTypes.string
    })
  )
};

const defaultProps = {
  isYearSelect: false,
  selectYearRange: undefined,

  isDropdownSelect: false,
  panelDetails: [
    {
      locationSelected: false,
      categorise: false,
      allFileSources: [],
      selectedSources: [],
      selectDataSource: undefined,
      multiple: false,
      selectAll: false,
      defaultAll: [],
      placeHolderNumber: undefined,
      reset: undefined,
      valueSelected: ''
    }
  ]
};

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
        {/*TODO: ExpansionPanelSummary should be own component*/}
        <ExpansionPanelSummary
          style={headerStyle}
          expandIcon={<ExpandMoreIcon />}
        >
          <IconContainer styles={headerStyle}>{props.icon}</IconContainer>
          {props.label}
        </ExpansionPanelSummary>

        <ExpansionPanelDetails
          isDropdownSelect={props.isDropdownSelect}
          panelDetails={props.panelDetails}
          isYearSelect={props.isYearSelect}
          selectYearRange={props.selectYearRange}
        />
      </ExpansionPanel>
    </ComponentBase>
  );
}
ExpansionPanelContainer.propTypes = propTypes;
ExpansionPanelContainer.defaultProps = defaultProps;
export default ExpansionPanelContainer;