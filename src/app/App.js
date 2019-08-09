import React from 'react';
import { connect } from 'react-redux';
// import { Provider } from 'react-redux';
import JssProvider from 'react-jss/lib/JssProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { graphql, QueryRenderer } from 'react-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import auth0Client from 'auth/Auth';
import {
  createGenerateClassName,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';

/* actions */
import { setUserIdToken } from 'services/actions/sync';
import { getUserRequest } from 'services/actions/nodeBackend';
import { getCurrentUserRequest } from 'services/actions/authNodeBackend';

/* utils */
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

// Routes
import Routes from './Routes';
import { Grommet } from 'grommet/components/Grommet';
import { ZoomTheme } from 'styles/ZoomTheme';

/* global app components */
import AppBar from 'components/AppBar/AppBar';

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

import MainMenuDrawer from 'components/MainMenuDrawer/MainMenuDrawer';
import CookieNotice from 'components/CookieNotice/CookieNotice';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'production'
});

class App extends React.Component {
  state = {
    showSidebar: false,
    currentEnv: new Environment({
      network: Network.create(),
      store: new Store(new RecordSource())
    })
  };

  componentWillMount = () => {
    if (window.location.href.includes('/home/#')) {
      this.setState({ showSidebar: true });
    }
  };

  componentDidMount = () => {
    this.setState({
      currentEnv: new Environment({
        network: Network.create(this.fetchQuery),
        store: new Store(new RecordSource())
      })
    });
    if (window.location.pathname.indexOf('/callback') !== -1) {
      return;
    }
    try {
      auth0Client.silentAuth().then(results => {
        this.props.dispatch(
          getCurrentUserRequest({
            userId: results.idTokenPayload.sub
          })
        );
        this.props.dispatch(setUserIdToken(results.idToken));
        this.forceUpdate();
      });
    } catch (err) {
      // console.log(err);
    }
  };

  componentDidUpdate = prevProps => {
    if (
      !isEqual(this.props.user, prevProps.user) &&
      this.props.user &&
      this.props.user.authId
    ) {
      this.props.dispatch(getUserRequest({ authId: this.props.user.authId }));
      this.setState({
        currentEnv: new Environment({
          network: Network.create(this.fetchQuery),
          store: new Store(new RecordSource())
        })
      });
    }
  };

  fetchQuery = (operation, variables) => {
    let url = `${process.env.REACT_APP_GRAPHQL_HOST}/public-graphql/`;
    let headers = {
      'Content-Type': 'application/json'
    };
    if (get(this.props.user, 'idToken', null)) {
      url = `${process.env.REACT_APP_GRAPHQL_HOST}/graphql/`;
      headers = {
        Authorization: `Bearer ${this.props.user.idToken}`,
        'Content-Type': 'application/json'
      };
    }
    return fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        query: operation.text,
        variables
      })
    }).then(response => {
      return response.json();
    });
  };

  render = () => {
    return (
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <Grommet theme={ZoomTheme} style={{ height: '100%' }}>
            <QueryRenderer
              environment={this.state.currentEnv}
              query={graphql`
                query AppQuery {
                  ...ExplorePanelMediator_dropDownData
                  ...VizPaneMediator_dropDownData
                  ...HomeModuleMediator_indicatorAggregations
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
                        <AppBar
                          toggleSideBar={() =>
                            this.setState({
                              showSidebar: !this.state.showSidebar
                            })
                          }
                        />
                        <MainMenuDrawer
                          user={this.props.user}
                          auth0Client={auth0Client}
                          open={this.state.showSidebar}
                          toggleSideBar={() =>
                            this.setState({
                              showSidebar: !this.state.showSidebar
                            })
                          }
                        />
                        <Routes {...props} auth0Client={auth0Client} />
                      </React.Fragment>
                    </Router>
                  );
                }
                if (error) {
                  return (
                    <div>{get(error, 'source.errors[0].message', '')}</div>
                  );
                }
                return <div data-cy="loader2">Loading</div>;
              }}
              operation
            />
          </Grommet>
        </MuiThemeProvider>
      </JssProvider>
    );
  };
}

const mapStateToProps = state => {
  return {
    userAdded: state.userAdded,
    user: state.currentUser.data,
    userUpdated: state.userUpdated
  };
};

export default connect(mapStateToProps)(App);
