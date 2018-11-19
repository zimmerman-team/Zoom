// @flow
import React from 'react';
import { Route, Switch } from 'fusion-plugin-react-router';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'styled-theming';
import ZoomTheme from './app/styles/Theme';
import Home from './app/modules/home/Home';
import About from './app/modules/about/About';
import PageNotFound from './app/modules/pagenotfound/PageNotFound';

const boxBackgroundColor = theme('mode', {
  zoom: ZoomTheme.colors.primary.third,
  dark: '#000',
});

const Box = styled.div`
  color: ${ZoomTheme.colors.primary.first};
  background-color: ${ZoomTheme.colors.primary.third};
`;

const root = (
  <ThemeProvider theme={{ mode: 'zoom' }}>
    <Box>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route component={PageNotFound} />
      </Switch>
    </Box>
  </ThemeProvider>
);

export default root;
