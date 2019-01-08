/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { countryDetailMockData } from '__mocks__/countryDetailMock';
import { projectsMockData } from '__mocks__/projectsMock';

import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';
import ProjectList from 'components/lists/projects/ProjectList';

const propTypes = {};
const defaultProps = {};

const Projects = props => {
  return (
    <ModuleFragment
      title={countryDetailMockData.fragments[6].title}
      description={countryDetailMockData.fragments[6].description[0]}
    >
      <ProjectList />
    </ModuleFragment>
  );
};

Projects.propTypes = propTypes;
Projects.defaultProps = defaultProps;

export default Projects;
