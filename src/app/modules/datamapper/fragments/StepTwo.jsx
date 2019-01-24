/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ComponentBase = styled.div``;

const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: undefined,
};

const StepTwo = props => {
  return <ComponentBase />;
};

StepTwo.propTypes = propTypes;
StepTwo.defaultProps = defaultProps;

export default StepTwo;
