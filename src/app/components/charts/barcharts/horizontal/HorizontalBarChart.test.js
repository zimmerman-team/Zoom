import React from 'react';
import { shallow } from 'enzyme';
import HorizontalBarChart from 'app/components/charts/barcharts/horizontal/HorizontalBarChart';
/* components */
import {
  Bar,
  BarContainer,
  BarName,
  BarsContainer,
  Legend,
  LegendColor,
  LegendContainer,
  LegendText,
  Value
} from 'app/components/charts/barcharts/horizontal/HorizontalBarChart.styles';
/* mock */
import barChartMockData from 'app/__mocks__/barChartHorizontalMock';

const wrapper = shallow(
  <HorizontalBarChart data={barChartMockData} countryName="Kenya" />
);

describe('<HorizontalBarChart />', () => {
  it('renders one <BarsContainer/> component', () => {
    expect(wrapper.find(BarsContainer)).toHaveLength(1);
  });
  it('renders one <BarName/> component', () => {
    expect(wrapper.find(BarName)).toHaveLength(7);
  });
  it('renders one <BarContainer/> component', () => {
    expect(wrapper.find(BarContainer)).toHaveLength(7);
  });
  it('renders one <Bar/> component', () => {
    expect(wrapper.find(Bar)).toHaveLength(7);
  });
  it('renders one <Value/> component', () => {
    expect(wrapper.find(Value)).toHaveLength(7);
  });
  it('renders one <LegendContainer/> component', () => {
    expect(wrapper.find(LegendContainer)).toHaveLength(1);
  });
  it('renders one <Legend/> component', () => {
    expect(wrapper.find(Legend)).toHaveLength(1);
  });
  it('renders one <LegendColor/> component', () => {
    expect(wrapper.find(LegendColor)).toHaveLength(1);
  });
  it('renders one <LegendText/> component', () => {
    expect(wrapper.find(LegendText)).toHaveLength(1);
  });
});
