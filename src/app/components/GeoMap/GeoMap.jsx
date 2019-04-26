/* base */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapGL, { LinearInterpolator } from 'react-map-gl';
import isEqual from 'lodash/isEqual';
import { withRouter } from 'react-router';

/* utils */
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import { generateLegends, generateMarkers } from './GeoMap.util';

/* styles */
import { borderStyle, dataLayer } from './components/map-style';

/* components */
import markerInfo from './components/ToolTips/MarkerInfo/MarkerInfo';
import layerInfo from './components/ToolTips/LayerInfo/LayerInfo';
import CustomYearSelector from 'components/CustomYearSelector/CustomYearSelector';
import MapControls from 'components/GeoMap/components/MapControls/MapControls';
import { YearContainer } from 'components/CustomYearSelector/CustomYearSelector.style';

import MAP_STYLE from 'components/GeoMap/data/map-style-basic-v8';
import {
  LegendContainer,
  MapContainer,
  ControlsContainer
} from './GeoMap.style';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiemltbWVybWFuMjAxNCIsImEiOiJhNUhFM2YwIn0.sedQBdUN7PJ1AjknVVyqZw';

const propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  zoom: PropTypes.number,
  /* todo: don't know about this focus object tbh, might refactor this */
  focus: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    zoom: PropTypes.number
  }),
  viewport: PropTypes.shape({}),
  chartMounted: PropTypes.bool,
  indicatorData: PropTypes.array,
  selectedYear: PropTypes.string,
  disableYear: PropTypes.bool,
  selectYear: PropTypes.func,
  saveViewport: PropTypes.func,
  mapOptions: PropTypes.object
};

const defaultProps = {
  disableYear: false,
  // just show worldview when no lat long is specified
  latitude: 15,
  longitude: 0,
  viewport: {},
  chartMounted: false,
  zoom: 2,
  saveViewport: null,
  mapOptions: {}
};

export class GeoMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapStyle: {
        ...MAP_STYLE
      },
      markerArray: [],
      legends: [],
      hoverLayerInfo: null,
      viewport: {
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        zoom: this.props.zoom,
        transitionInterpolator: new LinearInterpolator(),
        transitionDuration: 1000
      },
      settings: {
        dragPan: true,
        dragRotate: false,
        scrollZoom: true,
        touchZoom: true,
        touchRotate: false,
        keyboard: true,
        doubleClickZoom: false,
        minZoom: this.props.zoom,
        maxZoom: 20
      },
      hoverMarkerInfo: null,
      values: [12, 16]
    };

    this._handleMapLoaded = this._handleMapLoaded.bind(this);
    this.setMarkerInfo = this.setMarkerInfo.bind(this);
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.handleFullscreen = this.handleFullscreen.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.indicatorData, prevProps.indicatorData)) {
      this.updateMap(this.props.indicatorData);
    }

    if (
      !isEqual(this.props.focus, prevProps.focus) &&
      (this.props.viewport.zoom === undefined || !this.props.chartMounted)
    ) {
      this.setState({
        viewport: {
          latitude: this.props.focus.latitude,
          longitude: this.props.focus.longitude,

          zoom: this.props.focus.zoom
        }
      });
    }

    if (
      this.props.chartMounted !== prevProps.chartMounted &&
      this.props.chartMounted &&
      this.props.viewport.zoom !== undefined
    ) {
      this.setState({
        viewport: this.props.viewport
      });
    }
  }

  componentWillUnmount() {
    // so yeah because of annoying
  }

  updateMap(indicatorData) {
    // So because the layers are a part of this map, and not just a component
    // that we can put in the map(at least thats how we do it right now)
    // we will generate the layers here, and differently than all other indicator
    // markers
    // Note: the layer will also use a different tooltip than the markers
    // cause it kind of makes sense for some cases
    const mapStyle = {
      ...MAP_STYLE
    };
    const layers = find(indicatorData, ['type', 'layer']);
    if (layers) {
      const borderData = layers.borderData ? layers.borderData : layers.data;

      mapStyle.sources.layer = { type: 'geojson', data: layers.data };
      mapStyle.sources.outline = { type: 'geojson', data: borderData };

      if (!find(mapStyle.layers, ['id', 'outline'])) {
        mapStyle.layers.push(borderStyle);
      }
      if (!find(mapStyle.layers, ['id', 'layer'])) {
        mapStyle.layers.push(dataLayer);
      }
    } else {
      // so if no layers are loaded we want to make sure that
      // there are no layers and no borders in that mapstyle of ours
      // cause of stupid referencing the MAP_STYLE object has the
      // layers pushed, whilst it shouldn't

      const borderInd = findIndex(mapStyle.layers, ['id', 'outline']);

      if (borderInd !== -1) mapStyle.layers.splice(borderInd, 1);

      const layerInd = findIndex(mapStyle.layers, ['id', 'layer']);

      if (layerInd !== -1) mapStyle.layers.splice(layerInd, 1);
    }

    // and all of the generic markers that can be just put in the map, like separate components
    // will be generated like this, and will use the same marker tooltip
    const markerArray = generateMarkers(indicatorData, this.setMarkerInfo);
    // and in a similar way we generate legends
    const legends = generateLegends(indicatorData);

    this.setState({ markerArray, legends, mapStyle });
  }

  setMarkerInfo(indicator) {
    this.setState({
      hoverMarkerInfo: indicator
    });
  }

  _updateViewport = viewport => {
    this.setState({ viewport });

    if (this.props.chartMounted && this.props.saveViewport)
      this.props.saveViewport(viewport);
  };

  _setLayerInfo = event => {
    let hoverLayerInfo = null;
    const { features } = event;

    const feature = features && features.find(f => f.layer.id === 'layer');
    if (feature) {
      hoverLayerInfo = {
        lngLat: event.lngLat,
        properties: feature.properties
      };
    }
    this.setState({
      hoverLayerInfo
    });
  };

  _showLayerInfo() {
    const { hoverLayerInfo, hoverMarkerInfo } = this.state;
    if (!hoverMarkerInfo) return layerInfo(hoverLayerInfo);

    return null;
  }

  _showMarkerInfo() {
    const { hoverMarkerInfo } = this.state;
    return markerInfo(hoverMarkerInfo);
  }

  _onCountryClick = event => {
    const { features } = event;

    const feature = features && features.find(f => f.layer.id === 'layer');
    if (feature && feature.properties.geolocationType === 'country')
      this.props.outerHistory.push(`/country/${feature.properties.iso2}`);
  };

  _handleMapLoaded = event => {
    if (this.props.location.pathname === '/focus') {
      this.setState({
        settings: {
          dragPan: false
        }
      });
    }
  };

  handleZoomIn() {
    this._updateViewport({
      ...this.state.viewport,
      zoom: this.state.viewport.zoom + 0.1
    });
  }

  handleZoomOut() {
    if (this.state.viewport.zoom >= this.state.settings.minZoom)
      this._updateViewport({
        ...this.state.viewport,
        zoom:
          this.state.viewport.zoom - 0.1 > this.state.settings.minZoom
            ? this.state.viewport.zoom - 0.1
            : this.state.settings.minZoom
      });
  }

  handleFullscreen() {
    const isInFullScreen = this.isInFullScreen();

    const docElm = document.getElementById('home-geomap');
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  isInFullScreen() {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  }

  render() {
    const { viewport, settings, mapStyle, markerArray, legends } = this.state;

    return (
      /*todo: use mapbox api for fullscreen functionality instead of thirdparty*/

      <MapContainer data-cy="geo-map-container" id="home-geomap">
        <ControlsContainer>
          <MapControls
            onZoomIn={this.handleZoomIn}
            onZoomOut={this.handleZoomOut}
            onFullScreen={this.handleFullscreen}
          />
        </ControlsContainer>

        <YearContainer
          style={
            this.props.disableYear
              ? { pointerEvents: 'none', opacity: '0.4' }
              : {}
          }
        >
          <CustomYearSelector
            selectedYear={this.props.selectedYear}
            selectYear={this.props.selectYear}
          />
        </YearContainer>

        <MapGL
          {...viewport}
          {...settings}
          scrollZoom={true}
          width="100%"
          height="100%"
          mapStyle={mapStyle}
          onViewportChange={this._updateViewport}
          onHover={this._setLayerInfo}
          onClick={this._onCountryClick}
          onLoad={this._handleMapLoaded}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          // mapOptions={this.props.mapOptions}
          ref={map => (this.mapRef = map)}
          attributionControl
          // bounds={ya}
          // so commenting this out cause it causes the
          // onHover to NOT receive features...
          // dunno why though seems like just a bug in this react-map-gl library
          // cause the on click does receive the features...
          // reuseMaps
        >
          {/*So this is the layer tooltip, and we seperate it from the
              martker tooltip, cause its functionality as a tooltip is a bit different
              and also because we implement the layers a bit more differently
              than normal markers*/}
          {this._showLayerInfo()}

          {this._showMarkerInfo()}

          {markerArray}

          {/*contains zoom in/out and fullscreen toggle*/}

          <LegendContainer>{legends}</LegendContainer>
        </MapGL>
      </MapContainer>
    );
  }
}

GeoMap.propTypes = propTypes;
GeoMap.defaultProps = defaultProps;

export default withRouter(GeoMap);
