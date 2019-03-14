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

const PageHeading = styled(_PageHeading)`
  margin-bottom: 28px;
`;

const Box = styled.div`
  width: 100%;
`;

//Mock
const items = [
  {
    title: 'People with HIV',
    info: {
      Author: 'Jane Doe',
      'Publication date': '01-01-2019',
      Updated: 'n/a',
      Shared: 'Team Jane Doe, Public',
      'Type-of-chart': 'Line chart',
      'Data Sources': 'UN AIDS'
    }
  },
  {
    title: 'People with HIV',
    info: {
      Author: 'Jane Doe',
      'Publication date': '01-01-2019',
      Updated: 'n/a',
      Shared: 'Team Jane Doe, Public',
      'Type-of-chart': 'Line chart',
      'Data Sources': 'UN AIDS'
    }
  },
  {
    title: 'People with HIV',
    info: {
      Author: 'Jane Doe',
      'Publication date': '01-01-2019',
      Updated: 'n/a',
      Shared: 'Team Jane Doe, Public',
      'Type-of-chart': 'Line chart',
      'Data Sources': 'UN AIDS'
    }
  }
];

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
          <GridList withOptions={false} items={items} />
        </ViewContainer>
      </Box>
      <Pagination />
    </ModuleContainer>
  );
};
PublicChartLibraryModule.propTypes = propTypes;
PublicChartLibraryModule.defaultProps = defaultProps;
export default PublicChartLibraryModule;
