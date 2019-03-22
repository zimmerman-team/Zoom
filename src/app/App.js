import React from 'react';
import { connect } from 'react-redux';
// import { Provider } from 'react-redux';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import { graphql, QueryRenderer } from 'react-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import auth0Client from 'auth/Auth';
import Analytics from 'react-router-ga';

/* actions */
import * as nodeActions from 'services/actions/nodeBackend';

/* utils */
import isEqual from 'lodash/isEqual';

// Routes
import Routes from './Routes';
import { Grommet } from 'grommet';
import { ZoomTheme } from 'styles/ZoomTheme';

/* global app components */
import AppBar from 'components/AppBar/AppBar';

import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from 'react-toasts';

import TempDrawer from 'components/TempDrawer/TempDrawer';

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource())
});

function fetchQuery(operation, variables) {
  return fetch(`${process.env.REACT_APP_GRAPHQL_HOST}/graphql/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(response => {
    return response.json();
  });
}

class App extends React.Component {
  state = {
    showSidebar: false,
    authChanged: false,
    checkingSession: true
  };

  componentDidMount = () => {
    if (window.location.pathname.indexOf('/callback') !== -1) {
      this.setState({ checkingSession: false });
      return;
    }
    try {
      auth0Client.silentAuth().then(results => {
        this.props.dispatch(
          nodeActions.getUserRequest({ authId: results.idTokenPayload.sub })
        );
        this.forceUpdate();
      });
    } catch (err) {}
    this.setState({ checkingSession: false });
  };

  componentDidUpdate = prevProps => {
    // so this basically either adds a new user that has
    // signed in or updates their username and email

    if (!isEqual(this.props.user, prevProps.user)) {
      if (this.props.user.data) {
        const profile = auth0Client.getProfile();
        // so we update the user
        this.props.dispatch(
          nodeActions.updateUserRequest({
            username: profile.nickname,
            email: profile.name,
            authId: profile.sub
          })
        );
      } else if (this.props.user.error.status === 404) {
        // so if a user was not found in our zoom backend after signing in ^
        // we add it as a new user

        // but first we get them user roles and groups, cause they need to be retrieved
        // in a very weird way
        auth0Client.getUserRole().then(role => {
          auth0Client.getUserGroup().then(group => {
            const profile = auth0Client.getProfile();

            // and we finally make the call to add the user
            this.props.dispatch(
              nodeActions.addUserRequest({
                username: profile.nickname,
                email: profile.name,
                authId: profile.sub,
                role,
                avatar: profile.picture,
                firstName: '',
                lastName: '',
                team: group
              })
            );
          });
        });
      }
    }
  };

  render = () => {
    return (
      <Grommet theme={ZoomTheme}>
        <QueryRenderer
          environment={modernEnvironment}
          query={graphql`
            query AppQuery {
              ...VizPaneMediator_dropDownData
              ...HomeModuleMediator_indicatorAggregations
              ...VisualizerModuleMediator_indicatorAggregations
              ...CountryDetailMediator_indicatorAggregations
              ...ExplorePanelMediator_dropDownData
              ...MetaDataMediator_dropDownData
              ...CorrectErrorsMediator_fileCorrection
              ...FocusModuleMediator_indicatorAggregations
            }
          `}
          variables={{}}
          render={({ error, props }) => {
            if (props) {
              return (
                <Router>
                  <React.Fragment>
                    {/* todo: replace toasts with material-ui snackbar https://material-ui.com/demos/snackbars/ */}
                    <ToastsContainer
                      store={ToastsStore}
                      position={ToastsContainerPosition.TOP_CENTER}
                    />
                    <AppBar
                      toggleSideBar={() =>
                        this.setState({ showSidebar: !this.state.showSidebar })
                      }
                      auth0Client={auth0Client}
                    />
                    <TempDrawer
                      auth0Client={auth0Client}
                      open={this.state.showSidebar}
                      toggleSideBar={() =>
                        this.setState({ showSidebar: !this.state.showSidebar })
                      }
                    />
                    <Analytics id="UA-134931738-2">
                      <Routes {...props} auth0Client={auth0Client} />
                    </Analytics>
                  </React.Fragment>
                </Router>
              );
            } else {
              return <div>Loading</div>;
            }
          }}
        />
      </Grommet>
    );
  };
}

const mapStateToProps = state => {
  return {
    userUpdated: state.userUpdated,
    userAdded: state.userAdded,
    user: state.user
  };
};

export default connect(mapStateToProps)(App);
