/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import { createBrowserHistory } from 'history';

import GridList from 'modules/dashboard/fragments/GridList/GridList';
import GridListOptionsPane from 'modules/dashboard/fragments/GridList/components/GridListOptionsPane/GridListOptionsPane';

const ComponentBase = styled.div`
  display: flex;
  width: 100%;
  max-width: 1024px;
  justify-content: center;

  flex-direction: column;
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
  users: PropTypes.array,
  teams: PropTypes.array
};
const defaultProps = {
  data: [],
  users: [],
  teams: [],
  tabContentName: 'Charts'
};

const DashboardTabContent = props => {
  const history = createBrowserHistory();
  const currentURL = history.location.pathname;

  let targetData = [];
  let leftOptionLabel = '';
  let sortIsVisible = true;
  let tabContentName = true;
  let isRemoveOption = false;

  //todo: switch will be more readable
  //todo: check on exact path instead of includes: too vulnerable
  if (currentURL.includes('users')) {
    targetData = props.users;
    leftOptionLabel = 'add users';
    tabContentName = 'Users';
  } else if (currentURL.includes('teams')) {
    targetData = props.teams;
    leftOptionLabel = 'create users';
    tabContentName = 'Teams';
  } else if (currentURL.includes('focus-pages')) {
    targetData = '';
    leftOptionLabel = 'add focus page';
    tabContentName = 'Focus page';
  } else if (currentURL.includes('data-sets')) {
    targetData = '';
    leftOptionLabel = 'map data set';
    tabContentName = 'Data sets';
  } else if (currentURL.includes('charts')) {
    targetData = '';
    leftOptionLabel = 'add chart';
    tabContentName = 'Charts';
  } else if (currentURL.includes('trash')) {
    targetData = '';
    tabContentName = 'Trash';
    sortIsVisible = false;
    isRemoveOption = true;
  }

  return (
    <ComponentBase>
      {isRemoveOption && (
        <GridListOptionsPane
          leftOptionLabel={leftOptionLabel}
          sortIsVisible={sortIsVisible}
          isRemoveOption={isRemoveOption}
          users={props.users}
          teams={props.teams}
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

      {targetData.length > 0 && (
        <Box>
          <GridListOptionsPane
            leftOptionLabel={leftOptionLabel}
            sortIsVisible={sortIsVisible}
            isRemoveOption={isRemoveOption}
            users={props.users}
            teams={props.teams}
            isSortByOpen={props.isSortByOpen}
            changeSortBy={props.changeSortBy}
            setWrapperRef={props.setWrapperRef}
            setIsSortByOpen={props.setIsSortByOpen}
            activeTab={props.activeTab}
            sort={props.sort}
            tabs={props.tabs}
          />
          <GridList items={targetData} />
        </Box>
      )}
    </ComponentBase>
  );
};

DashboardTabContent.propTypes = propTypes;
DashboardTabContent.defaultProps = defaultProps;

export default DashboardTabContent;
