/* base */
import React from 'react';
import { shallow } from 'enzyme';
import DashboardModule from 'modules/dashboard/DashboardModule';

/* components */
import {
  ModuleContainer,
  PageHeading,
  HeaderIcon,
  HeaderGreeting,
  SearchBox,
  ViewContainer
} from 'modules/dashboard/DashboardModule.styles';
import SvgIconUser from 'assets/icons/IconUser';
import TabContainer from 'modules/dashboard/fragments/TabContainer/TabContainer';

/* consts */
import tabs from '__consts__/DashboardTabsConsts';

const wrapper = shallow(<DashboardModule tabs={tabs} users={[]} teams={[]} />);

describe('<DashboardModule />', () => {
  it('renders one <ModuleContainer/> component', () => {
    expect(wrapper.find(ModuleContainer)).toHaveLength(1);
  });
  it('renders one <PageHeading/> component', () => {
    expect(wrapper.find(PageHeading)).toHaveLength(1);
  });
  it('renders one <HeaderIcon/> component', () => {
    expect(wrapper.find(HeaderIcon)).toHaveLength(1);
  });
  it('renders one <SvgIconUser/> component', () => {
    expect(wrapper.find(SvgIconUser)).toHaveLength(1);
  });
  it('renders one <HeaderGreeting/> component', () => {
    expect(wrapper.find(HeaderGreeting)).toHaveLength(1);
  });
  it('renders one <SearchBox/> component', () => {
    expect(wrapper.find(SearchBox)).toHaveLength(1);
  });
  it('renders one <TabContainer/> component', () => {
    expect(wrapper.find(TabContainer)).toHaveLength(1);
  });
  it('renders one <ViewContainer/> component', () => {
    expect(wrapper.find(ViewContainer)).toHaveLength(1);
  });
});
