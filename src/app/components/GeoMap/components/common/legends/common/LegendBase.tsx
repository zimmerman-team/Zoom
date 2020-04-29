import * as React from "react";
import "styled-components/macro";

interface LegendBaseParams {
  children: React.ReactElement[];
}
export const LegendBase = (props: LegendBaseParams) => {
  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
        padding: 10px;
        //width: 275px;
        /* height: 150px; */
        outline: 1px solid rgba(0, 0, 0, 0.23);
        margin-bottom: 30px;
        background-color: white;
      `}
    >
      {props.children}
    </div>
  );
};
