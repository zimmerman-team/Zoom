import React, { lazy, Suspense, Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

// Utils
import PageLoader from 'modules/common/pageloader/PageLoader';
// Modules regular import
/*import HomeModule from 'modules/home/HomeModule';
import IatiDetail from 'modules/IATI_Detail/IatiDetail';
import CountryDetailModule from 'modules/countrydetail/CountryDetailModule';*/

// always active
import AppBar from 'components/navigation/AppBar/AppBar';
import SideBar from 'components/navigation/SideBar/SideBar';
import Projects from 'modules/countrydetail/fragments/Projects';
import HumanRights from 'modules/countrydetail/fragments/HumanRights';
import TreeMap from 'components/charts/treemap/TreeMap';
// import HomeModuleMediator from 'mediators/ModuleMediators/HomeModuleMediator';

// Modules lazy load
const CountryDetailModule = lazy(() =>
  import('modules/countrydetail/CountryDetailModule'),
);
const HomeModuleMediator = lazy(() =>
  import('mediators/ModuleMediators/HomeModuleMediator'),
);
const IatiDetail = lazy(() => import('modules/IATI_Detail/IatiDetail'));

// Routes
const Routes = props => {
  return (
    <React.Fragment>
      {/*<Route path="/:path" render={() => <AppBar />} />*/}
      {/*<Route path="/:path" render={() => <SideBar />} />*/}
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route
            exact
            path="/home"
            render={() => (
              <HomeModuleMediator
                indicatorAggregations={props}
                allIndNames={props}
              />
            )}
          />
          <Route exact path="/country" render={() => <CountryDetailModule />} />
          <Route exact path="/iati" render={() => <IatiDetail />} />
          <Route exact path="/component" render={() => <TreeMap />} />
        </Switch>
      </Suspense>
    </React.Fragment>
  );
};

Routes.propTypes = {};

export default Routes;
