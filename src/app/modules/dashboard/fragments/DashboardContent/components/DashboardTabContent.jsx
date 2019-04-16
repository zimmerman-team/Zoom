/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import { connect } from 'react-redux';

/* consts */
import paneTypes from '__consts__/PaneTypesConst';

/* components */
import GridList from 'modules/dashboard/fragments/GridList/GridList';
import GridListOptionsPane from 'modules/dashboard/fragments/GridList/components/GridListOptionsPane/GridListOptionsPane';
import NavPane from 'components/Panes/NavPane/NavPane';
import DataPaneContainer from 'components/Panes/DataPaneContainer/DataPaneContainer';
import ProgressIcon from 'components/ProgressIcon/ProgressIcon';

const ComponentBase = styled.div`
  display: flex;
  width: 100%;
  max-width: 1024px;
  justify-content: center;
  flex-direction: column;
  border-top: 2px solid #cfcfcf;
  //overflow: hidden;
`;

const Message = styled.div`
  padding-top: 70px;
  text-align: center;
  font-size: 32px;
  line-height: 1;
  color: ${theme.color.zoomBlack};
  font-family: ${theme.font.zoomFontFamOne};
`;

const Box = styled.div``;

const propTypes = {
  data: PropTypes.array,
  tabContentName: PropTypes.string,
  charts: PropTypes.array,
  users: PropTypes.array,
  loading: PropTypes.bool,
  teams: PropTypes.array
};
const defaultProps = {
  charts: [],
  data: [],
  users: [],
  teams: [],
  loading: false,
  tabContentName: 'Charts'
};

const DashboardTabContent = props => {
  let targetData = [];
  let targetUrl = '';
  let leftOptionLabel = '';
  let sortIsVisible = true;
  let tabContentName = true;
  let isRemoveOption = false;

  switch (props.activeTab) {
    case 'charts':
      targetData = props.charts;
      leftOptionLabel = undefined;
      tabContentName = 'Charts';
      break;
    case 'data-sets':
      targetData = props.datasets;
      targetUrl = '/mapper';
      leftOptionLabel = 'map data set';
      tabContentName = 'Data sets';
      break;
    case 'focus-pages':
      targetData = [];
      leftOptionLabel = 'add focus page';
      tabContentName = 'Focus page';
      break;
    case 'users':
      targetData = props.users;
      targetUrl = '/add-user';
      leftOptionLabel = 'add user';
      tabContentName = 'Users';
      break;
    case 'teams':
      targetData = props.teams;
      targetUrl = '/create-team';
      leftOptionLabel = 'create team';
      tabContentName = 'Teams';
      break;
    case 'trash':
      targetData = '';
      tabContentName = 'Trash';
      sortIsVisible = false;
      isRemoveOption = true;
  }

  return (
    <ComponentBase
      style={props.loading ? { pointerEvents: 'none', opacity: '0.4' } : {}}
    >
      {props.loading && <ProgressIcon />}
      {isRemoveOption && (
        <GridListOptionsPane
          leftOptionLabel={leftOptionLabel}
          sortIsVisible={sortIsVisible}
          isRemoveOption={isRemoveOption}
          isSortByOpen={props.isSortByOpen}
          changeSortBy={props.changeSortBy}
          setWrapperRef={props.setWrapperRef}
          setIsSortByOpen={props.setIsSortByOpen}
          activeTab={props.activeTab}
          sort={props.sort}
          tabs={props.tabs}
        />
      )}

      {targetData.length === 0 && (
        <Message>No item in {tabContentName}</Message>
      )}

      {(props.dataPaneOpen === paneTypes.privPane ||
        props.dataPaneOpen === paneTypes.createChart ||
        props.dataPaneOpen === paneTypes.convertData) && (
        <DataPaneContainer>
          <NavPane />
        </DataPaneContainer>
      )}

      {targetData.length > 0 && (
        <Box>
          <GridListOptionsPane
            leftOptionLabel={leftOptionLabel}
            sortIsVisible={sortIsVisible}
            isRemoveOption={isRemoveOption}
            isSortByOpen={props.isSortByOpen}
            changeSortBy={props.changeSortBy}
            setWrapperRef={props.setWrapperRef}
            setIsSortByOpen={props.setIsSortByOpen}
            activeTab={props.activeTab}
            sort={props.sort}
            tabs={props.tabs}
            targetUrl={targetUrl}
          />
          <GridList items={targetData} />
        </Box>
      )}
    </ComponentBase>
  );
};

DashboardTabContent.propTypes = propTypes;
DashboardTabContent.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    dataPaneOpen: state.dataPaneOpen.open
  };
};

export default connect(mapStateToProps)(DashboardTabContent);
