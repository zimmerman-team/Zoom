import React from 'react';
import { storiesOf } from '@storybook/react';
import BarChart from './BarChart';
import { barChartMockData } from '../../../__mocks__/barChartMock';

storiesOf('Charts', module).add('BarChart', () => (
  <BarChart data={barChartMockData} />
));
