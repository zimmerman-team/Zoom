/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* components */
import {
  ComponentBase,
  ExpansionzPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpandMoreIcon,
  ZoomSelect
} from './ExpansionPanel.styles';
import { DropDownCont, FilterContainer } from '../../DataExplorerPane.style';

//todo: Check if styling the 'root' component can be accomplished with styled-components

const Box = styled.div``;

const propTypes = {
  locationSelected: PropTypes.bool,
  allFileSources: PropTypes.array,
  selectedSources: PropTypes.array,
  selectDataSource: PropTypes.func,
  renderHeader: PropTypes.object,

  details: PropTypes.array
};

const defaultProps = {
  locationSelected: true,
  allFileSources: {},
  selectDataSource: {},
  selectedSources: {},
  renderHeader: {}
};

const ExpansionPanel = props => {
  const [expanded, setExpanded] = React.useState(true);

  function handleChange() {
    setExpanded(!expanded);
  }

  return (
    <ComponentBase>
      <Box>
        <ExpansionzPanel expanded={expanded} onChange={handleChange}>
          <ExpansionPanelSummary>
            {props.renderHeader('Datasource')}
          </ExpansionPanelSummary>
          {/*todo: A expensionPanel should take multiple expansionPanelDetails*/}
          <ExpansionPanelDetails>
            <FilterContainer>
              <DropDownCont>
                <ZoomSelect
                  defaultAll={props.locationSelected}
                  selectAll={props.selectAll}
                  reset={() => props.selectDataSource('reset')}
                  multiple={props.multiple}
                  placeHolderText={props.placeHolderText}
                  placeHolderNumber={props.placeHolderNumber}
                  data={props.allFileSources}
                  arraySelected={props.selectedSources}
                  selectVal={props.selectDataSource}
                />
              </DropDownCont>
            </FilterContainer>
          </ExpansionPanelDetails>
        </ExpansionzPanel>
      </Box>
    </ComponentBase>
  );
};
ExpansionPanel.propTypes = propTypes;
ExpansionPanel.defaultProps = defaultProps;
export default ExpansionPanel;
