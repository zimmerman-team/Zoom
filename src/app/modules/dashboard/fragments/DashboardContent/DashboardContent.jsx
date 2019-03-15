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
  teams: PropTypes.array
};

const defaultProps = {
  visible: true,
  loggedIn: true
};

/*todo: implement show/hide based on material-ui drawer component*/

const DashboardContent = props => {
  return (
    <Router>
      <FragmentBase>
        {/** tab navigator */}
        <DashboardTabNavigator />
        {/** tab content */}
        <DashboardTabContent users={props.users} teams={props.teams} />
      </FragmentBase>
    </Router>
  );
};

DashboardContent.propTypes = propTypes;
DashboardContent.defaultProps = defaultProps;

export default DashboardContent;
