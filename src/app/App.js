import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grommet from 'grommet';
import { grommet } from 'grommet/themes';
// Routes
import Routes from './Routes';

// Store Configuration
import createStore from './store';

const THEME = grommet;
const STORE = createStore();

const App = () => {
  return (
    <Grommet theme={THEME}>
      <Provider store={STORE}>
        <Router>
          <Routes />
        </Router>
      </Provider>
    </Grommet>
  );
};

export default App;
