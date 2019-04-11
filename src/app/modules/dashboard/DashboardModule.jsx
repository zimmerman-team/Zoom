/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* components */
import { ModuleContainer } from 'modules/dashboard/DashboardModule.styles';
import DashboardContent from 'modules/dashboard/fragments/DashboardContent/DashboardContent';
import DashboardHeader from './fragments/DashboardHeader/DashboardHeader';
import Searchbox from 'modules/dashboard/fragments/Searchbox/Searchbox';
import Pagination from 'components/Pagination/Pagination';

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
  onEnterPressed: PropTypes.func,
  setIsSortByOpen: PropTypes.func,
  changeSearchKeyword: PropTypes.func,
  loading: PropTypes.bool,
  users: PropTypes.arrayOf(PropTypes.shape({})),
  teams: PropTypes.arrayOf(PropTypes.shape({})),
  activeTab: PropTypes.string,
  totalPages: PropTypes.number,
  changePage: PropTypes.func
};
const defaultProps = {
  tabs: [],
  sort: '',
  activeTab: '',
  greetingName: '',
  loading: false,
  changeSortBy: null,
  setWrapperRef: null,
  onEnterPressed: null,
  isSortByOpen: false,
  setIsSortByOpen: null,
  changeSearchKeyword: null,
  users: [],
  teams: [],
  activeTab: 'charts',
  totalPages: 0,
  changePage: null
};

const DashboardModule = ({
  loading,
  page,
  sort,
  users,
  datasets,
  charts,
  teams,
  activeTab,
  greetingName,
  isSortByOpen,
  onEnterPressed,
  changeSortBy,
  setWrapperRef,
  setIsSortByOpen,
  changeSearchKeyword,
  navItems,
  totalPages,
  changePage
}) => (
  <ModuleContainer>
    <DashboardHeader
      userName={greetingName}
      title="Zoom dashboard"
      message="Welcome back"
    />

    <Searchbox
      inputChange={changeSearchKeyword}
      onEnterPressed={onEnterPressed}
    />

    {/*todo: sorting logic must be refactored/fixed*/}
    <DashboardContent
      loading={loading}
      onEnterPressed={onEnterPressed}
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
    <Pagination
      pageCount={totalPages}
      changePage={changePage}
      forcePage={page}
    />
  </ModuleContainer>
);

DashboardModule.propTypes = propTypes;
DashboardModule.defaultProps = defaultProps;

export default DashboardModule;
