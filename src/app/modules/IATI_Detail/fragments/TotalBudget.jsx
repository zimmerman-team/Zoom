/* base */
import React from 'react';
import PropTypes from 'prop-types';
import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';
import { IATIDetailBarChartMockData } from '__mocks__/barChartVerticalMock';
import {
  FragmentHeader,
  FragmentVisualisation,
  zoomGreyZero,
} from 'components/theme/ThemeSheet';
import BarChartVertical from 'components/charts/barcharts/vertical/BarChartVertical';

const propTypes = {
  data: PropTypes.array,
};
const defaultProps = {
  data: [],
};

const TotalBudget = props => (
  <ModuleFragment title="Total budget" showInfoButton>
    <BarChartVertical data={IATIDetailBarChartMockData} />
  </ModuleFragment>
);

TotalBudget.propTypes = propTypes;
TotalBudget.defaultProps = defaultProps;

export default TotalBudget;
