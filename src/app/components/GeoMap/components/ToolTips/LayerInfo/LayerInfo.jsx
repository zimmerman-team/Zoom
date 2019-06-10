import React from 'react';
import {
  ToolTipContainer,
  ToolTipLabel,
  ToolTipText,
  ToolTipTitle,
  ValueContainer
} from 'components/GeoMap/components/ToolTips/ToolTip.style';
import { formatNumber } from 'utils/genericUtils';
import Dotdotdot from 'react-dotdotdot';

// This component is specific for the react-map-gl, thus there's no story books
// or unit tests for it as a seperate component
const layerInfo = hoverLayerInfo => {
  if (hoverLayerInfo) {
    let countryName = hoverLayerInfo.properties.name;
    countryName = countryName.charAt(0).toUpperCase() + countryName.slice(1);

    const toolTipLabels = JSON.parse(hoverLayerInfo.properties.tooltipLabels);

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
          {toolTipLabels.map(ttItem => {
            let nrFormat = ' ';

            if (ttItem.format === 'percentage') nrFormat = ' %';
            else if (ttItem.format !== 'number' && ttItem.format) {
              nrFormat = ' '.concat(ttItem.format);
            }

            return (
              <ToolTipLabel key={ttItem.label}>
                <Dotdotdot clamp={4}>{ttItem.label}</Dotdotdot>:
                <ToolTipText>
                  {formatNumber(ttItem.value)}
                  {nrFormat}
                </ToolTipText>
              </ToolTipLabel>
            );
          })}
        </ValueContainer>
      </ToolTipContainer>
    );
  }

  return null;
};

export default layerInfo;
