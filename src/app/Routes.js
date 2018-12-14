import React, { lazy, Suspense, Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

// Utils
import PageLoader from 'modules/common/pageloader/PageLoader';
import AppBar from 'components/navigation/AppBar/AppBar';

// Modules

const CountryDetailModule = lazy(() =>
  import('modules/countrydetail/CountryDetailModule'),
);

const IatiDetail = lazy(() => import('modules/IATI_Detail/IatiDetail'));
const NotFoundModule = lazy(() => import('modules/common/404/NotFoundModule'));

// Routes
const Routes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Route path="/:path" render={() => <AppBar />} />
      <Switch>
        {/*<Route exact path="/" render={() => <Redirect to="/country" />} />*/}
        {/*<Route exact path="/home" render={() => <HomeModule />} />*/}

        <Route exact path="/country" render={() => <CountryDetailModule />} />
        <Route exact path="/iati" render={() => <IatiDetail />} />
        <Route render={() => NotFoundModule} />
      </Switch>
    </Suspense>
  );
};

Routes.propTypes = {};

export default Routes;
