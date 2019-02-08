/* base */
import React from 'react';
import { withRouter } from 'react-router-dom';

/* utils */
import get from 'lodash/get';

/* components */
import DashboardModule from 'modules/dashboard/DashboardModule';

class DashboardMediator extends React.Component {
  render() {
    return (
      <DashboardModule
        activeTab={this.props.match.params.tab}
        greetingName={get(this.props.auth0Client.getProfile(), 'nickname', '')}
      />
    );
  }
}

export default withRouter(DashboardMediator);
