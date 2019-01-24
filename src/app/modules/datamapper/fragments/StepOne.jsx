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

const StepOne = props => {
  return <ComponentBase />;
};

StepOne.propTypes = propTypes;
StepOne.defaultProps = defaultProps;

export default StepOne;
