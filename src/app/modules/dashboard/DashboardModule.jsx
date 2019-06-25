/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
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
  trashCharts: PropTypes.array,
  greetingName: PropTypes.string,
  onEnterPressed: PropTypes.func,
  setIsSortByOpen: PropTypes.func,
  changeSearchKeyword: PropTypes.func,
  removeAll: PropTypes.func,
  loading: PropTypes.bool,
  users: PropTypes.arrayOf(PropTypes.shape({})),
  teams: PropTypes.arrayOf(PropTypes.shape({})),
  totalPages: PropTypes.number,
  changePage: PropTypes.func,
  isSuperAdmin: PropTypes.bool,
  isAdministrator: PropTypes.bool
};
const defaultProps = {
  tabs: [],
  sort: '',
  greetingName: '',
  loading: false,
  changeSortBy: null,
  setWrapperRef: null,
  onEnterPressed: null,
  isSortByOpen: false,
  setIsSortByOpen: null,
  changeSearchKeyword: null,
  removeAll: null,
  users: [],
  teams: [],
  trashCharts: [],
  activeTab: 'charts',
  totalPages: 0,
  changePage: null,
  isSuperAdmin: false,
  isAdministrator: false
};

const DashboardModule = ({
  loading,
  page,
  sort,
  users,
  datasets,
  trashCharts,
  charts,
  teams,
  activeTab,
  greetingName,
  isSortByOpen,
  onEnterPressed,
  removeAll,
  changeSortBy,
  setWrapperRef,
  setIsSortByOpen,
  changeSearchKeyword,
  navItems,
  totalPages,
  changePage,
  isSuperAdmin,
  isAdministrator,
  isModerator,
  auth0Client
}) => (
  <ModuleContainer>
    <Helmet>
      <title>Zoom - Dashboard</title>
    </Helmet>
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
      trashCharts={trashCharts}
      removeAll={removeAll}
      teams={teams}
      isSortByOpen={isSortByOpen}
      changeSortBy={changeSortBy}
      setWrapperRef={setWrapperRef}
      setIsSortByOpen={setIsSortByOpen}
      activeTab={activeTab}
      sort={sort}
      navItems={navItems}
      isAdministrator={isAdministrator}
      isSuperAdmin={isSuperAdmin}
      isModerator={isModerator}
      auth0Client={auth0Client}
    />
    {totalPages > 0 && (
      <Pagination
        pageCount={totalPages}
        changePage={changePage}
        forcePage={page}
      />
    )}
  </ModuleContainer>
);

DashboardModule.propTypes = propTypes;
DashboardModule.defaultProps = defaultProps;

export default DashboardModule;
