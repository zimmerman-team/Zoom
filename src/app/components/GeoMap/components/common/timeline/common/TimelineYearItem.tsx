/* eslint-disable */

import * as React from "react";
import { css } from "styled-components/macro";

export interface TimelineYearItem {
  year?: string;
  hasData?: boolean;
  selected?: boolean;
  first?: boolean;
  last?: boolean;
}

export const TimelineYearItem = (props: TimelineYearItem) => {
  return (
    <div
      css={`
          width: 16px;
          height: 28px;
          cursor: pointer;
          flex-shrink: 0;
          outline: ${
            props.selected ? "initial" : "1px solid rgb(216, 216, 216)"
          };
          outline-offset: -1px;

          // if item is selected and has data show blue background
          ${props.selected &&
            css`
              background-color: #008ed5;
            `}
          
          // if item isn't selected but has data show grey background
          ${!props.selected &&
            props.hasData &&
            css`
              background-color: #d8d8d8;
            `}
          
          // if item isn't selected and has no data show white background
          ${!props.selected &&
            !props.hasData &&
            css`
              background-color: #ffffff;
            `}
          
          // todo: what if item has no data but falls into a time range that has been selected? 
         
          margin-right: 1px;
          &:last-child {
            margin-right: 0;
          }
          &:hover {
            background-color: #008ed5;
            outline: none;
          }
        `}
    />
  );
};
