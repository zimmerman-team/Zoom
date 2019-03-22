/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* material ui */
import Drawer from '@material-ui/core/Drawer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconClose from 'assets/icons/IconClose';

import { data } from './TempDrawer.const';
import IconCharts from 'assets/icons/IconCharts';
import LoginForm from 'components/SideBar/comps/LoginForm/LoginForm';
import {
  SidebarNavListItem,
  SidebarClosButton,
  SidebarNavList,
  ZoomLink,
  ZoomListItemText,
  LoginBox
} from './TempDrawer.style';

const propTypes = {
  open: PropTypes.bool,
  toggleSideBar: PropTypes.func,
  items: PropTypes.array,
  env: PropTypes.string
};
const defaultProps = {
  open: undefined,
  items: data,
  env: process.env.NODE_ENV
};

class TempDrawer extends React.Component {
  state = {
    open: this.props.open
  };

  render() {
    const sideList = (
      <React.Fragment>
        {data.map(
          item =>
            process.env.NODE_ENV === item.env && (
              <SidebarNavListItem
                button
                key={item.label}
                data-cy={'sidebar-' + item.label}
                disableRipple
              >
                <ZoomLink to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ZoomListItemText primary={item.label} />
                </ZoomLink>
              </SidebarNavListItem>
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
            <SidebarNavList>
              {sideList}
              {this.props.auth0Client &&
                (this.props.auth0Client.isAuthenticated() &&
                  this.props.auth0Client.isAdministrator() && (
                    /*todo: this is duplicate code and should actually be covered in the consts*/
                    <ZoomLink to="/dashboard">
                      <SidebarNavListItem
                        label="Dashboard"
                        onClick={this.props.toggleSideBar}
                        icon={<IconCharts />}
                        button
                        data-cy="sidebar-dashboard"
                      >
                        <ListItemIcon>
                          <IconClose />
                        </ListItemIcon>
                        <ZoomListItemText primary="Close" />
                      </SidebarNavListItem>
                    </ZoomLink>
                  ))}
            </SidebarNavList>
          </div>

          <LoginBox>
            <LoginForm auth0Client={this.props.auth0Client} />
          </LoginBox>
        </Drawer>
      </React.Fragment>
    );
  }
}

TempDrawer.propTypes = propTypes;
TempDrawer.defaultProps = defaultProps;

export default TempDrawer;
