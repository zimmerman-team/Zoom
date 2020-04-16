import filter from 'lodash/filter';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { paginate } from 'app/utils/genericUtils';

export function formatUsersData(data, initialLoad, page, sort, search) {
  let allUsers = data;
  if (initialLoad) {
    allUsers = data.map(d => {
      const name = isEmpty(d.user_metadata)
        ? d.email
        : `${get(d, 'user_metadata.firstName', '')} ${get(
            d,
            'user_metadata.lastName',
            ''
          )}`;
      return {
        id: d.user_id,
        name,
        role: get(d, 'app_metadata.authorization.roles[0]', '')
      };
    });
  }

  let paginatedUsers = [];

  if (search !== '') {
    paginatedUsers = filter(allUsers, item => {
      return (
        item.name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        item.role.toLowerCase().indexOf(search.toLowerCase()) > -1
      );
    });
  } else {
    paginatedUsers = allUsers;
  }

  paginatedUsers = paginate(
    paginatedUsers,
    10,
    page,
    [sort[0] === '-' ? sort.slice(1) : sort],
    sort[0] === '-'
  );

  return { allUsers, paginatedUsers };
}
