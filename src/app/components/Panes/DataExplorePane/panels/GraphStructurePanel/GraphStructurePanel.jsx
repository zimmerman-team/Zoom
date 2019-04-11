/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import ZoomSelect from 'components/Select/ZoomSelect';
import SimpleSelect from 'components/SimpleSelect/SimpleSelect';

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
  //outline: 1px solid green;
  width: 100%;
  min-height: 40px;
  margin-bottom: 10px;
`;

const DropdownFilter = styled.div`
  height: 40px;
  width: 135px;
  background-color: ${theme.color.aidsFondsWhite};
`;
const SwitchFilter = styled.div`
  height: 17px;
  width: 34px;
  background-color: ${theme.color.aidsFondsWhite};
`;
const CheckboxFilter = styled.div`
  height: 18px;
  width: 18px;
  background-color: ${theme.color.aidsFondsWhite};
`;
const PaletFilter = styled.div``;

const propTypes = {};
const defaultProps = {};

const GraphStructurePanel = props => {
  return (
    <ComponentBase>
      {/* FIRST ROW //////////////////////////////////////////////////////// */}
      <FilterContainer>
        {/* LEFT Y-AXIS */}
        <DropdownFilter />
        {/* RIGHT Y-AXIS */}
        <DropdownFilter />
      </FilterContainer>

      {/* SECOND ROW /////////////////////////////////////////////////////// */}
      <FilterContainer>
        {/* X-AXIS */}
        <SimpleSelect />
      </FilterContainer>

      {/* THIRD ROW //////////////////////////////////////////////////////// */}
      <FilterContainer>
        {/* AGGREGATE BY */}
        <DropdownFilter />
        {/* RANK BY */}
        <DropdownFilter />
      </FilterContainer>

      {/* FOURTH ROW /////////////////////////////////////////////////////// */}
      <FilterContainer>
        {/* STACKED VS GROUPED */}
        <SwitchFilter />
      </FilterContainer>

      {/* FIFTH ROW //////////////////////////////////////////////////////// */}
      <FilterContainer>
        {/* VERTICAL VS HORIZONTAL */}
        <SwitchFilter />
      </FilterContainer>

      {/* SIXTH ROW //////////////////////////////////////////////////////// */}
      <FilterContainer>
        {/* ETC */}
        <CheckboxFilter />
      </FilterContainer>

      {/* SEVENT ROW /////////////////////////////////////////////////////// */}
      <FilterContainer />
    </ComponentBase>
  );
};

GraphStructurePanel.propTypes = propTypes;
GraphStructurePanel.defaultProps = defaultProps;

export default GraphStructurePanel;
