import React from 'react';
// import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { graphql, QueryRenderer } from 'react-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

// Routes
import Routes from './Routes';
import AppBar from 'components/navigation/AppBar/AppBar';
import SideBar from 'components/navigation/SideBar/SideBar';

function fetchQuery(operation, variables) {
  return fetch(`${process.env.REACT_APP_GRAPHQL_HOST}/graphql/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

class App extends React.Component {
  state = {
    showSidebar: false,
  };

  render() {
    return (
      <QueryRenderer
        environment={modernEnvironment}
        query={graphql`
          query AppQuery {
            ...HomeModuleMediator_indicatorAggregations
            ...IndicatorDropMediator_allIndicatorNames
            ...CountryDetailMediator_indicatorAggregations
          }
        `}
        variables={{}}
        render={({ error, props }) => {
          if (props) {
            return (
              <Router>
                <React.Fragment>
                  <AppBar
                    toggleSideBar={() =>
                      this.setState({ showSidebar: !this.state.showSidebar })
                    }
                  />
                  <SideBar
                    open={this.state.showSidebar}
                    toggleSideBar={() =>
                      this.setState({ showSidebar: !this.state.showSidebar })
                    }
                  />
                  <Routes {...props} />
                </React.Fragment>
              </Router>
            );
          } else {
            return <div>Loading - 0</div>;
          }
        }}
      />
    );
  }
}

export default App;
