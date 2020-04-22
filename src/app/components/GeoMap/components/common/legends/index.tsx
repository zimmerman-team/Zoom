import * as React from "react";
import "styled-components/macro";
import { MarkerLegend } from "app/components/GeoMap/components/common/legends/marker-legend";
import { BubbleLegend } from "app/components/GeoMap/components/common/legends/bubble-legend";
import { LayerLegend } from "app/components/GeoMap/components/common/legends/layer-legend";
// import { LayerLegend } from './layer-legend';
// import { PointLegend } from './point-legend';

// interface LegendContainerParams {}

export const LegendContainer = () => {
  console.log("legend");
  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
        padding: 20px;
      `}
    >
      <MarkerLegend title="Points of interest" />
      <LayerLegend title="AIDS related deaths" />
      <BubbleLegend title="Total People living with HIV" />

      {/* <LayerLegend /> */}
      {/* <PointLegend /> */}
    </div>
  );
};
