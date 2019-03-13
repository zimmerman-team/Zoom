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
      <PageHeading>Zoom chart library</PageHeading>
      <Searchbox inputChange={props.changeSearchKeyword} />
      <Box>
      <GridListOptionsPane visibilityAddChart='hidden'/>
      <ViewContainer>
        <GridItem withOptions={false}/>
        <GridItem withOptions={false}/>
        <GridItem withOptions={false}/>
        <GridItem withOptions={false}/>
        <GridItem withOptions={false}/>
        <GridItem withOptions={false}/>
        <GridItem withOptions={false}/>
        <GridItem withOptions={false}/>
        <GridItem withOptions={false}/>
      </ViewContainer>
      </Box>
      <Pagination/>
    </ModuleContainer>
    );
};
PublicChartLibraryModule.propTypes = propTypes;
PublicChartLibraryModule.defaultProps = defaultProps;
export default PublicChartLibraryModule;
