/* base */
import React from 'react';
import PropTypes from 'prop-types';
import Theme from 'theme/Theme';
import TabBadge from './TabBadge';
import { Tab, TabText } from '../TabContainer.styles';

const propTypes = {
  tab: PropTypes.object,
  tabCounts: PropTypes.array,
  activeTab: PropTypes.string,
  activeTheme: PropTypes.object,
  to: PropTypes.string,
  textTheme: PropTypes.string
};

const defaultProps = {};

const TabItem = props => {
  return (
    <Tab key={props.tab.key}>
      <TabBadge label={props.tabCounts[props.tab.key]} />
      <TabText
        to={props.tab.route}
        textTheme={
          props.activeTab === props.tab.key
            ? props.activeTheme
            : Theme.color.aidsFondsRed
        }
      >
        {props.tab.label}
      </TabText>
    </Tab>
  );
};

TabItem.propTypes = propTypes;
TabItem.defaultProps = defaultProps;
export default TabItem;
