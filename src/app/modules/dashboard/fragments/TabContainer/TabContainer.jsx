/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* components */
import Theme from 'theme/Theme';
import {
  Container,
  CenterTabs,
  Tab,
  TabBadge,
  TabText,
} from './TabContainer.styles';

const activeTheme = {
  border: Theme.border.dashboardTab,
  color: Theme.color.zoomBlack,
};

const theme = {
  color: Theme.color.aidsFondsRed,
};

const propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      route: PropTypes.string,
    }),
  ),
  tabCounts: PropTypes.shape({}),
  activeTab: PropTypes.string,
};
const defaultProps = {
  tabs: [],
  tabCounts: {},
  activeTab: '',
};

const TabContainer = ({ tabs, tabCounts, activeTab }) => (
  <Container>
    <CenterTabs>
      {tabs.slice(0, tabs.length - 1).map(tab => (
        <Tab key={tab.key}>
          <TabBadge>{tabCounts[tab.key]}</TabBadge>
          <TabText
            to={tab.route}
            theme={activeTab === tab.key ? activeTheme : theme}
          >
            {tab.label}
          </TabText>
        </Tab>
      ))}
    </CenterTabs>
    <Tab theme={{ marginLeft: 'auto', paddingRight: 0 }}>
      <TabBadge>{tabCounts[tabs[tabs.length - 1].key]}</TabBadge>
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
