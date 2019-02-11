/* base */
import React from 'react';
import { withRouter } from 'react-router-dom';

/* utils */
import get from 'lodash/get';

/* components */
import DashboardModule from 'modules/dashboard/DashboardModule';

/* consts */
const tabs = [
  {
    key: 'charts',
    label: 'Charts',
    route: '/dashboard/charts'
  },
  {
    key: 'data-sets',
    label: 'Data sets',
    route: '/dashboard/data-sets'
  },
  {
    key: 'focus-pages',
    label: 'Focus pages',
    route: '/dashboard/focus-pages'
  },
  {
    key: 'users',
    label: 'Users',
    route: '/dashboard/users'
  },
  {
    key: 'teams',
    label: 'Teams',
    route: '/dashboard/teams'
  },
  {
    key: 'trash',
    label: 'Trash',
    route: '/dashboard/trash'
  }
];

const tabCounts = {
  charts: 0,
  'data-sets': 0,
  'focus-pages': 0,
  users: 1,
  teams: 1,
  trash: 0
};

class DashboardMediator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: 'name:1',
      isSortByOpen: false
    };

    this.changeSortBy = this.changeSortBy.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.setIsSortByOpen = this.setIsSortByOpen.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  setIsSortByOpen() {
    this.setState(prevState => ({
      isSortByOpen: !prevState.isSortByOpen
    }));
  }

  changeSortBy(e) {
    this.setState({ sort: e.target.id });
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ isSortByOpen: false });
    }
  }

  render() {
    return (
      <DashboardModule
        tabs={tabs}
        tabCounts={tabCounts}
        sort={this.state.sort}
        changeSortBy={this.changeSortBy}
        setWrapperRef={this.setWrapperRef}
        setIsSortByOpen={this.setIsSortByOpen}
        isSortByOpen={this.state.isSortByOpen}
        activeTab={this.props.match.params.tab}
        greetingName={get(this.props.auth0Client.getProfile(), 'nickname', '')}
      />
    );
  }
}

export default withRouter(DashboardMediator);
