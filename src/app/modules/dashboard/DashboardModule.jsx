/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* components */
import {
  ModuleContainer,
  SearchBox
} from 'modules/dashboard/DashboardModule.styles';
import SvgIconSearch from 'assets/icons/IconSearch';
import DashboardContent from 'modules/dashboard/fragments/DashboardContent/DashboardContent';
import DashboardHeader from './fragments/DashboardHeader/DashboardHeader';

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

const DashboardModule = ({
  tabs,
  sort,
  users,
  datasets,
  charts,
  teams,
  activeTab,
  greetingName,
  isSortByOpen,
  changeSortBy,
  setWrapperRef,
  setIsSortByOpen,
  changeSearchKeyword,
  navItems
}) => (
  <ModuleContainer>
    <DashboardHeader
      userName={greetingName}
      title="Zoom dashboard"
      message="Welcome back"
    />
    <SearchBox onChange={changeSearchKeyword} placeholder={<SvgIconSearch />} />

    {/*todo: sorting logic must be refactored/fixed*/}
    <DashboardContent
      users={users}
      charts={charts}
      datasets={datasets}
      teams={teams}
      isSortByOpen={isSortByOpen}
      changeSortBy={changeSortBy}
      setWrapperRef={setWrapperRef}
      setIsSortByOpen={setIsSortByOpen}
      activeTab={activeTab}
      sort={sort}
      navItems={navItems}
    />
  </ModuleContainer>
);

DashboardModule.propTypes = propTypes;
DashboardModule.defaultProps = defaultProps;

export default DashboardModule;
