// @flow
import React from 'react';
import { Route, Switch } from 'fusion-plugin-react-router';

import Home from './app/modules/home/Home';
import About from './app/modules/about/About';
import PageNotFound from './app/modules/pagenotfound/PageNotFound';

const root = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route component={PageNotFound} />
  </Switch>
);

export default root;
