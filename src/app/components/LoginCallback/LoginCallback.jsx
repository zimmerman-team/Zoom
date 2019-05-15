import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import auth0Client from 'auth/Auth';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { getUserRequest } from 'services/actions/nodeBackend';

class Callback extends Component {
  componentDidMount() {
    auth0Client.handleAuthentication().then(results => {
      this.props.dispatch(
        getUserRequest({ authId: results.idTokenPayload.sub })
      );
    });
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.user.data, this.props.user.data))
      this.props.history.replace('/dashboard/charts');
  }

  render() {
    return <p>Loading profile...</p>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(withRouter(Callback));
