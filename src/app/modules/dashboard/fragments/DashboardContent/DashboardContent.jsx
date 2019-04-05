/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route, BrowserRouter as Router } from 'react-router-dom';

// import { FragmentBase } from './DashboardTabContent.style';
import DashboardTabNavigator from 'modules/dashboard/fragments/DashboardContent/components/DashboardTabNavigator';
import DashboardTabContent from 'modules/dashboard/fragments/DashboardContent/components/DashboardTabContent';

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
  loading: PropTypes.bool,
  teams: PropTypes.array
};

const defaultProps = {
  visible: true,
  loading: false,
  loggedIn: true
};

/*todo: implement show/hide based on material-ui drawer component*/

const DashboardContent = props => {
  return (
    <FragmentBase>
      {/** tab navigator */}
      <DashboardTabNavigator navItems={props.navItems} />
      {/** tab content */}
      <DashboardTabContent
        loading={props.loading}
        datasets={props.datasets}
        charts={props.charts}
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
    </FragmentBase>
  );
};

DashboardContent.propTypes = propTypes;
DashboardContent.defaultProps = defaultProps;

export default DashboardContent;
