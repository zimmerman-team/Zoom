/* base */
import React, { Component } from 'react';
import MapGL, { Popup, NavigationControl, Marker } from 'react-map-gl';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import styled from 'styled-components';
const MAPBOX_TOKEN =
  'pk.eyJ1IjoiemltbWVybWFuMjAxNCIsImEiOiJhNUhFM2YwIn0.sedQBdUN7PJ1AjknVVyqZw';

const ModuleContainer = styled.div`
  //width: 100vw;
  height: 100vh;
`;

const elementMargin = '10px';

const ZoomControl = styled(NavigationControl)`
  height: 90px;
  width: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: ${elementMargin};
`;

const propTypes = {
  zoomVisible: PropTypes.bool,
};
const defaultProps = {
  zoomVisible: true,
};

class GeoMap extends Component {
  state = {
    zoomVisible: this.props.zoomVisible,
    viewport: {
      latitude: 20,
      longitude: 15,
      zoom: 2,
      bearing: 0,
      pitch: 0,
    },
  };

  _updateSettings = (value, indicator, subInd = false) => {};

  _onViewportChange = viewport => this.setState({ viewport });

  _onHover = event => {};

  _renderIndicatorMarker = (indicator, index) => {};

  _renderCountyInfo() {}

  setMarkerInfo(indicator) {}

  _showMarkerInfo() {}

  changeLayers() {}

  render() {
    const { viewport, mapStyle, indicatorsPOI } = this.state;

    return (
      <ModuleContainer>
        <MapGL
          {...viewport}
          width="100%"
          height="100%"
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          {this.state.zoomVisible && (
            <ZoomControl onViewportChange={this._onViewportChange} />
          )}
        </MapGL>
      </ModuleContainer>
    );
  }
}

GeoMap.propTypes = propTypes;
GeoMap.defaultProps = defaultProps;

export default GeoMap;
