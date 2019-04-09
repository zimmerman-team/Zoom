import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// Utils
import PageLoader from 'modules/common/pageloader/PageLoader';
// always active

import DataExplorePanel from 'components/Panes/DataExplorePane/DataExplorePane';
import LoginCallback from 'components/LoginCallback/LoginCallback';
import ProfileSettingsModule from './modules/profilesettings/ProfileSettingsModule';
import DataMapperModule from 'modules/datamapper/DataMapperModule';

// Modules lazy load
const CountryDetailMediator = lazy(() =>
  import('mediators/ModuleMediators/CountryDetailMediator/CountryDetailMediator')
);
const HomeModuleMediator = lazy(() =>
  import('mediators/ModuleMediators/HomeModuleMediator/HomeModuleMediator')
);

const FocusModuleMediator = lazy(() =>
  import('mediators/ModuleMediators/FocusModuleMediator/FocusModuleMediator')
);

const VisualizerModuleMediator = lazy(() =>
  import('mediators/ModuleMediators/VisualizerModuleMediator/VisualizerModuleMediator')
);

const IatiDetailMediator = lazy(() =>
  import('mediators/ModuleMediators/IatiDetailMediator/IatiDetailMediator')
);
const AddUserMediator = lazy(() =>
  import('mediators/ModuleMediators/AddUserMediator/AddUserMediator')
);
const EditUserMediator = lazy(() =>
  import('mediators/ModuleMediators/EditUserMediator/EditUserMediator')
);
const CreateTeamMediator = lazy(() =>
  import('mediators/ModuleMediators/CreateTeamMediator/CreateTeamMediator')
);
const EditTeamMediator = lazy(() =>
  import('mediators/ModuleMediators/EditTeamMediator/EditTeamMediator')
);
const PublicDashMediator = lazy(() =>
  import('mediators/DashboardMediators/PublicDashMediator')
);

const DatasetMediator = lazy(() =>
  import('mediators/ModuleMediators/DatasetMediator/DatasetMediator')
);

const About = lazy(() => import('modules/about/About'));

const DashboardMediator = lazy(() =>
  import('mediators/DashboardMediators/DashboardMediator')
);

// const ManMappingStep = lazy(() =>
//   import('modules/datamapper/fragments/ManMappingStep/ManMappingStep')
// );

// Routes
const Routes = props => {
  return (
    <React.Fragment>
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
            path="/focus/:iso2"
            render={() => (
              <FocusModuleMediator
                indicatorAggregations={props}
                dropDownData={props}
              />
            )}
          />
          <Route
            exact
            path="/visualizer/:chart/:code/:tab"
            render={() =>
              props.auth0Client.isAuthenticated() ? (
                <VisualizerModuleMediator
                  indicatorAggregations={props}
                  dropDownData={props}
                  auth0Client={props.auth0Client}
                />
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            exact
            path="/public/:chart/:code/:tab"
            render={() => (
              <VisualizerModuleMediator
                publicPage
                indicatorAggregations={props}
                dropDownData={props}
                auth0Client={props.auth0Client}
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
            exact
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
            exact
            path="/edit-user/:userId"
            render={() =>
              props.auth0Client.isAuthenticated() &&
              props.auth0Client.isAdministrator() ? (
                <EditUserMediator auth0Client={props.auth0Client} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
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
          <Route
            exact
            path="/edit-team/:teamId"
            render={() =>
              props.auth0Client.isAuthenticated() &&
              props.auth0Client.isAdministrator() ? (
                <EditTeamMediator auth0Client={props.auth0Client} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/dashboard"
            render={() => <Redirect to="/dashboard/charts" />}
          />
          <Route
            path="/dashboard/:tab"
            render={() =>
              props.auth0Client.isAuthenticated() &&
              props.auth0Client.isAdministrator() ? (
                <DashboardMediator auth0Client={props.auth0Client} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route path="/about" render={() => <About />} />
          <Route
            path="/mapper"
            render={() =>
              props.auth0Client.isAuthenticated() &&
              props.auth0Client.isAdministrator() ? (
                <DataMapperModule
                  dropDownData={props}
                  fileCorrection={props}
                  auth0Client={props.auth0Client}
                />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/dataset/:id"
            render={() =>
              props.auth0Client.isAuthenticated() &&
              props.auth0Client.isAdministrator() ? (
                <DatasetMediator
                  dropDownData={props}
                  auth0Client={props.auth0Client}
                  metaData={props}
                />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/public/chart-library"
            render={() => <PublicDashMediator />}
          />

          <Route
            exact
            path="/public/chart-library/:id/:charttype"
            // todo: render to appropriate chart pages
          />

          {/*todo: remove on PR*/}
          <Route
            exact
            path="/profile-settings"
            render={() => <ProfileSettingsModule />}
          />

          <Route exact path="/component" render={() => <DataExplorePanel />} />
          {/*<Route exact path="/step" render={() => <ManMappingStep />} />*/}
        </Switch>
      </Suspense>
    </React.Fragment>
  );
};

Routes.propTypes = {};

export default Routes;
