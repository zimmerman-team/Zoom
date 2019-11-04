/* base */
import React from 'react';
/* styles */
import styled from 'styled-components';

const ClusterCircle = styled.div`
  cursor: pointer;
  border-radius: 50%;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  width: ${props => props.count * 15}px;
  height: ${props => props.count * 15}px;
  background-color: rgba(255, 255, 255, 0.6);
`;

export const ClusterElement = props => {
  return (
    <ClusterCircle
      onClick={() => props.onClick(props.zoom, props.longitude, props.latitude)}
      count={props.cluster.properties.point_count}
    >
      {props.cluster.properties.point_count}
    </ClusterCircle>
  );
};
