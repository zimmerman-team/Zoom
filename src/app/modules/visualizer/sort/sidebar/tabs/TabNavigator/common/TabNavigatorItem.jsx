/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import shortid from 'shortid';
import theme from 'theme/Theme';
import { formPath } from 'modules/visualizer/VisualizerModule.utils';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled(NavLink)`
  height: 40px;
  width: calc(100% / 6);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.color.aidsFondsRed};
  &.active {
    background-color: ${theme.color.aidsFondsBlue};
  }
  &:hover {
    background-color: ${theme.color.aidsFondsBlue};
  }
`;

/*todo: set up props properly*/
const propTypes = {
  path: PropTypes.string,
  icon: PropTypes.node,
  code: PropTypes.string
};
const defaultProps = {};

const TabNavigatorItem = props => {
  return (
    <ComponentBase
      to={formPath(props.code, props.path, props.chart)}
      isActive={(match, location) => {
        const selectedTab = location.pathname.substr(
          location.pathname.lastIndexOf('/')
        );
        const tab = props.path.substr(props.path.lastIndexOf('/'));
        return selectedTab === tab;
      }}
    >
      {props.icon}
    </ComponentBase>
  );
};

TabNavigatorItem.propTypes = propTypes;
TabNavigatorItem.defaultProps = defaultProps;

export default TabNavigatorItem;
