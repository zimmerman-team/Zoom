/* base */
import React from 'react';
import { shallow } from 'enzyme';

/* components */
import GridItem from './GridItem';

const data = [
  { id: 'mock_id', title: 'mock title', info: { date: '01/01/01' } }
];

const wrapper = shallow(<GridItem data={data} />);

describe('<GridItem />', () => {
  it('renders one <GridItem /> component', () => {
    expect(wrapper.find(GridItem)).toHaveLength(1);
  });
});
