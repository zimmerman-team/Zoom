// @flow
import React from 'react';
import {Route, Switch} from 'fusion-plugin-react-router';

import Home from './pages/home.js';
import About from './pages/about.js';
import PageNotFound from './pages/pageNotFound.js';

const root = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route component={PageNotFound} />
  </Switch>
);

export default root;
