import React from 'react';
import { shallow } from 'enzyme';

// Components
import GeoMap, { ZoomControl } from './GeoMap';

const wrapper = shallow(<GeoMap />);

describe('<GeoMap />', () => {
  it('renders one <ZoomControl/> component', () => {
    expect(wrapper.find(ZoomControl)).toHaveLength(1);
  });
});
