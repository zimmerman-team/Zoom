// @flow
import React from 'react';
import { Route, Switch } from 'fusion-plugin-react-router';
import styled, { ThemeProvider } from 'styled-components';

import About from './app/modules/about/About';
import Home from './app/modules/home/Home';
import PageNotFound from './app/modules/pagenotfound/PageNotFound';
// @flow
import ZoomTheme from './app/styles/Theme';


const Box = styled.div`
  color: ${ZoomTheme.colors.primary.first};
  background-color: ${ZoomTheme.colors.primary.third};
`;

const root = (
  <ThemeProvider theme={{ mode: 'zoom' }}>
    <Box>
      <Switch>
        {/* <Route exact path="/" component={TopBar} /> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route component={PageNotFound} />
      </Switch>
    </Box>
  </ThemeProvider>
);

export default root;
