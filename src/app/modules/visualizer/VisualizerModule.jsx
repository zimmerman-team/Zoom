/* base */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
/* components */
import GeoMap from 'components/GeoMap/GeoMap';
import { ControlPanelContainer } from 'modules/visualizer/VisualizerModule.styles';
import ExplorePanelMediator from 'mediators/ComponentMediators/ExplorePanelMediator/ExplorePanelMediator';
import VizSidebar from 'modules/visualizer/sort/VizSidebar';
import VizContainer from 'modules/visualizer/sort/VizContainer';
// import BaseDialog from 'components/Dialog/BaseDialog/BaseDialog';

const ModuleBase = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
`;

const propTypes = {
  indicators: PropTypes.arrayOf(PropTypes.shape),
  sideBarOpen: PropTypes.bool,
  moduleMode: PropTypes.string
};

const defaultProps = {
  indicators: []
};

class BuilderModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: true,
      sideBarOpen: false,
      indicators: []
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

    console.log('vizprops', this.props);
    return (
      <ModuleBase>
        <VizContainer />
        <VizSidebar {...otherProps} />
      </ModuleBase>
    );
  }
}
BuilderModule.propTypes = propTypes;
BuilderModule.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    dataPaneOpen: state.dataPaneOpen.open
  };
};

export default connect(mapStateToProps)(BuilderModule);
