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
import _ZoomSelect from '../../../../Select/ZoomSelect';
import { Paper as _Paper } from '@material-ui/core';

const ExpansionzPanel = styled(_ExpansionPanel)`
  & [role='button'] {
    padding-left: 0;
    height: 40px;
  }
`;
const ExpansionPanelSummary = styled(_ExpansionPanelSummary)``;
const ExpansionPanelDetails = styled(_ExpansionPanelDetails)`
  && {
    width: 100%;
    padding: 0;

    > div {
      width: 100%;
    }
  }
`;
const ExpandMoreIcon = styled(_ExpandMoreIcon)`
  padding: 8px;
`;

const ZoomSelect = styled(_ZoomSelect)`
  width: 100%;
`;

const propTypes = {
  locationSelected: PropTypes.bool,
  allFileSources: PropTypes.array,
  selectedSources: PropTypes.array,
  selectDataSource: PropTypes.func,
  renderHeader: PropTypes.object
};

const defaultProps = {
  locationSelected: true,
  allFileSources: {},
  selectDataSource: {},
  selectedSources: {},
  renderHeader: {}
};

const ExpansionPanel = props => {
  return (
    <React.Fragment>
      <ExpansionzPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          {props.renderHeader('DataSource')}
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
      </ExpansionzPanel>
    </React.Fragment>
  );
};
ExpansionPanel.propTypes = propTypes;
ExpansionPanel.defaultProps = defaultProps;
export default ExpansionPanel;
