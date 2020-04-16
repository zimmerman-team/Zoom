import React from 'react';
import { shallow } from 'enzyme';

import ContextPreview from 'app/components/ContextPreview/ContextPreview';
import VizContainer from 'app/modules/visualizer/sort/container/VizContainer';
import GeoMap from 'app/components/GeoMap/GeoMap';

const wrapper = shallow(<VizContainer />);

describe('<VizContainer />', () => {
  it('renders one <ContextPreview/> component', () => {
    expect(wrapper.find(ContextPreview)).toHaveLength(1);
  });
  it('renders one <GeoMap/> component', () => {
    expect(wrapper.find(GeoMap)).toHaveLength(1);
  });
});
cd;
