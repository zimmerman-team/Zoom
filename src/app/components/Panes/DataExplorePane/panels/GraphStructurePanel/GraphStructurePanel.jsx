/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  height: 375px;
  width: 320px;

  background-color: #efefef;
  display: flex;
  flex-direction: column;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  outline: 1px solid green;
  width: 100%;
  height: 40px;
  margin-bottom: 15px;
`;

const propTypes = {};
const defaultProps = {};

const GraphStructurePanel = props => {
  return (
    <ComponentBase>
      <FilterContainer />
      <FilterContainer />
      <FilterContainer />
      <FilterContainer />
      <FilterContainer />
      <FilterContainer />
    </ComponentBase>
  );
};

GraphStructurePanel.propTypes = propTypes;
GraphStructurePanel.defaultProps = defaultProps;

export default GraphStructurePanel;
