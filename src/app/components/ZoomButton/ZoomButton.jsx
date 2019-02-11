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
  width: 160px;
  height: 30px;
  border-radius: 15px;
  background-color: ${theme.color.aidsFondsRed};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: ${theme.font.zoomFontFamTwo};
  text-transform: lowercase;
  color: ${theme.color.aidsFondsWhite};
  font-weight: 300;
  line-height: 1;
`;

const propTypes = {};
const defaultProps = {};

const ZoomButton = props => {
  return (
    <ComponentBase onClick={props.onClick} style={props.style} {...props}>
      {props.children}
    </ComponentBase>
  );
};

ZoomButton.propTypes = propTypes;
ZoomButton.defaultProps = defaultProps;

export default ZoomButton;
