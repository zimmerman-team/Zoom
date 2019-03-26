/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';

/* components */
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  ComponentBase,
  ExpansionzPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  IconContainer,
  ZoomSelect,
  Box
} from './ExpansionPanel.styles';
import { DropDownCont } from '../../DataExplorerPane.style';
import YearSelector from '../../../../YearSelector/YearSelector';

const propTypes = {
  //TODO: refactor to oneof()
  //TODO: see if there is a way to make certain proptypes required when oneofthese

  isYearSelect: PropTypes.bool,

  isDropdownSelect: PropTypes.bool,
  panelDetails: PropTypes.arrayOf(
    PropTypes.shape({
      categorise: PropTypes.bool,
      locationSelected: PropTypes.bool,
      allFileSources: PropTypes.array,
      selectedSources: PropTypes.array,
      selectDataSource: PropTypes.func,
      multiple: PropTypes.bool,
      selectAll: PropTypes.bool,
      defaultAll: PropTypes.array,
      reset: PropTypes.func
    })
  )
};

const defaultProps = {
  panelDetails: [
    {
      multiple: false,
      selectAll: false,
      categorise: false,
      locationSelected: false,
      allFileSources: [1, 2],
      selectedSources: [1, 2],
      selectDataSource: [1, 2],
      defaultAll: [1, 2],
      placeHolderNumber: undefined,
      reset: undefined
    }
  ],

  locationSelected: true,
  allFileSources: {},
  selectDataSource: {},
  selectedSources: {},

  isSelect: false,
  isYearSelect: false,

  categorise: false
};

const ExpansionPanel = props => {
  const [expanded, setExpanded] = React.useState(true);

  function handleChange() {
    setExpanded(!expanded);
  }

  //TODO: Styles related put in appropriate file sahbi
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
      <Box>
        <ExpansionzPanel expanded={expanded} onChange={handleChange}>
          <ExpansionPanelSummary
            style={headerStyle}
            expandIcon={<ExpandMoreIcon />}
          >
            <IconContainer styles={headerStyle}>{props.icon}</IconContainer>
            {props.label}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {props.isDropDownSelect &&
              props.panelDetails.map(detail => (
                <DropDownCont>
                  <ZoomSelect
                    categorise={detail.categorise}
                    multiple={detail.multiple}
                    selectAll={detail.selectAll}
                    defaultAll={detail.locationSelected}
                    reset={detail.reset}
                    placeHolderText={detail.placeHolderText}
                    placeHolderNumber={detail.placeHolderNumber}
                    data={detail.allFileSources}
                    arraySelected={detail.selectedSources}
                    selectVal={detail.selectDataSource}
                  />
                </DropDownCont>
              ))}

            {props.isYearSelect && (
              <YearSelector
                selectYear={props.selectYear}
                selectedYears={props.selectedYears}
              />
            )}
          </ExpansionPanelDetails>
        </ExpansionzPanel>
      </Box>
    </ComponentBase>
  );
};
ExpansionPanel.propTypes = propTypes;
ExpansionPanel.defaultProps = defaultProps;
export default ExpansionPanel;
