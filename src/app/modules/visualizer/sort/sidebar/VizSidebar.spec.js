import React from 'react';
import { shallow } from 'enzyme';

import VizSidebar from 'app/modules/visualizer/sort/sidebar/VizSidebar';
import TabNavigator from 'app/modules/visualizer/sort/sidebar/tabs/TabNavigator/TabNavigator';
import TabContent from 'app/modules/visualizer/sort/sidebar/tabs/TabContent/TabContent';

const wrapper = shallow(<VizSidebar />);

describe('<VizSidebar />', () => {
  it('renders one <TabNavigator/> component', () => {
    expect(wrapper.find(TabNavigator)).toHaveLength(1);
  });
  it('renders one <TabContent/> component', () => {
    expect(wrapper.find(TabContent)).toHaveLength(1);
  });
});
