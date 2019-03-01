/* base */
import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import NavLink from 'react-router-dom/es/NavLink';
import styled from 'styled-components';
import { formPath } from 'modules/visualizer/VisualizerModule.utils';
// import { formPath } from '../../scenes/Detail/DetailHelper';

/* styles */
// import styles from './TabNavigator.module.scss';
/* mock */

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  display: flex;
  list-style: none;
`;

const TabItem = styled(NavLink)`
  height: 40px;
  width: 40px;
  background-color: blue;
`;
const propTypes = {
  navItems: PropTypes.array
};
const defaultProps = {};

const TabNavigator = props => {
  // console.log()
  return (
    <ComponentBase>
      {props.navItems.map(item => (
        <TabItem
          to={formPath(props.code, item.path)}
          key={shortid.generate()}
          isActive={(match, location) => {
            const selectedTab = location.pathname.substr(
              location.pathname.lastIndexOf('/')
            );
            const tab = item.path.substr(item.path.lastIndexOf('/'));
            return selectedTab === tab;
          }}
        />
      ))}
    </ComponentBase>
  );
};

TabNavigator.propTypes = propTypes;
TabNavigator.defaultProps = defaultProps;

export default TabNavigator;
