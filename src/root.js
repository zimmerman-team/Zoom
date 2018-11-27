// @flow
import React from 'react';
import { Route, Switch } from 'fusion-plugin-react-router';
import styled, { ThemeProvider } from 'styled-components';

import ThemeSheet from './app/components/theme/ThemeSheet';
import PageNotFound from './app/modules/pagenotfound/PageNotFound';
// import ZoomTheme from './app/styles/ZoomTheme';


const root = (
  <React.Fragment>
  {/*<ThemeProvider theme={{ mode: 'zoom' }}>*/}
    {/*<Box>*/}
      <Switch>
        <Route exact path="/" component={ThemeSheet} />
        <Route component={PageNotFound} />
      </Switch>
    {/*// </Box>*/}
  {/*// </ThemeProvider>*/}
  </React.Fragment>
);

export default root;
