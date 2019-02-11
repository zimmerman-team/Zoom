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
      }
    };
  });
}

export function formatTeamsTabData(data, sort, search) {
  const queriedData =
    search !== '' ? filter(data, d => d.name.indexOf(search) > -1) : data;
  const sortedData =
    sort[0] === '-'
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
      }
    };
  });
}
