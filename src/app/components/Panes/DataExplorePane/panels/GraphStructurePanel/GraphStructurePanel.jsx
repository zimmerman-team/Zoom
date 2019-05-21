/* base */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
/* components */
import ColorSelect from 'components/Panes/DataExplorePane/panels/GraphStructurePanel/sort/ColorSelect/ColorSelect';
import SimpleSelect from 'components/Panes/DataExplorePane/panels/GraphStructurePanel/sort/SimpleSelect/SimpleSelect';
import SimpleSwitch from 'components/SimpleSwitch/SimpleSwitch';
/* consts */
import chartTypes from '__consts__/ChartConst';
import graphKeys from '__consts__/GraphStructKeyConst';
import { aggrOptions, rankOptions } from '__consts__/GraphStructOptionConsts';

/**
 *
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

const propTypes = {
  specOptions: PropTypes.shape({}),
  chartType: PropTypes.string,
  saveGraphOption: PropTypes.func
};
const defaultProps = {
  specOptions: {},
  chartType: chartTypes.geoMap,
  saveGraphOption: null
};

class GraphStructurePanel extends React.Component {
  state = {
    checked: true
  };

  render() {
    return (
      <ComponentBase>
        {/* FIRST ROW //////////////////////////////////////////////////////// */}
        <FilterContainer>
          {/* AGGREGATE BY */}
          <SimpleSelect
            label="Aggregate by"
            options={aggrOptions}
            selectKey={graphKeys.aggregate}
            defValue={this.props.specOptions[graphKeys.aggregate]}
            onChange={this.props.saveGraphOption}
          />
          {/* RANK BY */}
          <SimpleSelect
            disabled={this.props.chartType === chartTypes.lineChart}
            selectKey={graphKeys.rankBy}
            defValue={this.props.specOptions[graphKeys.rankBy]}
            onChange={this.props.saveGraphOption}
            label="Rank by"
            options={rankOptions}
          />
        </FilterContainer>

        {/* SECOND ROW /////////////////////////////////////////////////////// */}
        <FilterContainer>
          {/* STACKED VS GROUPED */}
          <SimpleSwitch
            disabled={this.props.chartType === chartTypes.lineChart}
            defaultCheck={this.props.specOptions[graphKeys.grouped]}
            selectKey={graphKeys.grouped}
            onSwitch={this.props.saveGraphOption}
            option1="Stacked"
            option2="Grouped"
          />
        </FilterContainer>

        {/* THIRD ROW //////////////////////////////////////////////////////// */}
        <FilterContainer>
          {/* VERTICAL VS HORIZONTAL */}
          <SimpleSwitch
            disabled={this.props.chartType === chartTypes.lineChart}
            defaultCheck={this.props.specOptions[graphKeys.horizont]}
            selectKey={graphKeys.horizont}
            onSwitch={this.props.saveGraphOption}
            option1="Vertical"
            option2="Horizontal"
          />
        </FilterContainer>

        <FilterContainer>
          {/* X-AXIS */}
          <ColorSelect
            label="Color palet"
            selectKey={graphKeys.colorPallet}
            defValue={this.props.specOptions[graphKeys.colorPallet]}
            onChange={this.props.saveGraphOption}
          />
        </FilterContainer>
      </ComponentBase>
    );
  }
}

GraphStructurePanel.propTypes = propTypes;
GraphStructurePanel.defaultProps = defaultProps;

export default GraphStructurePanel;
