/* base */
import React from 'react';
import PropTypes from 'prop-types';
// import { projectsMockData } from '__mocks__/projectsMock';
import { Box } from 'grommet/components/Box';
import {
  Label,
  List,
  ListItem,
  PropertyContainer,
  SectorList,
  SectorListItem,
  Separator,
  Heading,
  Value
} from 'components/Lists/ProjectList/ProjectList.styles';
import CountryDetailModule from '../../../modules/countrydetail/CountryDetailModule';

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
  })
};
const defaultProps = {
  projectData: [],
  projectInfo: {
    count: 0,
    commitment: ''
  }
};

const ProjectList = props => {
  return (
    <List width="100%">
      {props.projectData.map(project => (
        <ListItem key={`project-${project.id}`}>
          <Heading to={`/iati-activity/${project.id}`}>{project.title}</Heading>
          {/* mixed properties */}
          <Box>
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
