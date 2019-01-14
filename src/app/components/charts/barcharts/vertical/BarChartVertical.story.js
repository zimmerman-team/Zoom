import React from 'react';
import { storiesOf } from '@storybook/react';
import BarChartVertical from './BarChartVertical';
import { barChartMockData } from '__mocks__/barChartVerticalMock';

storiesOf('Charts', module).add('Bar Chart Vertical', () => (
  <BarChartVertical data={barChartMockData} />
));
