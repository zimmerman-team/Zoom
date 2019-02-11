import React from 'react';
import { shallow } from 'enzyme';
import About from './About';

// Components
import { ModuleContainer, AboutTitle, Text, RedLink } from './About.styles';
import {
  DescriptionParagraph,
  DescriptionParagraphBold,
} from 'components/sort/Paragraphs';
import BarChartVertical from 'components/charts/barcharts/vertical/BarChartVertical';

const wrapper = shallow(<About />);

describe('<About />', () => {
  it('renders one <ModuleContainer/> component', () => {
    expect(wrapper.find(ModuleContainer)).toHaveLength(1);
  });
  it('renders one <AboutTitle/> component', () => {
    expect(wrapper.find(AboutTitle)).toHaveLength(1);
  });
  it('renders one <DescriptionParagraphBold/> component', () => {
    expect(wrapper.find(DescriptionParagraphBold)).toHaveLength(1);
  });
  it('renders two <Text/> component', () => {
    expect(wrapper.find(Text)).toHaveLength(2);
  });
  it('renders one <BarChartVertical/> component', () => {
    expect(wrapper.find(BarChartVertical)).toHaveLength(1);
  });
  it('renders two <DescriptionParagraph/> component', () => {
    expect(wrapper.find(DescriptionParagraph)).toHaveLength(2);
  });
  it('renders one <RedLink/> component', () => {
    expect(wrapper.find(RedLink)).toHaveLength(1);
  });
});
