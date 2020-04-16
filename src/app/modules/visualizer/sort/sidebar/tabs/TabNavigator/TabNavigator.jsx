/* base */
import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import TabNavigatorItem from 'app/modules/visualizer/sort/sidebar/tabs/TabNavigator/common/TabNavigatorItem';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  display: flex;
  list-style: none;
  align-self: flex-end;
  width: 320px;
  //box-shadow: 0 5px 7px rgba(0, 0, 0, 0.5);
`;

const propTypes = {
  navItems: PropTypes.array
};
const defaultProps = {};

const TabNavigator = props => {
  return (
    <ComponentBase>
      {props.navItems.map((item, index) => (
        <TabNavigatorItem
          disable={item.disable}
          chart={props.chart}
          key={item.path}
          code={props.code}
          path={item.path}
          icon={item.icon}
          data-cy={`tab-${index}`}
        />
      ))}
    </ComponentBase>
  );
};

TabNavigator.propTypes = propTypes;
TabNavigator.defaultProps = defaultProps;

export default TabNavigator;
