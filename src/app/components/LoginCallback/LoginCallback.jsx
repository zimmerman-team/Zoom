import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import auth0Client from 'auth/Auth';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { getCurrentUserRequest } from 'services/actions/authNodeBackend';

class Callback extends Component {
  componentDidMount() {
    auth0Client.handleAuthentication().then(results => {
      this.props.dispatch(
        getCurrentUserRequest(
          {
            userId: results.idTokenPayload.sub
          },
          { Authorization: `Bearer ${results.idToken}` }
        )
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
    user: state.currentUser
  };
};

export default connect(mapStateToProps)(withRouter(Callback));
