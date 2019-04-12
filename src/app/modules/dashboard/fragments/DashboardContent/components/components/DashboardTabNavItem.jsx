/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import theme from 'theme/Theme';
// import {  TabBadge } from './DashboardTabNavItem.style';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.color.aidsFondsRed};
  border-bottom: 2px solid transparent;
  text-decoration: none;
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 14px;
  line-height: 1;
  padding-bottom: 5px;
  padding-left: 3px;
  padding-right: 3px;
  position: relative;

  &.active,
  &:hover {
    color: ${theme.color.zoomBlack};
    border-bottom: 2px solid ${theme.color.aidsFondsBlue};
  }

  &:before {
    background-color: red;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    font-size: 12px;
    font-family: ${theme.font.zoomFontFamOne};
    justify-content: center;
    align-items: center;
    color: white;
    content: '${props => props.count}';
    position: absolute;
    left: -15px;
    top: -13px;
  }
`;

const propTypes = {
  label: PropTypes.string,
  path: PropTypes.string
  // count: PropTypes.string
};
const defaultProps = {
  label: 'empty',
  path: '/empty',
  count: 0
};

const DashboardTabNavItem = props => {
  return (
    <ComponentBase
      to={props.path}
      isActive={(match, location) => {
        const selectedTab = location.pathname.substr(
          location.pathname.lastIndexOf('/')
        );
        const tab = props.path.substr(props.path.lastIndexOf('/'));
        return selectedTab === tab;
      }}
      count={props.count}
    >
      {props.label}
    </ComponentBase>
  );
};

DashboardTabNavItem.propTypes = propTypes;
DashboardTabNavItem.defaultProps = defaultProps;

export default DashboardTabNavItem;
