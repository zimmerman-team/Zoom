/* base */
import React from 'react';
import { withRouter } from 'react-router-dom';

/* utils */
import get from 'lodash/get';

/* components */
import DashboardModule from 'modules/dashboard/DashboardModule';
import { formatUsersTabData, formatTeamsTabData } from 'utils/dashboardUtils';

/* consts */
import tabs from '__consts__/DashboardTabsConsts';

class DashboardMediator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      teams: [],
      sort: 'name:1',
      searchKeyword: '',
      isSortByOpen: false
    };

    /* todo: do we really need to do all the binding? see if functions can be converted to arrow functions */
    this.setUsers = this.setUsers.bind(this);
    this.reloadData = this.reloadData.bind(this);
    this.changeSortBy = this.changeSortBy.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.setIsSortByOpen = this.setIsSortByOpen.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.changeSearchKeyword = this.changeSearchKeyword.bind(this);
  }

  componentDidMount() {
    this.reloadData();

    /* todo: not sure if this is the best way to handle this, see if it can be refactored */
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  getAllUsers() {
    this.props.auth0Client.getAllUsers(
      this.setUsers,
      this.state.page,
      this.state.sort,
      this.state.searchKeyword !== ''
        ? ` AND name:${this.state.searchKeyword}*`
        : ''
    );
  }

  setUsers(data) {
    this.setState({
      users: formatUsersTabData(data)
    });
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
    this.setState(
      {
        sort: e.target.id
      },
      () => {
        this.reloadData('sort');
      }
    );
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ isSortByOpen: false });
    }
  }

  changeSearchKeyword(e) {
    this.setState(
      {
        searchKeyword: e.target.value
      },
      () => {
        this.reloadData();
      }
    );
  }

  reloadData(typeOfChange) {
    if (typeOfChange === 'sort' && this.props.match.params.tab === 'users') {
      this.getAllUsers();
    }
    if (typeOfChange !== 'sort') {
      this.getAllUsers();
      this.props.auth0Client.getUserGroups(this, 'teams');
    }
  }

  render() {
    return (
      <DashboardModule
        tabs={tabs}
        sort={this.state.sort}
        users={this.state.users}
        changeSortBy={this.changeSortBy}
        setWrapperRef={this.setWrapperRef}
        setIsSortByOpen={this.setIsSortByOpen}
        isSortByOpen={this.state.isSortByOpen}
        activeTab={this.props.match.params.tab}
        searchKeyword={this.state.searchKeyword}
        changeSearchKeyword={this.changeSearchKeyword}
        teams={formatTeamsTabData(
          this.state.teams,
          this.state.sort,
          this.state.searchKeyword
        )}
        greetingName={get(this.props.auth0Client.getProfile(), 'nickname', '')}
      />
    );
  }
}

export default withRouter(DashboardMediator);
