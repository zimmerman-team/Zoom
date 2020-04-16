import React from 'react';
import { shallow } from 'enzyme';
import ProjectList from './ProjectList';
// Components
import { Box } from 'grommet/components/Box';
import {
  Label,
  List,
  ListItem,
  PropertyContainer,
  SectorList,
  SectorListItem,
  Separator,
  TitleContainer,
  Value
} from 'app/components/Lists/ProjectList/ProjectList.styles';

const projectData = [
  {
    title: 'Project 1',
    startDate: '2008-03-13',
    endDate: '2017-12-12',
    organisation: 'Best Organisation',
    budget: 19620,
    sectors: [
      {
        name: 'Sectors 1'
      }
    ]
  }
];

const wrapper = shallow(<ProjectList projectData={projectData} />);

describe('<ProjectList />', () => {
  it('renders one <List/> component', () => {
    expect(wrapper.find(List)).toHaveLength(1);
  });

  it('renders one <ListItem/> component', () => {
    expect(wrapper.find(ListItem)).toHaveLength(1);
  });

  it('renders one <TitleContainer/> component', () => {
    expect(wrapper.find(TitleContainer)).toHaveLength(1);
  });

  it('renders four <PropertyContainer/> component', () => {
    expect(wrapper.find(PropertyContainer)).toHaveLength(4);
  });

  it('renders three <Box/> component', () => {
    expect(wrapper.find(Box)).toHaveLength(3);
  });

  it('renders five <Label/> component', () => {
    expect(wrapper.find(Label)).toHaveLength(5);
  });

  it('renders four <Value/> component', () => {
    expect(wrapper.find(Value)).toHaveLength(4);
  });

  it('renders one <Separator/> component', () => {
    expect(wrapper.find(Separator)).toHaveLength(1);
  });

  it('renders one <SectorList/> component', () => {
    expect(wrapper.find(SectorList)).toHaveLength(1);
  });

  it('renders one <SectorListItem/> component', () => {
    expect(wrapper.find(SectorListItem)).toHaveLength(1);
  });
});
