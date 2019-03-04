/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  width: 320px;
  height: 500px;
  background-color: transparent;
`;

const propTypes = {};
const defaultProps = {};

const BaseTab = props => {
  return <ComponentBase>{props.children}</ComponentBase>;
};

BaseTab.propTypes = propTypes;
BaseTab.defaultProps = defaultProps;

export default BaseTab;
