/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* base */
import React from 'react';
/* components */
import styled from 'styled-components';
/* project comps */
import SvgCircleMarker from 'app/assets/icons/CircleMarkerIcon';

/* consts */
const maxSize = 105;
const Value = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  text-align: center;
  position: absolute;
  align-items: center;
  justify-content: center;
  height: calc(100% - 7px);
`;

export const ClusterElement = props => {
  const clusterValue = props.cluster.properties.point_count;
  return (
    <div
      style={{ cursor: 'pointer' }}
      onClick={() => props.onClick(props.zoom, props.longitude, props.latitude)}
    >
      <SvgCircleMarker
        width={clusterValue * 15 < maxSize ? clusterValue * 15 : maxSize}
        height={clusterValue * 15 < maxSize ? clusterValue * 15 : maxSize}
      />
      <Value>{clusterValue}</Value>
    </div>
  );
};
