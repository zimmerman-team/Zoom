/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

/**
 * The VizSidebar acts as a container component for the tab navigator and tab content
 */

const propTypes = {
  loggedIn: PropTypes.bool,
  visible: PropTypes.bool,
  /** contains data for generation of tab nav items and providing the tab content with the proper components */
  data: PropTypes.array
};

const defaultProps = {
  data: [],
  visible: true,
  loggedIn: true
};

/*todo: implement show/hide based on material-ui drawer component*/

const DashboardContent = props => {
  // console.log(props.data);
  return (
    /** component base container */
    <FragmentBase>
      {/** tab navigator */}
      <DashboardTabNavigator />
      {/** tab content */}
      <DashboardTabContent data={props.data} />
    </FragmentBase>
  );
};

DashboardContent.propTypes = propTypes;
DashboardContent.defaultProps = defaultProps;

export default DashboardContent;
