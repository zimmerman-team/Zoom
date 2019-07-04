module.exports = {
  // basically converts the sortby retrieved from the
  // dashboard frontend and converts it to
  // mongoose style sort
  getDashboardSortBy: (sortBy, auth0) => {
    switch (sortBy) {
      case 'title':
        return auth0 ? 'name:1' : { name: 1 };
      case '-title':
        return auth0 ? 'name:-1' : { name: -1 };
      case 'name:1':
        return auth0 ? 'name:1' : { name: 1 };
      case 'name:-1':
        return auth0 ? 'name:-1' : { name: -1 };
      case 'last_updated':
        return auth0 ? 'updated_at:1' : { last_updated: 1 };
      case '-last_updated':
        return auth0 ? 'updated_at:-1' : { last_updated: -1 };
      default:
        return auth0 ? 'name:1' : { name: 1 };
    }
  }
};
