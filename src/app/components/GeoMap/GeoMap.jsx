/* base */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapGL, { LinearInterpolator, StaticMap } from 'react-map-gl';
import isEqual from 'lodash/isEqual';
import { withRouter } from 'react-router';
import axios from 'axios';
/* utils */
import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import MapControls from 'components/GeoMap/components/MapControls/MapControls';
import MAP_STYLE from 'components/GeoMap/data/map-style-basic-v8';
import ErrorBoundaryFallback from 'components/ErrorBoundaryFallback/ErrorBoundaryFallback';
import { ErrorBoundary } from 'react-error-boundary';
import { generateLegends, generateMarkers } from './GeoMap.util';
/* styles */
import { dataLayer } from './components/map-style';
import {
  ControlsContainer,
  LegendContainer,
  MapContainer,
  GeoYearContainer
} from './GeoMap.style';
import theme from 'theme/Theme';

/* components */
import markerInfo from './components/ToolTips/MarkerInfo/MarkerInfo';
import layerInfo from './components/ToolTips/LayerInfo/LayerInfo';
import CustomYearSelector from 'components/CustomYearSelector/CustomYearSelector';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';

import { TileLayer } from '@deck.gl/geo-layers';
import { VectorTile } from '@mapbox/vector-tile';
import Protobuf from 'pbf';
import { getColorByPct } from 'utils/genericUtils';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

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
  indicatorData: PropTypes.any,
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
        maxZoom: 8
      },
      hoverMarkerInfo: null,
      values: [12, 16],
      tileUrl: null,
      colorStops: [
        {
          percentile: 0,
          color: [255, 255, 255],
          percentage: 0.0
        },
        {
          percentile: 8,
          color: [9, 0, 255],
          percentage: 1.0
        }
      ],
      tileZoom: 6
    };

    this._setLayerInfo = this._setLayerInfo.bind(this);
    this._handleMapLoaded = this._handleMapLoaded.bind(this);
    this.setMarkerInfo = this.setMarkerInfo.bind(this);
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.handleFullscreen = this.handleFullscreen.bind(this);
    this.setMapControlsRef = this.setMapControlsRef.bind(this);
    this.setYearSelectorRef = this.setYearSelectorRef.bind(this);
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
          ...this.state.viewport,
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
        viewport: {
          ...this.props.viewport,
          // oke so we want this to always be passed in like this
          // for everything to work properly
          // cause sometimes saved data from the backend
          // passes this in as NOT a function
          transitionInterpolator: new LinearInterpolator()
        }
      });
    }
  }

  componentWillUnmount() {
    // so yeah because of annoying
  }

  setMarkerInfo(indicator) {
    this.setState({
      hoverMarkerInfo: indicator
    });
  }

  _updateViewport = viewport => {
    this.setState({ viewport });

    if (this.props.chartMounted && this.props.saveViewport) {
      this.props.saveViewport(viewport);
    }
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
    // so we basically use these refs for map control buttons and year selector buttons
    // to have priority over the countries clicked, cause previously the country
    // would have the click priority which should NOT be the case
    if (
      !this.mapControlRef.contains(event.target) &&
      !this.yearSelectorRef.contains(event.target)
    ) {
      const { features } = event;

      const feature = features && features.find(f => f.layer.id === 'layer');
      if (feature && feature.properties.geolocationType === 'country') {
        this.props.outerHistory.push(`/country/${feature.properties.iso2}`);
      }
    }
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

  setMapControlsRef(node) {
    this.mapControlRef = node;
  }

  setYearSelectorRef(node) {
    this.yearSelectorRef = node;
  }

  _setLayerInfo = event => {
    let hoverLayerInfo = null;
    const { object } = event;

    if (object) {
      hoverLayerInfo = {
        lngLat: event.lngLat,
        properties: object.properties
      };
    }
    this.setState({
      hoverLayerInfo
    });
  };

  updateMap(indicatorData) {
    const layers = find(indicatorData, ['type', 'layer']);

    let tileUrl = this.state.tileUrl;
    let tileZoom = this.state.tileZoom;
    let colorStops = this.state.colorStops;

    if (layers) {
      colorStops = [];
      tileUrl = layers.url;
      tileZoom = layers.zoom;

      for (let i = 0; i < layers.uniqCount + 1; i += 1) {
        const percentage = i / layers.uniqCount;

        colorStops.push({
          percentile: i,
          color: getColorByPct(percentage),
          percentage
        });
      }
    } else {
      // so if no layers are loaded we want to make sure that
      // there are no layers and no borders in that mapstyle of ours
      // cause of stupid referencing the MAP_STYLE object has the
      // layers pushed, whilst it shouldn't
      tileUrl = null;
    }

    // and all of the generic markers that can be just put in the map, like separate components
    // will be generated like this, and will use the same marker tooltip
    const markerArray = generateMarkers(indicatorData, this.setMarkerInfo);
    // and in a similar way we generate legends
    const legends = generateLegends(indicatorData);

    this.setState({ markerArray, legends, tileUrl, tileZoom });
  }

  handleZoomIn() {
    this._updateViewport({
      ...this.state.viewport,
      zoom: this.state.viewport.zoom + 0.1
    });
  }

  handleZoomOut() {
    if (this.state.viewport.zoom >= this.state.settings.minZoom) {
      this._updateViewport({
        ...this.state.viewport,
        zoom:
          this.state.viewport.zoom - 0.1 > this.state.settings.minZoom
            ? this.state.viewport.zoom - 0.1
            : this.state.settings.minZoom
      });
    }
  }

  handleFullscreen() {
    const isInFullScreen = this.isInFullScreen();

    const docElm = document.getElementById('geo-map');
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
    const { viewport, settings, markerArray, legends } = this.state;

    const tileLayer =
      this.state.tileUrl &&
      new TileLayer({
        stroked: true,
        pickable: true,

        opacity: 0.2,

        getLineColor: [0, 128, 239],
        getFillColor: layer => {
          const colorItem = find(this.state.colorStops, [
            'percentile',
            layer.properties.percentile
          ]);
          if (colorItem) {
            return colorItem.color;
          }
          return [9, 0, 255];
        },

        maxZoom: this.state.tileZoom,

        getLineWidth: () => {
          return 2;
        },
        lineWidthMinPixels: 2,

        getTileData: ({ x, y, z }) => {
          // const mapSource = `https://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/${z}/${x}/${y}.vector.pbf?access_token=${MapboxAccessToken}`;
          const mapSource = `/api/mbtiles/${encodeURIComponent(
            this.state.tileUrl
          )}/${z}/${x}/${y}.pbf`;

          return fetch(mapSource)
            .then(response => {
              if (response.status === 200) {
                return response.arrayBuffer();
              }
              return null;
            })
            .then(buffer => {
              if (buffer) {
                const tile = new VectorTile(new Protobuf(buffer));
                const features = [];
                for (const layerName in tile.layers) {
                  const vectorTileLayer = tile.layers[layerName];
                  for (let i = 0; i < vectorTileLayer.length; i += 1) {
                    const vectorTileFeature = vectorTileLayer.feature(i);
                    const feature = vectorTileFeature.toGeoJSON(x, y, z);
                    features.push(feature);
                  }
                }
                return features;
              }
              return [];
            });
        },

        onHover: event => {
          // console.log('hover object.properties', object && object.properties);
          console.log('hover event', event);
          // this._setLayerInfo(object);
        },

        onClick: event => {
          // console.log('hover object.properties', object && object.properties);
          console.log('click event', event);
          // this._onCountryClick(object);
        }
      });

    const test = true;

    return (
      <>
        {test ? (
          <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
            <MapContainer data-cy="geo-map-container">
              <DeckGL
                initialViewState={viewport}
                controller
                layers={tileLayer ? [tileLayer] : []}
                // onViewStateChange={this._updateViewport}
                // onLoad={this._handleMapLoaded}
              >
                <StaticMap
                  mapboxApiAccessToken={MAPBOX_TOKEN}
                  mapStyle={MAP_STYLE}
                />
              </DeckGL>
            </MapContainer>
          </ErrorBoundary>
        ) : (
          <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
            <MapContainer data-cy="geo-map-container">
              <MapGL
                {...viewport}
                {...settings}
                scrollZoom
                width="100%"
                height="100%"
                onViewStateChange={this._updateViewport}
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
                <ControlsContainer ref={this.setMapControlsRef}>
                  <MapControls
                    onZoomIn={this.handleZoomIn}
                    onZoomOut={this.handleZoomOut}
                    onFullScreen={this.handleFullscreen}
                  />
                </ControlsContainer>
                {/*So this is the layer tooltip, and we seperate it from the
              martker tooltip, cause its functionality as a tooltip is a bit different
              and also because we implement the layers a bit more differently
              than normal markers*/}
                {this._showLayerInfo()}

                {this._showMarkerInfo()}

                {markerArray}

                {/*contains zoom in/out and fullscreen toggle*/}

                <LegendContainer>{legends}</LegendContainer>
                <GeoYearContainer
                  ref={this.setYearSelectorRef}
                  bottom="0"
                  backgroundColor={theme.color.aidsFondsWhiteOpacity}
                >
                  <CustomYearSelector
                    selectedYear={this.props.selectedYear}
                    selectYear={this.props.selectYear}
                  />
                </GeoYearContainer>
              </MapGL>
            </MapContainer>
          </ErrorBoundary>
        )}
      </>
    );
  }
}

GeoMap.propTypes = propTypes;
GeoMap.defaultProps = defaultProps;

export default withRouter(GeoMap);

{
  /* if doesnt work try moving this to deck gl or applying all of these in some different way */
}
{
  /*<ControlsContainer ref={this.setMapControlsRef}>*/
}
{
  /*  <MapControls*/
}
{
  /*    onZoomIn={this.handleZoomIn}*/
}
{
  /*    onZoomOut={this.handleZoomOut}*/
}
{
  /*    onFullScreen={this.handleFullscreen}*/
}
{
  /*  />*/
}
{
  /*</ControlsContainer>*/
}

{
  /*{this._showLayerInfo()}*/
}

{
  /*{this._showMarkerInfo()}*/
}

{
  /*{markerArray}*/
}

{
  /*<LegendContainer>{legends}</LegendContainer>*/
}
{
  /*<GeoYearContainer*/
}
{
  /*ref={this.setYearSelectorRef}*/
}
{
  /*bottom="0"*/
}
{
  /*backgroundColor={theme.color.aidsFondsWhiteOpacity}*/
}
{
  /*  >*/
}
{
  /*  <CustomYearSelector*/
}
{
  /*selectedYear={this.props.selectedYear}*/
}
{
  /*selectYear={this.props.selectYear}*/
}
{
  /*/>*/
}
{
  /*</GeoYearContainer>*/
}
