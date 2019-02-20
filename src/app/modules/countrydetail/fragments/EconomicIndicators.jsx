/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { countryDetailMockData } from '__mocks__/countryDetailMock';
import LineChart from 'components/charts/linechart/LineChart';
import { lineChartMockData } from '__mocks__/lineChartMock';
import ModuleFragment from 'components/Layout/ModuleFragment/ModuleFragment';
import { Element } from 'react-scroll/modules';

const ComponentBase = styled.div``;

const propTypes = {
  data: PropTypes.object
};
const defaultProps = {
  data: undefined
};

const EconomicIndicators = props => {
  return (
    <Element name="Economic indicators">
      <ModuleFragment
        title={countryDetailMockData.fragments[2].title}
        showInfoButton
      >
        <LineChart data={lineChartMockData} />
      </ModuleFragment>
    </Element>
  );
};

EconomicIndicators.propTypes = propTypes;
EconomicIndicators.defaultProps = defaultProps;

export default EconomicIndicators;
