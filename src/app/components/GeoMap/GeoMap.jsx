/* base */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapGL from 'react-map-gl';
import isEqual from 'lodash/isEqual';
import { withRouter } from 'react-router';

/* utils */
import { fromJS } from 'immutable';
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

import MAP_STYLE from 'components/GeoMap/data/map-style-basic-v8';
import {
  LegendContainer,
  MapContainer,
  YearContainer,
  ControlsContainer
} from './GeoMap.style';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiemltbWVybWFuMjAxNCIsImEiOiJhNUhFM2YwIn0.sedQBdUN7PJ1AjknVVyqZw';

const propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  zoom: PropTypes.number,
  indicatorData: PropTypes.array,
  selectedYears: PropTypes.array,
  selectYear: PropTypes.func
};

const defaultProps = {
  // just show worldview when no lat long is specified
  latitude: 15,
  longitude: 0,
  zoom: 2
};

export class GeoMap extends Component {
  constructor(props) {
    super(props);

    this.defaultMapStyle = {
      ...MAP_STYLE,
      sources: { ...MAP_STYLE.sources },
      layers: MAP_STYLE.layers.slice()
    };

    this.state = {
      mapStyle: fromJS(this.defaultMapStyle),
      markerArray: [],
      legends: [],
      hoverLayerInfo: null,
      viewport: {
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        zoom: this.props.zoom
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
    const layers = find(indicatorData, ['type', 'layer']);
    if (layers) {
      let mapStyle = this.defaultMapStyle;
      const borderData = layers.borderData ? layers.borderData : layers.data;

      // here we need to push in the border line style seperately like this
      // so that it would work and load properly with the layers
      // this may not be the best approach, but its the one that actually works
      // we also only push the borderStyle once.
      if (!find(mapStyle.layers, ['id', 'outline'])) {
        mapStyle.layers.push(borderStyle);
      }

      //then we continue working with the normal fromJS  variable
      mapStyle = fromJS(mapStyle);
      mapStyle = mapStyle
        // Add geojson layer source to map
        .setIn(
          ['sources', 'layer'],
          fromJS({ type: 'geojson', data: layers.data })
        )
        // Add point layer to map
        .set('layers', mapStyle.get('layers').push(dataLayer))
        // Add geojson border source to map
        .setIn(
          ['sources', 'outline'],
          fromJS({ type: 'geojson', data: borderData })
        );
      this.setState({ mapStyle });
    } else if (!isEqual(this.state.mapStyle, fromJS(this.defaultMapStyle))) {
      //Here we set the map back to default when no layer data has been passed in
      // And we need to remove the borderStyle cause it gets added there
      // and while its there, the map will not set itself to default
      let mapStylez = this.defaultMapStyle;
      const ind = findIndex(mapStylez.layers, ['id', 'outline']);
      mapStylez.layers.splice(ind, 1);
      this.setState({ mapStyle: fromJS(mapStylez) });
    }

    // and all of the generic markers that can be just put in the map, like separate components
    // will be generated like this, and will use the same marker tooltip
    const markerArray = generateMarkers(indicatorData, this.setMarkerInfo);
    // and in a similar way we generate legends
    const legends = generateLegends(indicatorData);

    this.setState({ markerArray, legends });
  }

  _updateViewport = viewport => this.setState({ viewport });

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

  setMarkerInfo(indicator) {
    this.setState({
      hoverMarkerInfo: indicator
    });
  }

  _showMarkerInfo() {
    const { hoverMarkerInfo } = this.state;
    return markerInfo(hoverMarkerInfo);
  }

  _onCountryClick = event => {
    const { features } = event;

    const feature = features && features.find(f => f.layer.id === 'layer');
    if (feature) this.props.history.push(`country/${feature.properties.iso2}`);
  };

  _handleMapLoaded = event => {
    console.log(this.props);
    if (this.props.location.pathname === '/focus') {
      this.setState({
        settings: {
          dragPan: false
        }
      });
    }
  };

  handleZoomIn = () => {
    this._updateViewport({ zoom: this.state.viewport.zoom + 1 });
  };

  handleZoomOut = () => {
    if (this.state.viewport.zoom <= this.state.settings.maxZoom) {
      this._updateViewport({ zoom: this.state.viewport.zoom - 1 });
    }
  };

  handleFullscreen() {
    /*todo: add logic that utilizes fullscreen util of react-map-gl itself instead of a thirdparty library*/
  }

  render() {
    const { viewport, settings, mapStyle, markerArray, legends } = this.state;
    return (
      /*todo: use mapbox api for fullscreen functionality instead of thirdparty*/

      <MapContainer data-cy="geo-map-container">
        <ControlsContainer>
          <MapControls
            onZoomIn={this.handleZoomIn}
            onZoomOut={this.handleZoomOut}
            onFullScreen={this.handleFullscreen}
          />
        </ControlsContainer>

        <YearContainer>
          <CustomYearSelector
            selectedYears={this.props.selectedYears}
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
          /*todo: refactor zooming functionality to facilitate both zooming by using the zoom controls and zooming by scrolling*/
          ref={map => (this.mapRef = map)}
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
