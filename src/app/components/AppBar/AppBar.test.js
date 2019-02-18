import React from 'react';
import { shallow } from 'enzyme';
import AppBar from './AppBar';

/* Components */
import { Box } from 'grommet';
import {
  AidsFondLogo,
  MenuButton,
  ModuleContainer
} from 'components/AppBar/AppBar.styles';

const wrapper = shallow(<AppBar />);

describe('<AppBar />', () => {
  it('renders one <ModuleContainer/> component', () => {
    expect(wrapper.find(ModuleContainer)).toHaveLength(1);
  });
  it('renders two <Box/> component', () => {
    expect(wrapper.find(Box)).toHaveLength(2);
  });
  it('renders one <MenuButton/> component', () => {
    expect(wrapper.find(MenuButton)).toHaveLength(1);
  });
  it('renders one <AidsFondLogo/> component', () => {
    expect(wrapper.find(AidsFondLogo)).toHaveLength(1);
  });
});
