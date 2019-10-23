import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
// Utils
import get from 'lodash/get';
import PageLoader from 'modules/common/pageloader/PageLoader';
// always active

import DataExplorePanel from 'components/Panes/DataExplorePane/DataExplorePane';
import LoginCallback from 'components/LoginCallback/LoginCallback';
import ProfileSettingsModule from './modules/profilesettings/ProfileSettingsModule';
import DataMapperModule from 'modules/datamapper/DataMapperModule';

/* consts */
import userRoles from '__consts__/UserRoleConst';

// Modules lazy load
/*const CountryDetailMediator = lazy(() =>
  import(
    'mediators/ModuleMediators/CountryDetailMediator/CountryDetailMediator'
  )
);*/

import CountryDetailMediator from 'mediators/ModuleMediators/CountryDetailMediator/CountryDetailMediator';

/*
const HomeModule = lazy(() =>
  import('modules/home/HomeModule')
);
*/

import HomeModule from 'modules/home/HomeModule';

/*
const VisualizerModuleMediator = lazy(() =>
  import(
    'mediators/ModuleMediators/VisualizerModuleMediator/VisualizerModuleMediator'
  )
);
*/

import VisualizerModuleMediator from 'mediators/ModuleMediators/VisualizerModuleMediator/VisualizerModuleMediator';

/*
const IatiDetailMediator = lazy(() =>
  import('mediators/ModuleMediators/IatiDetailMediator/IatiDetailMediator')
);
*/

import IatiDetailMediator from 'mediators/ModuleMediators/IatiDetailMediator/IatiDetailMediator';

/*const AddUserMediator = lazy(() =>
  import('mediators/ModuleMediators/AddUserMediator/AddUserMediator')
);*/

import AddUserMediator from 'mediators/ModuleMediators/AddUserMediator/AddUserMediator';

/*const EditUserMediator = lazy(() =>
  import('mediators/ModuleMediators/EditUserMediator/EditUserMediator')
);*/

import EditUserMediator from 'mediators/ModuleMediators/EditUserMediator/EditUserMediator';

/*const CreateTeamMediator = lazy(() =>
  import('mediators/ModuleMediators/CreateTeamMediator/CreateTeamMediator')
);*/

import CreateTeamMediator from 'mediators/ModuleMediators/CreateTeamMediator/CreateTeamMediator';

/*
const EditTeamMediator = lazy(() =>
  import('mediators/ModuleMediators/EditTeamMediator/EditTeamMediator')
);
*/

import EditTeamMediator from 'mediators/ModuleMediators/EditTeamMediator/EditTeamMediator';

/*const PublicDashMediator = lazy(() =>
  import('mediators/DashboardMediators/PublicDashMediator')
);*/

import PublicDashMediator from 'mediators/DashboardMediators/PublicDashMediator';

/*const DatasetMediator = lazy(() =>
  import('mediators/ModuleMediators/DatasetMediator/DatasetMediator')
);*/

import DatasetMediator from 'mediators/ModuleMediators/DatasetMediator/DatasetMediator';

// const About = lazy(() => import('modules/about/About'));

import About from 'modules/about/About';
import CookieModule from 'modules/CookieModule/CookieModule';

/*
const DashboardMediator = lazy(() =>
  import('mediators/DashboardMediators/DashboardMediator')
);
*/

import { PrivacyModule } from 'modules/PrivacyModule/PrivacyModule';

import DashboardMediator from 'mediators/DashboardMediators/DashboardMediator';
import auth0Client from './auth/Auth';

// const ManMappingStep = lazy(() =>
//   import('modules/datamapper/fragments/ManMappingStep/ManMappingStep')
// );

// Routes
const Routes = props => {
  return (
    <React.Fragment>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route
            exact
            path="/callback"
            render={() => <LoginCallback auth0Client={auth0Client} />}
          />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route
            exact
            path="/home"
            render={() => <HomeModule dropDownData={props} />}
          />
          <Route
            exact
            path="/visualizer/:chart/:code/:tab"
            render={() =>
              props.user.data ? (
                <VisualizerModuleMediator
                  dropDownData={props}
                  indicatorAggregations={null}
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
                dropDownData={props}
                indicatorAggregations={null}
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
              props.user.data &&
              (get(props.user, 'data.role', '') === userRoles.admin ||
                get(props.user, 'data.role', '') === userRoles.superAdm) ? (
                <AddUserMediator user={props.user.data} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/edit-user/:userId"
            render={rProps => {
              const isRegularUserEditSelf =
                get(props.user.data, 'role', '') === userRoles.regular ||
                get(props.user.data, 'role', '') === userRoles.mod
                  ? get(props.user.data, 'authId', '') ===
                    rProps.match.params.userId
                  : false;
              return props.user.data &&
                (get(props.user, 'data.role', '') === userRoles.admin ||
                  get(props.user, 'data.role', '') === userRoles.superAdm ||
                  isRegularUserEditSelf) ? (
                <EditUserMediator />
              ) : (
                <Redirect to="/" />
              );
            }}
          />
          <Route
            exact
            path="/view-user/:userId"
            render={rProps => {
              const isRegularUserEditSelf =
                get(props.user.data, 'role', '') === userRoles.regular ||
                get(props.user.data, 'role', '') === userRoles.mod
                  ? get(props.user.data, 'authId', '') ===
                    rProps.match.params.userId
                  : false;
              return props.user.data &&
                (get(props.user, 'data.role', '') === userRoles.admin ||
                  get(props.user, 'data.role', '') === userRoles.superAdm ||
                  isRegularUserEditSelf) ? (
                <EditUserMediator viewOnly />
              ) : (
                <Redirect to="/" />
              );
            }}
          />
          <Route
            exact
            path="/create-team"
            render={() =>
              props.user.data &&
              get(props.user, 'data.role', '') === userRoles.superAdm ? (
                <CreateTeamMediator />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/edit-team/:teamId"
            render={() =>
              props.user.data &&
              (get(props.user, 'data.role', '') === userRoles.admin ||
                get(props.user, 'data.role', '') === userRoles.superAdm) ? (
                <EditTeamMediator />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/view-team/:teamId"
            render={() =>
              props.user.data &&
              (get(props.user, 'data.role', '') === userRoles.admin ||
                get(props.user, 'data.role', '') === userRoles.superAdm) ? (
                <EditTeamMediator viewOnly />
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
              props.user.data ? (
                <DashboardMediator auth0Client={auth0Client} Indicator={null} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route path="/about" render={() => <About />} />
          <Route path="/cookies" render={() => <CookieModule />} />
          <Route path="/privacy" render={() => <PrivacyModule />} />
          <Route
            path="/mapper"
            render={() =>
              props.user.data &&
              (get(props.user, 'data.role', '') === userRoles.admin ||
                get(props.user, 'data.role', '') === userRoles.superAdm ||
                get(props.user, 'data.role', '') === userRoles.mod) ? (
                <DataMapperModule dropDownData={props} fileCorrection={props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/dataset/:id"
            render={() =>
              props.user.data &&
              (get(props.user, 'data.role', '') === userRoles.admin ||
                get(props.user, 'data.role', '') === userRoles.superAdm ||
                get(props.user, 'data.role', '') === userRoles.mod) ? (
                <DatasetMediator dropDownData={props} metaData={props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/public/chart-library"
            render={() => <PublicDashMediator />}
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

const mapStateToProps = state => {
  return {
    user: state.currentUser
  };
};

Routes.propTypes = {};

export default connect(mapStateToProps)(Routes);
