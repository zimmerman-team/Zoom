/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withStyles from '@material-ui/styles/es/withStyles';
import BaseComponent from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import theme from 'theme/Theme';

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
