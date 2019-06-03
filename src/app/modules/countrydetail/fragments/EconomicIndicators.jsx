/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { countryDetailMockData } from '__mocks__/countryDetailMock';
import ModuleFragment from 'components/Layout/ModuleFragment/ModuleFragment';
import { Element } from 'react-scroll/modules';
import LineChart2 from 'components/charts/recharts_linechart/LineChart';
import { ChartContainer } from 'modules/countrydetail/fragments/AidsEpidemic/AidsEpidemic.style';

const ComponentBase = styled.div``;

const propTypes = {
  chartKeys: PropTypes.arrayOf(PropTypes.shape({})),
  data: PropTypes.arrayOf(PropTypes.shape({}))
};
const defaultProps = {
  chartKeys: [],
  data: []
};

const EconomicIndicators = props => {
  return (
    <Element name="Economic indicators">
      <ModuleFragment
        title={countryDetailMockData.fragments[2].title}
        showInfoButton
      >
        <ChartContainer data-cy="economics-chart">
          <LineChart2
            chartKeys={props.chartKeys}
            data={props.data}
            margin={{ top: 30, right: 10, left: 30, bottom: 0 }}
          />
        </ChartContainer>
      </ModuleFragment>
    </Element>
  );
};

EconomicIndicators.propTypes = propTypes;
EconomicIndicators.defaultProps = defaultProps;

export default EconomicIndicators;
