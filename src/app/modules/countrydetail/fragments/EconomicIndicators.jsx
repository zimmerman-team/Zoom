/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  FragmentHeader,
  FragmentVisualisation,
} from '../../../components/theme/ThemeSheet';
import countryDetailMockData from '../../../__mocks__/countryDetailMock';
import LineChart from '../../../components/charts/linechart/LineChart';
import { lineChartMockData } from '../../../__mocks__/lineChartMock';
import ModuleFragment from '../../../components/layout/ModuleFragment/ModuleFragment';

const ComponentBase = styled.div``;

const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: undefined,
};

const EconomicIndicators = props => {
  return (
    <ModuleFragment>
      <FragmentHeader>
        {countryDetailMockData.fragments[2].title}
      </FragmentHeader>
      <FragmentVisualisation>
        <LineChart data={lineChartMockData} />
      </FragmentVisualisation>
    </ModuleFragment>
  );
};

EconomicIndicators.propTypes = propTypes;
EconomicIndicators.defaultProps = defaultProps;

export default EconomicIndicators;
