import React from 'react';
import { shallow } from 'enzyme';
// Components
import ModuleFragment from 'components/Layout/ModuleFragment/ModuleFragment';
import BarChartVertical from 'components/charts/barcharts/vertical/BarChartVertical';
import TotalBudget from './TotalBudget';

const wrapper = shallow(<TotalBudget />);

describe('<TotalBudget />', () => {
  it('renders one <ModuleFragment/> component', () => {
    expect(wrapper.find(ModuleFragment)).toHaveLength(1);
  });
  it('renders one <BarChartVertical/> component', () => {
    expect(wrapper.find(BarChartVertical)).toHaveLength(1);
  });
});
