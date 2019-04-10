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
  height: 375px;
  width: 320px;
  background-color: #a1a1a1;
  display: flex;
  flex-direction: column;
`;

const propTypes = {};
const defaultProps = {};

const GraphStructurePanel = props => {
  return <ComponentBase />;
};

GraphStructurePanel.propTypes = propTypes;
GraphStructurePanel.defaultProps = defaultProps;

export default GraphStructurePanel;
