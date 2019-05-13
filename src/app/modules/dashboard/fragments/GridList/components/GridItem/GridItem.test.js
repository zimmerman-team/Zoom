/* base */
import React from 'react';
import { shallow } from 'enzyme';
/* components */
import GridItem from './GridItem';
import { ComponentBase, GridItemHeading } from './GridItem.styles';

const data = [
  { id: 'mock_id', title: 'mock title', info: { date: '01/01/01' } }
];

const wrapper = shallow(<GridItem />);

describe('<GridItem />', () => {
  it('renders one <ComponentBase/> component', () => {
    expect(wrapper.find(ComponentBase)).toHaveLength(1);
  });

  it('renders one <GridItemHeading /> component', () => {
    expect(wrapper.find(GridItemHeading)).toHaveLength(1);
  });

  it('does not render <GridItemToolbar /> by default', () => {
    expect(wrapper.exists('GridItemToolbar')).toBe(true);
  });
});
