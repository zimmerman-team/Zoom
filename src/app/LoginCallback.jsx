import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import auth0Client from './Auth';

class Callback extends Component {
  componentDidMount() {
    auth0Client
      .handleAuthentication()
      .then(() => this.props.history.replace('/home'));
  }

  render() {
    return <p>Loading profile...</p>;
  }
}

export default withRouter(Callback);
