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
} from 'modules/dashboard/DashboardModule.styles';
import SvgIconUser from 'assets/icons/IconUser';
import SvgIconSearch from 'assets/icons/IconSearch';
import TabContainer from './fragments/TabContainer/TabContainer';

const tabs = [
  {
    key: 'charts',
    label: 'Charts',
    route: '/dashboard/charts',
  },
  {
    key: 'data-sets',
    label: 'Data sets',
    route: '/dashboard/data-sets',
  },
  {
    key: 'focus-pages',
    label: 'Focus pages',
    route: '/dashboard/focus-pages',
  },
  {
    key: 'users',
    label: 'Users',
    route: '/dashboard/users',
  },
  {
    key: 'teams',
    label: 'Teams',
    route: '/dashboard/teams',
  },
  {
    key: 'trash',
    label: 'Trash',
    route: '/dashboard/trash',
  },
];

const tabCounts = {
  charts: 1,
  'data-sets': 1,
  'focus-pages': 1,
  users: 1,
  teams: 1,
  trash: 1,
};

const propTypes = {
  activeTab: PropTypes.string,
  greetingName: PropTypes.string,
};
const defaultProps = {
  activeTab: '',
  greetingName: '',
};

const DashboardModule = ({ activeTab, greetingName }) => (
  <ModuleContainer>
    <PageHeading>Zoom dashboard</PageHeading>
    <HeaderIcon>
      <SvgIconUser />
    </HeaderIcon>
    <HeaderGreeting>Welcome back {greetingName}</HeaderGreeting>
    <SearchBox placeholder={<SvgIconSearch />} />
    <TabContainer tabs={tabs} tabCounts={tabCounts} activeTab={activeTab} />
  </ModuleContainer>
);

DashboardModule.propTypes = propTypes;
DashboardModule.defaultProps = defaultProps;

export default DashboardModule;
