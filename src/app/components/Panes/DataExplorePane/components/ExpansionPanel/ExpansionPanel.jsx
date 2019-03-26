/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';

/* components */
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
  locationSelected: PropTypes.bool,
  allFileSources: PropTypes.array,
  selectedSources: PropTypes.array,
  selectDataSource: PropTypes.func,

  //TODO: refactor to oneof()
  //TODO: see if there is a way to make certain proptypes required when oneofthese
  isSelect: PropTypes.bool,
  isYearSelect: PropTypes.bool,

  categorise: PropTypes.bool
};

const defaultProps = {
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
          <ExpansionPanelSummary style={headerStyle}>
            <IconContainer styles={headerStyle}>{props.icon}</IconContainer>
            {props.label}
          </ExpansionPanelSummary>
          {/*TODO: A expensionPanel should take multiple expansionPanelDetails*/}
          {/*done: A expensionPanel should take zoomselects and yearselecteros, hell why not any component?*/}
          {/*done: Dropdowncont is specific to Zoomselect */}
          <ExpansionPanelDetails>
            {props.isSelect ? (
              <DropDownCont>
                <ZoomSelect
                  categorise={props.categorise}
                  multiple={props.multiple}
                  selectAll={props.selectAll}
                  defaultAll={props.locationSelected}
                  reset={() => props.selectDataSource('reset')}
                  placeHolderText={props.placeHolderText}
                  placeHolderNumber={props.allFileSources.length}
                  data={props.allFileSources}
                  arraySelected={props.selectedSources}
                  selectVal={props.selectDataSource}
                />
              </DropDownCont>
            ) : null}

            {props.isYearSelect ? (
              <YearSelector
                selectYear={props.selectYear}
                selectedYears={props.selectedYears}
              />
            ) : null}
          </ExpansionPanelDetails>
        </ExpansionzPanel>
      </Box>
    </ComponentBase>
  );
};
ExpansionPanel.propTypes = propTypes;
ExpansionPanel.defaultProps = defaultProps;
export default ExpansionPanel;
