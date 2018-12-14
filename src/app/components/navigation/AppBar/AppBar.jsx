/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Button, Image } from 'grommet';
import { Menu } from 'grommet-icons';
import { aidsFondsRed, aidsFondsWhite } from 'components/theme/ThemeSheet';
// import {}

const ModuleContainer = styled(Box)`
  height: 40px;
  width: 100vw;
  padding: 10px;
  display: flex;
  margin: 0;
  z-index: 10;
  position: sticky;
  top: 0;
  background-color: ${aidsFondsWhite};
`;

const AidsFondLogo = styled(Image)`
  height: 25px;
  user-select: none;
`;

const MenuButton = styled(Button)`
  padding: 0;
  margin-right: 25px;
`;

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

  toggleSideBar = () => {
    this.props.toggleSideBar();
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
            onClick={this.toggleSideBar}
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
