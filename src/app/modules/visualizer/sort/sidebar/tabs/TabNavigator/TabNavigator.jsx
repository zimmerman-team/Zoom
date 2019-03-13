/* base */
import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import styled from 'styled-components';
import TabNavigatorItem from 'modules/visualizer/sort/sidebar/tabs/TabNavigator/common/TabNavigatorItem';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  display: flex;
  list-style: none;
  align-self: flex-end;
  width: 320px;
`;

const propTypes = {
  navItems: PropTypes.array
};
const defaultProps = {};

const TabNavigator = props => {
  return (
    <ComponentBase>
      {props.navItems.map(item => (
        <TabNavigatorItem
          key={shortid.generate()}
          code={props.code}
          path={item.path}
          icon={item.icon}
        />
      ))}
    </ComponentBase>
  );
};

TabNavigator.propTypes = propTypes;
TabNavigator.defaultProps = defaultProps;

export default TabNavigator;
