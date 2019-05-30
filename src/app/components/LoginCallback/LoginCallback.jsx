import React from 'react';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setUserIdToken } from 'services/actions/sync';
import { getCurrentUserRequest } from 'services/actions/authNodeBackend';

class Callback extends React.Component {
  componentDidMount = () => {
    this.props.auth0Client.handleAuthentication().then(results => {
      this.props.dispatch(setUserIdToken(results.idToken));
      this.props.dispatch(
        getCurrentUserRequest(
          {
            userId: results.idTokenPayload.sub
          },
          { Authorization: `Bearer ${results.idToken}` }
        )
      );
    });
  };

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
