import * as React from 'react';
import 'styled-components/macro';

interface BubbleLegendItemParams {
  amount: number;
  scale?: number;
  size?: number;
  first?: boolean;
  last?: boolean;
}
export const BubbleLegendItem = (props: BubbleLegendItemParams) => {
  return (
    <div
      css={`
        display: flex;
        align-items: center;
        position: absolute;
      `}
    >
      <div
        css={`
          display: flex;
          align-items: center;
          border-radius: 50%;
          width: ${props.size}px;
          height: ${props.size}px;
          background: ${props.last ? '#dff5f2' : 'initial'};
          border: 1px solid #25baa4;
        `}
      >
        {props.first && (
          <div
            css={`
              background-color: #25baa4;
              width: 8px;
              height: 8px;
              border-radius: 50%;
            `}
          />
        )}
      </div>

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
