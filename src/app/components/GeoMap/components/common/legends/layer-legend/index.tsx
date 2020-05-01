import * as React from "react";
import "styled-components/macro";
import Dotdotdot from "react-dotdotdot";
import { LegendBase } from "app/components/GeoMap/components/common/legends/common/LegendBase";
import { LayerLegendItem } from "app/components/GeoMap/components/common/legends/layer-legend/common/LayerLegendItem";
import { LegendHeader } from "app/components/GeoMap/components/common/legends/common/LegendHeaderParams";
import { ColorGradient } from "app/components/GeoMap/components/Legends/LayerLegend/LayerLegend.styles";
/* utils */
import { formatNumber } from "app/utils/genericUtils";

interface LegendParams {
  title?: string;
  type?: string;
  enabled?: boolean;
  min?: number;
  max?: number;
  index?: number;
  changeEnabled: Function;
}

export const LayerLegend = (props: LegendParams) => {
  //console.log("Layer legend");

  const third = Math.round((props.max - props.min) / 3);

  const firstThird = props.min + third;
  const secondThird = firstThird + third;

  return (
    <LegendBase>
      {/* legend header */}
      <LegendHeader
        title={props.title}
        enabled={props.enabled}
        changeEnabled={props.changeEnabled}
      />

      {/* legend items */}
      <div
        css={`
          display: flex;
        `}
      >
        <LayerLegendItem amount="0" color="#d8d8d8" />
        <LayerLegendItem amount={formatNumber(props.min)} color="#b7d0dd" />
        <LayerLegendItem amount={formatNumber(firstThird)} color="#a1c0ce" />
        <LayerLegendItem amount={formatNumber(secondThird)} color="#0f80aa" />
        <LayerLegendItem amount={formatNumber(props.max)} color="#034b65" />
      </div>
    </LegendBase>
  );
};
