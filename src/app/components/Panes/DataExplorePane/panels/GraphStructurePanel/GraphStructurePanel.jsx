/* base */
import React from 'react';
import styled from 'styled-components';
import SimpleSelect from 'components/Panes/DataExplorePane/panels/GraphStructurePanel/sort/SimpleSelect/SimpleSelect';
import SimpleSwitch from 'components/Panes/DataExplorePane/panels/GraphStructurePanel/sort/SimpleSwitch/SimpleSwitch';

import SimpleCheckbox from 'components/Checkbox/CheckBox';
import ColorSelect from 'components/Panes/DataExplorePane/panels/GraphStructurePanel/sort/ColorSelect/ColorSelect';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  overflow: hidden;
  background-color: #efefef;
  display: flex;
  flex-direction: column;
  padding: 18px;
  padding-top: 8px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  margin-bottom: 10px;
`;

const propTypes = {};
const defaultProps = {};

class GraphStructurePanel extends React.Component {
  state = {
    checked: true
  };

  render() {
    return (
      <ComponentBase>
        {/* FIRST ROW //////////////////////////////////////////////////////// */}
        <FilterContainer>
          {/* LEFT Y-AXIS */}
          <SimpleSelect
            label="Left Y-axis"
            onChange={() => console.log('changed')}
          />
          {/* RIGHT Y-AXIS */}
          <SimpleSelect label="Right Y-axis" />
        </FilterContainer>

        {/* SECOND ROW /////////////////////////////////////////////////////// */}
        <FilterContainer>
          {/* X-AXIS */}
          <SimpleSelect label="X-axis" />
        </FilterContainer>

        {/* THIRD ROW //////////////////////////////////////////////////////// */}
        <FilterContainer>
          {/* AGGREGATE BY */}
          <SimpleSelect label="Aggregate by" />
          {/* RANK BY */}
          <SimpleSelect label="Rank by" />
        </FilterContainer>

        {/* FOURTH ROW /////////////////////////////////////////////////////// */}
        <FilterContainer>
          {/* STACKED VS GROUPED */}
          <SimpleSwitch option1="Stacked" option2="Grouped" />
        </FilterContainer>

        {/* FIFTH ROW //////////////////////////////////////////////////////// */}
        <FilterContainer>
          {/* VERTICAL VS HORIZONTAL */}
          <SimpleSwitch option1="Vertical" option2="Horizontal" />
        </FilterContainer>

        {/* SIXTH ROW //////////////////////////////////////////////////////// */}

        {/* SEVENT ROW /////////////////////////////////////////////////////// */}

        <FilterContainer>
          {/* X-AXIS */}
          <ColorSelect label="Color palet" />
        </FilterContainer>
      </ComponentBase>
    );
  }
}

GraphStructurePanel.propTypes = propTypes;
GraphStructurePanel.defaultProps = defaultProps;

export default GraphStructurePanel;
