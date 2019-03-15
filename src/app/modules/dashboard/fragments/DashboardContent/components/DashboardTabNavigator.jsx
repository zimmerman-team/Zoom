/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import shortid from 'shortid';
import theme from 'theme/Theme';
import DashboardTabNavItem from 'modules/dashboard/fragments/DashboardContent/components/components/DashboardTabNavItem';
import { data } from 'modules/dashboard/fragments/DashboardContent/DashboardContent.const';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: row;
  position: relative;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;

  &:first-child {
    width: 500px;
  }

  &:last-child {
    position: absolute;
    right: 0;
  }
`;

const propTypes = {
  navItems: PropTypes.array
};
const defaultProps = {
  navItems: data
};

const DashboardTabNavigator = props => {
  return (
    <ComponentBase>
      <Box>
        {props.navItems.map(item => (
          <DashboardTabNavItem
            path={item.path}
            key={shortid.generate()}
            label={item.label}
          />
        ))}
      </Box>
      <Box>
        <DashboardTabNavItem path="/dashboard/trash" label="Trash" />
      </Box>
    </ComponentBase>
  );
};

DashboardTabNavigator.propTypes = propTypes;
DashboardTabNavigator.defaultProps = defaultProps;

export default DashboardTabNavigator;
