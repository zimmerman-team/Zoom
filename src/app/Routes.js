import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

// Utils
import PageLoader from './modules/common/pageloader/PageLoader';

// Modules
const HomeModule = lazy(() => import('./modules/home/HomeModule'));
const NotFoundModule = lazy(() =>
  import('./modules/common/404/NotFoundModule'),
);

// Routes
const Routes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route
          exact
          path="/home"
          render={props => {
            <HomeModule {...props} />;
          }}
        />
        <Route component={NotFoundModule} />
      </Switch>
    </Suspense>
  );
};

Routes.propTypes = {
  location: PropTypes.object, // React Router Passed Props
};

export default Routes;
