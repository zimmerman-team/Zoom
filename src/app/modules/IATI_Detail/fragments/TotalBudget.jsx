/* base */
import React from 'react';
import PropTypes from 'prop-types';
import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';
import { barChartMockData } from '__mocks__/barChartHorizontalMock';
import {
  FragmentHeader,
  FragmentVisualisation,
  zoomGreyZero,
} from 'components/theme/ThemeSheet';
import BarChartVertical from 'components/charts/barcharts/IatiDetailChart/BarChartVertical';

const propTypes = {
  data: PropTypes.array,
};
const defaultProps = {
  data: [],
};

const TotalBudget = props => (
  <ModuleFragment>
    <FragmentHeader>Total budget</FragmentHeader>
    <FragmentVisualisation>
      <BarChartVertical data={barChartMockData} />
    </FragmentVisualisation>
  </ModuleFragment>
);

TotalBudget.propTypes = propTypes;
TotalBudget.defaultProps = defaultProps;

export default TotalBudget;
