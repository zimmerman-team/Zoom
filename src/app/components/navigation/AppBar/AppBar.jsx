/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { Menu } from 'grommet-icons';
import { aidsFondsRed } from 'components/theme/ThemeSheet';
// import {}

/* Components */
import {
  AidsFondLogo,
  MenuButton,
  ModuleContainer,
} from 'components/navigation/AppBar/AppBar.styles';

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
      <ModuleContainer
        elevation="small"
        direction="row"
        justify="between"
        align="center"
      >
        <Box direction="row">
          <MenuButton
            plain
            icon={<Menu color={aidsFondsRed} />}
            onClick={this.props.toggleSideBar}
          />
          <AidsFondLogo
            a11yTitle="Aidsfonds logo"
            fit="contain"
            alignSelf="center"
            src="https://aidsfonds.nl/Assets/images/aidsfonds_logo_red.png"
          />
        </Box>

        <Box direction="row">{/*<div>button</div>*/}</Box>
      </ModuleContainer>
    );
  }
}

AppBar.propTypes = propTypes;
AppBar.defaultProps = defaultProps;

export default AppBar;
