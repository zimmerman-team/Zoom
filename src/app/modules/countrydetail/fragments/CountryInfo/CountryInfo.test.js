import React from 'react';
import { shallow } from 'enzyme';
import CountryInfo from './CountryInfo';
// Components
import { Box } from 'grommet';
import BarChartHorizontal from 'components/charts/barcharts/horizontal/BarChartHorizontal';
import { SimpleText } from 'components/sort/Misc';
import {
  PageIntroInitial,
  PageIntroSecondary
} from 'components/sort/Paragraphs';
import ModuleFragment from 'components/Layout/ModuleFragment/ModuleFragment';
import { CountryName } from 'modules/countrydetail/fragments/CountryInfo/CountryInfo.styles';

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
  it('renders one <BarChartHorizontal/> component', () => {
    expect(wrapper.find(BarChartHorizontal)).toHaveLength(1);
  });
});
