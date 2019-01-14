/* base */
import React from 'react';
import PropTypes from 'prop-types';
// import { projectsMockData } from '__mocks__/projectsMock';
import { Box } from 'grommet';
import {
  Label,
  List,
  ListItem,
  PropertyContainer,
  SectorList,
  SectorListItem,
  Separator,
  TitleContainer,
  Value,
} from 'components/lists/projects/ProjectList.styles';

const propTypes = {
  projectData: PropTypes.arrayOf(
    PropTypes.shape({
      budget: PropTypes.number,
      endDat: PropTypes.string,
      organisation: PropTypes.string,
      sectors: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        }),
      ),
      startDate: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
};
const defaultProps = {
  projectData: [],
};

const ProjectList = props => {
  return (
    <List width="100%">
      {props.projectData.map((project, index) => (
        <ListItem key={`project-${index}`}>
          {/* title container */}
          <TitleContainer level="4" truncate>
            {project.title}
          </TitleContainer>

          {/* date container*/}
          <PropertyContainer
            width="100%"
            direction="row"
            justify="start"
            align="center"
          >
            <Box direction="row">
              <Label>Start date:</Label>
              <Value>{project.startDate}</Value>
            </Box>
            <Separator>|</Separator>
            <Box direction="row">
              <Label>End date:</Label>
              <Value>{project.endDate}</Value>
            </Box>
          </PropertyContainer>

          {/* mixed properties*/}
          <Box>
            <PropertyContainer direction="row">
              <Label>Reporting organisation:</Label>
              <Value>{project.organisation}</Value>
            </PropertyContainer>
            <PropertyContainer direction="row">
              <Label>Project budget: </Label>
              <Value>{project.budget}</Value>
            </PropertyContainer>
            <PropertyContainer direction="row">
              <Label>Sectors:</Label>
              {/* sector list */}
              <SectorList>
                {project.sectors.map((sector, sectorInd) => (
                  <SectorListItem key={`sector-${sectorInd}`}>
                    {sector.name}
                  </SectorListItem>
                ))}
              </SectorList>
            </PropertyContainer>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

ProjectList.propTypes = propTypes;
ProjectList.defaultProps = defaultProps;

export default ProjectList;
