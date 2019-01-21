/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ComponentBase = styled.div``;
const ComponentList = styled.div``;

const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: undefined,
};

const DataMapperModule = props => {
  return (
    <ComponentBase>
      <ComponentList>s</ComponentList>
    </ComponentBase>
  );
};

DataMapperModule.propTypes = propTypes;
DataMapperModule.defaultProps = defaultProps;

export default DataMapperModule;
