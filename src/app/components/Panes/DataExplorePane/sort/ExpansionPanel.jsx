/* base */
import React from 'react';
import withStyles from '@material-ui/styles/withStyles';
import BaseComponent from '@material-ui/core/ExpansionPanel/ExpansionPanel';

const propTypes = {};
const defaultProps = {};

const ExpansionPanel = withStyles({
  root: {
    minHeight: '40px',
    boxShadow: '0 0 0 0 transparent',
    '&:last-child': {
      borderRadius: 0
    },
    '& > div': {
      padding: 0
    }
  }
})(BaseComponent);

ExpansionPanel.propTypes = propTypes;
ExpansionPanel.defaultProps = defaultProps;

export default ExpansionPanel;
