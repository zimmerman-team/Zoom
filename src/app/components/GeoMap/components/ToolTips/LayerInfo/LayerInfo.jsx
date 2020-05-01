import React from "react";

/* utils */
import { formatNumber, truncateText } from "app/utils/genericUtils";

/* styles */
import {
  ToolTipContainer,
  ToolTipLabel,
  ToolTipText,
  ToolTipTitle,
  ValueContainer,
} from "app/components/GeoMap/components/ToolTips/ToolTip.style";

// This component is specific for the react-map-gl, thus there's no story books
// or unit tests for it as a seperate component
const layerInfo = (hoverLayerInfo) => {
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
        tipSize={0}
        offsetTop={-15}
      >
        <ToolTipTitle>{countryName}</ToolTipTitle>
        <ValueContainer>
          {toolTipLabels.map((ttItem) => {
            let nrFormat = " ";

            if (ttItem.format === "percentage") nrFormat = " %";
            else if (ttItem.format !== "number" && ttItem.format) {
              nrFormat = " ".concat(ttItem.format);
            }

            return (
              <ToolTipLabel key={ttItem.label}>
                {truncateText(ttItem.label)}:
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
