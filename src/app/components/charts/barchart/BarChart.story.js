import React from 'react';
import { storiesOf } from '@storybook/react';
import BarChart from './BarChart';
import { lineChartMockData } from '../../../__mocks__/lineChartMock';

storiesOf('Components', module).add('BarChart', () => (
  <BarChart data={lineChartMockData} />
));
