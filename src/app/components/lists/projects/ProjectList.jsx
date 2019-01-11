/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { projectsMockData } from '__mocks__/projectsMock';
import { Box, Heading } from 'grommet';
import {
  zoomGreyZero,
  zoomFontFamOne,
  zoomFontFamTwo,
  aidsFondsRed,
} from 'components/theme/ThemeSheet';

// const ComponentBase = styled.div``;

const List = styled(Box)`
  display: flex;
  flex-direction: column;
`;
const ListItem = styled(Box)`
  background-color: ${zoomGreyZero};
  margin-bottom: 2px;
  padding: 20px;
`;

const PropertyContainer = styled(Box)`
  margin-bottom: 10px;
`;

const Label = styled.div`
  font-family: ${zoomFontFamOne};
  font-size: 14px;
  line-height: 1;
  margin-right: 4px;
`;
const Value = styled.div`
  font-family: ${zoomFontFamTwo};
  font-size: 14px;
  line-height: 1;
`;

const TitleContainer = styled(Heading)`
  color: ${aidsFondsRed};
  font-family: ${zoomFontFamTwo};
  font-weight: normal;
  font-size: 18px;
  margin: 0;
  margin-bottom: 10px;
  line-height: 1;
`;
const DateContainer = styled(Box)``;
const Separator = styled(Box)`
  font-family: ${zoomFontFamOne};
  margin-left: 4px;
  margin-right: 4px;
`;

const SectorList = styled(Box)`
  flex-direction: row;
`;

const SectorListItem = styled(Value)`
  &:after {
    content: ',';
    margin-right: 4px;
  }

  &:last-child {
    &:after {
      content: '';
    }
  }
`;

const propTypes = {
  projectData: PropTypes.arrayOf(PropTypes.shape({
    budget: PropTypes.number,
    endDat: PropTypes.string,
    organisation: PropTypes.string,
    sectors: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
    startDate: PropTypes.string,
    title: PropTypes.string,
  })),
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
                  <SectorListItem key={`sector-${sectorInd}`}>{sector.name}</SectorListItem>
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
