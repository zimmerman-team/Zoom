// @ts-nocheck

import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import get from "lodash/get";
import PageLoader from "app/modules/common/pageloader/PageLoader";
import DataExplorePanel from "app/components/Panes/DataExplorePane/DataExplorePane";
import LoginCallback from "app/components/LoginCallback/LoginCallback";
import ProfileSettingsModule from "./modules/profilesettings/ProfileSettingsModule";
import DataMapperModule from "app/modules/datamapper/DataMapperModule";
import userRoles from "./__consts__/UserRoleConst";
import CountryDetailMediator from "app/mediators/ModuleMediators/CountryDetailMediator/CountryDetailMediator";
import HomeModule from "app/modules/home/HomeModule";
import VisualizerModuleMediator from "app/mediators/ModuleMediators/VisualizerModuleMediator/VisualizerModuleMediator";
import IatiDetailMediator from "app/mediators/ModuleMediators/IatiDetailMediator/IatiDetailMediator";
import AddUserMediator from "app/mediators/ModuleMediators/AddUserMediator/AddUserMediator";
import EditUserMediator from "app/mediators/ModuleMediators/EditUserMediator/EditUserMediator";
import CreateTeamMediator from "app/mediators/ModuleMediators/CreateTeamMediator/CreateTeamMediator";
import EditTeamMediator from "app/mediators/ModuleMediators/EditTeamMediator/EditTeamMediator";
import PublicDashMediator from "app/mediators/DashboardMediators/PublicDashMediator";
import About from "app/modules/about/About";
import CookieModule from "app/modules/CookieModule/CookieModule";
import { PrivacyModule } from "app/modules/PrivacyModule/PrivacyModule";
import DashboardMediator from "app/mediators/DashboardMediators/DashboardMediator";
import auth0Client from "./auth/Auth";

// Routes
const Routes = (props) => {
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
              (get(props.user, "data.role", "") === userRoles.admin ||
                get(props.user, "data.role", "") === userRoles.superAdm) ? (
                <AddUserMediator user={props.user.data} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/edit-user/:userId"
            render={(rProps) => {
              const isRegularUserEditSelf =
                get(props.user.data, "role", "") === userRoles.regular ||
                get(props.user.data, "role", "") === userRoles.mod
                  ? get(props.user.data, "authId", "") ===
                    rProps.match.params.userId
                  : false;
              return props.user.data &&
                (get(props.user, "data.role", "") === userRoles.admin ||
                  get(props.user, "data.role", "") === userRoles.superAdm ||
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
            render={(rProps) => {
              const isRegularUserEditSelf =
                get(props.user.data, "role", "") === userRoles.regular ||
                get(props.user.data, "role", "") === userRoles.mod
                  ? get(props.user.data, "authId", "") ===
                    rProps.match.params.userId
                  : false;
              return props.user.data &&
                (get(props.user, "data.role", "") === userRoles.admin ||
                  get(props.user, "data.role", "") === userRoles.superAdm ||
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
              get(props.user, "data.role", "") === userRoles.superAdm ? (
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
              (get(props.user, "data.role", "") === userRoles.admin ||
                get(props.user, "data.role", "") === userRoles.superAdm) ? (
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
              (get(props.user, "data.role", "") === userRoles.admin ||
                get(props.user, "data.role", "") === userRoles.superAdm) ? (
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
              (get(props.user, "data.role", "") === userRoles.admin ||
                get(props.user, "data.role", "") === userRoles.superAdm ||
                get(props.user, "data.role", "") === userRoles.mod) ? (
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
              (get(props.user, "data.role", "") === userRoles.admin ||
                get(props.user, "data.role", "") === userRoles.superAdm ||
                get(props.user, "data.role", "") === userRoles.mod) ? (
                <DataMapperModule
                  edit
                  dropDownData={props}
                  fileCorrection={props}
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

const mapStateToProps = (state) => {
  return {
    user: state.currentUser,
  };
};

Routes.propTypes = {};

export default connect(mapStateToProps)(Routes);
