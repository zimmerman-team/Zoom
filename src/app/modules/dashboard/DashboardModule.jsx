/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* components */
import {
  ModuleContainer,
  PageHeading,
  SearchBox,
  ViewContainer,
  NoItems,
  Box
} from 'modules/dashboard/DashboardModule.styles';
import Searchbox from './fragments/Searchbox/Searchbox';
import TabContainer from './fragments/TabContainer/TabContainer';
import UsersTabView from './fragments/UsersTabView/UsersTabView';
import TeamsTabView from './fragments/TeamsTabView/TeamsTabView';
import DashboardHeader from 'modules/dashboard/fragments/DashboardHeader/DashboardHeader';
import GridListOptionsPane from './fragments/GridList/components/GridListOptionsPane/GridListOptionsPane';
import GridItem from './fragments/GridList/components/GridItem/GridItem';


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
    <DashboardHeader title="Zoom dashboard" userName={greetingName} />
    <Searchbox inputChange={changeSearchKeyword} />

    <Box>
      <section>
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
      </section>
      <GridListOptionsPane/>
      <section>
        <ViewContainer>
          {/*todo: evaluate if we can handle this in a simpler way by using react router*/}
          {/*{getTabView(*/}
            {/*users,*/}
            {/*teams,*/}
            {/*tabs,*/}
            {/*activeTab,*/}
            {/*isSortByOpen,*/}
            {/*setIsSortByOpen,*/}
            {/*setWrapperRef,*/}
            {/*sort,*/}
            {/*changeSortBy*/}
          {/*)}*/}
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
        </ViewContainer>
      </section>
    </Box>
  </ModuleContainer>
);

DashboardModule.propTypes = propTypes;
DashboardModule.defaultProps = defaultProps;

export default DashboardModule;
