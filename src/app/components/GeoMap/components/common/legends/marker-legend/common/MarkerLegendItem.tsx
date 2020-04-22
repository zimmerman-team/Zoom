import * as React from 'react';
import 'styled-components/macro';

interface MarkerLegendItemParams {
  amount: number;
  opacity?: number;
}
export const MarkerLegendItem = (props: MarkerLegendItemParams) => {
  return (
    <div
      css={`
        display: flex;
        align-items: center;
      `}
    >
      <div
        css={`
          border-radius: 50%;
          width: 10px;
          height: 10px;
          opacity: ${props.opacity};
          background: rgb(232, 67, 87);
          margin-right: 8px;
        `}
      />

      <div
        css={`
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
