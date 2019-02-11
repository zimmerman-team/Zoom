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
  NoItems
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
      value: PropTypes.string
    })
  ),
  sort: PropTypes.string,
  activeTab: PropTypes.string,
  changeSortBy: PropTypes.func,
  isSortByOpen: PropTypes.bool,
  setWrapperRef: PropTypes.func,
  greetingName: PropTypes.string,
  setIsSortByOpen: PropTypes.func,
  changeSearchKeyword: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.shape({})),
  teams: PropTypes.arrayOf(PropTypes.shape({}))
};
const defaultProps = {
  tabs: [],
  sort: '',
  activeTab: '',
  greetingName: '',
  changeSortBy: null,
  setWrapperRef: null,
  isSortByOpen: false,
  setIsSortByOpen: null,
  changeSearchKeyword: null,
  users: [],
  teams: []
};

const getTabView = (
  users,
  teams,
  tabs,
  tab,
  isSortByOpen,
  setIsSortByOpen,
  setWrapperRef,
  sort,
  changeSortBy
) => {
  switch (tab) {
    case tabs[0].key:
      return <NoItems>No items in {tabs[0].label}</NoItems>;
    case tabs[1].key:
      return <NoItems>No items in {tabs[1].label}</NoItems>;
    case tabs[2].key:
      return <NoItems>No items in {tabs[2].label}</NoItems>;
    case tabs[3].key:
      return (
        <UsersTabView
          sort={sort}
          users={users}
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
          teams={teams}
          changeSortBy={changeSortBy}
          isSortByOpen={isSortByOpen}
          setWrapperRef={setWrapperRef}
          setIsSortByOpen={setIsSortByOpen}
        />
      );
    case tabs[5].key:
      return <NoItems>No items in {tabs[5].label}</NoItems>;
    default:
      return <NoItems>No items</NoItems>;
  }
};

const DashboardModule = ({
  tabs,
  sort,
  users,
  teams,
  activeTab,
  greetingName,
  isSortByOpen,
  changeSortBy,
  setWrapperRef,
  setIsSortByOpen,
  changeSearchKeyword
}) => (
  <ModuleContainer>
    <PageHeading>Zoom dashboard</PageHeading>
    <HeaderIcon>
      <SvgIconUser />
    </HeaderIcon>
    <HeaderGreeting>Welcome back {greetingName}</HeaderGreeting>
    <SearchBox onChange={changeSearchKeyword} placeholder={<SvgIconSearch />} />
    <TabContainer
      tabs={tabs}
      tabCounts={{
        charts: 0,
        'data-sets': 0,
        'focus-pages': 0,
        users: users.length,
        teams: teams.length,
        trash: 0
      }}
      activeTab={activeTab}
    />
    <ViewContainer>
      {getTabView(
        users,
        teams,
        tabs,
        activeTab,
        isSortByOpen,
        setIsSortByOpen,
        setWrapperRef,
        sort,
        changeSortBy
      )}
    </ViewContainer>
  </ModuleContainer>
);

DashboardModule.propTypes = propTypes;
DashboardModule.defaultProps = defaultProps;

export default DashboardModule;
