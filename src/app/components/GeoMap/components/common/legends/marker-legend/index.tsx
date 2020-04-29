import * as React from "react";
import "styled-components/macro";

import Dotdotdot from "react-dotdotdot";
import { LegendBase } from "app/components/GeoMap/components/common/legends/common/LegendBase";
import { MarkerLegendItem } from "app/components/GeoMap/components/common/legends/marker-legend/common/MarkerLegendItem";
import { LegendHeader } from "app/components/GeoMap/components/common/legends/common/LegendHeaderParams";

interface LegendParams {
  title?: string;
  type?: string;
  index?: number;
  enabled?: boolean;
  changeEnabled: Function;
}

export const MarkerLegend = (props: LegendParams) => {
  // console.log("Marker legend");

  return (
    <LegendBase>
      {/* legend title */}
      <LegendHeader
        title={props.title}
        enabled={props.enabled}
        changeEnabled={props.changeEnabled}
      />{" "}
      <div
        css={`
          display: flex;
          flex-direction: column;
        `}
      >
        <MarkerLegendItem amount={600} opacity={1} />
        <MarkerLegendItem amount={300} opacity={0.6} />
        <MarkerLegendItem amount={150} opacity={0.4} />
        <MarkerLegendItem amount={50} opacity={0.2} />
        <MarkerLegendItem amount={25} opacity={0.1} />
      </div>
    </LegendBase>
  );
};
