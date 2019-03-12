/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import { PageHeading } from 'modules/dashboard/DashboardModule.styles';
import UserGreeting from 'modules/dashboard/fragments/DashboardHeader/component/UserGreeting/UserGreeting';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const propTypes = {
  userName: PropTypes.string,
  title: PropTypes.string
};
const defaultProps = {
  userName: 'empty',
  title: 'empty'
};

const DashboardHeader = props => {
  return (
    <ComponentBase>
      <PageHeading>Zoom dashboard</PageHeading>
      <UserGreeting message="Welcome back" user={props.userName} />
    </ComponentBase>
  );
};

DashboardHeader.propTypes = propTypes;
DashboardHeader.defaultProps = defaultProps;

export default DashboardHeader;
