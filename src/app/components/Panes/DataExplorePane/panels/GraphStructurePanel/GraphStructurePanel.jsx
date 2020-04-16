/* base */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
/* components */
import ColorSelect from 'app/components/Panes/DataExplorePane/panels/GraphStructurePanel/sort/ColorSelect/ColorSelect';
import SimpleSelect from 'app/components/Panes/DataExplorePane/panels/GraphStructurePanel/sort/SimpleSelect/SimpleSelect';
import SimpleSwitch from 'app/components/SimpleSwitch/SimpleSwitch';
/* consts */
import chartTypes from 'app/__consts__/ChartConst';
import graphKeys from 'app/__consts__/GraphStructKeyConst';
import { aggrOptions, rankOptions } from 'app/__consts__/GraphStructOptionConsts';

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
        {this.props.chartType === chartTypes.barChart && (
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
              selectKey={graphKeys.rankBy}
              defValue={this.props.specOptions[graphKeys.rankBy]}
              onChange={this.props.saveGraphOption}
              label="Rank by"
              options={rankOptions}
            />
          </FilterContainer>
        )}

        {/* SECOND ROW /////////////////////////////////////////////////////// */}
        {this.props.chartType === chartTypes.barChart && (
          <FilterContainer>
            {/* STACKED VS GROUPED */}

            <SimpleSwitch
              defaultCheck={this.props.specOptions[graphKeys.grouped]}
              selectKey={graphKeys.grouped}
              onSwitch={this.props.saveGraphOption}
              option1="Stacked"
              option2="Grouped"
            />
          </FilterContainer>
        )}

        {/* THIRD ROW //////////////////////////////////////////////////////// */}
        {this.props.chartType === chartTypes.barChart && (
          <FilterContainer>
            {/* VERTICAL VS HORIZONTAL */}

            <SimpleSwitch
              defaultCheck={this.props.specOptions[graphKeys.horizont]}
              selectKey={graphKeys.horizont}
              onSwitch={this.props.saveGraphOption}
              option1="Vertical"
              option2="Horizontal"
            />
          </FilterContainer>
        )}

        {/* FOURTH ROW //////////////////////////////////////////////////////// */}
        {this.props.chartType === chartTypes.donutChart && (
          <FilterContainer>
            {/* Aggregated by country disaggregated by country */}

            <SimpleSwitch
              defaultCheck={this.props.specOptions[graphKeys.aggrCountry]}
              selectKey={graphKeys.aggrCountry}
              onSwitch={this.props.saveGraphOption}
              option1="Split Countries"
              option2="Aggregate Countries"
            />
          </FilterContainer>
        )}

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
