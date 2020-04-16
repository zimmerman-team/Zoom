import React from 'react';
import { shallow } from 'enzyme';
import AidsEpidemic from './AidsEpidemic';
// Components
import ModuleFragment from 'app/components/Layout/ModuleFragment/ModuleFragment';
import LineChart from 'app/components/charts/recharts_linechart/LineChart';

const wrapper = shallow(<AidsEpidemic />);

describe('<AidsEpidemic />', () => {
  it('renders one <ModuleFragment/> component', () => {
    expect(wrapper.find(ModuleFragment)).toHaveLength(1);
  });
  it('renders one <LineChart/> component', () => {
    expect(wrapper.find(LineChart)).toHaveLength(1);
  });
});
