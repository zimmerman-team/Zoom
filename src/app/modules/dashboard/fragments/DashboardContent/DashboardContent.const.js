import filter from 'lodash/filter';

const Path = '/dashboard/';

export function data(isAdmin, isSuperAdmin, users, teams, charts, dataSets) {
  const tabs = [
    {
      label: 'Charts',
      path: `${Path}charts`,
      count: charts.length
    },
    {
      label: 'Data sets',
      path: `${Path}data-sets`,
      count: dataSets.length,
      adminOnly: true
    },
    {
      label: 'Users',
      path: `${Path}users`,
      count: users.length
      // adminOnly: true
    },
    {
      label: 'Teams',
      path: `${Path}teams`,
      count: teams.length,
      adminOnly: true
    }
  ];

  return filter(tabs, t => {
    if (t.adminOnly) return isAdmin || isSuperAdmin;
    // if (t.superAdminOnly) return isSuperAdmin;
    return true;
  });
}

export default data;
