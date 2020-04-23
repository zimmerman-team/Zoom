// @ts-nocheck
import * as React from "react";
import MapGL, { Source, Layer } from "react-map-gl";
import { useState, useRef } from "react";
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer
} from "app/components/GeoMapV2/common/layers";
import PropTypes from "prop-types";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

interface FocusParams {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface GeoMapParams {
  latitude: number;
  longitude: number;
  zoom: number;
  focus: FocusParams;
  viewport: object;
  chartMounted: boolean;
  indicatorData: any;
  selectedYear: string;
  disableYear: boolean;
  selectYear: any; //Function;
  saveViewport: any; //PropTypes.func;
  mapOptions: object; //PropTypes.object;
}

export const GeoMapV2 = (props: GeoMapParams) => {
  const [viewport, setViewport] = useState({
    latitude: 40.67,
    longitude: -103.59,
    zoom: 3,
    bearing: 0,
    pitch: 0
  });

  const _sourceRef = useRef();

  const _onClick = event => {
    const feature = event.features[0];
    const clusterId = feature.properties.cluster_id;

    const mapboxSource = _sourceRef.current.getSource();

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }

      setViewport({
        ...viewport,
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        zoom,
        transitionDuration: 500
      });
    });
  };

  return (
    <MapGL
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={setViewport}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      interactiveLayerIds={[clusterLayer.id]}
      onClick={_onClick}
    >
      <Source
        type="geojson"
        data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
        ref={_sourceRef}
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
    </MapGL>
  );
};
