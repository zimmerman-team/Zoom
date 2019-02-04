/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { Menu } from 'grommet-icons';
import { aidsFondsRed } from 'components/theme/ThemeSheet';
import theme from 'theme/Theme';
// import {}

/* Components */
import {
  AidsFondLogo,
  MenuButton,
  ComponentBase,
} from 'components/AppBar/AppBar.styles';

const propTypes = {
  toggleSideBar: PropTypes.func,
};
const defaultProps = {
  // toggleSideBar: undefined,
};

class AppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  render() {
    return (
      <ComponentBase
        elevation="small"
        direction="row"
        justify="between"
        align="center"
      >
        <Box direction="row" justify="center">
          <MenuButton
            plain
            icon={<Menu color={aidsFondsRed} />}
            onClick={this.props.toggleSideBar}
            data-cy="sidebar-toggle"
          />
          <AidsFondLogo
            a11yTitle="Aidsfonds logo"
            fit="contain"
            alignSelf="center"
            src="https://aidsfonds.nl/Assets/images/aidsfonds_logo_red.png"
          />
        </Box>

        <Box direction="row">{/*<div>button</div>*/}</Box>
      </ComponentBase>
    );
  }
}

AppBar.propTypes = propTypes;
AppBar.defaultProps = defaultProps;

export default AppBar;
