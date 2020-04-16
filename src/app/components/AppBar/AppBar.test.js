import React from 'react';
import { shallow } from 'enzyme';
import { AppBar } from 'app/components/AppBar/AppBar';
/* components */
import { Box } from 'grommet/components/Box';
import {
  AidsFondLogo,
  ComponentBase,
  MenuButton,
  PaneButton,
  PaneButtonText
} from 'app/components/AppBar/AppBar.styles';

const wrapper = shallow(<AppBar location={{ pathname: '/home' }} />);

describe('<AppBar />', () => {
  it('renders one <ComponentBase/> component', () => {
    expect(wrapper.find(ComponentBase)).toHaveLength(1);
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
  it('renders one <PaneButton/> component', () => {
    expect(wrapper.find(PaneButton)).toHaveLength(1);
  });
  it('renders one <PaneButtonText/> component', () => {
    expect(wrapper.find(PaneButtonText)).toHaveLength(1);
  });
});
