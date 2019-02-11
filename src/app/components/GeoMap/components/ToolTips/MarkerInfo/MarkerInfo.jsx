import React from 'react';
import { getMeasure } from 'components/GeoMap/components/Markers/CircleMarker/CircleMarker';
import {
  ToolTipContainer,
  ToolTipLabel,
  ToolTipText,
} from 'components/GeoMap/components/ToolTips/ToolTip.style';

// So if the marker changes in size depending on its value we use
// this function to get the offset top of the popup
// for now mainly used for the circle marker
function getOffsetTop(hoverMarkerInfo) {
  let offset = -20;
  if (
    hoverMarkerInfo.maxValue !== undefined &&
    hoverMarkerInfo.minValue !== undefined
  ) {
    const percentage = getMeasure(
      hoverMarkerInfo.value,
      hoverMarkerInfo.maxValue,
      hoverMarkerInfo.minValue,
    );
    offset = -percentage / 2;
  }
  return offset;
}

// This component is specific for the react-map-gl, thus there's no story books
// or unit tests for it as a seperate component
const markerInfo = hoverMarkerInfo => {
  if (hoverMarkerInfo) {
    let countryName = hoverMarkerInfo.country;
    countryName = countryName.charAt(0).toUpperCase() + countryName.slice(1);

    return (
      <ToolTipContainer
        tipSize={5}
        longitude={parseFloat(hoverMarkerInfo.longitude)}
        latitude={parseFloat(hoverMarkerInfo.latitude)}
        closeButton={false}
        offsetTop={getOffsetTop(hoverMarkerInfo)}
      >
        <ToolTipLabel>{countryName}</ToolTipLabel>
        <ToolTipText>
          Kenya (/ˈkɛnjə/; locally [ˈkɛɲa] (About this sound listen)),
          officially the Republic of Kenya (Swahili: Jamhuri ya Kenya), is a
          country in Africa with …
        </ToolTipText>
      </ToolTipContainer>
    );
  }
  return null;
};

export default markerInfo;
