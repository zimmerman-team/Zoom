import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
import { Menu } from 'grommet-icons';
import TempDrawer from 'components/TempDrawer/TempDrawer';
import { Box, Button, Image } from 'grommet';
import theme from 'theme/Theme';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

const ZoomAppBar = styled(AppBar)`
  && {
    margin: 0;
    background-color: ${theme.color.aidsFondsWhite};

    div:first-child {
      padding: 0;
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;

const ZoomIconButton = styled(IconButton)``;

const AidsFondLogo = styled(Image)`
  height: 25px;
  user-select: none;
  justify-self: start;
  margin-left: 15px;
`;

// const Box = styled.div``;

const propTypes = {
  open: PropTypes.bool,
  toggleSideBar: PropTypes.func,
  handleDrawerOpen: PropTypes.func
};
const defaultProps = {
  open: undefined
};

function MenuAppBar(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleChange(event) {
    setAuth(event.target.checked);
  }

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <React.Fragment>
      {/*<FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="LoginSwitch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>*/}
      <ZoomAppBar position="static">
        <Toolbar variant="dense">
          <Box>
            <IconButton
              disableRipple
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={props.handleDrawerOpen}
            >
              <Menu color={theme.color.aidsFondsRed} />
            </IconButton>
            <AidsFondLogo
              a11yTitle="Aidsfonds logo"
              fit="contain"
              alignSelf="center"
              src="https://aidsfonds.nl/Assets/images/aidsfonds_logo_red.png"
            />
          </Box>

          {auth && (
            <Box>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              {/* <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>*/}
            </Box>
          )}
        </Toolbar>
      </ZoomAppBar>
    </React.Fragment>
  );
}

MenuAppBar.propTypes = propTypes;
MenuAppBar.defaultProps = defaultProps;

export default MenuAppBar;
