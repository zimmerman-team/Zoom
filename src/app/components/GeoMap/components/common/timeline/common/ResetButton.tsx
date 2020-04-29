import * as React from "react";
import "styled-components/macro";
import RefreshIcon from "@material-ui/icons/Refresh";

export const ResetButton = (props: { onClick?: () => void }) => {
  return (
    <div
      css={`
        display: flex;
        align-items: center;
        width: calc(100% - 24px);
        justify-content: flex-end;
        color: #008ed5;
        cursor: pointer;
      `}
      onClick={props.onClick}
    >
      <RefreshIcon
        css={`
          width: 15px !important;
          height: 15px !important;
        `}
      />

      <div
        css={`
          font-size: 12px;
          font-weight: 500;
          font-stretch: normal;
          font-style: normal;
          //line-height: 0;
          letter-spacing: normal;
        `}
      >
        Reset
      </div>
    </div>
  );
};
