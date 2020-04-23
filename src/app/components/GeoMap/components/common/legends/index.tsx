import * as React from "react";
import "styled-components/macro";
import { MarkerLegend } from "app/components/GeoMap/components/common/legends/marker-legend";
import { BubbleLegend } from "app/components/GeoMap/components/common/legends/bubble-legend";
import { LayerLegend } from "app/components/GeoMap/components/common/legends/layer-legend";
// import { LayerLegend } from './layer-legend';
// import { PointLegend } from './point-legend';

interface LegendContainerParams {
  data: array;
}

export const LegendContainer = (props: LegendContainerParams) => {
  //console.log("legend");

  // console.log("lets boogie", props.data);
  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
        padding: 20px;
        z-index: 1000;
        position: absolute;
        left: 0;
        top: 0;
        width: fit-content;
      `}
    >
      {props.data &&
        props.data.map(legend => (
          <React.Fragment>
            {legend.type == "layer" && (
              <LayerLegend
                title={legend.legendName}
                index={legend.index}
                min={legend.minValue}
                max={legend.maxValue}
              />
            )}

            {legend.type == "circle" && (
              <BubbleLegend
                title={legend.legendName}
                index={legend.index}
                min={legend.data[0].minValue}
                max={legend.data[0].maxValue}
              />
            )}

            {legend.type == "location" && (
              <MarkerLegend title={legend.legendName} index={legend.index} />
            )}
          </React.Fragment>
        ))}
    </div>
  );
};
