import React from 'react';
// import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
// import Grommet from 'grommet';
// import { grommet } from 'grommet/themes';
// Routes
import Routes from 'Routes';
import AppBar from 'components/navigation/AppBar/AppBar';
import SideBar from 'components/navigation/SideBar/SideBar';

// Store Configuration
// import createStore from './store';

// const THEME = grommet;
// const STORE = createStore();

class App extends React.Component {
  state = {
    showSidebar: false,
  };

  render() {
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
          <Routes />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
