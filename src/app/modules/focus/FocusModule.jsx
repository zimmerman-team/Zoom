/* base */
import React from 'react';
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

class FocusModule extends React.Component {
  state = {
    sideBarOpen: true,
    indicators: [],
    latitude: 0.0236,
    longitude: 37.9062
    // zoom: 6
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

    /* bounds are made with http://boundingbox.klokantech.com/ */
    /* we can also use a generalized list of country bounds, the problem with those bounds is that they're too narrow, which in turns causes problems when zooming in/out*/
    /* a possible solution could also be to device a way of dynamically calculating optimal bounds */

    const boundsNL = [[0.2252, 50.2378], [10.756, 54.2068]];
    const boundsKE = [[26.82, -7.15], [50.89, 7.57]];

    if (isNL) {
      this.setState({
        latitude: 52.1326,
        longitude: 5.2913,
        zoom: 7,
        bounds: boundsNL
      });
    } else if (isKE) {
      this.setState({
        latitude: 0.0236,
        longitude: 37.9062,
        zoom: 6,
        bounds: boundsKE
      });
    }
  };

  render = () => {
    const { indicators, ...otherProps } = this.props;

    console.log(this.state.bounds);
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
            mapOptions={{ maxBounds: this.state.bounds }}
          />
          {this.props.dataPaneOpen !== paneTypes.none && (
            <DataPaneContainer>
              {this.props.dataPaneOpen === paneTypes.pubPane && (
                <ExplorePanelMediator {...otherProps} />
              )}
              {(this.props.dataPaneOpen === paneTypes.privPane ||
                this.props.dataPaneOpen === paneTypes.createChart ||
                this.props.dataPaneOpen === paneTypes.convertData) && (
                <NavPane auth0Client={this.props.auth0Client} />
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
