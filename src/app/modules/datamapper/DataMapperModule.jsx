/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StepItem from 'components/stepper/StepItem';

const ComponentBase = styled.div``;
const ComponentList = styled.div``;

////////////////////////////////////////////////////////////////////////////////
const StepperList = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
`;
const StepperItem = styled.li``;
////////////////////////////////////////////////////////////////////////////////

const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: undefined,
};

const DataMapperModule = props => {
  return (
    <ComponentBase>
      <ComponentList>
        <StepperList>
          <StepItem stepNumber={1} stepActive stepLabel="Meta Data" />
          <StepItem stepNumber={2} stepActive stepLabel="Meta Data" />
        </StepperList>
      </ComponentList>
    </ComponentBase>
  );
};

DataMapperModule.propTypes = propTypes;
DataMapperModule.defaultProps = defaultProps;

export default DataMapperModule;
