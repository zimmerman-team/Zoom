import React from 'react';
import { shallow } from 'enzyme';
import SortbyDialog from 'components/Dialog/SortbyDialog/SortbyDialog';
// Components
import { ComponentBase, OptionRow } from './SortbyDialog.styles';

const wrapper = shallow(<SortbyDialog open />);

describe('<SortbyDialog />', () => {
  it('renders one <ComponentBase/> component', () => {
    expect(wrapper.find(ComponentBase)).toHaveLength(1);
  });
  it('renders three <CreateTeamForm/> component', () => {
    expect(wrapper.find(OptionRow)).toHaveLength(3);
  });
});
