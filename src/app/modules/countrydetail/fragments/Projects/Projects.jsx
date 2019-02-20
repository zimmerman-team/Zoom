/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { countryDetailMockData } from '__mocks__/countryDetailMock';

import ModuleFragment from 'components/Layout/ModuleFragment/ModuleFragment';
import ProjectList from 'components/Lists/ProjectList/ProjectList';
import { Element } from 'react-scroll/modules';

const propTypes = {
  projectData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      budget: PropTypes.number,
      endDat: PropTypes.string,
      organisation: PropTypes.string,
      sectors: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string
        })
      ),
      startDate: PropTypes.string,
      title: PropTypes.string
    })
  )
};
const defaultProps = {
  projectData: []
};

const Projects = props => {
  return (
    <Element name="Projects">
      <ModuleFragment
        title={countryDetailMockData.fragments[6].title}
        description={countryDetailMockData.fragments[6].description[0]}
      >
        <ProjectList projectData={props.projectData} />
      </ModuleFragment>
    </Element>
  );
};

Projects.propTypes = propTypes;
Projects.defaultProps = defaultProps;

export default Projects;
