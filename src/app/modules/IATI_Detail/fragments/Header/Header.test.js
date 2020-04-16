import React from 'react';
import { shallow } from 'enzyme';
import Header from 'app/modules/IATI_Detail/fragments/Header/Header';
import { iatiDetailMockData } from 'app/__mocks__/iatiDetailMock';
// Components
import { PageHeading } from 'app/components/sort/Headings';
import ModuleFragment from 'app/components/Layout/ModuleFragment/ModuleFragment';
import {
  DetailList,
  DetailListItem,
  ItemInfo,
  ItemLabel
} from 'app/modules/IATI_Detail/fragments/Header/Header.styles';

const wrapper = shallow(<Header data={iatiDetailMockData} />);

describe('<Header />', () => {
  it('renders three <ModuleFragment/> component', () => {
    expect(wrapper.find(ModuleFragment)).toHaveLength(3);
  });
  it('renders two <DetailList/> component', () => {
    expect(wrapper.find(DetailList)).toHaveLength(2);
  });
  it('renders ten <DetailListItem/> component', () => {
    expect(wrapper.find(DetailListItem)).toHaveLength(10);
  });
  it('renders one <PageHeading/> component', () => {
    expect(wrapper.find(PageHeading)).toHaveLength(1);
  });
  it('renders ten <ItemLabel/> component', () => {
    expect(wrapper.find(ItemLabel)).toHaveLength(10);
  });
  it('renders ten <ItemInfo/> component', () => {
    expect(wrapper.find(ItemInfo)).toHaveLength(10);
  });
});
