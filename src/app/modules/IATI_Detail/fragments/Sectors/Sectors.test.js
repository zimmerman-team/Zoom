import React from 'react';
import { shallow } from 'enzyme';
import Sectors from 'modules/IATI_Detail/fragments/Sectors/Sectors';
// Components
import ModuleFragment from 'components/Layout/ModuleFragment/ModuleFragment';
import TreeMap from 'components/charts/treemap/TreeMap';
import { treeMapMockData } from '__mocks__/treeMapMock';

const wrapper = shallow(<Sectors data={treeMapMockData} />);

describe('<Sectors />', () => {
  it('renders one <ModuleFragment/> component', () => {
    expect(wrapper.find(ModuleFragment)).toHaveLength(1);
  });
  it('renders one <TreeMap/> component', () => {
    expect(wrapper.find(TreeMap)).toHaveLength(1);
  });
});
