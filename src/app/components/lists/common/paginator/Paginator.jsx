/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ComponentBase = styled.div`
  width: 170px;
`;

const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: undefined,
};

const Paginator = props => {
  return <ComponentBase>joe</ComponentBase>;
};

Paginator.propTypes = propTypes;
Paginator.defaultProps = defaultProps;

export default Paginator;
