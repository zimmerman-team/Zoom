import React from 'react';
import { shallow } from 'enzyme';
import VisualizerModule from 'app/modules/visualizer/VisualizerModule';

import VizSidebar from 'app/modules/visualizer/sort/sidebar/VizSidebar';
import VizContainer from 'app/modules/visualizer/sort/container/VizContainer';

const wrapper = shallow(<VisualizerModule />);

describe('<VisualizerModule />', () => {
  it('renders one <VizContainer/> component', () => {
    expect(wrapper.find(VizContainer)).toHaveLength(1);
  });
  it('renders one <VizSidebar/> component', () => {
    expect(wrapper.find(VizSidebar)).toHaveLength(1);
  });
});
