// @flow
import React from 'react';
import { Route, Switch } from 'fusion-plugin-react-router';
import ThemeSheet from './app/components/theme/ThemeSheet';
import BaseModule from './app/components/module/BaseModule/BaseModule';
import PageNotFound from './app/modules/pagenotfound/PageNotFound';

const root = (
  <React.Fragment>
    <Switch>
      <Route exact path="/" component={ThemeSheet} />
      <Route exact path="/helmet" component={BaseModule} />
      <Route component={PageNotFound} />
    </Switch>
  </React.Fragment>
);

export default root;
