import React from 'react';
import { shallow } from 'enzyme';
import TreeMap from 'components/charts/treemap/TreeMap';
// Components
import { ResponsiveTreeMapHtml } from '@nivo/treemap';
import { ComponentBase } from 'components/charts/treemap/TreeMap.styles';

const wrapper = shallow(<TreeMap />);

describe('<TreeMap />', () => {
  it('renders one <ComponentBase/> component', () => {
    expect(wrapper.find(ComponentBase)).toHaveLength(1);
  });
  it('renders one <ResponsiveTreeMapHtml/> component', () => {
    expect(wrapper.find(ResponsiveTreeMapHtml)).toHaveLength(1);
  });
});
