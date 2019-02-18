/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import TabBadge from './TabBadge';
import { Tab, TabText } from '../TabContainer.styles';

const propTypes = {
  tab: PropTypes.object,
};
const defaultProps = {};

const TabItem = props => {
  return (
    <Tab key={props.key}>
      <TabBadge label={props.tabCounts[props.key]}/>
      <TabText
        to={props.route}
        theme={props.activeTab === props.key ? props.activeTheme : theme}
      >
        {props.tab.label}
      </TabText>
    </Tab>);
};
TabItem.propTypes = propTypes;
TabItem.defaultProps = defaultProps;
export default TabItem;
