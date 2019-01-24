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

const StepThree = props => {
  return <ComponentBase />;
};

StepThree.propTypes = propTypes;
StepThree.defaultProps = defaultProps;

export default StepThree;
