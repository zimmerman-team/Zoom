/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
/* components */
import {
  ModuleContainer,
  ModuleTitle,
  ViewContainer
} from 'app/modules/dashboard/DashboardModule.styles';

import Searchbox from 'app/modules/dashboard/fragments/Searchbox/Searchbox';
import GridListOptionsPane from '../dashboard/fragments/GridList/components/GridListOptionsPane/GridListOptionsPane';
import Pagination from '../../components/Pagination/Pagination';
import GridList from '../dashboard/fragments/GridList/GridList';
import ProgressIcon from 'app/components/ProgressIcon/ProgressIcon';
import theme from 'app/theme/Theme';
// import data from './PublicChartLibraryModule.const';

const Box = styled.div`
  width: 100%;
`;
const Message = styled.div`
  padding-top: 70px;
  text-align: center;
  font-size: 32px;
  line-height: 1;
  color: ${theme.color.zoomBlack};
  font-family: ${theme.font.zoomFontFamOne};
`;

const propTypes = {
  changeSearchKeyword: PropTypes.func,
  changePage: PropTypes.func,
  changeSortBy: PropTypes.func,
  isSortByOpen: PropTypes.bool,
  setIsSortByOpen: PropTypes.func,
  loading: PropTypes.bool,
  pageCount: PropTypes.number,
  page: PropTypes.number
};

const defaultProps = {
  pageCount: 1,
  page: 0,
  changePage: null,
  changeSortBy: null,
  setIsSortByOpen: null,
  loading: false,
  isSortByOpen: false,
  changeSearchKeyword: null
};

const PublicChartLibraryModule = props => {
  return (
    <ModuleContainer>
      <Helmet>
        <title>Zoom - Chart Library</title>
      </Helmet>
      <ModuleTitle>Zoom chart library</ModuleTitle>
      <Searchbox
        inputChange={props.changeSearchKeyword}
        onEnterPressed={props.onEnterPressed}
      />
      <Box
        style={props.loading ? { pointerEvents: 'none', opacity: '0.4' } : {}}
      >
        {props.loading && <ProgressIcon />}
        <GridListOptionsPane
          changeSortBy={props.changeSortBy}
          setIsSortByOpen={props.setIsSortByOpen}
          isSortByOpen={props.isSortByOpen}
          visibilityLeftButton="hidden"
        />
        <ViewContainer>
          <GridList withoptions={false} items={props.data} />
        </ViewContainer>
        {props.data.length === 0 && <Message>No charts</Message>}
      </Box>
      {props.data.length > 0 && (
        <Pagination
          forcePage={props.page}
          pageCount={props.pageCount}
          changePage={props.changePage}
        />
      )}
    </ModuleContainer>
  );
};
PublicChartLibraryModule.propTypes = propTypes;
PublicChartLibraryModule.defaultProps = defaultProps;
export default PublicChartLibraryModule;
