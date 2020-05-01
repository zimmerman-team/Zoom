import React from "react";
import { Marker } from "react-map-gl";
import styled from "styled-components";
// import SvgIconLocation from "app/assets/icons/geomap/SvgIconLocation";

const IconDiv = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

// This component is specific for the react-map-gl, thus there's no story books
// or unit tests for it as a seperate component
const locationMarker = (indicator, index, setMarkerInfo, color) =>
  indicator && (
    <Marker
      key={`marker-${index}`}
      latitude={parseFloat(indicator.latitude)}
      longitude={parseFloat(indicator.longitude)}
      offsetTop={-28}
      offsetLeft={-16}
    >
      <div
        onMouseEnter={() => setMarkerInfo(indicator)}
        onMouseLeave={() => setMarkerInfo(null)}
      >
        {/* <SvgIconLocation height={32} width={32} color={color} /> */}
        <IconDiv color={color} />
      </div>
    </Marker>
  );

export default locationMarker;
