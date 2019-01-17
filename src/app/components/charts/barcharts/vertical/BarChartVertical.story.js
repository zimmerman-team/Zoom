import React from 'react';
import { storiesOf } from '@storybook/react';
import BarChartVertical from './BarChartVertical';
import { IATIDetailBarChartMockData } from '__mocks__/barChartVerticalMock';

storiesOf('Charts', module).add('Bar Chart Vertical', () => (
  <BarChartVertical data={IATIDetailBarChartMockData} keys={['Budget', 'Spent']} />
));
