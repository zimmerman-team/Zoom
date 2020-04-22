import * as React from "react";
import "styled-components/macro";
import { LegendBase } from "app/components/GeoMap/components/common/legends/common/LegendBase";
import { BubbleLegendItem } from "app/components/GeoMap/components/common/legends/bubble-legend/common/BubbleLegendItem";
import { LegendHeader } from "app/components/GeoMap/components/common/legends/common/LegendHeaderParams";

interface LegendParams {
  title?: string;
  type?: string;
}

export const BubbleLegend = (props: LegendParams) => {
  console.log("Marker legend");

  return (
    <LegendBase>
      {/* legend title */}
      <LegendHeader title={props.title} />
      <div
        css={`
          display: flex;
          /* flex-direction: column; */
          align-items: center;
          position: relative;
          height: 96px;
        `}
      >
        <BubbleLegendItem amount={150} size={96} last />
        <BubbleLegendItem amount={100} size={70} />
        <BubbleLegendItem amount={50} size={48} />
        <BubbleLegendItem amount={10} size={16} first />
      </div>
    </LegendBase>
  );
};
