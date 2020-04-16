import React from 'react';
import { shallow } from 'enzyme';

import TabNavigator from 'app/modules/visualizer/sort/sidebar/tabs/TabNavigator/TabNavigator';
import TabNavigatorItem from 'app/modules/visualizer/sort/sidebar/tabs/TabNavigator/common/TabNavigatorItem';
import data from 'app/modules/visualizer/sort/sidebar/VizSidebar.const';

const wrapper = shallow(<TabNavigator code="code" navItems={data.sections} />);

describe('<TabNavigator />', () => {
  it('renders one <TabNavigatorItem/> component', () => {
    expect(wrapper.find(TabNavigatorItem)).toHaveLength(6);
  });
});
