import React from 'react';
import { shallow } from 'enzyme';

import BaseTab from 'modules/visualizer/sort/sidebar/tabs/TabContent/sort/common/BaseTab';
import EditorTab from 'modules/visualizer/sort/sidebar/tabs/TabContent/sort/EditorTab';

const wrapper = shallow(<EditorTab />);

describe('<EditorTab />', () => {
  it('renders one <BaseTab/> component', () => {
    expect(wrapper.find(BaseTab)).toHaveLength(1);
  });
});
