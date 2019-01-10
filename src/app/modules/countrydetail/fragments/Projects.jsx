/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { countryDetailMockData } from '__mocks__/countryDetailMock';

import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';
import ProjectList from 'components/lists/projects/ProjectList';

const propTypes = {
  projectData: PropTypes.array,
};
const defaultProps = {
  projectData: [],
};

const Projects = props => {
  return (
    <ModuleFragment
      title={countryDetailMockData.fragments[6].title}
      description={countryDetailMockData.fragments[6].description[0]}
    >
      <ProjectList projectData={props.projectData} />
    </ModuleFragment>
  );
};

Projects.propTypes = propTypes;
Projects.defaultProps = defaultProps;

export default Projects;
