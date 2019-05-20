import React from 'react';
import { connect } from 'react-redux';
// import { Provider } from 'react-redux';
import JssProvider from 'react-jss/lib/JssProvider';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import { graphql, QueryRenderer } from 'react-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import auth0Client from 'auth/Auth';
import Analytics from 'react-router-ga';
import {
  createGenerateClassName,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import Cookies from 'universal-cookie';

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
          getCurrentUserRequest(
            {
              userId: results.idTokenPayload.sub
            },
            { Authorization: `Bearer ${results.idToken}` }
          )
        );
        this.props.dispatch(setUserIdToken(results.idToken));
        // this.props.dispatch(
        //   getUserRequest({ authId: results.idTokenPayload.sub })
        // );
        this.forceUpdate();
      });
    } catch (err) {
      // console.log(err);
    }
  };

  componentDidUpdate = prevProps => {
    if (!isEqual(this.props.currentUser, prevProps.currentUser)) {
      this.props.dispatch(
        getUserRequest({ authId: this.props.currentUser.authId })
      );
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
