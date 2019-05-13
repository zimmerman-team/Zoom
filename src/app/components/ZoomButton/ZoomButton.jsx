/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'grommet/components/Button';
import theme from 'theme/Theme';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled(Button)`
  width: ${props => `${props.width}px`};
  height: 30px;
  border-radius: 15px;
  background-color: ${props => props.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => `${props.fontSize}px`};
  font-family: ${theme.font.zoomFontFamTwo};
  text-transform: lowercase;
  color: ${theme.color.aidsFondsWhite};
  font-weight: 300;
  line-height: 1;
`;

const propTypes = {
  fontSize: PropTypes.number,
  width: PropTypes.number,
  color: PropTypes.string,
  marginBottom: PropTypes.number,
  marginTop: PropTypes.number
};
const defaultProps = {
  fontSize: 16,
  width: 160,
  color: theme.color.aidsFondsRed,
  marginBottom: 0,
  marginTop: 0
};

const ZoomButton = props => {
  return (
    <ComponentBase
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
