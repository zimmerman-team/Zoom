import * as React from "react";
import "styled-components/macro";
import { LegendBase } from "app/components/GeoMap/components/common/legends/common/LegendBase";
import { BubbleLegendItem } from "app/components/GeoMap/components/common/legends/bubble-legend/common/BubbleLegendItem";
import { LegendHeader } from "app/components/GeoMap/components/common/legends/common/LegendHeaderParams";
import { formatNumber } from "app/utils/genericUtils";

interface LegendParams {
  title?: string;
  type?: string;
  index?: number;
  min?: number;
  max?: number;
}

export const BubbleLegend = (props: LegendParams) => {
  const third = Math.round((props.max - props.min) / 3);
  const firstThird = props.min + third;
  const secondThird = firstThird + third;

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
        <BubbleLegendItem amount={formatNumber(props.min)} size={96} last />
        <BubbleLegendItem amount={formatNumber(props.firstThird)} size={70} />
        <BubbleLegendItem amount={formatNumber(props.secondThird)} size={48} />
        <BubbleLegendItem amount={formatNumber(props.max)} size={16} first />
      </div>
    </LegendBase>
  );
};
