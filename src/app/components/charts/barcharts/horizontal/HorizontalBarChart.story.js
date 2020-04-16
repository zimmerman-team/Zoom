import React from 'react';
import { storiesOf } from '@storybook/react';
import HorizontalBarChart from 'app/components/charts/barcharts/horizontal/HorizontalBarChart';
import barChartMockData from 'app/__mocks__/barChartHorizontalMock';

storiesOf('Charts|Components/', module).add(
  'Custom Bar Chart Horizontal',
  () => <HorizontalBarChart data={barChartMockData} countryName="Kenya" />
);
