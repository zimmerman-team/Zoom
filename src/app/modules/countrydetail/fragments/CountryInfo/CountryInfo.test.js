import React from 'react';
import { shallow } from 'enzyme';
import CountryInfo from './CountryInfo';
// Components
import { Box } from 'grommet/components/Box';
import HorizontalBarChart from 'app/components/charts/barcharts/horizontal/HorizontalBarChart';
import { SimpleText } from 'app/components/sort/Misc';
import {
  PageIntroInitial,
  PageIntroSecondary
} from 'app/components/sort/Paragraphs';
import ModuleFragment from 'app/components/Layout/ModuleFragment/ModuleFragment';
import { CountryName } from 'app/modules/countrydetail/fragments/CountryInfo/CountryInfo.styles';

const wrapper = shallow(<CountryInfo />);

describe('<CountryInfo />', () => {
  it('renders one <ModuleFragment/> component', () => {
    expect(wrapper.find(ModuleFragment)).toHaveLength(1);
  });
  it('renders one <CountryName/> component', () => {
    expect(wrapper.find(CountryName)).toHaveLength(1);
  });
  it('renders three <Box/> component', () => {
    expect(wrapper.find(Box)).toHaveLength(3);
  });
  it('renders one <PageIntroInitial/> component', () => {
    expect(wrapper.find(PageIntroInitial)).toHaveLength(1);
  });
  it('renders one <PageIntroSecondary/> component', () => {
    expect(wrapper.find(PageIntroSecondary)).toHaveLength(1);
  });
  it('renders one <SimpleText/> component', () => {
    expect(wrapper.find(SimpleText)).toHaveLength(1);
  });
  it('renders one <HorizontalBarChart/> component', () => {
    expect(wrapper.find(HorizontalBarChart)).toHaveLength(1);
  });
});
