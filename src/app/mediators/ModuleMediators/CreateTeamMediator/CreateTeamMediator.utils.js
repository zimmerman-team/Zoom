import get from 'lodash/get';

export function formatUsersData(data) {
  return data.users.map(d => {
    return {
      id: d.user_id,
      name: get(d, 'name', d.nickname),
      role: get(d, 'app_metadata.authorization.roles[0]', ''),
    };
  });
}
