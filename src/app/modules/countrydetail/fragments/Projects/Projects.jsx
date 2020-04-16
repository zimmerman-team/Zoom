/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
/* components */
import ModuleFragment from 'app/components/Layout/ModuleFragment/ModuleFragment';
import ProjectList from 'app/components/Lists/ProjectList/ProjectList';
import { Element } from 'react-scroll/modules';
import SvgIconSort from 'app/assets/icons/IconSort';
import SortbyDialog from 'app/components/Dialog/SortbyDialog/SortbyDialog';
/* mock */
import { countryDetailMockData } from 'app/__mocks__/countryDetailMock';

export const ControlsRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 20px;
  justify-content: flex-end;
`;

/* consts */
const sortByOptions = [
  { label: 'Title (asc)', value: 'title' },
  { label: 'Title (desc)', value: '-title' },
  { label: 'Start date (asc)', value: 'start_date' },
  { label: 'Start date (desc)', value: '-start_date' },
  { label: 'End date (asc)', value: 'end_date' },
  { label: 'End date (desc)', value: '-end_date' },
  { label: 'Total budget (asc)', value: 'activity_budget_value' },
  { label: 'Total budget (desc)', value: '-activity_budget_value' }
];

const propTypes = {
  projectData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      budget: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
  ),
  projectInfo: PropTypes.shape({
    count: PropTypes.number,
    commitment: PropTypes.string
  }),
  projectsLoading: PropTypes.bool,
  sort: PropTypes.string,
  changeSortBy: PropTypes.func,
  setWrapperRef: PropTypes.func,
  setIsSortByOpen: PropTypes.func,
  isSortByOpen: PropTypes.bool
};
const defaultProps = {
  projectData: [],
  projectInfo: {
    count: 0,
    commitment: ''
  },
  projectsLoading: false,
  sort: '',
  changeSortBy: null,
  setWrapperRef: null,
  setIsSortByOpen: null,
  isSortByOpen: false
};

const Projects = props => {
  const title = props.projectsLoading
    ? 'Loading...'
    : `${props.projectInfo.count} Projects with a total of ${
        props.projectInfo.commitment
      } commitment`;
  return (
    <Element name="Projects" data-cy="project-fragment">
      <ModuleFragment
        title={title}
        description={countryDetailMockData.fragments[6].description[0]}
      >
        <ControlsRow>
          <div>
            <SvgIconSort onClick={props.setIsSortByOpen} />
            <SortbyDialog
              open={props.isSortByOpen}
              options={sortByOptions}
              selectedOptionValue={props.sort}
              onOptionClick={props.changeSortBy}
              setWrapperRef={props.setWrapperRef}
              closeDialog={props.setIsSortByOpen}
            />
          </div>
        </ControlsRow>
        <ProjectList projectData={props.projectData} data-cy="project-list" />
      </ModuleFragment>
    </Element>
  );
};

Projects.propTypes = propTypes;
Projects.defaultProps = defaultProps;

export default Projects;
