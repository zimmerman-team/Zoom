/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { FragmentBase } from './DashboardTabContent.style';
import DashboardTabNavigator from 'app/modules/dashboard/fragments/DashboardContent/components/DashboardTabNavigator';
import DashboardTabContent from 'app/modules/dashboard/fragments/DashboardContent/components/DashboardTabContent';

const FragmentBase = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1024px;
  flex-direction: column;
  align-items: center;

  //outline: 1px solid crimson;
`;

const propTypes = {
  loggedIn: PropTypes.bool,
  visible: PropTypes.bool,
  /** contains data for generation of tab nav items and providing the tab content with the proper components */
  users: PropTypes.array,
  trashCount: PropTypes.number,
  trashCharts: PropTypes.array,
  removeAll: PropTypes.func,
  loading: PropTypes.bool,
  teams: PropTypes.array,
  isSuperAdmin: PropTypes.bool,
  isAdministrator: PropTypes.bool
};

const defaultProps = {
  visible: true,
  loading: false,
  removeAll: null,
  trashCount: 0,
  trashCharts: [],
  loggedIn: true,
  isSuperAdmin: false,
  isAdministrator: false
};

/*todo: implement show/hide based on material-ui drawer component*/

const DashboardContent = props => {
  return (
    <FragmentBase>
      {/** tab navigator */}
      <DashboardTabNavigator
        navItems={props.navItems}
        trashCount={props.trashCount}
      />
      {/** tab content */}
      <DashboardTabContent
        loading={props.loading}
        datasets={props.datasets}
        charts={props.charts}
        users={props.users}
        teams={props.teams}
        removeAll={props.removeAll}
        trashCharts={props.trashCharts}
        isSortByOpen={props.isSortByOpen}
        changeSortBy={props.changeSortBy}
        setWrapperRef={props.setWrapperRef}
        setIsSortByOpen={props.setIsSortByOpen}
        activeTab={props.activeTab}
        sort={props.sort}
        tabs={props.tabs}
        isAdministrator={props.isAdministrator}
        isSuperAdmin={props.isSuperAdmin}
        isModerator={props.isModerator}
        auth0Client={props.auth0Client}
      />
    </FragmentBase>
  );
};

DashboardContent.propTypes = propTypes;
DashboardContent.defaultProps = defaultProps;

export default DashboardContent;
