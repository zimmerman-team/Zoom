/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ModuleTitle } from 'app/modules/dashboard/DashboardModule.styles';
import UserGreeting from 'app/modules/dashboard/fragments/DashboardHeader/component/UserGreeting/UserGreeting';

const ComponentBase = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const propTypes = {
  userName: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string
};
const defaultProps = {
  userName: 'empty',
  title: 'empty',
  message: 'no message to display'
};

const DashboardHeader = props => {
  return (
    <ComponentBase>
      <ModuleTitle>{props.title}</ModuleTitle>
      <UserGreeting message={props.message} user={props.userName} />
    </ComponentBase>
  );
};

DashboardHeader.propTypes = propTypes;
DashboardHeader.defaultProps = defaultProps;

export default DashboardHeader;
