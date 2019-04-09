import get from 'lodash/get';
import find from 'lodash/find';
import sortBy from 'lodash/sortBy';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';

export function formatUsersTabData(data, onEdit, onDelete) {
  return data.users.map(d => {
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

export function formatTeamsTabData(data, sort, search, users) {
  const queriedData =
    search !== '' ? filter(data, d => d.name.indexOf(search) > -1) : data;
  const sortedData =
    sort === 'name:-1'
      ? sortBy(queriedData, [sort]).reverse()
      : sortBy(queriedData, [sort]);
  return sortedData.map(d => {
    const values = get(d, 'description', '').split(',');
    return {
      id: d._id,
      title: get(d, 'name', ''),
      info: {
        'Created by': get(
          find(users, user => user.id === get(values, '[1]', '')),
          'title',
          ''
        ),
        'Publication date': get(values, '[0]', ''),
        Organisations: ''
      },
      onEdit: () => console.log('edit'),
      onView: () => console.log('view'),
      onDuplicate: () => console.log('duplicate'),
      onDelete: () => console.log('archive')
    };
  });
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
        Author: `${chart.author.firstName} ${chart.author.lastName}`,
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
