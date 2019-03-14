/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* components */
import {
  ModuleContainer,
  PageHeading as _PageHeading,
  ViewContainer
} from 'modules/dashboard/DashboardModule.styles';

import Searchbox from 'modules/dashboard/fragments/Searchbox/Searchbox';
import GridListOptionsPane from '../dashboard/fragments/GridList/components/GridListOptionsPane/GridListOptionsPane';
import Pagination from '../../components/Pagination/Pagination';
import GridList from '../dashboard/fragments/GridList/GridList';
import data from './PublicChartLibraryModule.const';
const PageHeading = styled(_PageHeading)`
  margin-bottom: 28px;
`;

const Box = styled.div`
  width: 100%;
`;

const propTypes = {
  changeSearchKeyword: PropTypes.func
};
const defaultProps = {
  changeSearchKeyword: null
};

const PublicChartLibraryModule = props => {
  return (
    <ModuleContainer>
      <PageHeading>Zoom chart library</PageHeading>
      <Searchbox inputChange={props.changeSearchKeyword} />
      <Box>
        <GridListOptionsPane visibilityAddChart="hidden" />
        <ViewContainer>
          <GridList withOptions={false} items={data} />
        </ViewContainer>
      </Box>
      <Pagination />
    </ModuleContainer>
  );
};
PublicChartLibraryModule.propTypes = propTypes;
PublicChartLibraryModule.defaultProps = defaultProps;
export default PublicChartLibraryModule;
