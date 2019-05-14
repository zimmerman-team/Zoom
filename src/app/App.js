import React from 'react';
import { connect } from 'react-redux';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  createGenerateClassName,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { graphql, QueryRenderer } from 'react-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import auth0Client from 'auth/Auth';
import Analytics from 'react-router-ga';

/* actions */
import * as nodeActions from 'services/actions/nodeBackend';

/* utils */
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

// Routes
import Routes from './Routes';
import { Grommet } from 'grommet/components/Grommet';
import { ZoomTheme } from 'styles/ZoomTheme';

/* global app components */
import AppBar from 'components/AppBar/AppBar';

import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from 'react-toasts';

import MainMenuDrawer from 'components/MainMenuDrawer/MainMenuDrawer';
import CookieNotice from 'components/CookieNotice/CookieNotice';

const theme = createMuiTheme({
  /*transitions: {
    // So we have `transition: none;` everywhere
    create: () => 'none'
  },*/
  typography: {
    useNextVariants: true
  },

  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true // No more ripple, on the whole application 💣!
    }
  }
});

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

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'production'
});

class App extends React.Component {
  state = {
    showSidebar: false
  };

  componentWillMount = () => {
    if (window.location.href.includes('/home/#')) {
      this.setState({ showSidebar: true });
    }
  };

  componentDidMount = () => {
    if (window.location.pathname.indexOf('/callback') !== -1) {
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
  };

  componentDidUpdate = prevProps => {
    // so this basically either adds a new user that has
    // signed in or updates their username and email

    if (!isEqual(this.props.user, prevProps.user)) {
      if (this.props.user.data) {
        // so we update the user
        auth0Client.getUserRole(this.props.user.data).then(role => {
          auth0Client.getUserGroup(null, this.props.user.data).then(groups => {
            const profile = auth0Client.getProfile();
            this.props.dispatch(
              nodeActions.updateUserRequest({
                firstName: get(
                  profile['https://auth.nyuki.io_user_metadata'],
                  'firstName',
                  ''
                ),
                lastName: get(
                  profile['https://auth.nyuki.io_user_metadata'],
                  'lastName',
                  ''
                ),
                username: profile.nickname,
                email: profile.email,
                authId: profile.sub,
                role,
                teams: groups.map(g => g.name)
              })
            );
          });
        });
      } else if (this.props.user.error.status === 404) {
        // so if a user was not found in our zoom backend after signing in ^
        // we add it as a new user

        // but first we get them user roles and groups, cause they need to be retrieved
        // in a very weird way
        const profile = auth0Client.getProfile();
        auth0Client.getUserRole({ authId: profile.sub }).then(role => {
          auth0Client
            .getUserGroup(null, { authId: profile.sub })
            .then(groups => {
              // and we finally make the call to add the user
              this.props.dispatch(
                nodeActions.addUserRequest({
                  username: profile.nickname,
                  email: profile.email,
                  authId: profile.sub,
                  role,
                  avatar: profile.picture,
                  firstName: get(
                    profile['https://auth.nyuki.io_user_metadata'],
                    'firstName',
                    ''
                  ),
                  lastName: get(
                    profile['https://auth.nyuki.io_user_metadata'],
                    'lastName',
                    ''
                  ),
                  teams: groups.map(g => g.name)
                })
              );
            });
        });
      }
    }
  };

  render = () => {
    return (
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <Grommet theme={ZoomTheme}>
            <QueryRenderer
              environment={modernEnvironment}
              query={graphql`
                query AppQuery {
                  ...ExplorePanelMediator_dropDownData
                  ...VizPaneMediator_dropDownData
                  ...HomeModuleMediator_indicatorAggregations
                  ...VisualizerModuleMediator_indicatorAggregations
                  ...CountryDetailMediator_indicatorAggregations
                  ...MetaDataMediator_dropDownData
                  ...CorrectErrorsMediator_fileCorrection
                  ...FocusModuleMediator_indicatorAggregations
                  ...DatasetMediator_metaData
                  ...DashboardMediator_Indicator
                }
              `}
              variables={{}}
              render={({ error, props }) => {
                if (props) {
                  return (
                    <Router>
                      <React.Fragment>
                        <CookieNotice />

                        {/* todo: replace toasts with material-ui snackbar https://material-ui.com/demos/snackbars/ */}
                        <ToastsContainer
                          store={ToastsStore}
                          position={ToastsContainerPosition.TOP_CENTER}
                        />
                        <AppBar
                          toggleSideBar={() =>
                            this.setState({
                              showSidebar: !this.state.showSidebar
                            })
                          }
                          auth0Client={auth0Client}
                        />
                        <MainMenuDrawer
                          auth0Client={auth0Client}
                          user={this.props.user}
                          open={this.state.showSidebar}
                          toggleSideBar={() =>
                            this.setState({
                              showSidebar: !this.state.showSidebar
                            })
                          }
                        />
                        <Analytics id="UA-134931738-2">
                          <Routes {...props} auth0Client={auth0Client} />
                        </Analytics>
                      </React.Fragment>
                    </Router>
                  );
                }
                return <div data-cy="loader2">Loading</div>;
              }}
            />
          </Grommet>
        </MuiThemeProvider>
      </JssProvider>
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
