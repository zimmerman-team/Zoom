import React from 'react';
import { shallow } from 'enzyme';
import Projects from './Projects';

// Components
import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';
import ProjectList from 'components/lists/projects/ProjectList';

const wrapper = shallow(<Projects />);

describe('<Projects />', () => {
  it('renders one <ModuleFragment/> component', () => {
    expect(wrapper.find(ModuleFragment)).toHaveLength(1);
  });
  it('renders one <ProjectList/> component', () => {
    expect(wrapper.find(ProjectList)).toHaveLength(1);
  });
});
