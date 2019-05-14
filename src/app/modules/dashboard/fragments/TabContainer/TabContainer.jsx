/* base */
import React from 'react';
import PropTypes from 'prop-types';
/* components */
import Theme from 'theme/Theme';
import {
  CenterTabs,
  Container,
  Tab,
  TabBadge,
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
    {/*todo: rename centertabs to something more descriptive*/}
    <CenterTabs>
      {tabs.slice(0, tabs.length - 1).map(tab => (
        /*todo: make re-usable tab component */
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

    {/*todo: lets minimize the use of inline styling*/}
    <Tab theme={{ marginLeft: 'auto', paddingRight: 0 }}>
      {/*todo: make reusable component */}
      <TabBadge>{tabCounts[tabs[tabs.length - 1].key]}</TabBadge>
      {/*todo: make reusable component */}
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
