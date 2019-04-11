import React from 'react';
import { shallow } from 'enzyme';

import ZoomButton from 'components/ZoomButton/ZoomButton';

import BaseTab from 'modules/visualizer/sort/sidebar/tabs/TabContent/sort/common/BaseTab';
import DuplicatorTab from 'modules/visualizer/sort/sidebar/tabs/TabContent/sort/DuplicatorTab';

const wrapper = shallow(<DuplicatorTab />);

describe('<DuplicatorTab />', () => {
  it('renders one <BaseTab/> component', () => {
    expect(wrapper.find(BaseTab)).toHaveLength(1);
  });

  it('renders one <ZoomButton/> component', () => {
    expect(wrapper.find(ZoomButton)).toHaveLength(1);
  });
});
