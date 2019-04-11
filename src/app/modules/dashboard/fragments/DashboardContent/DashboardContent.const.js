const Path = '/dashboard/';

export function data(users, teams, charts, dataSets, focusPages) {
  return [
    {
      label: 'Charts',
      path: Path + 'charts',
      count: charts.length
    },
    {
      label: 'Data sets',
      path: Path + 'data-sets',
      count: dataSets.length
    },
    {
      label: 'Focus pages',
      path: Path + 'focus-pages',
      count: 0
    },
    {
      label: 'Users',
      path: Path + 'users',
      count: users.length
    },
    {
      label: 'Teams',
      path: Path + 'teams',
      count: teams.length
    }
  ];
}

export default data;
