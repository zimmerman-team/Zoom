import React from 'react';
import PropTypes from 'prop-types';

/* styles */
import { ComponentBase } from './TableToolTip.style';

const propTypes = {
  text: PropTypes.string,
  margin: PropTypes.string
};
const defaultProps = {
  text: 'Tooltip',
  margin: '0'
};

const TableToolTip = props => (
  <ComponentBase style={{ margin: props.margin }}>{props.text}</ComponentBase>
);

TableToolTip.propTypes = propTypes;
TableToolTip.defaultProps = defaultProps;

export default TableToolTip;
