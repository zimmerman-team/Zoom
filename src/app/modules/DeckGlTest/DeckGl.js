import React from 'react';
import DeckGL from '@deck.gl/react';
import { VectorTile } from '@mapbox/vector-tile';
import Protobuf from 'pbf';
import MapGL, { LinearInterpolator, StaticMap } from 'react-map-gl';

export class DeckGlTest extends React.Component {
  render() {
    const { viewport, settings, mapStyle, markerArray, legends } = this.state;

    const tileLayer = new TileLayer({
      stroked: true,
      pickable: true,

      getLineColor: [0, 128, 239],
      getFillColor: [9, 0, 255],

      maxZoom: 6,

      getLineWidth: () => {
        return 1;
      },
      lineWidthMinPixels: 1,

      getTileData: ({ x, y, z }) => {
        // const mapSource = `https://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/${z}/${x}/${y}.vector.pbf?access_token=${MapboxAccessToken}`;
        const mapSource = `/api/mbtiles/${z}/${x}/${y}.pbf`;
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
                for (let i = 0; i < vectorTileLayer.length; i++) {
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

      onHover: ({ object }) => {
        console.log('hover object.properties', object && object.properties);
      }
    });

    return (
      /*todo: use mapbox api for fullscreen functionality instead of thirdparty*/
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <MapContainer data-cy="geo-map-container">
          <DeckGL initialViewState={viewport} controller layers={[tileLayer]}>
            <StaticMap
              mapboxApiAccessToken={MAPBOX_TOKEN}
              mapStyle={MAP_STYLE}
            />
          </DeckGL>
        </MapContainer>
      </ErrorBoundary>
    );
  }
}
