/* global window, fetch */
import React, { Component } from 'react';
import MapGL, { Popup, NavigationControl, Marker } from 'react-map-gl';
import KENYA_COUNTIES from 'app/components/geo/GeoMap/data/kenya-county-borders.json';
import {
  dataLayer,
  defaultMapStyle,
  colorStops,
} from 'app/components/geo/GeoMap/components/map-style';
import IndicatorPin from 'app/components/geo/GeoMap/components/indicator-pin';
import {
  updatePercentiles,
  coupleData,
  loadSubIndicators,
} from 'app/components/geo/GeoMap/components/utils';
import { fromJS } from 'immutable';
import { json as requestJson } from 'd3-request';
import DataControlPanel from 'app/components/geo/GeoMap/components/DataControlPanel';
import styled from 'styled-components';
import find from 'lodash/find';
import filter from 'lodash/filter';

// import 'app/pages/CountryFocusMapbox/CountryFocusMapbox.css';

import IndicatorInfo from 'app/components/geo/GeoMap/components/indicator-info';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiemltbWVybWFuMjAxNCIsImEiOiJhNUhFM2YwIn0.sedQBdUN7PJ1AjknVVyqZw';

const MapContainer = styled.div`
  height: 100vh;
  //width: 100vw;
`;

const NavContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
`;

const LegendContainer = styled.div`
  position: absolute;
  width: fit-content;
  right: 0;
  bottom: 0;
  display: flex;
  //flex-direction: column;
`;

const NavControlContainer = styled.div`
  height: 100px;
`;

const ControlPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PanelDuo = styled.div`
  margin-bottom: 20px;
`;

const CountyInfo = styled.div`
  width: 200px;
  z-index: 100;
  border-radius: 5px;
  padding: 15px;
  font-size: 14px;
`;

const LegendItem = styled.div`
  border-radius: 5px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  background-color: white;
  margin: 0 10px 40px 0;
  padding: 10px;
`;

const IndicatorLegendItem = styled.div`
  display: flex;
  //align-items: center;
  align-content: flex-start;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  background-color: white;
  margin: 0 10px 40px 0;
  padding: 10px;
`;

const LegendLabel = styled.div`
  padding: 5px 0;
  font-size: 16px;
`;

const LocationMarker = styled.div``;

const indicatorsDropdown = [
  {
    name: 'Clinic Locations',
    id: 'clinic-locations.json',
  },
  {
    name: 'Clinic visits 2016(KP reached)',
    id: 'clinic-visits-2016.json',
  },
  {
    name: 'kenya infections 2014(Estimated new hiv infections)',
    id: 'kenya-infections-2014.json',
  },
  {
    name: 'kenya infections 2016(Estimated new hiv infections)',
    id: 'kenya-infections-2016.json',
  },
  {
    name: 'size estimate 2016(KP size estimate)',
    id: 'size-estimate-2016.json',
  },
];

export default class App extends Component {
  state = {
    mapStyle: defaultMapStyle,
    indicatorsCounty: null,
    indicatorsPOI: null,
    countyLegendName: null,
    POILegendName: null,
    features: null,
    hoveredFeature: null,
    hoverInfo: null,
    settings: {
      selectedInd1: {
        value: 'kenya-infections-2016.json',
        label: 'kenya infections 2016(Estimated new hiv infections)',
        subIndDropdown: [
          {
            id: 'All',
            name: 'All',
          },
        ],
        subIndicator: {
          value: 'All',
          label: 'All',
        },
      },
      selectedInd2: {
        value: 'clinic-locations.json',
        label: 'Clinic Locations',
        subIndDropdown: [
          {
            name: 'None',
            id: 'None',
          },
        ],
        subIndicator: {
          value: 'None',
          label: 'None',
        },
      },
    },
    viewport: {
      latitude: 15,
      longitude: 0,
      zoom: 2,
      bearing: 0,
      pitch: 0,
    },
    popupInfo: null,
  };

  componentDidMount() {
    console.log(KENYA_COUNTIES);
    this.requestIndicators();
  }

  requestIndicators() {
    const firstIndJson = this.state.settings.selectedInd1.value;
    const secondIndJson = this.state.settings.selectedInd2.value;
    requestJson(`static/${firstIndJson}`, (error, indicators1) => {
      if (!error) {
        requestJson(`static/${secondIndJson}`, (error, indicators2) => {
          if (!error) {
            const settings = this.state.settings;
            settings.selectedInd1.subIndDropdown = loadSubIndicators(
              indicators1,
            );
            settings.selectedInd2.subIndDropdown = loadSubIndicators(
              indicators2,
            );
            this.setState(
              {
                settings,
              },
              () =>
                this._loadData(
                  indicators1,
                  indicators2,
                  this.state.settings.selectedInd1.label,
                  this.state.settings.selectedInd2.label,
                ),
            );
          }
        });
      }
    });
  }

  _loadData = (indicators1, indicators2, indName1, indName2) => {
    let indicatorsPOI = [];
    let POILegendName = null;
    if (indicators1[0]['Lat location'] !== undefined) {
      indicatorsPOI = indicators1;
      POILegendName = indName1;
    } else if (indicators2[0]['Lat location'] !== undefined) {
      indicatorsPOI = indicators2;
      POILegendName = indName2;
    }

    let indicatorsCounty = [];
    let countyLegendName = null;
    if (indicators1[0]['Indicator'] !== undefined) {
      indicatorsCounty = indicators1;
      countyLegendName = indName1;
    } else if (indicators2[0]['Indicator'] !== undefined) {
      indicatorsCounty = indicators2;
      countyLegendName = indName2;
    }

    const subIndVal1 = this.state.settings.selectedInd1.subIndicator.value;
    const subIndVal2 = this.state.settings.selectedInd2.subIndicator.value;

    if (find(indicatorsCounty, ['Indicator_category', subIndVal1])) {
      indicatorsCounty = filter(indicatorsCounty, [
        'Indicator_category',
        subIndVal1,
      ]);
    } else if (find(indicatorsCounty, ['Indicator_category', subIndVal2])) {
      indicatorsCounty = filter(indicatorsCounty, [
        'Indicator_category',
        subIndVal2,
      ]);
    }

    const data = coupleData(indicatorsCounty, KENYA_COUNTIES);

    updatePercentiles(data, f => f.properties.indicator.measure_value);

    const mapStyle = defaultMapStyle
      // Add geojson source to map
      .setIn(['sources', 'incomeByState'], fromJS({ type: 'geojson', data }))
      // Add point layer to map
      .set('layers', defaultMapStyle.get('layers').push(dataLayer));

    this.setState({
      indicatorsCounty,
      indicatorsPOI,
      countyLegendName,
      POILegendName,
      mapStyle,
    });
    indicatorsPOI.map(this._renderIndicatorMarker);
  };

  _updateSettings = (value, indicator, subInd = false) => {
    const settings = this.state.settings;
    if (subInd) {
      settings[indicator].subIndicator.value = value;
    } else {
      settings[indicator].value = value;
      settings[indicator].label = find(indicatorsDropdown, ['id', value]).name;
    }

    this.setState(
      {
        settings,
      },
      this.requestIndicators,
    );
  };

  _onViewportChange = viewport => this.setState({ viewport });

  _onHover = event => {
    let countyName = '';
    let hoverInfo = null;
    const { features } = event;

    const county = features && features.find(f => f.layer.id === 'data');
    if (county) {
      hoverInfo = {
        lngLat: event.lngLat,
        county: county.properties,
      };
    }
    this.setState({
      hoverInfo,
    });
  };

  _renderIndicatorMarker = (indicator, index) => {
    if (indicator) {
      return (
        <Marker
          key={`marker-${index}`}
          latitude={parseFloat(indicator['Lat location'])}
          longitude={parseFloat(indicator['Long location'])}
        >
          <IndicatorPin
            size={20}
            onMouseEnter={() => this.setMarkerInfo(indicator)}
            onMouseLeave={() => this.setMarkerInfo(null)}
          />
        </Marker>
      );
    }
  };

  _renderCountyInfo() {
    const { hoverInfo, popupInfo } = this.state;
    if (hoverInfo && !popupInfo) {
      return (
        <Popup
          anchor="bottom"
          longitude={hoverInfo.lngLat[0]}
          latitude={hoverInfo.lngLat[1]}
          closeButton={false}
          className="info-marker-tooltip"
        >
          <p>{hoverInfo.county.COUNTY_NAM}</p>
          {hoverInfo.county.percentile && (
            <p>Percentile: {hoverInfo.county.percentile}</p>
          )}
          {hoverInfo.county.value && <p>Value: {hoverInfo.county.value}</p>}
        </Popup>
      );
    }
    return null;
  }

  setMarkerInfo(indicator) {
    this.setState({
      popupInfo: indicator,
    });
  }

  _showMarkerInfo() {
    const { popupInfo } = this.state;
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          longitude={parseFloat(popupInfo['Long location'])}
          latitude={parseFloat(popupInfo['Lat location'])}
          closeButton={false}
          className="info-marker-tooltip"
          offsetTop={-20}
        >
          <IndicatorInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  changeLayers() {
    const mapStyle = this.state.mapStyle;
  }

  render() {
    const { viewport, mapStyle, indicatorsPOI } = this.state;

    return (
      <MapContainer onClick={() => this.changeLayers()}>
        {mapStyle && (
          <MapGL
            {...viewport}
            width="100%"
            height="100%"
            mapStyle={mapStyle}
            onViewportChange={this._onViewportChange}
            onHover={this._onHover}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          >
            {this._renderCountyInfo()}
            {this._showMarkerInfo()}

            {/*{indicatorsPOI && indicatorsPOI.map(this._renderIndicatorMarker)}*/}

            {/*<NavContainer>
              <NavControlContainer>
                <NavigationControl onViewportChange={this._onViewportChange} />
              </NavControlContainer>

              <ControlPanelContainer>
                <PanelDuo>
                  <DataControlPanel
                    label={'Indicators'}
                    indicators={indicatorsDropdown}
                    selectedInd={this.state.settings.selectedInd1}
                    onChange={value =>
                      this._updateSettings(value, 'selectedInd1')
                    }
                  />
                  <DataControlPanel
                    label={'Sub-indicators'}
                    indicators={this.state.settings.selectedInd1.subIndDropdown}
                    selectedInd={this.state.settings.selectedInd1.subIndicator}
                    onChange={value =>
                      this._updateSettings(value, 'selectedInd1', true)
                    }
                  />
                </PanelDuo>
                <PanelDuo>
                  <DataControlPanel
                    label={'Indicators'}
                    indicators={indicatorsDropdown}
                    selectedInd={this.state.settings.selectedInd2}
                    onChange={value =>
                      this._updateSettings(value, 'selectedInd2')
                    }
                  />
                  <DataControlPanel
                    label={'Sub-indicators'}
                    indicators={this.state.settings.selectedInd2.subIndDropdown}
                    selectedInd={this.state.settings.selectedInd2.subIndicator}
                    onChange={value =>
                      this._updateSettings(value, 'selectedInd2', true)
                    }
                  />
                </PanelDuo>
              </ControlPanelContainer>
            </NavContainer>*/}

            {/*<LegendContainer>
              {this.state.countyLegendName && (
                <LegendItem>
                  <LegendLabel>{this.state.countyLegendName}</LegendLabel>
                  <svg height={35} width="100%">
                    <defs>
                      <linearGradient
                        id="linear"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor={colorStops[0][1]} />
                        <stop
                          offset="100%"
                          stopColor={colorStops[colorStops.length - 1][1]}
                        />
                      </linearGradient>
                    </defs>
                    <rect
                      x="10"
                      y="10"
                      width="95%"
                      height="20"
                      fill="url(#linear)"
                    />
                  </svg>
                </LegendItem>
              )}
              {this.state.POILegendName && (
                <IndicatorLegendItem>
                  <LegendLabel>{this.state.POILegendName}</LegendLabel>
                  <LocationMarker>
                    <IndicatorPin
                      size={20}
                      extraStyle={{
                        position: 'relative',
                        top: '25px',
                        left: '15px',
                      }}
                    />
                  </LocationMarker>
                </IndicatorLegendItem>
              )}
            </LegendContainer>*/}
          </MapGL>
        )}
      </MapContainer>
    );
  }
}
