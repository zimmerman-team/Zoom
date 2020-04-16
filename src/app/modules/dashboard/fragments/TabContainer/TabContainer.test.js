/* base */
import React from 'react';
import { shallow } from 'enzyme';
import TabContainer from 'app/modules/dashboard/fragments/TabContainer/TabContainer';
/* components */
import {
  CenterTabs,
  Container,
  Tab,
  TabBadge,
  TabText
} from 'app/modules/dashboard/fragments/TabContainer/TabContainer.styles';
/* consts */
import tabs from 'app/__consts__/DashboardTabsConsts';

const wrapper = shallow(
  <TabContainer
    tabs={tabs}
    tabCounts={{
      charts: 0,
      'data-sets': 0,
      users: 0,
      teams: 0,
      trash: 0
    }}
  />
);

describe('<TabContainer />', () => {
  it('renders one <Container/> component', () => {
    expect(wrapper.find(Container)).toHaveLength(1);
  });
  it('renders one <CenterTabs/> component', () => {
    expect(wrapper.find(CenterTabs)).toHaveLength(1);
  });
  it('renders one <Tab/> component', () => {
    expect(wrapper.find(Tab)).toHaveLength(6);
  });
  it('renders one <TabBadge/> component', () => {
    expect(wrapper.find(TabBadge)).toHaveLength(6);
  });
  it('renders one <TabText/> component', () => {
    expect(wrapper.find(TabText)).toHaveLength(6);
  });
});
