import React from 'react';
import { shallow } from 'enzyme';

// Components
import { MapContainer } from './GeoMap.styles';
import GeoMap from './GeoMap';

const wrapper = shallow(<GeoMap />);

describe('<GeoMap />', () => {
  it('renders one <MapContainer/> component', () => {
    expect(wrapper.find(MapContainer)).toHaveLength(1);
  });
});
