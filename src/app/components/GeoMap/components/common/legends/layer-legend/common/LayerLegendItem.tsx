import * as React from 'react';
import 'styled-components/macro';

interface LayerLegendItemParams {
  amount: number;
  color?: number;
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
          width: 55px;
          height: 8px;
          background: ${props.color};
          margin-bottom: 8px;
        `}
      />

      <div
        css={`
          color: rgb(74, 74, 74);
          font-size: 14px;
          font-weight: normal;
          text-align: center;
          letter-spacing: 0;
          line-height: 14px;
          box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.5);
        `}
      >
        {`${props.amount}k`}
      </div>
    </div>
  );
};
