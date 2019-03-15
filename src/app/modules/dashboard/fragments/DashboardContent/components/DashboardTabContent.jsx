/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import { createBrowserHistory } from 'history';

import GridList from 'modules/dashboard/fragments/GridList/GridList';
import GridListOptionsPane from 'modules/dashboard/fragments/GridList/components/GridListOptionsPane/GridListOptionsPane';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

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

  if (currentURL.includes('users')) {
    targetData = props.users;
  } else if (currentURL.includes('teams')) {
    targetData = props.teams;
  }

  return (
    <ComponentBase>
      {targetData.length === 0 && (
        <Message>No item in {props.tabContentName}</Message>
      )}

      <GridListOptionsPane />

      {targetData.length > 0 && <GridList items={targetData} />}
    </ComponentBase>
  );
};

DashboardTabContent.propTypes = propTypes;
DashboardTabContent.defaultProps = defaultProps;

export default DashboardTabContent;
