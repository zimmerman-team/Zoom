import React from 'react';
import { getMeasure } from 'components/GeoMap/components/Markers/CircleMarker/CircleMarker';
import {
  ToolTipContainer,
  ToolTipLabel,
  ToolTipText,
  ToolTipTitle,
  ValueContainer
} from 'components/GeoMap/components/ToolTips/ToolTip.style';
import { formatNumber } from 'utils/genericUtils';
import Dotdotdot from 'react-dotdotdot';

// So if the marker changes in size depending on its value we use
// this function to get the offset top of the popup
// for now mainly used for the circle marker
function getOffsetTop(hoverMarkerInfo) {
  let offset = -28;
  if (
    hoverMarkerInfo.maxValue !== undefined &&
    hoverMarkerInfo.minValue !== undefined
  ) {
    const percentage = getMeasure(
      hoverMarkerInfo.value,
      hoverMarkerInfo.maxValue,
      hoverMarkerInfo.minValue
    );
    offset = -percentage / 2;
  }
  return offset;
}

// This component is specific for the react-map-gl, thus there's no story books
// or unit tests for it as a seperate component
const markerInfo = hoverMarkerInfo => {
  if (hoverMarkerInfo) {
    let countryName = hoverMarkerInfo.name;
    countryName = countryName.charAt(0).toUpperCase() + countryName.slice(1);

    return (
      <ToolTipContainer
        tipSize={5}
        longitude={parseFloat(hoverMarkerInfo.longitude)}
        latitude={parseFloat(hoverMarkerInfo.latitude)}
        closeButton={false}
        offsetTop={getOffsetTop(hoverMarkerInfo)}
      >
        <ToolTipTitle>{countryName}</ToolTipTitle>
        <ValueContainer>
          {hoverMarkerInfo.tooltipLabels.map(ttItem => {
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

export default markerInfo;
