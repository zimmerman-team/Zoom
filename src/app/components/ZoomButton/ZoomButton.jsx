/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Button, DataTable, Text } from 'grommet';
import theme from 'theme/Theme';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled(Button)`
  width: ${props => props.width + 'px'};
  height: 30px;
  border-radius: 15px;
  background-color: ${props => props.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.fontSize + 'px'};
  font-family: ${theme.font.zoomFontFamTwo};
  text-transform: lowercase;
  color: ${theme.color.aidsFondsWhite};
  font-weight: 300;
  line-height: 1;
`;

const propTypes = {
  fontSize: PropTypes.number,
  width: PropTypes.number,
  color: PropTypes.string
};
const defaultProps = {
  fontSize: 16,
  width: 160,
  color: theme.color.aidsFondsRed
};

const ZoomButton = props => {
  return (
    <ComponentBase
      opacity={1}
      width={props.width}
      fontSize={props.fontSize}
      onClick={props.onClick}
      style={props.style}
      backgroundColor={props.color}
      {...props}
    >
      {props.children}
    </ComponentBase>
  );
};

ZoomButton.propTypes = propTypes;
ZoomButton.defaultProps = defaultProps;

export default ZoomButton;
