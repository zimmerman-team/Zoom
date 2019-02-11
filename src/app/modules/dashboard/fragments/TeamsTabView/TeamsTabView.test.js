/* base */
import React from 'react';
import { shallow } from 'enzyme';
import TeamsTabView from 'modules/dashboard/fragments/TeamsTabView/TeamsTabView';

/* components */
import SvgIconPlus from 'assets/icons/IconPlus';
import SvgIconSort from 'assets/icons/IconSort';
import { NoItems } from 'modules/dashboard/DashboardModule.styles';
import SortbyDialog from 'components/Dialog/SortbyDialog/SortbyDialog';
import { ViewContainer, AddTeamLink, ControlsRow } from './TeamsTabView.styles';
import GridList from '../GridList/GridList';

/* consts */
const teams = [
  { id: 'mock_id', title: 'mock title', info: { date: '01/01/01' } }
];
const wrapper = shallow(<TeamsTabView teams={teams} />);
const wrapper2 = shallow(<TeamsTabView teams={[]} />);

describe('<TeamsTabView />', () => {
  it('renders one <ViewContainer/> component', () => {
    expect(wrapper.find(ViewContainer)).toHaveLength(1);
  });
  it('renders one <ControlsRow/> component', () => {
    expect(wrapper.find(ControlsRow)).toHaveLength(1);
  });
  it('renders one <AddTeamLink/> component', () => {
    expect(wrapper.find(AddTeamLink)).toHaveLength(1);
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
