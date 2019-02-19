import React from 'react';
import { shallow } from 'enzyme';
import LineChart from 'components/charts/recharts_linechart/LineChart';

/* components */
import {
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import mock from 'mediators/ModuleMediators/CountryDetailMediator/CountryDetailMediator.mock';

const wrapper = shallow(<LineChart indicators={mock.lineChartInd} />);

describe('<LineChart />', () => {
  it('renders one <ResponsiveContainer/> component', () => {
    expect(wrapper.find(ResponsiveContainer)).toHaveLength(1);
  });
  it('renders one <ReLineChart/> component', () => {
    expect(wrapper.find(ReLineChart)).toHaveLength(1);
  });
  it('renders one <XAxis/> component', () => {
    expect(wrapper.find(XAxis)).toHaveLength(1);
  });
  it('renders one <YAxis/> component', () => {
    expect(wrapper.find(YAxis)).toHaveLength(2);
  });
  it('renders one <CartesianGrid/> component', () => {
    expect(wrapper.find(CartesianGrid)).toHaveLength(1);
  });
  it('renders one <Tooltip/> component', () => {
    expect(wrapper.find(Tooltip)).toHaveLength(1);
  });
  it('renders one <Line/> component', () => {
    expect(wrapper.find(Line)).toHaveLength(5);
  });
});
