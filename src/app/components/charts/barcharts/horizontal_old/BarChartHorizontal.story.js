import React from 'react';
import { storiesOf } from '@storybook/react';
import BarChartHorizontal from './BarChartHorizontal';
import { barChartMockData } from '__mocks__/barChartVerticalMock';

storiesOf('Charts|Components/', module).add('Nivo Bar Chart Horizontal', () => (
  <BarChartHorizontal data={barChartMockData} />
));
