import React from 'react';
import { shallow } from 'enzyme';

import BaseTab from 'modules/visualizer/sort/sidebar/tabs/TabContent/sort/common/BaseTab';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import VisibilityTab from 'modules/visualizer/sort/sidebar/tabs/TabContent/sort/VisibilityTab';

const wrapper = shallow(<VisibilityTab />);

describe('<TabNavigator />', () => {
  it('renders one <BaseTab/> component', () => {
    expect(wrapper.find(BaseTab)).toHaveLength(1);
  });

  it('renders one <FormControl/> component', () => {
    expect(wrapper.find(FormControl)).toHaveLength(1);
  });

  it('renders one <FormGroup/> component', () => {
    expect(wrapper.find(FormGroup)).toHaveLength(1);
  });
});
