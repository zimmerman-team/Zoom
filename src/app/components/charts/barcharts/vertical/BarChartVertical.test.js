import React from 'react';
import { shallow } from 'enzyme';
// Components
import { ResponsiveBar } from '@nivo/bar';
import { ComponentBase } from 'components/charts/barcharts/vertical/BarChartVertical.styles';
import BarChartVertical from './BarChartVertical';

const wrapper = shallow(<BarChartVertical />);

describe('<BarChartVertical />', () => {
  it('renders one <ComponentBase/> component', () => {
    expect(wrapper.find(ComponentBase)).toHaveLength(1);
  });
  it('renders one <ResponsiveBar/> component', () => {
    expect(wrapper.find(ResponsiveBar)).toHaveLength(1);
  });
});
