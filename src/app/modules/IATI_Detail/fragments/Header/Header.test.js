import React from 'react';
import { shallow } from 'enzyme';
import Header from 'modules/IATI_Detail/fragments/Header/Header';
import { iatiDetailMockData } from '__mocks__/iatiDetailMock';

// Components
import { PageHeading } from 'components/theme/ThemeSheet';
import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';
import {
  DetailList,
  DetailListItem,
  ItemLabel,
  ItemInfo,
} from 'modules/IATI_Detail/fragments/Header/Header.styles';

const wrapper = shallow(<Header data={iatiDetailMockData}/>);

describe('<Header />', () => {
  it('renders one <ModuleFragment/> component', () => {
    expect(wrapper.find(ModuleFragment)).toHaveLength(3);
  });
  it('renders one <DetailList/> component', () => {
    expect(wrapper.find(DetailList)).toHaveLength(2);
  });
  it('renders three <DetailListItem/> component', () => {
    expect(wrapper.find(DetailListItem)).toHaveLength(10);
  });
  it('renders one <PageHeading/> component', () => {
    expect(wrapper.find(PageHeading)).toHaveLength(1);
  });
  it('renders one <ItemLabel/> component', () => {
    expect(wrapper.find(ItemLabel)).toHaveLength(10);
  });
  it('renders one <ItemInfo/> component', () => {
    expect(wrapper.find(ItemInfo)).toHaveLength(10);
  });
});
