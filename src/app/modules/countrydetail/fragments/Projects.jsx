/* base */
import React from 'react';
import { countryDetailMockData } from '__mocks__/countryDetailMock';

import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';
import ProjectList from 'components/lists/projects/ProjectList';
import { ProjectListDataPropTypes } from 'PropTypes';

const propTypes = {
  projectData: ProjectListDataPropTypes,
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
