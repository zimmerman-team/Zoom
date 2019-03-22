import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import auth0Client from 'auth/Auth';
import { connect } from 'react-redux';
import * as nodeActions from 'services/actions/nodeBackend';

class Callback extends Component {
  componentDidMount() {
    auth0Client.handleAuthentication().then(results => {
      this.props.dispatch(
        nodeActions.getUserRequest({ authId: results.idTokenPayload.sub })
      );
      this.props.history.replace('/home');
    });
  }

  render() {
    return <p>Loading profile...</p>;
  }
}

export default connect(null)(withRouter(Callback));
