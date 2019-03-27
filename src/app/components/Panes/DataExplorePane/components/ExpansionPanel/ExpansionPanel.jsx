/* base */
import React from 'react';
import PropTypes from 'prop-types';
import theme from 'theme/Theme';

/* components */
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  ComponentBase,
  ExpansionzPanel
  // ExpansionPanelSummary,
  // IconContainer
} from './ExpansionPanel.styles';
import ExpansionPanelDetails from './components/ExpansionPanelDetails';
import ExpansionPanelSummary from './components/ExpansionPanelSummary';

const propTypes = {
  isYearSelect: PropTypes.bool,
  selectYearRange: PropTypes.func,

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
      placeHolderNumber: PropTypes.number,
      reset: PropTypes.func
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
      reset: undefined
    }
  ]
};

class ExpansionPanel extends React.Component {
  // const [expanded, setExpanded] = React.useState(true);

  state = {
    expanded: true
  };

  //TODO: Styles related, this should be in ExpansionPanelSummary
  // const headerStyle = expanded
  //   ? {
  //       backgroundColor: theme.color.zoomGreyZero,
  //       color: theme.color.aidsFondsBlue,
  //       borderBottom: `1px solid ${theme.color.zoomGreyFour}`
  //     }
  //   : {
  //       backgroundColor: theme.color.aidsFondsWhite,
  //       color: theme.color.aidsFondsRed
  //     };

  handleChange = () => {
    // setExpanded(!expanded);
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    return (
      <ComponentBase>
        <ExpansionzPanel onChange={this.handleChange}>
          {/*TODO: ExpansionPanelSummary and ExpansionPanelDetails should be own component*/}
          {/*<ExpansionPanelSummary*/}
          {/*style={headerStyle}*/}
          {/*expandIcon={<ExpandMoreIcon />}*/}
          {/*>*/}
          {/*<IconContainer styles={headerStyle}>{props.icon}</IconContainer>*/}
          {/*{props.label}*/}
          {/*</ExpansionPanelSummary>*/}
          <ExpansionPanelSummary
            label={this.props.label}
            icon={this.props.icon}
            expanded={this.state.expanded}
          />
          <ExpansionPanelDetails
            isDropdownSelect={this.props.isDropdownSelect}
            panelDetails={this.props.panelDetails}
            isYearSelect={this.props.isYearSelect}
            selectYearRange={this.props.selectYearRange}
          />
        </ExpansionzPanel>
      </ComponentBase>
    );
  }
}
ExpansionPanel.propTypes = propTypes;
ExpansionPanel.defaultProps = defaultProps;
export default ExpansionPanel;
