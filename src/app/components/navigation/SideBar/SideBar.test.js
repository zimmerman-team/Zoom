import React from 'react';
import { shallow } from 'enzyme';
import CountryInfo from './SideBar';

// Components
import { Box } from 'grommet';
import BarChart from 'components/charts/barcharts/BarChart';
import {
  PageIntroInitial,
  PageIntroSecondary,
  SimpleText,
} from 'components/theme/ThemeSheet';
import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';
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
  it('renders one <BarChart/> component', () => {
    expect(wrapper.find(BarChart)).toHaveLength(1);
  });
});
