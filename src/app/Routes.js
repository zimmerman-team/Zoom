import React, { lazy, Suspense, Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

// Utils
import PageLoader from 'app/modules/common/pageloader/PageLoader';

// Modules
// import HomeModule from './modules/home/HomeModule';
const HomeModule = lazy(() => import('app/modules/home/HomeModule'));
const CountryDetailModule = lazy(() =>
  import('app/modules/countrydetail/CountryDetailModule'),
);
const NotFoundModule = lazy(() =>
  import('app/modules/common/404/NotFoundModule'),
);

// Routes
const Routes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route exact path="/home" render={() => <HomeModule />} />
        <Route exact path="/country" render={() => <CountryDetailModule />} />
        <Route render={() => NotFoundModule} />
      </Switch>
    </Suspense>
  );
};

Routes.propTypes = {};

export default Routes;
