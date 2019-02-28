/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  width: 1024px;
  height: 768px;
  outline: black;
  display: flex;
`;

const Sidebar = styled.div`
  width: 300px;
  height: 100%;
  background-color: #cccccc;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #cccccc;
`;

const propTypes = {
  data: PropTypes.array
};
const defaultProps = {
  data: []
};

const BuilderModule = props => {
  return (
    <ComponentBase>
      {/*<Sidebar />*/}
      <Container />
    </ComponentBase>
  );
};

BuilderModule.propTypes = propTypes;
BuilderModule.defaultProps = defaultProps;

export default BuilderModule;
