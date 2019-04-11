module.exports = {
  // basically converts the sortby retrieved from the
  // dashboard frontend and converts it to
  // mongoose style sort
  getDashboardSortBy: sortBy => {
    switch (sortBy) {
      case 'title':
        return { name: 1 };
      case '-title':
        return { name: -1 };
      case 'name:1':
        return { name: 1 };
      case 'name:-1':
        return { name: -1 };
      default:
        return { name: 1 };
    }
  }
};
