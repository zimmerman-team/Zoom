/* base */
import React from 'react';
import { shallow } from 'enzyme';
import GridList from 'modules/dashboard/fragments/GridList/GridList';
/* components */
import {
  Container,
  GridListItem,
  GridListItemRow,
  GridListItemRowLabel,
  GridListItemRowValue,
  GridListItemTitle
} from 'modules/dashboard/fragments/GridList/GridList.styles';

const items = [
  { id: 'mock_id', title: 'mock title', info: { date: '01/01/01' } }
];

const wrapper = shallow(<GridList items={items} />);

describe('<GridList />', () => {
  it('renders one <Container /> component', () => {
    expect(wrapper.find(Container)).toHaveLength(1);
  });
  it('renders one <GridListItem /> component', () => {
    expect(wrapper.find(GridListItem)).toHaveLength(1);
  });
  it('renders one <GridListItemTitle /> component', () => {
    expect(wrapper.find(GridListItemTitle)).toHaveLength(1);
  });
  it('renders one <GridListItemRow /> component', () => {
    expect(wrapper.find(GridListItemRow)).toHaveLength(1);
  });
  it('renders one <GridListItemRowLabel /> component', () => {
    expect(wrapper.find(GridListItemRowLabel)).toHaveLength(1);
  });
  it('renders one <GridListItemRowValue /> component', () => {
    expect(wrapper.find(GridListItemRowValue)).toHaveLength(1);
  });
});
