import { Marker } from "react-map-gl";
import React from "react";
import { CircleContainer } from "app/components/GeoMap/components/Markers/CircleMarker/CircleMarker.styles";
import SvgCircleMarker from "app/assets/icons/CircleMarkerIcon";

// so this basically returns the percentage of the
// indicators value compared to the max and min values
// of all indicators
export function getMeasure(value, maxVal, minVal) {
  const difference = maxVal - minVal;
  const percentage = difference !== 0 ? (100 * value) / difference : 100;
  return percentage !== 0 ? percentage + 40 : percentage;
}

// so we need to adjust the position of the circle marker
// cause it seems way of depending on the size of the circle
function positionAdjustment(value, maxVal, minVal) {
  return getMeasure(value, maxVal, minVal) / 2;
}

const circleMarker = (indicator, index, setMarkerInfo) =>
  indicator && (
    <Marker
      key={`marker-${index}`}
      latitude={parseFloat(indicator.latitude)}
      longitude={parseFloat(indicator.longitude)}
    >
      <CircleContainer
        style={{
          bottom: positionAdjustment(
            indicator.value,
            indicator.maxValue,
            indicator.minValue
          ),
          right: positionAdjustment(
            indicator.value,
            indicator.maxValue,
            indicator.minValue
          ),
        }}
        onMouseEnter={() => setMarkerInfo(indicator)}
        onMouseLeave={() => setMarkerInfo(null)}
      >
        <SvgCircleMarker
          height={getMeasure(
            indicator.value,
            indicator.maxValue,
            indicator.minValue
          )}
          width={getMeasure(
            indicator.value,
            indicator.maxValue,
            indicator.minValue
          )}
        />
      </CircleContainer>
    </Marker>
  );

export default circleMarker;
