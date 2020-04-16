/* base */
import React from "react";
import PropTypes from "prop-types";
/* material ui */
import Drawer from "@material-ui/core/Drawer";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconClose from "app/assets/icons/IconClose";

import { data } from "./TempDrawer.const";
import LoginForm from "app/components/SideBar/comps/LoginForm/LoginForm";
import {
  LoginBox,
  SidebarClosButton,
  SidebarNavList,
  ZoomLink,
  ZoomListItemText,
} from "./TempDrawer.style";
import SidebarNavListItem from "./common/SidebarNavListItem";

const propTypes = {
  open: PropTypes.bool,
  toggleSideBar: PropTypes.func,
  items: PropTypes.array,
  env: PropTypes.string,
};
const defaultProps = {
  open: undefined,
  items: data,
  env: process.env.NODE_ENV,
};

class MainMenuDrawer extends React.Component {
  state = {
    open: this.props.open,
  };

  render() {
    const sideList = (
      <React.Fragment>
        {data.map(
          (item) =>
            process.env.NODE_ENV === item.env && (
              <ZoomLink
                to={item.path}
                key={item.label}
                data-cy={`sidebar-${item.label}`}
              >
                <SidebarNavListItem
                  type={item.type}
                  loggedIn={this.props.user !== null}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ZoomListItemText primary={item.label} />
                </SidebarNavListItem>
              </ZoomLink>
            )
        )}
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <Drawer open={this.props.open} onClose={this.props.toggleSideBar}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.props.toggleSideBar}
            onKeyDown={this.props.toggleSideBar}
          >
            {/*todo: this is duplicate code and should actually be covered in the consts*/}
            <SidebarClosButton
              button
              onClick={this.props.toggleSideBar}
              data-cy="sidebar-close"
              disableRipple
            >
              <ListItemIcon>
                <IconClose />
              </ListItemIcon>
              <ZoomListItemText primary="Close" />
            </SidebarClosButton>
            <SidebarNavList>{sideList}</SidebarNavList>
          </div>

          <LoginBox>
            <LoginForm
              user={this.props.user}
              auth0Client={this.props.auth0Client}
            />
          </LoginBox>
        </Drawer>
      </React.Fragment>
    );
  }
}

MainMenuDrawer.propTypes = propTypes;
MainMenuDrawer.defaultProps = defaultProps;

export default MainMenuDrawer;
