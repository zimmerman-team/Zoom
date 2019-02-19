/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* components */
import Theme from 'theme/Theme';
import TabItem from './common/TabItem';
import { Container, TabItems } from './TabContainer.styles';

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
        <TabItem
          tab={tab}
          activeTab={activeTab}
          activeTheme={activeTheme}
          tabCounts={tabCounts}
          to={tab.route}
          textTheme={activeTab === tab.key ? activeTheme : theme}
        />
      ))}
    </TabItems>

    {tabs.slice(tabs.length - 1, tabs.length).map(tab => (
      <TabItem
        tab={tab}
        activeTab={activeTab}
        theme={{ marginLeft: 'auto', paddingRight: 0 }}
        tabCounts={tabCounts}
        to={tabs[tabs.length - 1].route}
        textTheme={
          activeTab === tabs[tabs.length - 1].key ? activeTheme : theme
        }
      />
    ))}
  </Container>
);

TabContainer.propTypes = propTypes;
TabContainer.defaultProps = defaultProps;

export default TabContainer;
