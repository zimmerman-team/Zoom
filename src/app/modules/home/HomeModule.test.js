/* base */
import React from 'react';
import { shallow } from 'enzyme';
import { HomeModule } from 'modules/home/HomeModule';
/* components */
import GeoMap from 'components/GeoMap/GeoMap';
import {
  ControlPanelContainer,
  ModuleContainer
} from 'modules/home/HomeModule.styles';
import ExplorePanelMediator from 'mediators/ComponentMediators/PaneMediators/ExplorePanelMediator/ExplorePanelMediator';

const wrapper = shallow(<HomeModule dataPaneOpen />);

describe('<LoginForm />', () => {
  it('renders one <ModuleContainer/> component', () => {
    expect(wrapper.find(ModuleContainer)).toHaveLength(1);
  });
  it('renders one <GeoMap/> component', () => {
    expect(wrapper.find(GeoMap)).toHaveLength(1);
  });
  it('renders one <ControlPanelContainer/> component', () => {
    expect(wrapper.find(ControlPanelContainer)).toHaveLength(1);
  });
  it('renders one <ExplorePanelMediator/> component', () => {
    expect(wrapper.find(ExplorePanelMediator)).toHaveLength(1);
  });
});
