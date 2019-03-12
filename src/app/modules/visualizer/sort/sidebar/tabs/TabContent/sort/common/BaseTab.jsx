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
  display: flex;
  flex-direction: column;
  //align-items: center;
  //justify-content:;
  //padding-top: ;
  width: 320px;
  height: calc(100vh - 40px);
  background-color: white;
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
