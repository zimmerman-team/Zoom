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

const HomeModule = props => {
  return <ComponentBase />;
};

HomeModule.propTypes = propTypes;
HomeModule.defaultProps = defaultProps;

export default HomeModule;
