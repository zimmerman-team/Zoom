import React from 'react';
import { shallow } from 'enzyme';

import BaseTab from 'app/modules/visualizer/sort/sidebar/tabs/TabContent/sort/common/BaseTab';

import DownloadTab from 'app/modules/visualizer/sort/sidebar/tabs/TabContent/sort/DownloadTab';

const wrapper = shallow(<DownloadTab />);

describe('<DownloadTab />', () => {
  it('renders one <BaseTab/> component', () => {
    expect(wrapper.find(BaseTab)).toHaveLength(1);
  });
});
