import * as React from "react";
import "styled-components/macro";
import { MarkerLegend } from "app/components/GeoMap/components/common/legends/marker-legend";
import { BubbleLegend } from "app/components/GeoMap/components/common/legends/bubble-legend";
import { LayerLegend } from "app/components/GeoMap/components/common/legends/layer-legend";

interface LegendContainerParams {
  data: any;
  enableLayers: boolean;
  enableBubble: boolean;
  enablePoints: boolean;
  changeEnableLayers: Function;
  changeEnableBubble: Function;
  changeEnablePoints: Function;
}

export const LegendContainer = (props: LegendContainerParams) => {
  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
        padding: 20px;
        z-index: 1000;
        position: absolute;
        left: 0;
        top: 40px;
        width: fit-content;
      `}
    >
      {props.data &&
        props.data.map((legend) => (
          <React.Fragment>
            {legend.type == "layer" && (
              <LayerLegend
                title={legend.legendName}
                index={legend.index}
                min={legend.minValue}
                max={legend.maxValue}
                enabled={props.enableLayers}
                changeEnabled={props.changeEnableLayers}
              />
            )}

            {legend.type == "circle" && (
              <BubbleLegend
                title={legend.legendName}
                index={legend.index}
                min={legend.data[0].minValue}
                max={legend.data[0].maxValue}
                enabled={props.enableBubble}
                changeEnabled={props.changeEnableBubble}
              />
            )}

            {legend.type == "location" && (
              <MarkerLegend
                title={legend.legendName}
                index={legend.index}
                enabled={props.enablePoints}
                changeEnabled={props.changeEnablePoints}
              />
            )}
          </React.Fragment>
        ))}
    </div>
  );
};
