import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import filter from 'lodash/filter';

export function formatUsersTabData(data) {
  return data.users.map(d => {
    return {
      id: d.user_id,
      title: get(d, 'name', get(d, 'nickname', d.email)),
      info: {
        Role: get(d, 'app_metadata.authorization.roles[0]', ''),
        'Mapped data sets': 0,
        Charts: 0,
        Twitter: ''
      },
      onEdit: () => console.log('edit'),
      onView: () => console.log('view'),
      onDuplicate: () => console.log('duplicate'),
      onDelete: () => console.log('archive')
    };
  });
}

export function formatTeamsTabData(data, sort, search) {
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
        'Created by': get(values, '[1]', ''),
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
export function formatChartData(charts, history, remove) {
  return charts.map(chart => {
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
      onEdit: () => history.push(`/visualizer/${chart.type}/${chart._id}/edit`),
      onView: () =>
        history.push(`/visualizer/${chart.type}/${chart._id}/preview`),
      onDuplicate: () => console.log('duplicate'),
      onDelete: () => remove(chart._id)
    };
  });
}

// formats chart data for the dashboard
export function formatDatasets(datasets) {
  return datasets.map(dataset => {
    let shared = '';
    if (dataset.team.length > 0) shared = shared.concat(dataset.team);
    if (dataset._public)
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
      onEdit: () => console.log('edit'),
      onView: () => console.log('preview'),
      onDuplicate: () => console.log('duplicate'),
      onDelete: () => console.log('delete')
    };
  });
}
