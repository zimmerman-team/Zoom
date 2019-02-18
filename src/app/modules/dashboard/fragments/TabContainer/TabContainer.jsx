/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* components */
import Theme from 'theme/Theme';
import TabBadge from './common/TabBadge';
import TabItem from './common/TabItem';
import {
  Container,
  TabItems,
  Tab,
//  TabBadge,
  TabText
} from './TabContainer.styles';


const activeTheme = {
  border: Theme.border.dashboardTab,
  color: Theme.color.zoomBlack
};

const theme = {
  color: Theme.color.aidsFondsRed
};

const propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      route: PropTypes.string
    })
  ),
  tabCounts: PropTypes.shape({}),
  activeTab: PropTypes.string
};
const defaultProps = {
  tabs: [],
  tabCounts: {},
  activeTab: ''
};

const TabContainer = ({ tabs, tabCounts, activeTab }) => (
  /*todo: see if it makes sense to make a re-usable component for component containers*/
  <Container>
    {/*FIXED: rename centertabs to something more descriptive*/}
    <TabItems>
      {tabs.slice(0, tabs.length - 1).map(tab => (
        <Tab key={tab.key}>
          <TabBadge label={tabCounts[tab.key]}/>
          <TabText
            to={tab.route}
            theme={activeTab === tab.key ? activeTheme : theme}
          >
            {tab.label}
          </TabText>
        </Tab>
      ))}
    </TabItems>

    {/*todo: lets minimize the use of inline styling*/}
    /*todo: make reusable component */}
    <Tab theme={{ marginLeft: 'auto', paddingRight: 0 }}>
      {/*fixed: make reusable component */}
      <TabBadge label= {tabCounts[tabs[tabs.length - 1].key]}/>
      <TabText
        to={tabs[tabs.length - 1].route}
        theme={activeTab === tabs[tabs.length - 1].key ? activeTheme : theme}
      >
        {tabs[tabs.length - 1].label}
      </TabText>
    </Tab>
  </Container>
);

TabContainer.propTypes = propTypes;
TabContainer.defaultProps = defaultProps;

export default TabContainer;
