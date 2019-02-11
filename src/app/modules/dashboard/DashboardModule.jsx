/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* components */
import {
  ModuleContainer,
  PageHeading,
  HeaderIcon,
  HeaderGreeting,
  SearchBox,
  ViewContainer,
} from 'modules/dashboard/DashboardModule.styles';
import SvgIconUser from 'assets/icons/IconUser';
import SvgIconSearch from 'assets/icons/IconSearch';
import TabContainer from './fragments/TabContainer/TabContainer';
import UsersTabView from './fragments/UsersTabView/UsersTabView';
import TeamsTabView from './fragments/TeamsTabView/TeamsTabView';

const propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  tabCounts: PropTypes.shape({}),
  sort: PropTypes.string,
  activeTab: PropTypes.string,
  changeSortBy: PropTypes.func,
  isSortByOpen: PropTypes.bool,
  setWrapperRef: PropTypes.func,
  greetingName: PropTypes.string,
  setIsSortByOpen: PropTypes.func,
};
const defaultProps = {
  tabs: [],
  tabCounts: [],
  sort: '',
  activeTab: '',
  greetingName: '',
  changeSortBy: null,
  setWrapperRef: null,
  isSortByOpen: false,
  setIsSortByOpen: null,
};

const getTabView = (
  tabs,
  tab,
  isSortByOpen,
  setIsSortByOpen,
  setWrapperRef,
  sort,
  changeSortBy,
) => {
  switch (tab) {
    case tabs[0].key:
      return null;
    case tabs[1].key:
      return null;
    case tabs[2].key:
      return null;
    case tabs[3].key:
      return (
        <UsersTabView
          sort={sort}
          changeSortBy={changeSortBy}
          isSortByOpen={isSortByOpen}
          setWrapperRef={setWrapperRef}
          setIsSortByOpen={setIsSortByOpen}
        />
      );
    case tabs[4].key:
      return (
        <TeamsTabView
          sort={sort}
          changeSortBy={changeSortBy}
          isSortByOpen={isSortByOpen}
          setWrapperRef={setWrapperRef}
          setIsSortByOpen={setIsSortByOpen}
        />
      );
    case tabs[5].key:
      return null;
    default:
      return null;
  }
};

const DashboardModule = ({
  tabs,
  tabCounts,
  activeTab,
  greetingName,
  isSortByOpen,
  setIsSortByOpen,
  setWrapperRef,
  sort,
  changeSortBy,
}) => (
  <ModuleContainer>
    <PageHeading>Zoom dashboard</PageHeading>
    <HeaderIcon>
      <SvgIconUser />
    </HeaderIcon>
    <HeaderGreeting>Welcome back {greetingName}</HeaderGreeting>
    <SearchBox placeholder={<SvgIconSearch />} />
    <TabContainer tabs={tabs} tabCounts={tabCounts} activeTab={activeTab} />
    <ViewContainer>
      {getTabView(
        tabs,
        activeTab,
        isSortByOpen,
        setIsSortByOpen,
        setWrapperRef,
        sort,
        changeSortBy,
      )}
    </ViewContainer>
  </ModuleContainer>
);

DashboardModule.propTypes = propTypes;
DashboardModule.defaultProps = defaultProps;

export default DashboardModule;
