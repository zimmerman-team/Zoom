import * as React from "react";
import "styled-components/macro";
import { LegendBase } from "app/components/GeoMap/components/common/legends/common/LegendBase";
import { LayerLegendItem } from "app/components/GeoMap/components/common/legends/layer-legend/common/LayerLegendItem";
import { LegendHeader } from "app/components/GeoMap/components/common/legends/common/LegendHeaderParams";

interface LegendParams {
  title?: string;
  type?: string;
  enabled?: boolean;
}

export const LayerLegend = (props: LegendParams) => {
  console.log("Layer legend");

  return (
    <LegendBase>
      {/* legend header */}
      <LegendHeader title={props.title} />

      {/* legend items */}
      <div
        css={`
          display: flex;
        `}
      >
        <LayerLegendItem amount={0} color="#d8d8d8" />
        <LayerLegendItem amount={2} color="#b7d0dd" />
        <LayerLegendItem amount={4} color="#0f80aa" />
        <LayerLegendItem amount={6} color="#034b65" />
      </div>
    </LegendBase>
  );
};
