import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import { paginate } from './genericUtils';

export function formatUsersTabData(
  data,
  initialLoad,
  page,
  sort,
  search,
  onEdit,
  onDelete
) {
  let allUsers = data;

  if (initialLoad) {
    allUsers = data.users.map(d => {
      const title = !isEmpty(d.user_metadata)
        ? `${get(d.user_metadata, 'firstName', '')} ${get(
            d.user_metadata,
            'lastName',
            ''
          )}`
        : d.email;
      return {
        title,
        id: d.user_id,
        info: {
          Role: get(d, 'app_metadata.authorization.roles[0]', ''),
          'Mapped data sets': 0,
          Charts: 0,
          Twitter: ''
        },
        onEdit: () => onEdit(d.user_id),
        onView: () => console.log('view'),
        onDuplicate: () => console.log('duplicate'),
        onDelete: () => onDelete(d.user_id)
      };
    });
  }

  let paginatedUsers = [];

  if (search !== '') {
    paginatedUsers = filter(allUsers, item => {
      return item.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  } else {
    paginatedUsers = allUsers;
  }

  paginatedUsers = paginate(
    paginatedUsers,
    12,
    page,
    sort[0] === '-' ? sort.slice(1) : sort,
    sort[0] === '-'
  );

  return { allUsers, users: paginatedUsers };
}

export function formatTeamsTabData(
  data,
  initialLoad,
  page,
  sort,
  search,
  onEdit,
  onDelete
) {
  let allTeams = data;

  if (initialLoad) {
    allTeams = data.map(d => {
      const values = get(d, 'description', '').split(',');
      return {
        id: d._id,
        title: get(d, 'name', ''),
        info: {
          'Created by': get(values, '[1]', ''),
          'Publication date': get(values, '[0]', ''),
          Organisations: ''
        },
        onEdit: () => onEdit(d._id),
        onView: () => console.log('view'),
        onDuplicate: () => console.log('duplicate'),
        onDelete: () => onDelete(d._id)
      };
    });
  }

  let paginatedTeams = [];

  if (search !== '') {
    paginatedTeams = filter(allTeams, item => {
      return item.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  } else {
    paginatedTeams = allTeams;
  }

  paginatedTeams = paginate(
    paginatedTeams,
    12,
    page,
    sort[0] === '-' ? sort.slice(1) : sort,
    sort[0] === '-'
  );

  return { allTeams, teams: paginatedTeams };
}

// formats chart data for the dashboard
export function formatChartData(charts, userId, history, remove) {
  // so basically when we have paginaton
  // the count will be returned as count and the
  // data will be in charts variable
  // otherwise the charts will just be an array
  const chartz = charts.charts ? charts.charts : charts;

  return chartz.map(chart => {
    let shared = '';
    if (chart.team.length > 0) shared = shared.concat(chart.team);
    if (chart._public)
      shared =
        shared.length > 0
          ? shared.concat(', ').concat('Public')
          : shared.concat('Public');
    let dataSources = '';

    chart.dataSources.forEach((source, index) => {
      if (index) dataSources = dataSources.concat(', ').concat(source);
      else dataSources = source;
    });

    let onEdit = undefined;
    let onView = undefined;
    let onDuplicate = () => console.log('duplicate');
    let onDelete = undefined;

    if (history && remove) {
      onView = () => history.push(`/public/${chart.type}/${chart._id}/preview`);

      if (chart.author.authId === userId && remove) {
        onEdit = () =>
          history.push(`/visualizer/${chart.type}/${chart._id}/edit`);
        onView = () =>
          history.push(`/visualizer/${chart.type}/${chart._id}/preview`);
        onDelete = () => remove(chart._id);
      }
    }

    return {
      id: chart._id,
      title: chart.name,
      info: {
        Author: chart.author.username,
        'Publication date': chart.created.substring(
          0,
          chart.created.indexOf('T')
        ),
        Updated: chart.last_updated.substring(
          0,
          chart.last_updated.indexOf('T')
        ),
        Shared: shared,
        'Type of chart': chart.type,
        'Data sources': dataSources
      },
      chartType: chart.type,
      onEdit,
      onView,
      onDuplicate,
      onDelete
    };
  });
}

// formats chart data for the dashboard
export function formatDatasets(datasets, history) {
  return datasets.map(dataset => {
    let shared = '';
    if (dataset.team.length > 0 && dataset.team !== 'none')
      shared = shared.concat(dataset.team);

    if (dataset.public)
      shared =
        shared.length > 0
          ? shared.concat(', ').concat('Public')
          : shared.concat('Public');

    return {
      id: dataset.datasetId,
      title: dataset.name,
      info: {
        'Publication date': dataset.created
          ? dataset.created.substring(0, dataset.created.indexOf('T'))
          : '',
        Updated: dataset.last_updated
          ? dataset.last_updated.substring(0, dataset.last_updated.indexOf('T'))
          : '',
        Shared: shared,
        'Data sources': dataset.dataSource
      },
      onEdit: () => history.push(`/dataset/${dataset.datasetId}`),
      onDelete: () => console.log('delete')
    };
  });
}
