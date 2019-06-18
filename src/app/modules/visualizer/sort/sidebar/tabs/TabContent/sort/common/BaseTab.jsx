/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  display: flex;
  flex-direction: column;

  width: 320px;
  height: inherit;
  background-color: white;
  box-shadow: 0 5px 7px rgba(0, 0, 0, 0.5);
`;

const propTypes = {
  padding: PropTypes.bool
};
const defaultProps = {};

const BaseTab = props => {
  return <ComponentBase>{props.children}</ComponentBase>;
};

BaseTab.propTypes = propTypes;
BaseTab.defaultProps = defaultProps;

export default BaseTab;
