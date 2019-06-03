import React from 'react';
import { shallow } from 'enzyme';
import LineChart from './LineChart';
// Components
import { ResponsiveLine } from '@nivo/line';
import { ComponentBase } from 'components/charts/nivo_linechart/LineChart.styles';

const wrapper = shallow(<LineChart />);

describe('<LineChart />', () => {
  it('renders one <ComponentBase/> component', () => {
    expect(wrapper.find(ComponentBase)).toHaveLength(1);
  });
  it('renders one <ResponsiveLine/> component', () => {
    expect(wrapper.find(ResponsiveLine)).toHaveLength(1);
  });
});
