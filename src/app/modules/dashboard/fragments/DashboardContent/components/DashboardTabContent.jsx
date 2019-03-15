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

  min-height: 250px;
  flex-direction: column;
`;

const Message = styled.div`
  display: flex;
  font-size: 32px;
  text-align: center;
  align-self: center;
  justify-self: center;
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

  //todo: switch will be more readable
  //todo: check on exact path instead of includes: too vulnerable
  if (currentURL.includes('users')) {
    targetData = props.users;
    leftOptionLabel = 'add users';
  } else if (currentURL.includes('teams')) {
    targetData = props.teams;
    leftOptionLabel = 'create users';
  } else if (currentURL.includes('focus-pages')) {
    targetData = '';
    leftOptionLabel = 'add focus page';
  } else if (currentURL.includes('data-sets')) {
    targetData = '';
    leftOptionLabel = 'map data set';
  } else if (currentURL.includes('charts')) {
    targetData = '';
    leftOptionLabel = 'add chart';
  } else if (currentURL.includes('trash')) {
    targetData = '';
    leftOptionLabel = 'remove indefinite';
    sortIsVisible = false;
  }

  return (
    <ComponentBase>
      {targetData.length === 0 && (
        <Message>No item in {props.tabContentName}</Message>
      )}

      {targetData.length > 0 && (
        <Box>
          <GridListOptionsPane
            leftOptionLabel={leftOptionLabel}
            sortIsVisible={sortIsVisible}
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
