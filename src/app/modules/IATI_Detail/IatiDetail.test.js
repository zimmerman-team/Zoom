import React from 'react';
import { shallow } from 'enzyme';
import IatiDetail from 'modules/IATI_Detail/IatiDetail';
// Components
import Sectors from 'modules/IATI_Detail/fragments/Sectors/Sectors';
import TotalBudget from 'modules/IATI_Detail/fragments/TotalBudget/TotalBudget';
import Header from 'modules/IATI_Detail/fragments/Header/Header';

const wrapper = shallow(<IatiDetail />);

describe('<Header />', () => {
  it('renders one <Sectors/> component', () => {
    expect(wrapper.find(Sectors)).toHaveLength(1);
  });
  it('renders one <TotalBudget/> component', () => {
    expect(wrapper.find(TotalBudget)).toHaveLength(1);
  });
  it('renders one <Header/> component', () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });
});
