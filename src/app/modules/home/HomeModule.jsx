/* base */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GeoMap from '../../components/geo/GeoMap/GeoMap';
import Dialog from '../../components/info/Dialog/Dialog';
import AppBar from '../../components/navigation/AppBar/AppBar';
import { Box } from 'grommet';
import SideBar from '../../components/navigation/SideBar/SideBar';

const ModuleContainer = styled(Box)``;

const propTypes = {};

const defaultProps = {};

class HomeModule extends Component {
  state = {
    dialogOpen: true,
    sideBarOpen: false,
  };

  onClose = () => {
    this.setState({ dialogOpen: false });
  };

  toggleSideBar = () => {
    console.log('yesyes');
    this.setState({ sideBarOpen: true });
  };

  _showSideBar() {
    return <SideBar open={this.state.sideBarOpen} />;
  }

  render() {
    return (
      <React.Fragment>
        {/*{this._showSideBar()}*/}
        <SideBar open={this.state.sideBarOpen} />
        <AppBar toggleSideBar={this.toggleSideBar} />
        <ModuleContainer>
          <Dialog open={this.state.dialogOpen} onClose={this.onClose} />
          <GeoMap />
        </ModuleContainer>
      </React.Fragment>
    );
  }
}
HomeModule.propTypes = propTypes;
HomeModule.defaultProps = defaultProps;

export default HomeModule;
