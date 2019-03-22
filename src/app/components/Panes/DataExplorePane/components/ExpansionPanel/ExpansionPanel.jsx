/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';

/* components */
import _ExpansionPanel from '@material-ui/core/ExpansionPanel';
import _ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import _ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import _ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { DropDownCont, FilterContainer } from '../../DataExplorerPane.style';
import ZoomSelect from '../../DataExplorePanel';

const ComponentBase = styled.div``;

// const ExpansionPanel = styled(_ExpansionPanel)``;
const ExpansionPanelSummary = styled(_ExpansionPanelSummary)``;
const ExpansionPanelDetails = styled(_ExpansionPanelDetails)``;
const ExpandMoreIcon = styled(_ExpandMoreIcon)``;

const propTypes = {
  locationSelected: PropTypes.bool,
  allFileSources: PropTypes.object,
  selectedSources: PropTypes.object,
  selectDataSource: PropTypes.object
};

const defaultProps = {
  locationSelected: true,
  allFileSources: {},
  selectDataSource: {},
  selectedSources: {}
};

const ExpansionPanel = props => {
  return (
    <ComponentBase>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          {/*{this.renderHeader('DataSource')}*/}
          DataSource
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <FilterContainer>
            <DropDownCont>
              <ZoomSelect
                defaultAll={props.locationSelected}
                selectAll
                // reset={() => this.props.selectDataSource('reset')}
                multiple
                placeHolderText="Select datasource"
                data={props.allFileSources}
                arraySelected={props.selectedSources}
                selectVal={props.selectDataSource}
              />
            </DropDownCont>
          </FilterContainer>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </ComponentBase>
  );
};
ExpansionPanel.propTypes = propTypes;
ExpansionPanel.defaultProps = defaultProps;
export default ExpansionPanel;
