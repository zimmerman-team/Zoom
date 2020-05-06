import * as React from "react";
import "styled-components/macro";
import { ReactNode } from "react";

interface TimelineYearIndicator {
  children: ReactNode;
  year?: any;
  visible?: boolean;
}

export const TimelineYearIndicator = (props: TimelineYearIndicator) => {
  return (
    <div
      css={`
        width: 22px;
        height: 10px;
        color: rgb(74, 74, 74);
        font-size: 10px;
        font-weight: normal;
        letter-spacing: -0.5px;
        line-height: 10px;
      `}
    >
      {props.children}
    </div>
  );
};
