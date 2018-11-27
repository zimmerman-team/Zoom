// @flow
import React from 'react';
import { Route, Switch } from 'fusion-plugin-react-router';
import ThemeSheet from './app/components/Theme/ThemeSheet';
import PageNotFound from './app/modules/pagenotfound/PageNotFound';

const root = (
  <React.Fragment>
    <Switch>
      <Route exact path="/" component={ThemeSheet} />
      <Route component={PageNotFound} />
    </Switch>
  </React.Fragment>
);

export default root;
