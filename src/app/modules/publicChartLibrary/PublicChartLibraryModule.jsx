/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* components */
import {
  ModuleContainer,
  PageHeading as _PageHeading,
  ViewContainer,
  Box
} from 'modules/dashboard/DashboardModule.styles';

import Searchbox from 'modules/dashboard/fragments/Searchbox/Searchbox';
import GridListOptionsPane from '../dashboard/fragments/GridList/components/GridListOptionsPane/GridListOptionsPane';
import Pagination from '../../components/Pagination/Pagination';
import GridItem from '../dashboard/fragments/GridList/components/GridItem/GridItem';

const PageHeading = styled(_PageHeading)`
  margin-bottom: 28px; ;
`;

const propTypes = {
  changeSearchKeyword: PropTypes.func,
};
const defaultProps = {
  changeSearchKeyword: null,
};
const PublicChartLibraryModule = props => {
  return (
    <ModuleContainer>
      {/*todo: change to sectionHeading*/}
      <PageHeading>Zoom chart library</PageHeading>
      <Searchbox inputChange={props.changeSearchKeyword} />
      <Box>
        {/*todo: make displayAddChart work......*/}
      <GridListOptionsPane displayAddChart="none"/>
      <ViewContainer>
        <GridItem disableToolbar/>
        <GridItem disableToolbar/>
        <GridItem disableToolbar/>
        <GridItem disableToolbar/>
        <GridItem disableToolbar/>
        <GridItem disableToolbar/>
        <GridItem disableToolbar/>
        <GridItem disableToolbar/>
        <GridItem disableToolbar/>
      </ViewContainer>
      </Box>
      <Pagination/>
    </ModuleContainer>
    );
};
PublicChartLibraryModule.propTypes = propTypes;
PublicChartLibraryModule.defaultProps = defaultProps;
export default PublicChartLibraryModule;
