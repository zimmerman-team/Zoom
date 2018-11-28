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

const BaseModule = props => <ComponentBase />;

BaseModule.propTypes = propTypes;
BaseModule.defaultProps = defaultProps;

export default BaseModule;
