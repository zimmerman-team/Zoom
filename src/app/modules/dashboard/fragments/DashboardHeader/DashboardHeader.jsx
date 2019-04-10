/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import { PageHeading } from 'modules/dashboard/DashboardModule.styles';
import UserGreeting from 'modules/dashboard/fragments/DashboardHeader/component/UserGreeting/UserGreeting';

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
      <PageHeading>{props.title}</PageHeading>
      <UserGreeting message={props.message} user={props.userName} />
    </ComponentBase>
  );
};

DashboardHeader.propTypes = propTypes;
DashboardHeader.defaultProps = defaultProps;

export default DashboardHeader;
