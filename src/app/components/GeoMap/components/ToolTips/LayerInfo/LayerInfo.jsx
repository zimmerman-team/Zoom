import React from 'react';
import {
  ToolTipContainer,
  ToolTipLabel,
  ToolTipTitle,
  ToolTipText,
  ValueContainer
} from 'components/GeoMap/components/ToolTips/ToolTip.style';
import { formatNumber } from 'utils/genericUtils';

// This component is specific for the react-map-gl, thus there's no story books
// or unit tests for it as a seperate component
const layerInfo = hoverLayerInfo => {
  if (hoverLayerInfo) {
    let countryName = hoverLayerInfo.properties.name;
    countryName = countryName.charAt(0).toUpperCase() + countryName.slice(1);

    let nrFormat = ' ';

    if (hoverLayerInfo.properties.format === 'percentage') nrFormat = ' %';
    else if (
      hoverLayerInfo.properties.format !== 'number' &&
      hoverLayerInfo.properties.format
    )
      nrFormat = ' '.concat(hoverLayerInfo.properties.format);

    return (
      <ToolTipContainer
        anchor="bottom"
        longitude={hoverLayerInfo.lngLat[0]}
        latitude={hoverLayerInfo.lngLat[1]}
        closeButton={false}
        className="info-marker-tooltip"
      >
        <ToolTipTitle>{countryName}</ToolTipTitle>
        <ValueContainer>
          <ToolTipLabel>
            {hoverLayerInfo.properties.tooltipLabel}:
            <ToolTipText>
              {formatNumber(hoverLayerInfo.properties.value)}
              {nrFormat}
            </ToolTipText>
          </ToolTipLabel>
        </ValueContainer>
      </ToolTipContainer>
    );
  }

  return null;
};

export default layerInfo;
