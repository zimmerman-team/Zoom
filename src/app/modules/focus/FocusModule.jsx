/* base */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* components */
import GeoMap from 'components/GeoMap/GeoMap';
import { ModuleContainer } from 'modules/focus/FocuseModule.styles';
import ExplorePanelMediator from 'mediators/ComponentMediators/PaneMediators/ExplorePanelMediator/ExplorePanelMediator';
import paneTypes from '__consts__/PaneTypesConst';
import DataPaneContainer from 'components/Panes/DataPaneContainer/DataPaneContainer';
import NavPane from 'components/Panes/NavPane/NavPane';

const propTypes = {
  indicators: PropTypes.arrayOf(PropTypes.shape)
};

const defaultProps = {
  indicators: []
};

class FocusModule extends Component {
  state = {
    sideBarOpen: true,
    indicators: [],
    latitude: 0.0236,
    longitude: 37.9062,
    zoom: 6
  };

  onClose = () => {
    this.setState({ dialogOpen: false });
  };

  toggleSideBar = () => {
    this.setState({ sideBarOpen: true });
  };

  componentWillMount = () => {
    const isNL = location.pathname.includes('NL');
    const isKE = location.pathname.includes('KE');

    if (isNL) {
      console.log('is nderland');
      this.setState({ latitude: 52.1326, longitude: 5.2913, zoom: 7 });
    } else if (isKE) {
      console.log('is kenya');
      this.setState({ latitude: 0.0236, longitude: 37.9062, zoom: 6 });
    }
  };

  render = () => {
    const { indicators, ...otherProps } = this.props;

    return (
      <React.Fragment>
        <ModuleContainer>
          <GeoMap
            indicatorData={indicators}
            selectedYears={this.props.yearPeriod}
            selectYear={this.props.selectYear}
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            zoom={this.state.zoom}
          />
          {this.props.dataPaneOpen !== paneTypes.none && (
            <DataPaneContainer>
              {this.props.dataPaneOpen === paneTypes.pubPane && (
                <ExplorePanelMediator {...otherProps} />
              )}
              {(this.props.dataPaneOpen === paneTypes.privPane ||
                this.props.dataPaneOpen === paneTypes.createChart ||
                this.props.dataPaneOpen === paneTypes.convertData) && (
                <NavPane {...otherProps} />
              )}
            </DataPaneContainer>
          )}
        </ModuleContainer>
      </React.Fragment>
    );
  };
}
FocusModule.propTypes = propTypes;
FocusModule.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    dataPaneOpen: state.dataPaneOpen.open
  };
};

export default connect(mapStateToProps)(FocusModule);
