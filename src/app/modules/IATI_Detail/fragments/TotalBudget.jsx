/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';
import { barChartMockData } from '__mocks__/barChartHorizontalMock';
import {
  FragmentHeader,
  FragmentVisualisation,
  zoomGreyZero,
} from 'components/theme/ThemeSheet';
import BarChartHorizontal from 'components/charts/barcharts/IatiDetailChart/BarChartHorizontal';

const ComponentBase = styled.div``;

const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: undefined,
};

const TotalBudget = props => (
  <ModuleFragment>
    <FragmentHeader>Total budget</FragmentHeader>
    <FragmentVisualisation>
      <BarChartHorizontal data={barChartMockData} />
    </FragmentVisualisation>
  </ModuleFragment>
);

TotalBudget.propTypes = propTypes;
TotalBudget.defaultProps = defaultProps;

export default TotalBudget;
