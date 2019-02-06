/* base */
import React, { Component } from 'react';
import styled from 'styled-components';
import GeoMap from 'components/GeoMap/GeoMap';
import { connect } from 'react-redux';
// import AppBar from 'components/navigation/AppBar/AppBar';
import { Box } from 'grommet';
// import SideBar from 'components/navigation/SideBar/SideBar';
import { ControlPanelContainer } from 'modules/home/HomeModule.styles';
import ExplorePanelMediator from 'mediators/ComponentMediators/ExplorePanelMediator/ExplorePanelMediator';
import PropTypes from 'prop-types';
import BaseDialog from 'components/Dialog/BaseDialog/BaseDialog';

const ModuleContainer = styled(Box)``;

const DataPaneContainer = styled.div``;

const propTypes = {
  indicators: PropTypes.arrayOf(PropTypes.shape),
};

const defaultProps = {
  indicators: [],
};

class HomeModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: true,
      sideBarOpen: false,
      indicators: [],
    };

    this.onClose = this.onClose.bind(this);
    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  onClose = () => {
    this.setState({ dialogOpen: false });
  };

  toggleSideBar = () => {
    this.setState({ sideBarOpen: true });
  };

  render() {
    const { indicators, ...otherProps } = this.props;

    return (
      <React.Fragment>
        <ModuleContainer>
          {/*<BaseDialog open={this.state.dialogOpen} onClose={this.onClose} />*/}

          <GeoMap
            indicatorData={indicators}
            selectedYears={this.props.yearPeriod}
            selectYear={this.props.selectYear}
          />
          {this.props.dataPaneOpen && (
            <ControlPanelContainer>
              <ExplorePanelMediator {...otherProps} />
            </ControlPanelContainer>
          )}
        </ModuleContainer>
      </React.Fragment>
    );
  }
}
HomeModule.propTypes = propTypes;
HomeModule.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    dataPaneOpen: state.dataPaneOpen.open,
  };
};

export default connect(mapStateToProps)(HomeModule);
