import * as React from "react";
import "styled-components/macro";

interface LayerLegendItemParams {
  amount: number;
  color?: string;
}
export const LayerLegendItem = (props: LayerLegendItemParams) => {
  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <div
        css={`
          width: 90px;
          height: 8px;
          background: ${props.color};
          //margin-bottom: 8px;
        `}
      />

      <div
        css={`
          display: flex;
          justify-content: center;
          color: rgb(42, 42, 42);
          font-size: 10px;
          font-weight: 500;
          line-height: 26px;
        `}
      >
        {`${props.amount}k`}
      </div>
    </div>
  );
};
