/* base */
import React from 'react';
import { shallow } from 'enzyme';
import UsersTabView from 'app/modules/dashboard/fragments/UsersTabView/UsersTabView';
/* components */
import SvgIconPlus from 'app/assets/icons/IconPlus';
import SvgIconSort from 'app/assets/icons/IconSort';
import { NoItems } from 'app/modules/dashboard/DashboardModule.styles';
import SortbyDialog from 'app/components/Dialog/SortbyDialog/SortbyDialog';
import { AddUserLink, ControlsRow, ViewContainer } from './UsersTabView.styles';
import GridList from '../GridList/GridList';

/* consts */
const users = [
  { id: 'mock_id', title: 'mock title', info: { date: '01/01/01' } }
];
const wrapper = shallow(<UsersTabView users={users} />);
const wrapper2 = shallow(<UsersTabView users={[]} />);

describe('<UsersTabView />', () => {
  it('renders one <ViewContainer/> component', () => {
    expect(wrapper.find(ViewContainer)).toHaveLength(1);
  });
  it('renders one <ControlsRow/> component', () => {
    expect(wrapper.find(ControlsRow)).toHaveLength(1);
  });
  it('renders one <AddUserLink/> component', () => {
    expect(wrapper.find(AddUserLink)).toHaveLength(1);
  });
  it('renders one <SvgIconPlus/> component', () => {
    expect(wrapper.find(SvgIconPlus)).toHaveLength(1);
  });
  it('renders one <SvgIconSort/> component', () => {
    expect(wrapper.find(SvgIconSort)).toHaveLength(1);
  });
  it('renders one <SortbyDialog/> component', () => {
    expect(wrapper.find(SortbyDialog)).toHaveLength(1);
  });
  it('renders one <GridList/> component', () => {
    expect(wrapper.find(GridList)).toHaveLength(1);
  });
  it('renders one <NoItems/> component', () => {
    expect(wrapper2.find(NoItems)).toHaveLength(1);
  });
});
