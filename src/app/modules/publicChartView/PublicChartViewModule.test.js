/* base */
import React from 'react';
import { shallow } from 'enzyme';

/* components */
import PublicChartViewModule from './PublicChartViewModule';
import { ComponentBase } from './PublicChartViewModule.styles';

/* mock data */
const data = [
  { id: 'mock_id', title: 'mock title', info: { date: '01/01/01' } }
];

const wrapper = shallow(<PublicChartViewModule items={data} />);

describe('< />', () => {
  it('renders one <ComponentBase /> component', () => {
    expect(wrapper.find(ComponentBase)).toHaveLength(1);
  });
});
