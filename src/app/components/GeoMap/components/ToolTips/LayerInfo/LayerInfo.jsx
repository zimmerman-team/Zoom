import React from 'react';
import {
  ToolTipContainer,
  ToolTipText,
  ToolTipLabel
} from 'components/GeoMap/components/ToolTips/ToolTip.style';

// This component is specific for the react-map-gl, thus there's no story books
// or unit tests for it as a seperate component
const layerInfo = hoverLayerInfo => {
  if (hoverLayerInfo) {
    let countryName = hoverLayerInfo.properties.name;
    countryName = countryName.charAt(0).toUpperCase() + countryName.slice(1);

    return (
      <ToolTipContainer
        anchor="bottom"
        longitude={hoverLayerInfo.lngLat[0]}
        latitude={hoverLayerInfo.lngLat[1]}
        closeButton={false}
        className="info-marker-tooltip"
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

export default layerInfo;
