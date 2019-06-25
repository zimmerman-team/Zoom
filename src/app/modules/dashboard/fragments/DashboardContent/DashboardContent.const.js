const Path = '/dashboard/';

export function data(isAdmin, isSuperAdmin, users, teams, charts, dataSets) {
  return [
    {
      label: 'Charts',
      path: `${Path}charts`,
      count: charts.length
    },
    {
      label: 'Data sets',
      path: `${Path}data-sets`,
      count: dataSets.length,
      adminOnly: true,
      moderatorAllowed: true
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
}

export default data;
