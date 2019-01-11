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

const CountryFocusModule = props => {
  return <ComponentBase />;
};

CountryFocusModule.propTypes = propTypes;
CountryFocusModule.defaultProps = defaultProps;

export default CountryFocusModule;
