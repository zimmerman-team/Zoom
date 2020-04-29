import * as React from "react";
import { useHover } from "app/utils/hooks/useHover";
import { css } from "styled-components/macro";

export interface TimelineYearItem {
  year?: string;
  hasData?: boolean;
  selected?: boolean;
  first?: boolean;
  last?: boolean;
  onMouseDown?: Function;
  onMouseEnter?: Function;
  onMouseUp?: Function;
  onClick?: Function;
  children?: any;
}

export const TimelineYearItem = (props: TimelineYearItem) => {
  const [hoverRef, isHovered] = useHover();
  return (
    <div
      css={`
        margin-right: 1px;
        &:last-child {
          margin-right: 0;
        }
        outline: ${props.selected ? "initial" : "1px solid rgb(216, 216, 216)"};
        outline-offset: -1px;
      `}
    >
      {props.children && (props.selected || isHovered) && (
        <div
          css={`
            top: -22px;
            position: absolute;
            color: rgb(74, 74, 74);
            font-size: 10px;
            font-weight: normal;
            letter-spacing: -0.5px;
          `}
        >
          {props.children}
        </div>
      )}
      <div
        ref={hoverRef as React.LegacyRef<HTMLDivElement>}
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          props.onClick && props.onClick()
        }
        onMouseDown={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          props.onMouseDown && props.onMouseDown()
        }
        onMouseEnter={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          props.onMouseEnter && props.onMouseEnter()
        }
        onMouseUp={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          props.onMouseUp && props.onMouseUp()
        }
        css={`
          width: 16px;
          height: 28px;
          flex-shrink: 0;
          cursor: ${
            props.first || props.last || props.onClick ? "pointer" : "default"
          };

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
         
          ${props.onClick &&
            css`
              &:hover {
                background-color: #008ed5;
                outline: none;
              }
            `}
        `}
      />
    </div>
  );
};
