import React from 'react';
import { shallow } from 'enzyme';

/* Components */
import {
  SidebarHeader,
  SideBarLayer,
  SidebarNavList,
  SidebarNavListContainer,
  SidebarNavListItem
} from 'components/SideBar/SideBar.styles';
import { Box } from 'grommet';
import LoginForm from './comps/LoginForm/LoginForm';
import SideBar from './SideBar';

const wrapper = shallow(<SideBar open />);

describe('<SideBar />', () => {
  it('renders one <SideBarLayer/> component', () => {
    expect(wrapper.find(SideBarLayer)).toHaveLength(1);
  });
  it('renders one <Box/> component', () => {
    expect(wrapper.find(Box)).toHaveLength(1);
  });
  it('renders one <SidebarHeader/> component', () => {
    expect(wrapper.find(SidebarHeader)).toHaveLength(1);
  });
  it('renders one <SidebarNavListContainer/> component', () => {
    expect(wrapper.find(SidebarNavListContainer)).toHaveLength(1);
  });
  it('renders one <SidebarNavList/> component', () => {
    expect(wrapper.find(SidebarNavList)).toHaveLength(1);
  });
  it('renders four <SidebarNavListItem/> component', () => {
    expect(wrapper.find(SidebarNavListItem)).toHaveLength(5);
  });
  it('renders one <LoginForm/> component', () => {
    expect(wrapper.find(LoginForm)).toHaveLength(1);
  });
});
