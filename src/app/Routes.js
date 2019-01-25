import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// Utils
import PageLoader from 'modules/common/pageloader/PageLoader';
// always active
import ThemeSheet from 'components/theme/ThemeSheet';
import DataExplorePanel from 'components/DataExplorePane/DataExplorePanel';
import LoginCallback from 'components/LoginCallback/LoginCallback';
import DataMapperModule from 'modules/datamapper/DataMapperModule';
// Modules regular import
/*import HomeModule from 'modules/home/HomeModule';
import IatiDetail from 'modules/IATI_Detail/IatiDetail';
import CountryDetailModule from 'modules/countrydetail/CountryDetailModule';*/
// import HomeModuleMediator from 'mediators/ModuleMediators/HomeModuleMediator';

// Modules lazy load
const CountryDetailMediator = lazy(() =>
  import('mediators/ModuleMediators/CountryDetailMediator/CountryDetailMediator'),
);
const HomeModuleMediator = lazy(() =>
  import('mediators/ModuleMediators/HomeModuleMediator/HomeModuleMediator'),
);
const IatiDetailMediator = lazy(() =>
  import('mediators/ModuleMediators/IatiDetailMediator/IatiDetailMediator'),
);
const AddUserMediator = lazy(() =>
  import('mediators/ModuleMediators/AddUserMediator/AddUserMediator'),
);
const CreateTeamMediator = lazy(() =>
  import('mediators/ModuleMediators/CreateTeamMediator/CreateTeamMediator'),
);

const About = lazy(() => import('modules/about/About'));

// const ManMappingStep = lazy(() =>
//   import('modules/datamapper/components/ManMappingStep/ManMappingStep'),
// );

// Routes
const Routes = props => {
  return (
    <React.Fragment>
      {/*<Route path="/:path" render={() => <AppBar />} />*/}
      {/*<Route path="/:path" render={() => <SideBar />} />*/}
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route exact path="/callback" component={LoginCallback} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route
            exact
            path="/home"
            render={() => (
              <HomeModuleMediator
                indicatorAggregations={props}
                dropDownData={props}
              />
            )}
          />
          <Route
            exact
            path="/country/:iso2"
            render={() => (
              <CountryDetailMediator indicatorAggregations={props} />
            )}
          />
          <Route exact path="/iati" render={() => <IatiDetailMediator />} />
          <Route
            path="/iati-activity/:activity_id"
            render={() => <IatiDetailMediator />}
          />
          <Route
            path="/add-user"
            render={() =>
              props.auth0Client.isAuthenticated() &&
              props.auth0Client.isAdministrator() ? (
                <AddUserMediator auth0Client={props.auth0Client} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/create-team"
            render={() =>
              props.auth0Client.isAuthenticated() &&
              props.auth0Client.isAdministrator() ? (
                <CreateTeamMediator auth0Client={props.auth0Client} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route path="/about" render={() => <About />} />
          <Route path="/mapper" render={() => <DataMapperModule />} />
          <Route exact path="/theme" render={() => <ThemeSheet />} />
          <Route exact path="/component" render={() => <DataExplorePanel />} />
          {/*<Route exact path="/step" render={() => <ManMappingStep />} />*/}
        </Switch>
      </Suspense>
    </React.Fragment>
  );
};

Routes.propTypes = {};

export default Routes;
