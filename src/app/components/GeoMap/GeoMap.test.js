/* base */
import React from 'react';
import { shallow } from 'enzyme';
import { GeoMap } from 'app/components/GeoMap/GeoMap';
/* components */
import MapGL from 'react-map-gl';
import CustomYearSelector from 'app/components/CustomYearSelector/CustomYearSelector';
import MapControls from 'app/components/GeoMap/components/MapControls/MapControls';
import Fullscreen from 'react-full-screen';

import {
  ControlsContainer,
  LegendContainer,
  MapContainer
} from './GeoMap.style';
import { YearContainer } from 'app/components/CustomYearSelector/CustomYearSelector.style';

const wrapper = shallow(<GeoMap />);

describe('<GeoMap />', () => {
  it('renders one <MapContainer/> component', () => {
    expect(wrapper.find(MapContainer)).toHaveLength(1);
  });
  it('renders one <Fullscreen/> component', () => {
    expect(wrapper.find(Fullscreen)).toHaveLength(1);
  });
  it('renders one <ControlsContainer/> component', () => {
    expect(wrapper.find(ControlsContainer)).toHaveLength(1);
  });
  it('renders one <MapControls/> component', () => {
    expect(wrapper.find(MapControls)).toHaveLength(1);
  });
  it('renders one <MapGL/> component', () => {
    expect(wrapper.find(MapGL)).toHaveLength(1);
  });
  it('renders one <LegendContainer/> component', () => {
    expect(wrapper.find(LegendContainer)).toHaveLength(1);
  });
  it('renders one <YearContainer/> component', () => {
    expect(wrapper.find(YearContainer)).toHaveLength(1);
  });
  it('renders one <CustomYearSelector/> component', () => {
    expect(wrapper.find(CustomYearSelector)).toHaveLength(1);
  });
});
