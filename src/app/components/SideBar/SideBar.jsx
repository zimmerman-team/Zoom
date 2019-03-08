/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

import IconHome from 'assets/icons/IconHome';
import IconCharts from 'assets/icons/IconCharts';
import IconClose from 'assets/icons/IconClose';
import IconAbout from 'assets/icons/IconAbout';
import {
  CloseButton,
  SidebarHeader,
  SideBarLayer,
  SidebarNavList,
  SidebarNavListContainer,
  SidebarNavListItem
} from 'components/SideBar/SideBar.styles';
import LoginForm from 'components/SideBar/comps/LoginForm/LoginForm';

/*TODO: add auth0Client as prop,  */
const propTypes = {
  // auth0Client: PropTypes.object,
  open: PropTypes.bool,
  toggleSideBar: PropTypes.func
};
const defaultProps = {
  open: undefined
};

class SideBar extends React.Component {
  state = {
    open: this.props.open
  };

  render() {
    return (
      <React.Fragment>
        {this.props.open && (
          <SideBarLayer
            position="left"
            full="vertical"
            modal
            onClickOutside={this.props.toggleSideBar}
            onEsc={this.props.toggleSideBar}
          >
            <Box fill="vertical" overflow="auto" width="320px">
              <SidebarHeader
                flex={false}
                align="center"
                direction="row"
                justify="between"
              >
                <CloseButton
                  plain
                  icon={<IconClose />}
                  onClick={this.props.toggleSideBar}
                  label="Close"
                  data-cy="sidebar-close"
                />
              </SidebarHeader>

              <SidebarNavListContainer>
                <SidebarNavList>
                  <SidebarNavListItem
                    label="Home"
                    path={'/home'}
                    icon={<IconHome />}
                    onClick={this.props.toggleSideBar}
                    hoverIndicator={false}
                    type="button"
                    plain={true}
                  />

                  <SidebarNavListItem
                    label="Country Detail"
                    path={'/country/ke'}
                    onClick={this.props.toggleSideBar}
                    icon={<IconCharts />}
                    type="button"
                    plain={true}
                    data-cy="sidebar-country"
                  />

                  <SidebarNavListItem
                    label="IATI Detail"
                    path="/iati"
                    onClick={this.props.toggleSideBar}
                    icon={<IconCharts />}
                    type="button"
                    plain={true}
                    data-cy="sidebar-iati"
                  />

                  <SidebarNavListItem
                    label="Datamapper"
                    path={'/mapper'}
                    icon={<IconCharts />}
                    onClick={this.props.toggleSideBar}
                    type="button"
                    plain={true}
                    data-cy="sidebar-datamapper"
                  />

                  <SidebarNavListItem
                    label="Focus page NL"
                    path={'/focus'}
                    icon={<IconCharts />}
                    onClick={this.props.toggleSideBar}
                    type="button"
                    plain={true}
                    data-cy="sidebar-datamapper"
                  />

                  <SidebarNavListItem
                    label="Visualizer"
                    path={'/visualizer/vizID/edit'}
                    icon={<IconCharts />}
                    onClick={this.props.toggleSideBar}
                    type="button"
                    plain={true}
                    data-cy="sidebar-datamapper"
                  />

                  {/*TODO: we need to clean this up, maybe go for desctructing the auth0Client object */}
                  {this.props.auth0Client &&
                    (this.props.auth0Client.isAuthenticated() &&
                      this.props.auth0Client.isAdministrator() && (
                        <SidebarNavListItem
                          label="Dashboard"
                          path="/dashboard"
                          onClick={this.props.toggleSideBar}
                          icon={<IconCharts />}
                          type="button"
                          plain={true}
                          data-cy="sidebar-dashboard"
                        />
                      ))}

                  <SidebarNavListItem
                    label="About ZOOM"
                    path="/about"
                    onClick={this.props.toggleSideBar}
                    icon={<IconAbout />}
                    type="button"
                    plain={true}
                    data-cy="sidebar-about"
                  />
                </SidebarNavList>
              </SidebarNavListContainer>

              <LoginForm auth0Client={this.props.auth0Client} />
            </Box>
          </SideBarLayer>
        )}
      </React.Fragment>
    );
  }
}

SideBar.propTypes = propTypes;
SideBar.defaultProps = defaultProps;

export default SideBar;
