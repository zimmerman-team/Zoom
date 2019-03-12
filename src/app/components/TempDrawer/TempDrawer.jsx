/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/* material ui */
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconClose from 'assets/icons/IconClose';
import theme from 'theme/Theme';
import { data } from './TempDrawer.const';
import IconCharts from 'assets/icons/IconCharts';
import LoginForm from 'components/SideBar/comps/LoginForm/LoginForm';

export const CloseButton = styled.button`
  padding: 0;
  color: ${theme.color.aidsFondsRed};
  font-family: ${theme.font.zoomFontFamTwo};
  font-size: 14px;
`;

const LoginBox = styled.div`
  width: 320px;
`;

const SidebarNavList = styled(List)`
  && {
    width: 320px;
    background-color: ${theme.color.zoomGreyZero};
    padding: 0;
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;

const SidebarNavListItem = styled(ListItem)`
  && {
    display: flex;
    padding-top: 6px;
    padding-bottom: 6px;
    line-height: 1;
  }
`;

const SidebarClosButton = styled(SidebarNavListItem)`
  height: 40px;
`;

const ZoomListItemText = styled(ListItemText)`
  && {
    padding: 0;
    span {
      color: ${theme.color.aidsFondsRed};
      font-family: ${theme.font.zoomFontFamTwo};
      font-size: 14px;
    }
  }
`;

const ZoomLink = styled(Link)`
  display: flex;
  text-decoration: none;
`;

const propTypes = {
  open: PropTypes.bool,
  toggleSideBar: PropTypes.func,
  items: PropTypes.array
};
const defaultProps = {
  open: undefined,
  items: data
};

class TempDrawer extends React.Component {
  state = {
    open: this.props.open
  };

  render() {
    const sideList = (
      <React.Fragment>
        {data.map(item => (
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
        ))}
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
