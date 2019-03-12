import React from 'react';
import { shallow } from 'enzyme';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import VisualizerModule from 'modules/visualizer/VisualizerModule';

import VizSidebar from 'modules/visualizer/sort/sidebar/VizSidebar';
import VizContainer from 'modules/visualizer/sort/container/VizContainer';

const wrapper = shallow(<VisualizerModule />);

describe('<VisualizerModule />', () => {
  it('renders one <VizContainer/> component', () => {
    expect(wrapper.find(VizContainer)).toHaveLength(1);
  });
  it('renders one <VizSidebar/> component', () => {
    expect(wrapper.find(VizSidebar)).toHaveLength(1);
  });
});
